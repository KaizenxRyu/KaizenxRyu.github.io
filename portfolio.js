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
