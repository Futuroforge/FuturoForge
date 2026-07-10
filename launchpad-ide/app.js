const STORAGE_KEY = "launchpad-ide-v2";

const templates = {
  tracker: {
    name: "Neon Todo",
    activeFile: "index.html",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Neon Todo</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="app">
      <section class="hero">
        <p class="eyebrow">Today</p>
        <h1>Plan the work. Ship the thing.</h1>
        <form id="todoForm">
          <input id="todoInput" placeholder="Add a task" autocomplete="off">
          <button>Add</button>
        </form>
      </section>
      <ul id="todoList" class="todo-list"></ul>
    </main>
    <script src="script.js"><\/script>
  </body>
</html>`,
      "styles.css": `body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: #f2f7f0;
  color: #152018;
}
.app {
  width: min(860px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}
.hero {
  padding: 28px;
  border: 1px solid #cfe3d1;
  border-radius: 18px;
  background: white;
  box-shadow: 0 24px 70px rgba(24, 44, 29, 0.12);
}
.eyebrow {
  margin: 0 0 10px;
  color: #237449;
  font-weight: 800;
  text-transform: uppercase;
}
h1 {
  max-width: 680px;
  margin: 0 0 22px;
  font-size: clamp(2rem, 8vw, 4.5rem);
  line-height: .95;
}
form { display: flex; gap: 10px; }
input {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #bfd7c3;
  border-radius: 12px;
  font-size: 1rem;
}
button {
  border: 0;
  border-radius: 12px;
  padding: 0 18px;
  background: #21c46b;
  color: #082012;
  font-weight: 900;
}
.todo-list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 18px 0 0;
  list-style: none;
}
.todo-list li {
  padding: 16px;
  border-radius: 14px;
  background: #dff4e5;
}`,
      "script.js": `const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const tasks = ["Sketch the idea", "Run the preview", "Improve the design"];
function render() {
  list.innerHTML = tasks.map((task) => \`<li>\${task}</li>\`).join("");
  console.log(\`Rendered \${tasks.length} tasks\`);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = input.value.trim();
  if (!task) return;
  tasks.unshift(task);
  input.value = "";
  render();
});
render();`
    }
  },
  landing: {
    name: "Product Page",
    activeFile: "index.html",
    files: {
      "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Product Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header><strong>PulseDesk</strong><nav><a href="#features">Features</a><a href="#pricing">Pricing</a></nav></header>
    <main>
      <section class="hero"><h1>Customer work in one fast view.</h1><p>Track requests, deals, and next steps without losing the day.</p><button>Start workspace</button></section>
      <section id="features" class="grid"><article><h2>Inbox</h2><p>Turn requests into owners and deadlines.</p></article><article><h2>Pipeline</h2><p>See where deals slow down.</p></article><article><h2>Notes</h2><p>Keep context beside the work.</p></article></section>
    </main>
  </body>
</html>`,
      "styles.css": `body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f5f7fb;color:#17212b}header{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(20px,5vw,70px)}nav{display:flex;gap:18px}a{color:inherit;text-decoration:none}.hero{min-height:60vh;display:grid;align-content:center;gap:18px;padding:20px clamp(20px,5vw,70px) 70px}h1{max-width:850px;margin:0;font-size:clamp(3rem,10vw,7rem);line-height:.92}.hero p{max-width:610px;margin:0;color:#4d5a66;font-size:1.2rem}button{width:fit-content;border:0;border-radius:10px;padding:14px 18px;background:#176bff;color:white;font-weight:800}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0 clamp(20px,5vw,70px) 40px}article{padding:22px;border:1px solid #dce3ec;border-radius:14px;background:white}@media(max-width:760px){.grid{grid-template-columns:1fr}}`,
      "script.js": `console.log("Product page loaded.");`
    }
  },
  dashboard: {
    name: "Ops Dashboard",
    activeFile: "index.html",
    files: {
      "index.html": `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Ops Dashboard</title><link rel="stylesheet" href="styles.css"></head><body><main class="dashboard"><section class="headline"><div><p>Live workspace</p><h1>Team health</h1></div><button id="refresh">Refresh</button></section><section class="metrics"><article><span>Deploys</span><strong id="deploys">18</strong></article><article><span>Open bugs</span><strong id="bugs">7</strong></article><article><span>Response</span><strong>1h 12m</strong></article></section><section class="activity" id="activity"></section></main><script src="script.js"><\/script></body></html>`,
      "styles.css": `body{margin:0;font-family:Inter,system-ui,sans-serif;background:#eef4f8;color:#13202a}.dashboard{width:min(1100px,calc(100% - 32px));margin:0 auto;padding:30px 0}.headline{display:flex;align-items:center;justify-content:space-between;gap:16px}p{margin:0;color:#62717f}h1{margin:4px 0 0;font-size:clamp(2rem,6vw,4rem)}button{border:0;border-radius:10px;padding:12px 16px;background:#111827;color:white;font-weight:800}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}article,.activity{border:1px solid #d7e0e8;border-radius:14px;background:white}article{padding:18px}article span{display:block;color:#667687}article strong{display:block;margin-top:10px;font-size:2.5rem}.activity{display:grid;gap:1px;overflow:hidden}.activity div{display:flex;justify-content:space-between;padding:16px 18px;background:white}@media(max-width:720px){.metrics{grid-template-columns:1fr}}`,
      "script.js": `const activity=document.querySelector("#activity");const deploys=document.querySelector("#deploys");const bugs=document.querySelector("#bugs");const refresh=document.querySelector("#refresh");const rows=["API deploy finished","New signup spike","Billing issue assigned","Design review complete"];function render(){activity.innerHTML=rows.map((row,index)=>\`<div><span>\${row}</span><strong>\${index+1}m ago</strong></div>\`).join("")}refresh.addEventListener("click",()=>{deploys.textContent=Number(deploys.textContent)+1;bugs.textContent=Math.max(0,Number(bugs.textContent)-1);console.log("Dashboard refreshed")});render();`
    }
  },
  game: {
    name: "Dot Rush",
    activeFile: "index.html",
    files: {
      "index.html": `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Dot Rush</title><link rel="stylesheet" href="styles.css"></head><body><main><section><h1>Dot Rush</h1><p>Click the green target.</p><strong id="score">0</strong></section><canvas id="game" width="720" height="420"></canvas></main><script src="script.js"><\/script></body></html>`,
      "styles.css": `body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Inter,system-ui,sans-serif;background:#10161b;color:#f9fbfc}main{width:min(860px,calc(100% - 28px))}section{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:16px}h1{margin:0;font-size:clamp(2.4rem,9vw,5.5rem)}p{color:#aab7c4}strong{font-size:3rem;color:#2fe27d}canvas{width:100%;aspect-ratio:12/7;border:1px solid #34424d;border-radius:14px;background:#18222b}`,
      "script.js": `const canvas=document.querySelector("#game");const scoreEl=document.querySelector("#score");const ctx=canvas.getContext("2d");let score=0;let target={x:180,y:150,r:28};function moveTarget(){target={x:50+Math.random()*(canvas.width-100),y:50+Math.random()*(canvas.height-100),r:24+Math.random()*18}}function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#24313b";for(let x=0;x<canvas.width;x+=36)ctx.fillRect(x,0,1,canvas.height);for(let y=0;y<canvas.height;y+=36)ctx.fillRect(0,y,canvas.width,1);ctx.beginPath();ctx.arc(target.x,target.y,target.r,0,Math.PI*2);ctx.fillStyle="#2fe27d";ctx.fill();requestAnimationFrame(draw)}canvas.addEventListener("click",event=>{const rect=canvas.getBoundingClientRect();const x=(event.clientX-rect.left)*(canvas.width/rect.width);const y=(event.clientY-rect.top)*(canvas.height/rect.height);if(Math.hypot(x-target.x,y-target.y)<=target.r){score+=1;scoreEl.textContent=score;moveTarget();console.log("Hit target",score)}});setInterval(moveTarget,1700);draw();`
    }
  }
};

