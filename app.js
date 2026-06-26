const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");

const leadName = document.querySelector("#leadName");
const leadCompany = document.querySelector("#leadCompany");
const leadNeed = document.querySelector("#leadNeed");
const leadMessage = document.querySelector("#leadMessage");

function buildLeadMessage() {
  return [
    "Γεια σας, ενδιαφέρομαι για AI automation audit από το FuturoForge.com.",
    "",
    `Όνομα: ${leadName.value.trim() || "-"}`,
    `Επιχείρηση: ${leadCompany.value.trim() || "-"}`,
    `Ανάγκη: ${leadNeed.value}`,
    `Περιγραφή: ${leadMessage.value.trim() || "-"}`,
  ].join("\n");
}

async function copyLeadMessage(message) {
  if (!navigator.clipboard?.writeText) return false;

  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!leadForm.reportValidity()) return;

  const message = buildLeadMessage();
  const copied = await copyLeadMessage(message);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  formStatus.textContent = copied
    ? "Το μήνυμα αντιγράφηκε. Άνοιξε τώρα το WhatsApp για αποστολή."
    : "Το μήνυμα είναι έτοιμο. Θα ανοίξει WhatsApp για αποστολή.";

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
