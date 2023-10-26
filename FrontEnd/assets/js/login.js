
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
                console.log(data);
                if (data.message !=  null) {
                    alert("Authentification échouée. Veuillez vérifier vos informations.");
                    return
                }
                alert("Authentification réussie !");
                localStorage.setItem("Token", data.token);
                console.log(data.token);
            })
            // Gestion d'erreur IMPORTANT
            .catch((error) => {
                // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
                return error;
                // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
            })

            
            
           
        
            
       

        //mnt comment récuperer le token et le vérifier !! Cela reste un mystère ??
        });

