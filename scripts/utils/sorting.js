const sortButton = document.getElementById("sort-button");
const sortOptions = document.getElementById("sort-options");
const options = Array.from(document.querySelectorAll(".custom-option"));


function toggleDropdown() {
    const isExpanded = sortButton.getAttribute("aria-expanded") === "true";
    sortButton.setAttribute("aria-expanded", !isExpanded);
    sortOptions.classList.toggle("show");

    if (!isExpanded) {
        options[0].focus();
    } else {
        sortButton.focus();
    }
}

function updateSelectedOption(option) {
    const selectedValue = option.dataset.value;
    document.querySelector(".selected-option").textContent = option.textContent;
    options.forEach((opt) => {
        opt.classList.remove("selected");
        opt.setAttribute("aria-selected", "false");
    });

    option.classList.add("selected");
    option.setAttribute("aria-selected", "true");

    window.sortPhotographerMedia(selectedValue);
    toggleDropdown();
    sortButton.focus();
}

sortOptions.addEventListener("keydown", (event) => {
    if (!sortOptions.classList.contains("show")) return;

    const currentIndex = options.indexOf(document.activeElement);

    switch (event.key) {
        case "ArrowDown": {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % options.length;
            options[nextIndex].focus();
            break;
        }
        case "ArrowUp": {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + options.length) % options.length;
            options[prevIndex].focus();
            break;
        }
        case "Enter":
            event.preventDefault();
            updateSelectedOption(document.activeElement);
            break;
        case "Escape":
            event.preventDefault();
            toggleDropdown();
            sortButton.focus();
            break;
        default:
            break;
    }
});


options.forEach((option) => {
    option.addEventListener("click", (event) => {
        event.preventDefault();
        updateSelectedOption(option);
    });
});

sortButton.addEventListener("click", toggleDropdown);

document.addEventListener("click", (event) => {
    if (!sortButton.contains(event.target) && !sortOptions.contains(event.target)) {
        sortButton.setAttribute("aria-expanded", "false");
        sortOptions.classList.remove("show");
    }
});

  
  document.querySelectorAll(".custom-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelector(".selected-option").textContent = option.textContent;
      sortButton.setAttribute("aria-expanded", "false");
      sortOptions.classList.remove("show");
      window.sortPhotographerMedia(option.dataset.value);
    });
  });
