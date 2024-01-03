// Variables pour la gestion de la fenêtre modale
let modal = null
let focusables = []
let previouslyFocusedElement = null
let previousContent = document.querySelector('.upload-container').innerHTML
let imageInput = document.getElementById('file')

/**
 * Ouverture de la fenêtre modale.
 * @param {MouseEvent | string} eventOrString - Événement de clic ou sélecteur CSS sous forme de chaîne de caractères.
 */
function openModal(eventOrString) {
  // Si eventOrString est une chaîne, on l'utilise comme sélecteur pour trouver la modale.
  if (typeof eventOrString === 'string') {
    modal = document.querySelector(eventOrString)
  } else {
    // Sinon, on empêche le comportement par défaut et on utilise l'attribut href de la cible de l'événement pour trouver la modale.
    eventOrString.preventDefault()
    modal = document.querySelector(eventOrString.target.getAttribute('href'))
    previouslyFocusedElement = document.querySelector(':focus')
  }

  focusables = Array.from(
    modal.querySelectorAll('button, a, input, textarea, select')
  )
  modal.style.display = 'block' // Assurez-vous que la modale est visible.
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal)
  modal.querySelector('.modal-close').addEventListener('click', closeModal)
  modal
    .querySelector('.modal-stop')
    .addEventListener('click', (e) => e.stopPropagation())
}

/**
 * Fermeture de la fenêtre modale.
 * @param {MouseEvent | string} eventOrString - Événement de clic ou sélecteur CSS sous forme de chaîne de caractères.
 */
function closeModal(eventOrString) {
  if (modal === null) return

  if (typeof eventOrString === 'string') {
    modal = document.querySelector(eventOrString)
  } else {
    eventOrString.preventDefault()
  }

  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.modal-close').removeEventListener('click', closeModal)
  modal
    .querySelector('.modal-stop')
    .removeEventListener('click', (e) => e.stopPropagation())
  modal = null
}

/**
 * Gestion du focus à l'intérieur de la modale.
 * @param {KeyboardEvent} e - Événement clavier.
 */
function focusInModal(e) {
  e.preventDefault()
  let index = focusables.findIndex((f) => f === modal.querySelector(':focus'))

  if (e.shiftKey) {
    index--
  } else {
    index++
  }

  if (index >= focusables.length) {
    index = 0
  }
  if (index < 0) {
    index = focusables.length - 1
  }
  focusables[index].focus()
}

/**
 * Réinitialise le champ de saisie de fichier en affichant le contenu précédent.
 */
function displayImageInput() {
  document.querySelector('.upload-container').innerHTML = previousContent
  imageInput = document.getElementById('file')
  imageInput.addEventListener('change', displayPreview)
}

/**
 * Affiche un aperçu de l'image sélectionnée et masque les composants de téléchargement.
 */
function displayPreview() {
  const preview = document.querySelector('.upload-container img')
  preview.src = URL.createObjectURL(imageInput.files[0])
  preview.classList.add('preview')

  const upCont = document.querySelector('.upload-container')
  upCont.querySelector('p').hidden = true
  upCont.querySelector('label').style.display = 'none'
  upCont.querySelector('img').addEventListener('click', displayImageInput)
}
