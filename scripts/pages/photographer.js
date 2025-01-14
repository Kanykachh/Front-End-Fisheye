// Fonction pour récupérer les données des photographes
async function getPhotographerById(id) {
  if (!id) {
    console.error("ID de photographe non fourni.");
    return null;
  }
  try {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) throw new Error("Erreur réseau lors du chargement des données.");
    const data = await response.json();
    const photographer = data.photographers.find((photographer) => photographer.id === id);
    photographer.media = data.media.filter((m) => photographer.id === m.photographerId);
    return photographer;
  } catch (error) {
    console.error("Erreur lors de la récupération des données du photographe :", error);
    return null;
  }
}
// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerId() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id ? parseInt(id, 10) : null;
}
// Fonction pour afficher les informations du photographe
async function displayPhotographer(photographerData) {
  if (photographerData) {
    const photographerSection = document.querySelector(".photograph-header");
    photographerSection.innerHTML = ""; // Vide le contenu actuel
    const photographerModel = photographerTemplate(photographerData);

    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    if (photographerHeaderDOM) {
      photographerSection.appendChild(photographerHeaderDOM);
      initModal(photographerData.name);
      const dailyRateElement = document.querySelector(".daily-rate");
      if (dailyRateElement) {
        dailyRateElement.textContent = `${photographerData.price}€ / jour`;
      }
      return photographerData;
    } else {
      console.error("Erreur : `getPhotographerHeaderDOM` n'a pas retourné un élément valide.");
    }
  } else {
    console.log(`Aucun photographe trouvé pour l'ID : ${getPhotographerId()}`);
  }
  return null;
}
// Variable pour stocker les médias localement (pas globale)
let photographerMediaArray = [];
window.photographerMediaArray = photographerMediaArray;
// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(photographerMedia) {
  if (!photographerMedia || photographerMedia.length === 0) {
    console.error("Aucun média trouvé pour ce photographe.");
    return;
  }
  photographerMediaArray = photographerMedia;
  const mediaContainer = document.querySelector(".photographer-media");
  mediaContainer.innerHTML = "";

  photographerMedia.forEach((mediaItem, index) => {
    // Utilisation de la factory pour créer un média
    const mediaModel = window.mediaFactory(mediaItem, index, photographerMedia);
    const mediaArticle = mediaModel.getMediaDOM(index);

    mediaArticle.addEventListener("click", () => {
      displayLightBox(index, photographerMedia);
    });

    mediaContainer.appendChild(mediaArticle);
  });

  localUpdateTotalLikes();
}


// Fonction pour mettre à jour le total des likes
function localUpdateTotalLikes() {
  const totalLikes = photographerMediaArray.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector(".total-likes");
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
    totalLikesElement.setAttribute("aria-label", `Le total des likes est maintenant ${totalLikes}`);
    totalLikesElement.setAttribute("aria-live", "polite"); 
    totalLikesElement.setAttribute("role", "status");
  }
}

// Mappage des critères de tri à leurs fonctions de comparaison
const sortFunctions = {
  popularity: (a, b) => b.likes - a.likes,
  date: (a, b) => new Date(b.date) - new Date(a.date),
  title: (a, b) => a.title.localeCompare(b.title),
};

// Fonction pour trier les médias
function sortPhotographerMedia(criteria) {
  if (!sortFunctions[criteria]) {
    console.error("Critère de tri non valide :", criteria);
    return;
  }
  photographerMediaArray.sort(sortFunctions[criteria]);
  displayPhotographerMedia(photographerMediaArray);
}

// Fonction d'initialisation
async function init() {
  const photographerId = getPhotographerId();
  const photographerData = await getPhotographerById(photographerId);

  if (photographerData) {
    await displayPhotographer(photographerData);
    await displayPhotographerMedia(photographerData.media);

    // Assurez-vous que les événements clavier sont ajoutés après la mise à jour
    const mediaArticles = document.querySelectorAll(".media-article");
    mediaArticles.forEach((article, index) => {
      article.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          console.log("Événement clavier détecté. Index :", index);
          console.log("photographerMediaArray dans init() :", photographerMediaArray);

          if (photographerMediaArray && photographerMediaArray.length > 0) {
            displayLightBox(index, photographerMediaArray);
          } else {
            console.error("photographerMediaArray est vide ou non défini.");
          }
        }
      });
    });

    sortPhotographerMedia("popularity");
  } else {
    console.error("Photographe non trouvé.");
  }
}

// Exposez les fonctions globalement
window.localUpdateTotalLikes = localUpdateTotalLikes;
window.sortPhotographerMedia = sortPhotographerMedia;

// Appel de la fonction d'initialisation
init();
