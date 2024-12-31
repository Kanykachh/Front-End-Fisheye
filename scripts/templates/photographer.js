(function () {
  function createImageElement(src, alt, classes) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    if (classes) img.classList.add(...classes);
    return img;
  }

  function createVideoElement(src, classes) {
    const video = document.createElement("video");
    video.setAttribute("controls", "controls");
    video.setAttribute("src", src);

    if (classes) video.classList.add(...classes);
    return video;
  }

  function createTextElement(tag, textContent, classes) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (classes) element.classList.add(...classes);
    return element;
  }

  function createSpanElement(textContent, classes) {
    const span = document.createElement("span");
    span.textContent = textContent;
    if (classes) span.classList.add(...classes);
    return span;
  }

  function photographerTemplate(data) {
    const { id, name, city, country, tagline, price } = data;
    const formattedName = name.replace(/[\s-]+/g, "");
    const picture = `assets/images/photographersid/${formattedName}.jpg`;

    function getUserCardDOM() {
      const article = document.createElement("article");
      article.setAttribute("aria-label", `Photographe ${name} basé à ${city}`);

      const link = document.createElement("a");
      link.setAttribute("href", `photographer.html?id=${id}`);
      link.setAttribute("aria-label", `Voir le profil de ${name}`);
      link.classList.add("photographer-link");

      const img = createImageElement(picture, `Portrait de ${name}`);
      const h2 = createTextElement("h2", name);
      const location = createTextElement("p", `${city}, ${country}`, ["photographer-location"]);
      const taglineElement = createTextElement("p", tagline, ["photographer-tagline"]);
      const priceElement = createTextElement("p", `${price}€/jour`, ["photographer-price"]);

      link.append(img, h2, location, taglineElement, priceElement);
      article.appendChild(link);

      return article;
    }

    function getPhotographerHeaderDOM() {
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("header-div");

      const leftDiv = document.createElement("div");
      leftDiv.classList.add("photograph-header-left");
      const nameElement = createTextElement("h1", name, ["photograph-header-h1"]);
      const locationElement = createTextElement("p", `${city}, ${country}`, ["photograph-header-location"]);
      const taglineElement = createTextElement("p", tagline, ["photograph-header-tagline"]);
      leftDiv.append(nameElement, locationElement, taglineElement);

      const buttonElement = document.createElement("button");
      buttonElement.classList.add("contact_button");
      buttonElement.textContent = "Contactez-moi";

      const img = createImageElement(picture, `Portrait de ${name}`, ["photograph-header-img"]);
      headerDiv.append(leftDiv, buttonElement, img);

      return headerDiv;
    }

    return { getUserCardDOM, getPhotographerHeaderDOM };
  }

 

  // Rendre les fonctions accessibles si nécessaire
  window.photographerTemplate = photographerTemplate;
  window.createImageElement = createImageElement;
  window.createVideoElement = createVideoElement;

  
})();
