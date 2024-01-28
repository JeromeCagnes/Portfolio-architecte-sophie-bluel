async function getCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const categories = await response.json()
    window.localStorage.setItem('categories', JSON.stringify(categories))
    return categories
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

// Fonctions pour manipuler le DOM
function displayWorks(works) {
  const container = document.getElementById('gallery')
  works.forEach((workItem) => {
    const fig = document.createElement('figure')
    // Ajoutez ici la logique pour remplir et afficher chaque élément de travail
    container.appendChild(fig)
    console.log(workItem)
  })
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5678/api/works')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const works = await response.json()
    window.localStorage.setItem('works', JSON.stringify(works))
    return works
  } catch (error) {
    console.error('Fetch error:', error)
  }
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
// Fonction pour afficher les images
function displayImages(data) {
  const imagesContainer = document.getElementById('gallery')

  data.forEach((item) => {
    const link = document.createElement('a')
    link.href = item.detailUrl || '#' // Remplacer par l'URL de détail appropriée

    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    img.style.width = '200px'

    link.appendChild(img)
    imagesContainer.appendChild(link)
  })
}
// Fonction pour afficher les images
function displayImages(data) {
  const imagesContainer = document.getElementById('gallery')

  data.forEach((item) => {
    const link = document.createElement('a')
    link.href = item.detailUrl || '#'

    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    img.style.width = '200px'

    link.appendChild(img)

    // Créer un élément pour le titre
    const title = document.createElement('p')
    title.textContent = item.title
    title.style.textAlign = 'center'

    imagesContainer.appendChild(link)
  })
}

// Fonction pour charger les images dans la modale
function loadImagesToModal(data) {
  const modalImagesContainer = document.getElementById('myModal') // Assurez-vous que cet ID correspond à un élément dans votre modale
  modalImagesContainer.innerHTML = '' // Nettoie les anciennes images avant de charger les nouvelles

  data.forEach((item) => {
    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    img.style.width = '100px' // Taille des miniatures
    modalImagesContainer.appendChild(img)
  })
}

// Gestion des modales
function setupModalHandlers() {
  var modal = document.getElementById('myModal')
  var btn = document.getElementById('editWorksBtn')
  var span = document.getElementsByClassName('close')[0]

  if (btn) {
    btn.onclick = function () {
      modal.style.display = 'block'
      // Supposons que 'data' est votre tableau d'images
      loadImagesToModal(data) // Appelle la fonction pour charger les images dans la modale
    }
  }

  if (span) {
    span.onclick = function () {
      modal.style.display = 'none'
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}
/*
function displayModifyContainers(selector, href, method) {
  // Logique pour afficher les conteneurs de modification...
}

function activate(element) {
  // Logique pour activer/désactiver les filtres...
}
*/
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
// Fonction pour récupérer les données de l'API
function fetchImages() {
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {
      displayImages(data)
    })
    .catch((error) =>
      console.error('Erreur lors de la récupération des images:', error)
    )
}

// Fonction pour afficher les images
function displayImages(data) {
  const imagesContainer = document.getElementById('gallery')

  data.forEach((item) => {
    // Créer une balise a pour chaque lien
    const link = document.createElement('gallery')
    // Définir le href de la balise a, par exemple vers une page de détail ou un autre lien
    link.href = '"http://localhost:5678/images/abajour-tahina1651286843956.png' // Remplacez 'VotreURLIci' par l'URL souhaitée

    // Créer une balise img pour chaque image
    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    //img.style.width = '313px'

    // Ajouter l'image à la balise a
    link.appendChild(img)

    // Ajouter le lien au conteneur
    imagesContainer.appendChild(link)
  })
}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', fetchImages)

// Écouteur d'événement pour le chargement du DOM
document.addEventListener('DOMContentLoaded', initializeApp)
// Call fetchData when you need to load the works
fetchData()

function displayThumbnails(works) {
  // Logique pour afficher les miniatures...
}

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

addPhotoBtn.onclick = function () {
  addPhotoModal.style.display = 'block'
}

// Lorsque l'utilisateur clique sur <span> (x), fermez la modale
span.onclick = function () {
  addPhotoModal.style.display = 'none'
}

// Lorsque l'utilisateur clique n'importe où en dehors de la modale, fermez-la
window.onclick = function (event) {
  if (event.target == addPhotoModal) {
    addPhotoModal.style.display = 'none'
  }
}
