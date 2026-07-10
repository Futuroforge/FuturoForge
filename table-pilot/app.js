const demoCsv = `Client,Status,Owner,Amount,Next step
Acme Foods,Won,Maria,4200,Send onboarding
North Studio,Proposal,Nikos,1800,Follow up Friday
Helio Market,Negotiation,Eleni,2600,Review terms
Acme Foods,Won,Maria,4200,Send onboarding
Blue Harbor,Lead,Nikos,950,Book discovery
Orion Parts,Proposal,Eleni,3100,Send revised quote
Kappa Clinic,Won,Maria,5200,Prepare kickoff`;

const state = {
  headers: [],
  rows: [],
  search: "",
  groupBy: "",
  numberColumn: "",
  compact: false
};

const els = {
  csvInput: document.querySelector("#csvInput"),
  pasteButton: document.querySelector("#pasteButton"),
  sampleButton: document.querySelector("#sampleButton"),
  exportButton: document.querySelector("#exportButton"),
  searchInput: document.querySelector("#searchInput"),
  groupSelect: document.querySelector("#groupSelect"),
  numberSelect: document.querySelector("#numberSelect"),
  addRowButton: document.querySelector("#addRowButton"),
  clearButton: document.querySelector("#clearButton"),
  rowCount: document.querySelector("#rowCount"),
  columnCount: document.querySelector("#columnCount"),
  totalValue: document.querySelector("#totalValue"),
  averageValue: document.querySelector("#averageValue"),
  tableStatus: document.querySelector("#tableStatus"),
  dataTable: document.querySelector("#dataTable"),
  compactButton: document.querySelector("#compactButton"),
  dedupeButton: document.querySelector("#dedupeButton"),
  summaryLabel: document.querySelector("#summaryLabel"),
  summaryList: document.querySelector("#summaryList"),
  pasteArea: document.querySelector("#pasteArea"),
  loadPasteButton: document.querySelector("#loadPasteButton"),
  copyButton: document.querySelector("#copyButton")
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if ((char === "," || char === "\t") && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function loadCsv(text) {
  const parsed = parseCsv(text);
  if (parsed.length === 0) return;

  const width = Math.max(...parsed.map((row) => row.length));
  const headers = parsed[0].map((header, index) => header || `Column ${index + 1}`);
  while (headers.length < width) headers.push(`Column ${headers.length + 1}`);

  state.headers = headers;
  state.rows = parsed.slice(1).map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || "";
    });
    return item;
  });
  state.groupBy = headers.includes(state.groupBy) ? state.groupBy : headers[1] || headers[0] || "";
  state.numberColumn = findNumberColumn() || headers[0] || "";
  render();
}

function findNumberColumn() {
  return state.headers.find((header) => {
    const values = state.rows.map((row) => toNumber(row[header])).filter(Number.isFinite);
    return values.length >= Math.max(1, Math.ceil(state.rows.length * 0.4));
  });
}

function toNumber(value) {
  const cleaned = String(value || "").replace(/[^\d,.-]/g, "").replace(",", ".");
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : NaN;
}

