function createImageElement(src, alt, classes) {
    const img = document.createElement('img');
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    if (classes) img.classList.add(...classes);
    return img;
}

function createTextElement(tag, textContent, classes) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (classes) element.classList.add(...classes);
    return element;
}


function photographerTemplate(data) {
    const { id, name, city, country, tagline, price } = data;
    const formattedName = name.replace(/[\s-]+/g, ''); 
    const picture = `../assets/images/photographersid/${formattedName}.jpg`; 

    // Fonction pour créer la carte utilisateur
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("aria-label", `Photographe ${name} basé à ${city}`);

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', `Voir le profil de ${name}`);
        link.classList.add('photographer-link');

        const img = createImageElement(picture, `Portrait de ${name}`);
        const h2 = createTextElement('h2', name);
        const location = createTextElement('p', `${city}, ${country}`, ['photographer-location']);
        const taglineElement = createTextElement('p', tagline, ['photographer-tagline']);
        const priceElement = createTextElement('p', `${price}€/jour`, ['photographer-price']);

        link.append(img, h2, location, taglineElement, priceElement);
        article.appendChild(link);

        return article;
    }


    // Fonction pour créer l'en-tête de la page de photographe
    function getPhotographerHeaderDOM() {
        const headerDiv = document.querySelector('.photograph-header');
   
        // Left section with photographer details
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('photograph-header-left');
        const nameElement = createTextElement('h1', name, ['photograph-header-h1']);
        const locationElement = createTextElement('p', `${city}, ${country}`, ['photograph-header-location']);
        const taglineElement = createTextElement('p', tagline, ['photograph-header-tagline']);
        leftDiv.append(nameElement, locationElement, taglineElement);
    
        // Button (already exists in the HTML)
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('contact_button');
        buttonElement.textContent = "Contactez-moi";
        buttonElement.onclick = function() {
            displayModal();
        };
        
    
        // Image of the photographer
        const img = createImageElement(picture, `Portrait de ${name}`, ['photograph-header-img']);
    
        // Append elements to headerDiv
        headerDiv.append(leftDiv, buttonElement, img);
    
        return headerDiv;
    }
    function mediaTemplate(mediaData, photographerId) {
        const { title, image, likes, price } = mediaData;
        const mediaPath = `../assets/images/media/${photographerId}/${image}`;
    
        const article = document.createElement('article');
        article.classList.add('media-article');
    
        const img = createImageElement(mediaPath, title, ['media-image']);
        const titleElement = createTextElement('h3', title, ['media-title']);
        const likesElement = createTextElement('p', `Likes: ${likes}`, ['media-likes']);
        const priceElement = createTextElement('p', `${price}€`, ['media-price']);
    
        article.appendChild(img);
        article.appendChild(titleElement);
        article.appendChild(likesElement);
        article.appendChild(priceElement);
    
        return article;
    }

    return { id, name, picture, getUserCardDOM, getPhotographerHeaderDOM, mediaTemplate };
}
