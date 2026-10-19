const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopButton = document.querySelector(".back-to-top");
const yearLabel = document.querySelector("#current-year");
const toast = document.querySelector("#toast");

yearLabel.textContent = new Date().getFullYear();

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNavigation();
    navLinks.forEach((item) => item.classList.toggle("is-active", item === link));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeNavigation();
});

function updateBackToTop() {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const toastTimer = { value: 0 };

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer.value);
  toastTimer.value = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Edit this link in index.html and add the real profile or project URL.");
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const gmailComposeLink = document.querySelector("#gmail-compose-link");

function createGmailComposeUrl({ name, email, subject, message }) {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");
  const parameters = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: "tamilazhagank2007@gmail.com",
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${parameters.toString()}`;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const message = Object.fromEntries(new FormData(contactForm));
  const composeUrl = createGmailComposeUrl(message);
  gmailComposeLink.href = composeUrl;
  gmailComposeLink.hidden = true;

  const composeTab = window.open(composeUrl, "_blank");
  if (!composeTab) {
    formStatus.textContent = "Your browser blocked the Gmail tab. Use the button below to open Gmail and send your message.";
    gmailComposeLink.hidden = false;
    return;
  }

  composeTab.opener = null;
  contactForm.reset();
  formStatus.textContent = "Message ready in Gmail.";
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
