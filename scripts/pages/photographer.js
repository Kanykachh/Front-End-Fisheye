// Fonction pour récupérer les paramètres de l'URL
function getPhotographerId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Renvoie l'ID du photographe
}

// Fonction d'initialisation
async function init() {
    const photographerId = getPhotographerId(); // Récupère l'ID du photographe
    console.log(`Photographe sélectionné ID: ${photographerId}`); // Log de l'ID pour vérification

    // Ici, vous pouvez ajouter le code pour charger les données du photographe basé sur cet ID.
    // Par exemple, en filtrant les données du fichier JSON pour obtenir le photographe correspondant.
}

// Appel de la fonction d'initialisation
init();
