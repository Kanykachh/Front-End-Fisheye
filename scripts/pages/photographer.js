// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerId() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id, 10) : null; // Convertit en entier et gère un ID manquant
}

// Fonction pour récupérer les données du photographe à partir du fichier JSON
async function getPhotographerById(id) {
    if (!id) {
        console.error("ID de photographe non fourni.");
        return null;
    }
    try {
        const response = await fetch('../data/photographers.json');
        if (!response.ok) throw new Error("Erreur réseau lors du chargement des données.");
        const data = await response.json();
        return data.photographers.find((photographer) => photographer.id === id);
    } catch (error) {
        console.error("Erreur lors de la récupération des données du photographe :", error);
        return null;
    }
}

// Fonction pour afficher les informations du photographe
async function displayPhotographer() {
    const photographerId = getPhotographerId();
    const photographerData = await getPhotographerById(photographerId);

    if (photographerData) {
        const photographerSection = document.querySelector('.photograph-header');
        
        photographerSection.innerHTML = ''; // Vide le contenu actuel
        const photographerModel = photographerTemplate(photographerData);
        
        // Vérifiez que `getPhotographerHeaderDOM()` crée bien un élément indépendant
        const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
        if (photographerHeaderDOM) {
            photographerSection.appendChild(photographerHeaderDOM);
            return photographerData; // Retourne les données pour les utiliser dans `init()`
        } else {
            console.error("Erreur : `getPhotographerHeaderDOM` n'a pas retourné un élément valide.");
        }
    } else {
        console.log(`Aucun photographe trouvé pour l'ID : ${photographerId}`);
    }
    return null;
}


// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(photographerId) {
    const photographerData = await getPhotographerById(photographerId);
    
    if (photographerData && photographerData.media) {
        const mediaContainer = document.querySelector('.photographer-media');
        
        photographerData.media.forEach(mediaItem => {
            const mediaArticle = mediaTemplate(mediaItem, photographerId); // Utilise la factory pour créer chaque élément
            mediaContainer.appendChild(mediaArticle); // Ajoute l'article dans le conteneur
        });
    } else {
        console.log("Aucun média trouvé pour ce photographe.");
    }
}

// Fonction d'initialisation
async function init() {
    const photographerData = await displayPhotographer(); // Affiche les informations du photographe
    if (photographerData) {
        await displayPhotographerMedia(photographerData.id); // Affiche les médias du photographe avec son ID
    } else {
        console.error("Photographe non trouvé.");
    }
}

// Appel de la fonction d'initialisation
init();