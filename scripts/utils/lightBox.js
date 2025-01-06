(function () {
  let currentIndex = 0;
  let currentMediaArray = []; // Variable locale pour stocker les médias affichés dans la LightBox

  function displayLightBox(index, array) {

    if (!array || index < 0 || index >= array.length) {
      console.error("Index ou tableau invalide dans displayLightBox :", index, array);
      return;
    }
    const lightBox = document.getElementById("light_box");
    const backGroundLight = document.querySelector(".bground-light");
    const lightBoxMedia = document.getElementById("lightbox-media");

    lightBox.setAttribute("aria-hidden", "false");
    lightBox.style.display = "flex";
    backGroundLight.style.display = "block";

    lightBoxMedia.innerHTML = "";

    currentMediaArray = array; // Mettre à jour le tableau actuel
    const mediaData = array[index];
    const mediaPath = `assets/images/media/${mediaData.photographerId}/${mediaData.image || mediaData.video}`;
    const mediaElement = mediaData.image
      ? createImageElement(mediaPath, mediaData.title, ["lightbox-image"])
      : createVideoElement(mediaPath, ["lightbox-video"]);
      mediaElement.setAttribute("tabindex", "0");

    const titleElement = document.createElement("p");
    titleElement.textContent = mediaData.title;
    titleElement.classList.add("lightbox-title");
      // Ajout des attributs ARIA pour lecteurs d'écran
    mediaElement.setAttribute("aria-label", `Affichage de ${mediaData.title}, média ${index + 1} sur ${array.length}`);
    lightBoxMedia.appendChild(mediaElement);
    lightBoxMedia.appendChild(titleElement);
    mediaElement.focus();

    document.querySelector(".prev-button").onclick = () => navigateLightBox(-1);
    document.querySelector(".next-button").onclick = () => navigateLightBox(1);
    document.querySelector(".close-button").focus();
    document.querySelector(".close-button").addEventListener("click", closeLightBox);

    currentIndex = index;
  }
  function closeLightBox() {
    const lightBox = document.getElementById("light_box");
    const backGroundLight = document.querySelector(".bground-light");

    lightBox.setAttribute("aria-hidden", "true");
    lightBox.style.display = "none";
    backGroundLight.style.display = "none";

    const firstMedia = document.querySelector(".media-article");
    if (firstMedia) firstMedia.focus();
  }

  function navigateLightBox(direction) {
    if (!currentMediaArray || currentMediaArray.length === 0) {
      console.error("Navigation impossible : tableau de médias vide ou inexistant.");
      return;
    }

    currentIndex = (currentIndex + direction + currentMediaArray.length) % currentMediaArray.length;
    displayLightBox(currentIndex, currentMediaArray);
  }

  document.addEventListener("keydown", (event) => {
    const lightBox = document.getElementById("light_box");
    if (lightBox.style.display !== "flex") return;

    switch (event.key) {
      case "ArrowLeft": {
        navigateLightBox(-1);
        break;
      }
      case "ArrowRight": {
        navigateLightBox(1);
        break;
      }
      case "Escape": {
        closeLightBox();
        break;
      }
        case "Tab": {
      const mediaElement = document.querySelector("#lightbox-media img, #lightbox-media video");
      if (document.activeElement === mediaElement) {
        event.preventDefault();
        document.querySelector(".close-button").focus();
      }
      break;
    }
    }
  });

  // Exportation des fonctions si nécessaire
  window.displayLightBox = displayLightBox;
  window.closeLightBox = closeLightBox;
})();
