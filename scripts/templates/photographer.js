function photographerTemplate(data) {
   
    const { id, name, city, country, tagline, price } = data;
    const formattedName = name.replace(/[\s-]+/g, ''); // Supprime tous les espaces
    const picture = `../assets/images/photographersid/${formattedName}.jpg`; 

   
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("aria-label", `Photographe ${name} basé à ${city}`); // Accèsibilité description des articles
    
        // Créer un lien pour la page du photographe
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`); // Lien vers la page détaillée
        link.setAttribute('aria-label', `Voir le profil de ${name}`); 
        link.classList.add('photographer-link'); 
    
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
    
        const h2 = document.createElement('h2');
        h2.textContent = name;
    
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');
    
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('photographer-tagline');
    
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        priceElement.classList.add('photographer-price');
    
        // Ajoute tous les éléments à la balise <a>
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(location);
        link.appendChild(taglineElement);
        link.appendChild(priceElement);
    
        
        article.appendChild(link);
    
        return article;
    }
    

    return { id, name, picture, getUserCardDOM };
}
