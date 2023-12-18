// Gestion de l'envoi du formulaire de connexion
document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    // Ajoutez ici la logique de validation ou l'envoi des données au serveur
    console.log('Email:', email, 'Password:', password)
  })

// Chargement des catégories après le chargement complet du DOM
document.addEventListener('DOMContentLoaded', () => {
  loadCategories()
})
