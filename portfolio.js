"use strict";
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const count = document.getElementById("project-count");
filters.forEach(button => button.addEventListener("click", () => {
  const category = button.dataset.filter;
  let visible = 0;
  cards.forEach(card => {
    card.hidden = category !== "all" && !card.dataset.category.split(" ").includes(category);
    if (!card.hidden) visible += 1;
  });
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle("active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  });
  count.textContent = `${visible} ${visible === 1 ? "project" : "projects"}`;
  const more = document.getElementById("more-work");
  const extraCount = more.querySelectorAll("[data-category]:not([hidden])").length;
  more.hidden = extraCount === 0;
  more.querySelector("summary b").textContent = String(extraCount);
  if (category !== "all") more.open = true;
}));
document.getElementById("copy-email").addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText("rahulchamoli.in+hello@gmail.com");
    status.textContent = "Email copied. Paste it into your email app.";
  } catch {
    status.textContent = "Copy was unavailable. Select the email address above, or use the email link.";
  }
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.getElementById("motion-toggle");
function updateMotionSystem() {
  document.body.classList.toggle("motion-paused", motionPreference.matches);
  motionToggle.setAttribute("aria-pressed", String(!motionPreference.matches));
  motionToggle.querySelector(".motion-label").textContent = motionPreference.matches ? "Reduced motion" : "Motion on";
  motionToggle.disabled = motionPreference.matches;
}
updateMotionSystem();
motionPreference.addEventListener("change", updateMotionSystem);
motionToggle.addEventListener("click", () => {
  const paused = document.body.classList.toggle("motion-paused");
  motionToggle.setAttribute("aria-pressed", String(!paused));
  motionToggle.querySelector(".motion-label").textContent = paused ? "Motion off" : "Motion on";
});
if ("IntersectionObserver" in window) {
  const animatedSections = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
      if (entry.isIntersecting && !entry.target.classList.contains("reveal-arrived")) {
        entry.target.classList.add("reveal-arrived");
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll(".project-card, .section-top, .capabilities, .projects-heading, .identity-section").forEach(node => animatedSections.observe(node));
}

// Create a draft link only. The visitor reviews and sends it from their email app.
const briefForm = document.getElementById("brief-form");
const draftResult = document.getElementById("draft-result");
briefForm.addEventListener("input", () => { draftResult.hidden = true; });
briefForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!briefForm.reportValidity()) return;
  const fields = new FormData(briefForm);
  const name = String(fields.get("name")).trim();
  const email = String(fields.get("email")).trim();
  const type = String(fields.get("type"));
  const message = String(fields.get("message")).trim();
  if (!name || message.length < 10) {
    document.getElementById("draft-status").textContent = "Add your name and a brief of at least 10 characters.";
    draftResult.hidden = false;
    document.getElementById("draft-link").hidden = true;
    return;
  }
  const body = `Hi Rahul,\n\nI'd like help with: ${type}\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`;
  document.getElementById("draft-link").href = `mailto:rahulchamoli.in%2Bhello@gmail.com?subject=${encodeURIComponent("Portfolio enquiry: " + type)}&body=${encodeURIComponent(body)}`;
  document.getElementById("draft-link").hidden = false;
  document.getElementById("draft-status").textContent = "Your draft is ready. Review it in your email app before sending.";
  draftResult.hidden = false;
});
