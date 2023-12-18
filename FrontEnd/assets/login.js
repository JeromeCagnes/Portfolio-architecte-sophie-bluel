// Ajout d'un écouteur d'événements sur le formulaire pour gérer la soumission
document
  .querySelector('form')
  .addEventListener('submit', async function (event) {
    // Empêche le comportement de soumission par défaut du formulaire
    event.preventDefault()

    // Suppression d'un précédent message d'erreur s'il existe
    const previousError = document.querySelector('.error')
    if (previousError) {
      previousError.remove()
    }

    // Récupération des données saisies dans le formulaire
    const loginFormDatas = {
      email: event.target.querySelector('[name=email]').value,
      password: event.target.querySelector('[name=password]').value,
    }

    // Conversion des données du formulaire en format JSON
    const chargeUtile = JSON.stringify(loginFormDatas)

    // Envoi des données du formulaire au serveur via une requête POST
    await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: chargeUtile,
    })
      .then((r) => {
        // Traitement des différentes réponses du serveur
        if (r.ok) {
          // Si la réponse est positive, conversion de la réponse en JSON
          return r.json()
        } else if (r.status === 404) {
          // Gestion d'une erreur 404 (email non trouvé)
          throw new Error("Votre email n'existe pas dans la base de données")
        } else if (r.status === 401) {
          // Gestion d'une erreur 401 (mot de passe invalide)
          throw new Error(
            'Votre mot de passe est invalide. Veuillez le vérifier'
          )
        }
      })
      .then((body) => {
        // Stockage des données de réponse (token) dans localStorage
        window.localStorage.setItem('BearerAuth', JSON.stringify(body))
        // Redirection de l'utilisateur vers la page d'accueil après connexion
        window.location.replace('./index.html')
      })
      .catch((e) => {
        // Affichage d'un message d'erreur en cas d'échec de la requête
        const error = document.createElement('div')
        error.classList.add('error')
        error.innerHTML = e.message
        document.querySelector('form').prepend(error)
      })
  })
