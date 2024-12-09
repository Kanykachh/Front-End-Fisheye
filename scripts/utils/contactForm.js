function displayModal() {
  const modal = document.getElementById("contact_modal");
  const background = document.querySelector(".bground");
  console.dir(modal, background);
    
  if (!modal || !background) {
    console.error("Impossible de trouver la modal ou l'arrière-plan dans le DOM.");
    return;
  }
  modal.style.display = "block";
  background.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const background = document.querySelector(".bground");
  modal.style.display = "none";
  background.style.display = "none"; 
  const contactButton = document.querySelector(".contact_button");
  if (contactButton) {
    contactButton.focus();
  }
}
function initModal(photographerName) {
  // Insère le nom du photographe dans la modale
  const nameElement = document.getElementById("photographer_name");
  nameElement.textContent = photographerName;

  // Bouton "Contactez-moi"
  const contactButton = document.querySelector(".contact_button");
  if (contactButton) {
    contactButton.addEventListener("click", displayModal);
  }

  const closeButton = document.querySelector(".close_button");
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // Fermer avec la touche Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  const form = document.getElementById("contact_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log("Formulaire soumis :", Object.fromEntries(formData.entries())); // Debug
    closeModal();
  });
}