const els = {
  projectName: document.querySelector("#projectName"), saveState: document.querySelector("#saveState"), projectStats: document.querySelector("#projectStats"),
  fileSearch: document.querySelector("#fileSearch"), fileTree: document.querySelector("#fileTree"), tabs: document.querySelector("#tabs"), editor: document.querySelector("#editor"), lineNumbers: document.querySelector("#lineNumbers"), activeFileName: document.querySelector("#activeFileName"),
  searchInput: document.querySelector("#searchInput"), searchCount: document.querySelector("#searchCount"), tidyButton: document.querySelector("#tidyButton"), autoRunToggle: document.querySelector("#autoRunToggle"),
  preview: document.querySelector("#preview"), previewStage: document.querySelector("#previewStage"), consoleOutput: document.querySelector("#consoleOutput"), consoleCount: document.querySelector("#consoleCount"),
  runButton: document.querySelector("#runButton"), newFileButton: document.querySelector("#newFileButton"), exportButton: document.querySelector("#exportButton"), resetButton: document.querySelector("#resetButton"), templateButton: document.querySelector("#templateButton"), templatesDialog: document.querySelector("#templatesDialog"), ideaInput: document.querySelector("#ideaInput"), generateButton: document.querySelector("#generateButton"), previewTab: document.querySelector("#previewTab"), consoleTab: document.querySelector("#consoleTab"), previewPane: document.querySelector("#previewPane"), consolePane: document.querySelector("#consolePane"), reloadPreviewButton: document.querySelector("#reloadPreviewButton"), clearConsoleButton: document.querySelector("#clearConsoleButton"), statusLanguage: document.querySelector("#statusLanguage"), statusCursor: document.querySelector("#statusCursor"), statusSize: document.querySelector("#statusSize")
};

