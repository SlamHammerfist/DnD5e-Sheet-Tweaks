export function applyHeaderCollapse(html) {
  const headers = html.querySelectorAll(".items-header.header");

  headers.forEach(header => {
    if (header.dataset.collapseBound) return;
    header.dataset.collapseBound = "true";

    let list = header.nextElementSibling;
    while (
      list &&
      !list.classList.contains("item-list") &&
      !list.classList.contains("conditions-list")
    ) {
      list = list.nextElementSibling;
    }

    if (list && list.classList.contains("conditions-list")) return;

    if (!list || !list.classList.contains("item-list")) return;

    const nameBlock = header.querySelector(".item-name");
    if (!nameBlock) return;

    const label = nameBlock.textContent.trim();
    nameBlock.innerHTML = "";

    const btn = document.createElement("button");
    btn.classList.add("header-collapse-toggle");
    btn.dataset.action = "collapseCategory";
    btn.innerHTML = `<i class="fas fa-chevron-up"></i>`;

    const text = document.createElement("span");
    text.classList.add("header-category-label");
    text.textContent = label;

    nameBlock.append(btn, text);

    let collapsed = false;

    btn.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();

      collapsed = !collapsed;

      btn.innerHTML = collapsed
        ? `<i class="fas fa-chevron-down"></i>`
        : `<i class="fas fa-chevron-up"></i>`;

      list.style.display = collapsed ? "none" : "";
    });
  });
}