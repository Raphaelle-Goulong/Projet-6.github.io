
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
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify 
                    ({
                    "email": email,
                    "password": password
                    })
                })
            .then((res) => res.json())
            .then((data) => {
                const messageElement = document.getElementById("message");
                console.log(data);
                if (data.message !=  null ) {
                    messageElement.textContent = "Authentification échouée. Veuillez vérifier vos informations.";
                    return
                }
                
                // messageElement.textContent = "Authentification réussie !";
                localStorage.setItem("Token", data.token);
                // console.log(data.token);
                window.location.href ="/FrontEnd/index.html"
            })
            // Gestion d'erreur IMPORTANT
            .catch((error) => {
                // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
                const messageElement = document.getElementById("message");
                messageElement.textContent = "Une erreur s'est produite : " + error.message;
                return error;
                // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
            })
        });

        