let project = loadProject();
let autoRunTimer = null;
let consoleLines = 0;

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadProject() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || clone(templates.tracker); } catch { return clone(templates.tracker); } }
function saveProject() { els.saveState.textContent = "Saving"; localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); setTimeout(() => els.saveState.textContent = "Saved", 120); }
function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function fileType(name) { if (name.endsWith(".html")) return "HTML"; if (name.endsWith(".css")) return "CSS"; if (name.endsWith(".js")) return "JS"; if (name.endsWith(".json")) return "JSON"; return "TXT"; }
function language(name) { return { HTML: "HTML", CSS: "CSS", JS: "JavaScript", JSON: "JSON", TXT: "Plain text" }[fileType(name)]; }
function stats() { const chars = Object.values(project.files).reduce((sum, text) => sum + text.length, 0); return `${Object.keys(project.files).length} files / ${chars.toLocaleString()} chars`; }

function render() {
  const names = Object.keys(project.files);
  if (!project.files[project.activeFile]) project.activeFile = names[0];
  els.projectName.value = project.name;
  els.editor.value = project.files[project.activeFile];
  els.activeFileName.value = project.activeFile;
  els.projectStats.textContent = stats();
  const q = els.fileSearch.value.trim().toLowerCase();
  const shown = q ? names.filter((name) => name.toLowerCase().includes(q)) : names;
  els.fileTree.innerHTML = shown.map((name) => `<button class="file-item ${name === project.activeFile ? "active" : ""}" data-file="${escapeHtml(name)}" type="button"><span class="file-type">${fileType(name)}</span><span class="file-name">${escapeHtml(name)}</span><span class="delete-file" data-delete="${escapeHtml(name)}">x</span></button>`).join("") || `<div class="file-empty">No files</div>`;
  els.tabs.innerHTML = names.map((name) => `<button class="tab ${name === project.activeFile ? "active" : ""}" data-file="${escapeHtml(name)}" type="button">${escapeHtml(name)}</button>`).join("");
  updateEditorMeta();
  updateSearchCount();
}

