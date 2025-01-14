(function () {
    const { createImageElement, createTextElement, createVideoElement, createSpanElement } = window;
    function mediaFactory(mediaData, index, photographerMediaArray) {
      if (!mediaData || typeof index === "undefined") {
        console.error("mediaData ou index invalide dans mediaFactory :", mediaData, index);
        return;
      }
      const { title, likes, photographerId, image, video } = mediaData;
      const mediaPath = `assets/images/media/${photographerId}/${image || video}`;
      const isImage = !!image;
  
     
      function getMediaDOM() {
        const article = document.createElement("article");
        article.classList.add("media-article");
        article.setAttribute("data-index", index);
        article.setAttribute("tabindex", "0");
        article.setAttribute("aria-label", `Média intitulé "${title}"`);
  
        const mediaElement = isImage
          ? createImageElement(mediaPath, title, ["media-image"])
          : createVideoElement(mediaPath, ["media-video"]);
  
        const titleElement = createTextElement("h3", title, ["media-title"]);
        const likesElement = createTextElement("p", `${likes}`, ["media-likes"]);
        likesElement.setAttribute("aria-live", "polite");
  
        const heartIcon = createSpanElement("♥", ["heart-icon"]);
        heartIcon.setAttribute("role", "button");
        heartIcon.setAttribute("aria-label", `Ajouter un like à ${title}`);
        heartIcon.setAttribute("tabindex", "0");
  
        let liked = false;
  
        heartIcon.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!liked) {
            liked = true;
            mediaData.likes += 1;
            likesElement.textContent = mediaData.likes;
            heartIcon.setAttribute("aria-label", `Vous avez ajouté un like à "${title}"`);
            window.localUpdateTotalLikes();
          }
        });
  
        heartIcon.addEventListener("keydown", (event) => {
          if ((event.key === "Enter" || event.key === " ") && !liked) {
            event.preventDefault();
            liked = true;
            mediaData.likes += 1;
            likesElement.textContent = mediaData.likes;
            heartIcon.setAttribute("aria-label", `Vous avez ajouté un like à "${title}"`);
            window.localUpdateTotalLikes();
          }
        });
  
        // Gérer l'activation au clavier
        article.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            console.log("Événement clavier détecté. Index :", index);
            console.log("photographerMediaArray dans media.js :", photographerMediaArray);
        
            if (photographerMediaArray && photographerMediaArray.length > 0) {
              displayLightBox(index, photographerMediaArray);
            } else {
              console.error("photographerMediaArray est vide ou non défini.");
            }
          }
        });
        
  
        const mediaInfo = document.createElement("div");
        mediaInfo.classList.add("media-info");
        mediaInfo.append(titleElement, likesElement, heartIcon);
  
        article.append(mediaElement, mediaInfo);
        return article;
      }
  
      return { getMediaDOM };
    }
  
    window.mediaFactory = mediaFactory;
  })();
  