
// On fetch sur l'url
fetch("http://localhost:5678/api/works")
  // On transforme les data en Json
  .then((res) => res.json())
  // On peut utiliser les data
  .then((data, dataFilter) => {
    // regarder ce qu'on reçoit pour bien cibler l'objet
    buildHtml(data)
    photos = document.querySelectorAll(".gallery img");
    // Ici je veux qu'un seul user, donc j'envoie [0] pour le 1er user 
  })
 
  // Gestion d'erreur IMPORTANT
  .catch((error) => {
    // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
    return error;
    // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
  });

 
  function buildHtml(data) {
    console.log(data);
    // Sélectionne les figures
    let myProjets = document.querySelector(".gallery");

    for (let i = 0; i < data.length; i++) {
        // Créez une figure
        let figure = document.createElement("figure");
        figure.classList.add("figureContainer")
        figure.setAttribute("data-cat",data[i].categoryId)
        myProjets.appendChild(figure);

        // Créez une image
        let picture = document.createElement("img");
        picture.src = data[i].imageUrl; 
        picture.alt = data[i].title;
        figure.appendChild(picture);

        // Créez une figcaption
        let imagesTexts = document.createElement("figcaption");
        imagesTexts.innerHTML = data[i].title;
        figure.appendChild(imagesTexts);
    }
  }
  
  
  function buildFilter(dataFilter) {
    let buttonContainer = document.querySelector(".btn-box");
  //  cette boucle permet de crée des boutons avec les bons noms de catégorie
    for (let i = 0; i < dataFilter.length; i++) {
      let button = document.createElement("button");
      button.classList.add("btn-sorting");
      button.textContent = dataFilter[i].name;
  // cet évènement permet de faire apparaitre et disparaitre les images ainsi que les figcaptions
      button.addEventListener("click", () => {
        let categoryId = dataFilter[i].id;
        console.log(categoryId);
        let figures = document.getElementsByClassName("figureContainer")
        const figureArray = Array.from(figures);
        console.log(figureArray);
        
        for (let j = 0; j < figureArray.length; j++) {
          
          if (categoryId == figureArray[j].dataset.cat ) {
            figureArray[j].style.display = "block";
        
          } 
          else {
            figureArray[j].style.display = "none";
          }
        }
      });
  
      buttonContainer.appendChild(button);
    }
  }


  fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((dataFilter) => {
    buildFilter(dataFilter)
  })
 
  // Gestion d'erreur IMPORTANT
  .catch((error) => {
    // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
    return error;
    // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
  });

  