function updateEditorMeta() {
  const lines = Math.max(1, els.editor.value.split("\n").length);
  els.lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<div>${i + 1}</div>`).join("");
  els.lineNumbers.scrollTop = els.editor.scrollTop;
  const before = els.editor.value.slice(0, els.editor.selectionStart || 0).split("\n");
  els.statusCursor.textContent = `Ln ${before.length}, Col ${before.at(-1).length + 1}`;
  els.statusLanguage.textContent = language(project.activeFile);
  els.statusSize.textContent = `${els.editor.value.length.toLocaleString()} chars`;
}

function updateSearchCount() {
  const q = els.searchInput.value.toLowerCase();
  if (!q) { els.searchCount.textContent = "0"; return; }
  let count = 0, at = 0, text = els.editor.value.toLowerCase();
  while ((at = text.indexOf(q, at)) !== -1) { count += 1; at += q.length || 1; }
  els.searchCount.textContent = String(count);
}

function switchFile(name) { if (!project.files[name]) return; project.activeFile = name; render(); saveProject(); }
function scheduleRun() { clearTimeout(autoRunTimer); if (els.autoRunToggle.checked) autoRunTimer = setTimeout(runProject, 420); }
function updateSource() { project.files[project.activeFile] = els.editor.value; saveProject(); updateEditorMeta(); updateSearchCount(); scheduleRun(); }
function tidy() { els.editor.value = els.editor.value.replace(/[ \t]+$/gm, "").replace(/\n{4,}/g, "\n\n\n").trimEnd() + "\n"; updateSource(); }

function buildHtml() {
  const html = project.files["index.html"] || "<main><h1>No index.html</h1></main>";
  const clean = html.replace(/<link\b(?=[^>]*rel=["']?stylesheet["']?)[^>]*>/gi, "").replace(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>\s*<\/script>/gi, "");
  const css = Object.entries(project.files).filter(([name]) => name.endsWith(".css")).map(([, text]) => text).join("\n\n").replace(/<\/style/gi, "<\\/style");
  const scripts = Object.entries(project.files).filter(([name]) => name.endsWith(".js")).map(([name, source]) => ({ name, source }));
  const bridge = `<script>(function(){function f(v){if(typeof v==="string")return v;try{return JSON.stringify(v)}catch(e){return String(v)}}["log","warn","error"].forEach(function(level){var old=console[level];console[level]=function(){var args=[].slice.call(arguments);parent.postMessage({source:"launchpad-preview",level:level,message:args.map(f).join(" ")},"*");old.apply(console,args)}});addEventListener("error",function(e){parent.postMessage({source:"launchpad-preview",level:"error",message:e.message+" at line "+e.lineno},"*")})}());<\/script>`;
  const runner = `<script>(function(){var files=JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(scripts))}"));files.forEach(function(file){console.log("Running "+file.name);try{(0,eval)(file.source+"\\n//# sourceURL=launchpad/"+file.name)}catch(e){console.error(e&&e.stack||e)}})}());<\/script>`;
  if (clean.includes("</head>") && clean.includes("</body>")) return clean.replace("</head>", `<style>${css}</style>${bridge}</head>`).replace("</body>", `${runner}</body>`);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style>${bridge}</head><body>${clean}${runner}</body></html>`;
}

function clearConsole() { consoleLines = 0; els.consoleOutput.textContent = ""; els.consoleCount.textContent = "0 logs"; }
function addConsole(level, message) { consoleLines += 1; els.consoleCount.textContent = `${consoleLines} ${consoleLines === 1 ? "log" : "logs"}`; const line = document.createElement("div"); line.className = `console-line ${level}`; line.textContent = `[${level}] ${message}`; els.consoleOutput.appendChild(line); els.consoleOutput.scrollTop = els.consoleOutput.scrollHeight; if (level === "error") showPane("console"); }
function runProject() { clearConsole(); addConsole("system", `Running ${project.name || "project"}...`); els.preview.srcdoc = buildHtml(); }
function showPane(name) { const consoleOn = name === "console"; els.consolePane.hidden = !consoleOn; els.previewPane.hidden = consoleOn; els.consoleTab.classList.toggle("active", consoleOn); els.previewTab.classList.toggle("active", !consoleOn); }
function setDevice(device) { els.previewStage.classList.toggle("mobile", device === "mobile"); document.querySelectorAll("[data-device]").forEach((button) => button.classList.toggle("active", button.dataset.device === device)); }

function applyTemplate(name) { project = clone(templates[name] || templates.tracker); render(); saveProject(); runProject(); if (els.templatesDialog.open) els.templatesDialog.close(); }
function titleFromIdea(idea) { return idea.split(/\s+/).filter(Boolean).slice(0, 5).map((word) => word[0].toUpperCase() + word.slice(1)).join(" ") || "Generated App"; }
function generate() {
  const idea = els.ideaInput.value.trim() || "creative web app";
  const lower = idea.toLowerCase();
  const kind = lower.includes("game") ? "game" : lower.includes("dashboard") ? "dashboard" : lower.includes("landing") ? "landing" : "tracker";
  applyTemplate(kind);
  project.name = titleFromIdea(idea);
  if (project.files["index.html"]) project.files["index.html"] = project.files["index.html"].replace(/<title>.*?<\/title>/, `<title>${escapeHtml(project.name)}</title>`).replace(/<h1>.*?<\/h1>/, `<h1>${escapeHtml(project.name)}</h1>`);
  render(); saveProject(); runProject();
}

function newFile() {
  const name = prompt("File name", "new-file.js");
  if (!name || project.files[name]) return;
  project.files[name] = name.endsWith(".css") ? "body {\n  margin: 0;\n}\n" : name.endsWith(".html") ? "<main>\n  <h1>Hello</h1>\n</main>\n" : "console.log('New file');\n";
  project.activeFile = name;
  render(); saveProject(); scheduleRun();
}
function exportProject() { const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${project.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "launchpad"}.json`; a.click(); URL.revokeObjectURL(url); addConsole("system", "Project exported"); }

