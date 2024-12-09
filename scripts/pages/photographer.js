// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerId() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id ? parseInt(id, 10) : null; // Convertit en entier et gère un ID manquant
}

// Fonction pour récupérer les données du photographe à partir du fichier JSON
async function getPhotographerById(id) {
  if (!id) {
    console.error("ID de photographe non fourni.");
    return null;
  }
  try {
    const response = await fetch("../data/photographers.json");
    if (!response.ok) throw new Error("Erreur réseau lors du chargement des données.");
    const data = await response.json();
    const photographer = data.photographers.find((photographer) => photographer.id === id);
    const medias = data.media.filter((m) => photographer.id === m.photographerId);
    photographer["media"] = medias;
    return photographer;
  } catch (error) {
    console.error("Erreur lors de la récupération des données du photographe :", error);
    return null;
  }
}

// Fonction pour afficher les informations du photographe
async function displayPhotographer(photographerData) {
  if (photographerData) {
    const photographerSection = document.querySelector(".photograph-header");
    photographerSection.innerHTML = ""; // Vide le contenu actuel
    const photographerModel = photographerTemplate(photographerData);

    // Vérifie que `getPhotographerHeaderDOM()` crée bien un élément indépendant
    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    if (photographerHeaderDOM) {
      photographerSection.appendChild(photographerHeaderDOM);
      initModal(photographerData.name);
      const dailyRateElement = document.querySelector(".daily-rate");
      if (dailyRateElement) {
        dailyRateElement.textContent = `${photographerData.price}€ / jour`;
      }
      return photographerData; // Retourne les données pour les utiliser dans `init()`
    } else {
      console.error("Erreur : `getPhotographerHeaderDOM` n'a pas retourné un élément valide.");
    }
  } else {
    console.log(`Aucun photographe trouvé pour l'ID : ${photographerId}`);
  }
  return null;
}

let mediaArray = [];

// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(photographerMedia) {
  if (!photographerMedia || photographerMedia.length === 0) {
    console.error("Aucun média trouvé pour ce photographe.");
    return;
  }
  mediaArray = photographerMedia;
  const mediaContainer = document.querySelector(".photographer-media");
  mediaContainer.innerHTML = "";

  photographerMedia.forEach((mediaItem, index) => {
    const mediaArticle = mediaTemplate(mediaItem, index);

    mediaArticle.addEventListener("click", () => {
      console.log(`Média cliqué : ${mediaItem.title}, Index : ${index}`);
      displayLightBox(index, photographerMedia);
    });

    mediaContainer.appendChild(mediaArticle);
  });

  console.log(`Médias affichés : ${photographerMedia.length}`);
  updateTotalLikes();
}

// Fonction pour mettre à jour le total des likes
function updateTotalLikes() {
  const totalLikes = mediaArray.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector(".total-likes");
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
  }
}



// Mappage des critères de tri à leurs fonctions de comparaison
const sortFunctions = {
  popularity: (a, b) => b.likes - a.likes, // Tri décroissant par likes
  date: (a, b) => new Date(b.date) - new Date(a.date), // Tri décroissant par date
  title: (a, b) => a.title.localeCompare(b.title), // Tri alphabétique
};

// Fonction de tri
function sortMedia(criteria) {
  if (!sortFunctions[criteria]) {
    console.error("Critère de tri non valide :", criteria);
    return;
  }

  // Trie le tableau des médias avec la fonction appropriée
  mediaArray.sort(sortFunctions[criteria]);

  // Réaffiche les médias triés
  displayPhotographerMedia(mediaArray);
}

// Fonction d'initialisation
async function init() {
  const photographerId = getPhotographerId();
  const photographerData = await getPhotographerById(photographerId);
  if (photographerData) {
    await displayPhotographer(photographerData);
    await displayPhotographerMedia(photographerData.media);
    sortMedia("popularity"); // Tri initial par popularité
  } else {
    console.error("Photographe non trouvé.");
  }
}

// Appel de la fonction d'initialisation
init();
