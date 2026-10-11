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
  document.querySelectorAll(".project-card, .section-top, .work-heading, .projects-heading, .contact-inner").forEach(node => animatedSections.observe(node));
}
