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
  // Selection du container
  const container = document.getElementById('buttonContainer')
  const btn = document.createElement('button')
  btn.className = 'filterButton'
  btn.id = 0
  btn.textContent = 'tous'
  container.appendChild(btn)
  // Creation des boutons dans le container
  categories.forEach((button) => {
    const btn = document.createElement('button')
    btn.className = 'filterButton'
    btn.id = button.id
    btn.textContent = button.name
    container.appendChild(btn)
  })
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
  }
}

// Écouteur d'événement pour le chargement du DOM
document.addEventListener('DOMContentLoaded', initializeApp)

//MODALE
// Obtenir la modale
var modal = document.getElementById('myModal')

// Obtenir le bouton qui ouvre la modale
var btn = document.getElementById('editWorksBtn')

// Obtenir l'élément <span> qui ferme la modale
var span = document.getElementsByClassName('close')[0]

// Lorsque l'utilisateur clique sur le bouton, ouvrez la modale
btn.onclick = function () {
  modal.style.display = 'block'
}

// Lorsque l'utilisateur clique sur <span> (x), fermez la modale
span.onclick = function () {
  modal.style.display = 'none'
}

// Lorsque l'utilisateur clique n'importe où en dehors de la modale, fermez-la
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
