const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const emailButton = document.querySelector("#emailButton");

const leadName = document.querySelector("#leadName");
const leadCompany = document.querySelector("#leadCompany");
const leadNeed = document.querySelector("#leadNeed");
const leadMessage = document.querySelector("#leadMessage");

const contactEmail = "hello@futuroforge.com";

function buildLeadMessage() {
  return [
    "Γεια σας, ενδιαφέρομαι για AI automation audit από το FuturoForge.com.",
    "",
    `Όνομα: ${leadName.value.trim() || "-"}`,
    `Επιχείρηση: ${leadCompany.value.trim() || "-"}`,
    `Ανάγκη: ${leadNeed.value}`,
    `Περιγραφή: ${leadMessage.value.trim() || "-"}`,
    "",
    "Ιδανικά θέλω να δω πώς μπορεί να αυτοματοποιηθεί αυτή η ροή και ποιο θα ήταν το πρώτο πρακτικό βήμα.",
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

async function prepareMessage() {
  if (!leadForm.reportValidity()) return null;

  const message = buildLeadMessage();
  await copyLeadMessage(message);
  return message;
}

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = await prepareMessage();
  if (!message) return;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  formStatus.textContent =
    "Το μήνυμα ετοιμάστηκε. Άνοιξε το WhatsApp και διάλεξε την επαφή FuturoForge ή στείλ' το στην ομάδα.";

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

emailButton?.addEventListener("click", async () => {
  const message = await prepareMessage();
  if (!message) return;

  const subject = `AI automation audit - ${leadCompany.value.trim() || "νέο lead"}`;
  const mailUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  formStatus.textContent = `Άνοιξε email προς ${contactEmail} με έτοιμο brief πελάτη.`;
  window.location.href = mailUrl;
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
