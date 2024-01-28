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
    link.href = item.detailUrl || '#'

    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    img.style.width = '200px'

    link.appendChild(img)
    imagesContainer.appendChild(link)
  })
}
/*----------------------------------------*/

// Fonction pour afficher les miniatures dans la fenêtre modale
function displayThumbnailsInModal(works) {
  // Sélection du conteneur de la modale
  const modalGallery = document.querySelector('.modal-gallery')

  // Vérifier si le conteneur existe
  if (!modalGallery) {
    console.error('Modal gallery container not found')
    return
  }

  // Effacer le contenu précédent
  modalGallery.innerHTML = ''

  // Parcourir chaque élément de travail et créer une miniature
  works.forEach((workItem) => {
    // Elément 'div' pour contenir l'image et l'icône de suppression
    const thumbnailContainer = document.createElement('div')
    thumbnailContainer.classList.add('thumbnail-container')

    // Elément 'a' pour chaque image
    const thumbnailLink = document.createElement('a')
    thumbnailLink.href = workItem.detailUrl || '#'

    // Création de l'élément 'img' pour la miniature
    const thumbnailImage = document.createElement('img')
    thumbnailImage.src = workItem.imageUrl
    thumbnailImage.alt = workItem.title
    thumbnailImage.style.width = '77.36px'
    thumbnailImage.style.height = '108.364px'
    thumbnailImage.classList.add('thumbnail-image')

    // Ajouter l'image au lien
    thumbnailLink.appendChild(thumbnailImage)
    // Création de l'icône de suppression
    const deleteIcon = document.createElement('span')
    deleteIcon.innerHTML = '&#128465;' // Icône de poubelle
    deleteIcon.classList.add('delete-icon')
    deleteIcon.onclick = function () {
      // Fonction pour supprimer l'élément de travail
      works.splice(index, 1) // Supprime l'élément de l'array
      displayThumbnailsInModal(works) // Met à jour la galerie
    }
    // Ajouter le lien à la galerie modale
    modalGallery.appendChild(thumbnailLink)

    // Ajouter l'icône de suppression au conteneur de la miniature
    thumbnailContainer.appendChild(deleteIcon)

    // Ajouter le lien de l'image au conteneur de la miniature
    thumbnailContainer.appendChild(thumbnailLink)

    // Ajouter le conteneur de la miniature à la galerie modale
    modalGallery.appendChild(thumbnailContainer)
  })
}

// Appel de la fonction pour afficher les miniatures dans la fenêtre modale
fetchData().then((works) => {
  if (works) {
    displayThumbnailsInModal(works)
  }
})

/*--------------*/

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
