function getData(url) {
  // return permet de retourner le résultat vers la ligne 7
  return (
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
        
      })
      // Gestion d'erreur IMPORTANT
      .catch((error) => {
        // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
        return error;
        // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
      })
  );
}


function buildHtml(data) {
  // console.log(data);
  // Sélectionne les figures
  let myProjets = document.querySelector(".gallery");

  for (let i = 0; i < data.length; i++) {
      // Créez une figure
      let figure = document.createElement("figure");
      figure.classList.add("figureContainer")
      figure.setAttribute("data-cat",data[i].categoryId)
      figure.setAttribute("data-id",data[i].id)
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
 // Vérifiez si l'utilisateur est authentifié en fonction de la présence du token
 const token = localStorage.getItem("Token");

// Si un token est présent, l'utilisateur est connecté sinon
  if (!token) {
// L'utilisateur n'est pas connecté, créez les boutons de filtre

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
        // boucle qui récupère le tableau des figures
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
}

function buildButton(button) {
  let btnTous = document.querySelector(".all");
    // console.log(btnTous);
  const token = localStorage.getItem("Token");

  if (token) {
    // L'utilisateur est connecté, masquez le bouton
    btnTous.style.display = "none";
  } 
    else {
        btnTous.addEventListener("click", () => {
          let figuresAll = document.querySelectorAll("figure");
          // console.log(figuresAll);
          for (let a = 0; a < figuresAll.length; a++) {
            figuresAll[a].style.display = "block";
          }
        });
    }
}

// Modal ajout et supp
async function BuildImgModal(data){
  let modalImage = document.querySelector(".galleryPhoto")
  console.log(modalImage);
 for (let a = 0; a < data.length; a++) {

      // créé une figure pour la modal

  let figureModal = document.createElement("figure");
      figureModal.classList.add("figureContent")
      modalImage.appendChild(figureModal);

     // création des images

      let images = document.createElement("img");
      images.src = data[a].imageUrl; 
      images.alt = data[a].title;
      figureModal.appendChild(images);
      
      let buttonTrash = document.createElement("button")
      buttonTrash.classList.add("trash");
      figureModal.appendChild(buttonTrash);

      let trash = document.createElement("i")
      trash.classList.add("fa-solid")
      trash.classList.add("fa-trash")
      buttonTrash.appendChild(trash);


      buttonTrash.addEventListener("click", (e) => {
        // console.log("vous avez cliqué");
        e.preventDefault();
       // Supprimez la figure correspondante dans buildHtml
       const figureToDelete = document.querySelector(`.figureContainer[data-cat="${data[a].categoryId}"]`);
       //figureToDelete.remove();

      // Supprimez la figure de la galerie modal
        
      deleteData(`http://localhost:5678/api/works/${data[a].id}`).then((result) => {
        console.log(result);
        if (result) {
          figureToDelete.remove();
          figureModal.remove();
        }
      });
     
      });

      
 }
}
 
function buildModal(data) {
  // création de la modal et du bouton ajouter une photo
  let modal = document.querySelector(".modal")
      let buttonAddPic = document.createElement("button")
      buttonAddPic.classList.add("btn-sorting");
      buttonAddPic.setAttribute("id","addPicture")
      buttonAddPic.innerHTML = "Ajouter une photo";
      modal.appendChild(buttonAddPic);

      
  // let modalPic = document.querySelector(".modal-2")
  // buttonAddPic.addEventListener("click", (e) => {
  //        e.preventDefault();
  //         document.querySelector(".firstModal").style.display = "none"
  //         // document.querySelector(".modal-2").style.display = "block";
            
  //        })
}
// function buidAddPicture(data) {
  
  // console.log(modalPic);

  // let firstModal = document.querySelector(".firstModal")

  //     buttonAddPic.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       // document.querySelector(".firstModal").style.display = "none"
  //       document.getElementById("modFormulaire").style.display = "block";
          
  //     })

  //     let closeButton = document.querySelector(".close-btn");
  //     console.log(closeButton); 
  //       closeButton.addEventListener("click", () => {
  //         firstModal.style.display = "block"; // Affiche à nouveau le modal lors de la fermeture
  //     });
// }
// pour utiliser await, on doit le mettre dans une fonction (et non pas en top level, en racine de page)
async function startPage() {
  works = await getData("http://localhost:5678/api/works");
  category = await getData("http://localhost:5678/api/categories");
  buildFilter(category);
  buildHtml(works);
  buildButton(works) 
  BuildImgModal(works);
  // buidAddPicture(works)
  buildModal(works)
  // Puis continuer avec l'apel vers la fonction qui crée les boutons de filtre
  // Etc...
}  
startPage();

// Modal open-close {
  const modalContainer = document.querySelector(".modalContainer")
  // console.log(modalContainer);
  const modalTriggers = document.querySelectorAll(".modal-trigger")
  // console.log(modalTriggers);
 
  modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

  function toggleModal() {
    modalContainer.classList.toggle ("active")
  }
// }


// permet de faire disparaitre le bouton token en présence/absence du token
 if (localStorage.getItem("Token") == null){
   document.getElementById("token").style.display = "none"
 }


function deleteData(url) {
  
  return (
    fetch(url,
      {
        method: 'DELETE',
        headers: { 
          'Content-type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("Token")}`,
            
        },
      }) 
      .then((res) => res)
      .then((data) => {
        console.log(data);
        if (data.status != 204) {
          return false
        }
        return true
        // return data;
       
      })
      // Gestion d'erreur IMPORTANT
      .catch((error) => {
        console.log(error);
        // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
        return error;
        // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
      })
  );
}
 
// login log out 

const loginLink = document.getElementById("login-link")
  // console.log(loginLink);
  let localStorageData = localStorage.getItem("Token")
  // console.log(localStorageData);
      if (localStorageData) {
        // Si l'utilisateur est connecté, changez le texte du lien en "Logout"  
        loginLink.textContent = "Logout";
        loginLink.href = "#";  
        // l'événement de déconnexion
        loginLink.addEventListener("click", () => {
          // permet de supprimer le token
          localStorage.removeItem("Token");
          // redirection vers la page login
          window.location.href = "./assets/login.html";
        });
      } 
// login log out end   


 