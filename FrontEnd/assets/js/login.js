// fetch("http://localhost:5678/api/users/login", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: chargeUtile
// });
   
    
document.addEventListener("DOMContentLoaded", function () {
    // je récupère les élément que je vais devoir récupérer les valeurs
    const loginForm = document.querySelector("form");
    // console.log(loginForm);
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const connectionButton = document.getElementById("connection");

    loginForm.addEventListener("submit", function (e) {
        // e preventDefault empeche le comportement par défaut
        e.preventDefault();
        //  ce qui permet de vérifier les valeurs taper par l'utilisateur
        const email = emailInput.value;
        // console.log(email);
        const password = passwordInput.value;

        // condition qui permet de vérifier le mail + le mot de passe
        if (email === "sophie.bluel@test.tld" && password === "S0phie") {
            alert("Authentification réussie !");
           
        } else {
            alert("Authentification échouée. Veuillez vérifier vos informations.");
        }

        //mnt comment récuperer le token et le vérifier !! Cela reste un mystère ??
    });
});
// }