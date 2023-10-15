
// On fetch sur l'url
fetch("http://localhost:5678/api/works")
  // On transforme les data en Json
  .then((res) => res.json())
  // On peut utiliser les data
  .then((data) => {
    // regarder ce qu'on reçoit pour bien cibler l'objet
    buildHtml(data)
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
    



  fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((dataRecovery) => {
    // regarder ce qu'on reçoit pour bien cibler l'objet
    createEvenCategory(dataRecovery)
  })
 
  // Gestion d'erreur IMPORTANT
  .catch((error) => {
    // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
    return error;
    // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
  });

  function createEvenCategory(dataRecovery) {
    console.log(dataRecovery);
    const clickImg = document.querySelectorAll("img");
   
    clickImg.addEventLisner("click"), () => {
      console.log("hello");
    }
  }