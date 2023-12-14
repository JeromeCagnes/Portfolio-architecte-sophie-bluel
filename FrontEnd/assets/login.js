const bearerAuth = window.localStorage.getItem('BearerAuth')

document
  .querySelector('form')
  .addEventListener('submit', async function (event) {
    //supprimer éventuel message d'erreur précédent
    event.preventDefault()
    const previousError = document.querySelector('.error')
    if (previousError) {
      previousError.remove()
    }
    //creation objet données formulaire
    const loginFormDatas = {
      email: event.target.querySelector('[name=email]').value,
      password: event.target.querySelector('[name=password]').value,
    }
    //création de la charge utlise au format JSON
    const chargeUtile = JSON.stringify(loginFormDatas)
    // envoi des données du formulaire au serveur
    await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: chargeUtile,
    })
      //récupération de la réponse
      .then((r) => {
        if (r.ok === true) {
          return r.json()
        } else if (r.status === 404) {
          throw new Error("Votre email n'existe pas dans la base de données")
        } else if (r.status === 401) {
          throw new Error(
            'Votre mot de passe est invalide. Veuillez le vérifier'
          )
        }
      })
      .then((body) => {
        //stockage de la réponse dans localStorage.
        //Je me demande si session storage ne serait pas mieux
        window.localStorage.setItem('BearerAuth', JSON.stringify(body))
        // redirection vers l'index
        window.location.replace('./index.html')
      })
      .catch((e) => {
        // gestion des erreur et affichage des messages
        const error = document.createElement('div')
        error.classList.add('error')
        error.innerHTML = e.message
        document.querySelector('form').prepend(error)
      })
  })
//  API endpoint
const url = 'http://localhost:5678/api/users/login'

// Données utilisateur
const userData = {
  email: 'sophie.bluel@test.tld',
  password: 'S0phie',
}

// Requete POST
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data) // Condition success
  })
  .catch((error) => {
    console.error('Error:', error) // Condition error
  })
