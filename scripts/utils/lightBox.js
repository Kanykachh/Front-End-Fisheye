let currentIndex = 0;

// Fonction pour afficher la LightBox
function displayLightBox(index, array) {
  const lightBox = document.getElementById("light_box");
  const backGroundLight = document.querySelector(".bground-light");
  const lightBoxMedia = document.getElementById("lightbox-media");

  // Affiche la LightBox et met à jour aria-hidden
  lightBox.setAttribute("aria-hidden", "false");
  lightBox.style.display = "flex";
  backGroundLight.style.display = "block";

   
  lightBoxMedia.innerHTML = "";

    
  const mediaData = array[index];
  const mediaPath = `../assets/images/media/${mediaData.photographerId}/${mediaData.image || mediaData.video}`;
  const mediaElement = mediaData.image
    ? createImageElement(mediaPath, mediaData.title, ["lightbox-image"])
    : createVideoElement(mediaPath, ["lightbox-video"]);

    
  const titleElement = document.createElement("p");
  titleElement.textContent = mediaData.title;
  titleElement.classList.add("lightbox-title");
  lightBoxMedia.appendChild(mediaElement);
  lightBoxMedia.appendChild(titleElement);

 
  document.querySelector(".prev-button").onclick = () => navigateLightBox(-1, array);
  document.querySelector(".next-button").onclick = () => navigateLightBox(1, array);
  document.querySelector(".close-button").focus(); 

  currentIndex = index; 
}
function closeLightBox() {
  const lightBox = document.getElementById("light_box");
  const backGroundLight = document.querySelector(".bground-light");

    
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.display = "none";
  backGroundLight.style.display = "none";

    
  const firstMedia = document.querySelector(".media-article");
  if (firstMedia) {firstMedia.focus();
  }
}
document.querySelector(".close-button").addEventListener("click", closeLightBox);

// Fonction pour naviguer dans la LightBox
function navigateLightBox(direction, array) {
  if (!array || array.length === 0) {
    console.error("Navigation impossible : tableau de médias vide ou inexistant.");
    return;
  }

  // Calculer le nouvel index et boucler si nécessaire
  currentIndex = (currentIndex + direction + array.length) % array.length;

  // Afficher le média correspondant
  displayLightBox(currentIndex, array);
}



// Gestion des événements clavier
function handleKeyDown(event, array) {
  const lightBox = document.getElementById("light_box");
  const contactModal = document.getElementById("contact_modal");

  // Ne rien faire si la modal principale est ouverte
  if (contactModal && contactModal.style.display === "block") {
    return;
  }

  // Vérifier si la LightBox est ouverte
  if (lightBox.style.display !== "flex") {
    return; // Ne rien faire si la LightBox est fermée
  }

  // Gérer les touches pour la navigation et la fermeture
  switch (event.key) {
  case "ArrowLeft": // Flèche gauche
    navigateLightBox(-1, array);
    break;
  case "ArrowRight": // Flèche droite
    navigateLightBox(1, array);
    break;
  case "Escape": // Touche Échap
    closeLightBox();
    break;
  }
}

// Ajout d'un écouteur global pour les événements clavier
document.addEventListener("keydown", (event) => handleKeyDown(event, mediaArray));
