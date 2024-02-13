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
    // Créer une balise img pour chaque image
    const img = document.createElement('img')
    img.src = workItem.imageUrl
    img.alt = workItem.title
    fig.appendChild(img)
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
    const deleteIcon = document.createElement('i')
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>' // Icône de poubelle
    deleteIcon.setAttribute('aria-hidden', 'true')
    deleteIcon.classList.add('fa-trash-can', 'delete-icon')
    deleteIcon.onclick = function () {
      // Récupérer le token d'authentification du localStorage
      const bearerAuth = JSON.parse(window.localStorage.getItem('BearerAuth'))
      const token = bearerAuth ? bearerAuth.token : null

      // Vérifier si le token existe
      if (token) {
        // Appel de l'API pour supprimer un élément
        fetch(`http://localhost:5678/api/works/${workItem.id}`, {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log('Élément supprimé avec succès.')
              const parentElement = deleteIcon.parentElement
              if (parentElement) {
                parentElement.remove()
              }
            } else {
              console.error('Erreur lors de la suppression de l’élément.')
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la connexion à l’API:', error)
          })
      } else {
        console.error("Token d'authentification non trouvé ou invalide.")
      }
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
      /*    afficher les images*/
    })
    .catch((error) =>
      console.error('Erreur lors de la récupération des images:', error)
    )
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

// MODALE
// Obtenir la modale
var modal = document.getElementById('myModal')

// Obtenir le bouton qui ouvre la modale
var btn = document.getElementById('editWorksBtn')

// Obtenir l'élément <span> qui ferme la modale
var span = document.getElementsByClassName('close')[0]

// Lorsque l'utilisateur clique sur le bouton, ouvrir la modale
btn.onclick = function () {
  var modal2 = document.getElementById('modal2')
  modal2.style.display = 'none'
  var modal1 = document.getElementById('modal1')
  modal1.style.display = 'flex'
  modal.style.display = 'block'
}

// Lorsque l'utilisateur clique sur <span> (x), fermer la modale
span.onclick = function () {
  modal.style.display = 'none'
}

// Lorsque l'utilisateur clique n'importe où en dehors de la modale, la fermer
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

//FORMULAIRE D'AJOUT

function uploadImages(event) {
  event.preventDefault()

  var formData = new FormData(document.getElementById('modalEditWorkForm'))

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Échec de l'envoi des données")
    })
    .then((data) => {
      console.log('Succès:', data)
    })
    .catch((error) => {
      console.error("Erreur lors de l'upload des images:", error)
    })
}
// Sélectionner le formulaire
var form = document.getElementById('modalEditWorkForm')

//  Ecouteur d'événement sur le formulaire d'ajout
form.addEventListener('submit', uploadImages)
var addPhotoLabel = document.getElementById('newImage')

addPhotoLabel.addEventListener('click', function () {})
var addPhotoBtn = document.getElementById('addPhotoBtn')
addPhotoBtn.addEventListener('click', function () {
  var elementArendreVisible = document.getElementById('modal2')
  if (elementArendreVisible) {
    elementArendreVisible.style.display = 'flex'
    var modal1 = document.getElementById('modal1')
    modal1.style.display = 'none'
  }
})
