// Déclarations des fonctions asynchrones pour interagir avec l'API
async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const works = await response.json()
  window.localStorage.setItem('works', JSON.stringify(works))
  return works
}

async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const categories = await response.json()
  window.localStorage.setItem('categories', JSON.stringify(categories))
  return categories
}

// Fonctions pour manipuler le DOM
function displayWorks(works) {
  // Logique pour afficher les travaux dans la galerie...
}

function displayThumbnails(works) {
  // Logique pour afficher les miniatures...
}

function displayCategories(categories) {
  // Logique pour afficher les catégories...
}

function displayModifyContainers(selector, href, method) {
  // Logique pour afficher les conteneurs de modification...
}

function activate(element) {
  // Logique pour activer/désactiver les filtres...
}

// Fonction pour initialiser l'application
async function initializeApp() {
  // Récupération et affichage des travaux
  let works =
    JSON.parse(window.localStorage.getItem('works')) || (await getWorks())
  displayWorks(works)
  displayThumbnails(works)

  // Récupération et affichage des catégories
  let categories =
    JSON.parse(window.localStorage.getItem('categories')) ||
    (await getCategories())
  displayCategories(categories)

  // Logique pour les utilisateurs connectés
  const bearerAuth = JSON.parse(window.localStorage.getItem('bearerAuth'))
  if (bearerAuth && bearerAuth.token) {
    // Code pour créer la barre d'administration et gérer la déconnexion...
  }

  // Logique supplémentaire si nécessaire...
}

// Écouteur d'événement pour le chargement du DOM
document.addEventListener('DOMContentLoaded', initializeApp)

// Gestion de l'envoi du formulaire de connexion
document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log('Email:', email, 'Password:', password)
    // Ajouter la logique d'envoi au serveur
  })