els.editor.addEventListener("input", updateSource);
els.editor.addEventListener("scroll", () => els.lineNumbers.scrollTop = els.editor.scrollTop);
els.editor.addEventListener("click", updateEditorMeta);
els.editor.addEventListener("keyup", updateEditorMeta);
els.editor.addEventListener("keydown", (event) => { if (event.key === "Tab") { event.preventDefault(); const s = els.editor.selectionStart, e = els.editor.selectionEnd; els.editor.value = els.editor.value.slice(0, s) + "  " + els.editor.value.slice(e); els.editor.setSelectionRange(s + 2, s + 2); updateSource(); } if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runProject(); });
els.projectName.addEventListener("input", () => { project.name = els.projectName.value; saveProject(); });
els.fileSearch.addEventListener("input", render);
els.searchInput.addEventListener("input", updateSearchCount);
els.activeFileName.addEventListener("change", () => { const old = project.activeFile, next = els.activeFileName.value.trim(); if (!next || project.files[next]) { els.activeFileName.value = old; return; } project.files[next] = project.files[old]; delete project.files[old]; project.activeFile = next; render(); saveProject(); scheduleRun(); });
els.fileTree.addEventListener("click", (event) => { const del = event.target.closest("[data-delete]"); if (del) { if (Object.keys(project.files).length > 1 && confirm("Delete file?")) { delete project.files[del.dataset.delete]; project.activeFile = Object.keys(project.files)[0]; render(); saveProject(); scheduleRun(); } return; } const file = event.target.closest("[data-file]"); if (file) switchFile(file.dataset.file); });
els.tabs.addEventListener("click", (event) => { const tab = event.target.closest("[data-file]"); if (tab) switchFile(tab.dataset.file); });
els.templateButton.addEventListener("click", () => els.templatesDialog.showModal());
els.templatesDialog.addEventListener("click", (event) => { const button = event.target.closest("[data-template]"); if (button) applyTemplate(button.dataset.template); });
document.querySelectorAll("[data-idea]").forEach((button) => button.addEventListener("click", () => { els.ideaInput.value = button.dataset.idea; els.ideaInput.focus(); }));
document.querySelectorAll("[data-device]").forEach((button) => button.addEventListener("click", () => setDevice(button.dataset.device)));
els.generateButton.addEventListener("click", generate);
els.runButton.addEventListener("click", runProject);
els.reloadPreviewButton.addEventListener("click", runProject);
els.previewTab.addEventListener("click", () => showPane("preview"));
els.consoleTab.addEventListener("click", () => showPane("console"));
els.clearConsoleButton.addEventListener("click", clearConsole);
els.newFileButton.addEventListener("click", newFile);
els.exportButton.addEventListener("click", exportProject);
els.tidyButton.addEventListener("click", tidy);
els.resetButton.addEventListener("click", () => { if (confirm("Reset project?")) applyTemplate("tracker"); });
window.addEventListener("message", (event) => { if (event.data && event.data.source === "launchpad-preview") addConsole(event.data.level, event.data.message); });

render();
runProject();