function filteredRows() {
  const query = state.search.toLowerCase();
  if (!query) return state.rows;
  return state.rows.filter((row) =>
    state.headers.some((header) => String(row[header] || "").toLowerCase().includes(query))
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("el-GR", { maximumFractionDigits: 2 }).format(value || 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv() {
  return [
    state.headers.map(escapeCsv).join(","),
    ...state.rows.map((row) => state.headers.map((header) => escapeCsv(row[header])).join(","))
  ].join("\n");
}

function renderSelectors() {
  const options = state.headers.map((header) => `<option value="${escapeHtml(header)}">${escapeHtml(header)}</option>`).join("");
  els.groupSelect.innerHTML = options;
  els.numberSelect.innerHTML = options;
  els.groupSelect.value = state.groupBy;
  els.numberSelect.value = state.numberColumn;
}

function renderTable() {
  const rows = filteredRows();
  const head = `<thead><tr>${state.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}<th class="row-delete">Del</th></tr></thead>`;
  const body = rows
    .map((row, visibleIndex) => {
      const realIndex = state.rows.indexOf(row);
      const cells = state.headers
        .map((header) => `<td contenteditable="true" data-row="${realIndex}" data-column="${escapeHtml(header)}">${escapeHtml(row[header])}</td>`)
        .join("");
      return `<tr data-visible-row="${visibleIndex}">${cells}<td class="row-delete"><button data-delete-row="${realIndex}" type="button">x</button></td></tr>`;
    })
    .join("");
  els.dataTable.innerHTML = `${head}<tbody>${body}</tbody>`;
  els.dataTable.parentElement.classList.toggle("compact", state.compact);
}

function renderInsights() {
  const rows = filteredRows();
  const numbers = rows.map((row) => toNumber(row[state.numberColumn])).filter(Number.isFinite);
  const total = numbers.reduce((sum, number) => sum + number, 0);
  els.rowCount.textContent = rows.length.toLocaleString("el-GR");
  els.columnCount.textContent = state.headers.length.toLocaleString("el-GR");
  els.totalValue.textContent = formatNumber(total);
  els.averageValue.textContent = formatNumber(numbers.length ? total / numbers.length : 0);
  els.tableStatus.textContent = `${rows.length} visible rows from ${state.rows.length} total`;
}

function renderSummary() {
  const rows = filteredRows();
  const groups = new Map();
  rows.forEach((row) => {
    const key = row[state.groupBy] || "Blank";
    const current = groups.get(key) || { count: 0, total: 0 };
    current.count += 1;
    const number = toNumber(row[state.numberColumn]);
    if (Number.isFinite(number)) current.total += number;
    groups.set(key, current);
  });

  const max = Math.max(1, ...Array.from(groups.values(), (group) => group.total || group.count));
  els.summaryLabel.textContent = state.groupBy ? `by ${state.groupBy}` : "no group";
  els.summaryList.innerHTML = Array.from(groups.entries())
    .sort((a, b) => (b[1].total || b[1].count) - (a[1].total || a[1].count))
    .map(([name, group]) => {
      const value = group.total || group.count;
      const width = Math.max(6, Math.round((value / max) * 100));
      return `<div class="summary-row"><strong>${escapeHtml(name)}</strong><div class="bar"><span style="width:${width}%"></span></div><span>${formatNumber(value)}</span></div>`;
    })
    .join("") || `<p>No rows to summarize.</p>`;
}

function render() {
  renderSelectors();
  renderTable();
  renderInsights();
  renderSummary();
  els.pasteArea.value = toCsv();
  els.compactButton.setAttribute("aria-pressed", String(state.compact));
}

function addRow() {
  if (state.headers.length === 0) {
    state.headers = ["Name", "Status", "Amount"];
    state.groupBy = "Status";
    state.numberColumn = "Amount";
  }
  const row = {};
  state.headers.forEach((header) => {
    row[header] = "";
  });
  state.rows.push(row);
  render();
}

function removeDuplicates() {
  const seen = new Set();
  state.rows = state.rows.filter((row) => {
    const key = state.headers.map((header) => row[header]).join("\u001f");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  render();
}

function downloadCsv() {
  const blob = new Blob([toCsv()], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "table-pilot-clean.csv";
  link.click();
  URL.revokeObjectURL(url);
}

els.csvInput.addEventListener("change", async () => {
  const file = els.csvInput.files?.[0];
  if (!file) return;
  loadCsv(await file.text());
});

els.pasteButton.addEventListener("click", () => {
  els.pasteArea.focus();
  els.pasteArea.select();
});

els.sampleButton.addEventListener("click", () => loadCsv(demoCsv));
els.exportButton.addEventListener("click", downloadCsv);
els.searchInput.addEventListener("input", () => {
  state.search = els.searchInput.value.trim();
  renderTable();
  renderInsights();
  renderSummary();
});
els.groupSelect.addEventListener("change", () => {
  state.groupBy = els.groupSelect.value;
  renderSummary();
});
els.numberSelect.addEventListener("change", () => {
  state.numberColumn = els.numberSelect.value;
  renderInsights();
  renderSummary();
});
els.addRowButton.addEventListener("click", addRow);
els.clearButton.addEventListener("click", () => {
  state.headers = [];
  state.rows = [];
  state.groupBy = "";
  state.numberColumn = "";
  render();
});
els.compactButton.addEventListener("click", () => {
  state.compact = !state.compact;
  renderTable();
  els.compactButton.setAttribute("aria-pressed", String(state.compact));
});
els.dedupeButton.addEventListener("click", removeDuplicates);
els.loadPasteButton.addEventListener("click", () => loadCsv(els.pasteArea.value));
els.copyButton.addEventListener("click", async () => {
  const csv = toCsv();
  els.pasteArea.value = csv;
  els.pasteArea.select();
  try {
    await navigator.clipboard.writeText(csv);
  } catch {
    document.execCommand("copy");
  }
});

els.dataTable.addEventListener("input", (event) => {
  const cell = event.target.closest("td[contenteditable='true']");
  if (!cell) return;
  const row = state.rows[Number(cell.dataset.row)];
  if (!row) return;
  row[cell.dataset.column] = cell.textContent.trim();
  renderInsights();
  renderSummary();
  els.pasteArea.value = toCsv();
});

els.dataTable.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-row]");
  if (!button) return;
  state.rows.splice(Number(button.dataset.deleteRow), 1);
  render();
});

loadCsv(demoCsv);
