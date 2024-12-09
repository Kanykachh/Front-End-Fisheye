const sortButton = document.getElementById("sort-button");
const sortOptions = document.getElementById("sort-options");
const options = Array.from(document.querySelectorAll(".custom-option"));
const selectedOptionSpan = document.querySelector(".selected-option");

// Fonction pour ouvrir/fermer le menu
function toggleDropdown() {
  const isExpanded = sortButton.getAttribute("aria-expanded") === "true";
  sortButton.setAttribute("aria-expanded", !isExpanded);
  sortOptions.hidden = isExpanded;

  if (!isExpanded) {
    options[0].focus(); // Focus sur la première option quand le menu s'ouvre
  }
}

// Fonction pour mettre à jour l'option sélectionnée
function updateSelectedOption(option) {
  const selectedValue = option.dataset.value;

  // Met à jour le texte du bouton
  selectedOptionSpan.textContent = option.textContent;

  // Met à jour les états ARIA
  options.forEach((opt) => {
    opt.classList.remove("selected");
    opt.setAttribute("aria-selected", "false");
  });
  option.classList.add("selected");
  option.setAttribute("aria-selected", "true");

  // Applique le tri
  sortMedia(selectedValue);
}

// Gérer les événements du bouton de tri
sortButton.addEventListener("click", toggleDropdown);

// Gérer les interactions clavier sur le bouton
sortButton.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (sortOptions.hidden) {
      sortOptions.hidden = false;
      sortButton.setAttribute("aria-expanded", "true");
      options[0].focus(); // Focus sur la première option
    }
  }
});

// Gérer les interactions clavier sur les options
sortOptions.addEventListener("keydown", (event) => {
  if (sortOptions.hidden) return; // Si le menu est fermé, on ignore l'interaction
  event.preventDefault(); // Empêche le scroll de la page
  const currentIndex = options.indexOf(document.activeElement);

  switch (event.key) {
  case "ArrowDown": {
    const nextIndex = (currentIndex + 1) % options.length;
    options[nextIndex].focus();
    break;
  }

  case "ArrowUp": {
    const prevIndex = (currentIndex - 1 + options.length) % options.length;
    options[prevIndex].focus();
    break;
  }

  case "Enter": {
    updateSelectedOption(document.activeElement);
    toggleDropdown();
    break;
  }

  case "Escape": {
    toggleDropdown();
    sortButton.focus(); // Revenir au bouton
    break;
  }

  default:
    break;
  }
});

// Gérer la sélection des options au clic
options.forEach((option) => {
  option.addEventListener("click", () => {
    updateSelectedOption(option);
    toggleDropdown();
  });
});

// Fermer le menu si on clique à l'extérieur
document.addEventListener("click", (event) => {
  if (!sortButton.contains(event.target) && !sortOptions.contains(event.target)) {
    sortButton.setAttribute("aria-expanded", "false");
    sortOptions.hidden = true;
  }
});
