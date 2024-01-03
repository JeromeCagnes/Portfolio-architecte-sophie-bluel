let modal = null
const openModal = function (e) {
  e.preventDefault() // Empêche le comportement par défaut
  const target = document.querySelector(e.target.getAttribute('href')) // Obtient l'attribut href de l'élément cliqué
  target.style.dysplay = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click' closeModal)
}
const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.dysplay = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventlistener('click' closeModal)
  modal = null
}
document.querySelectorAll('.js-modal').forEach((a) => {
  a.addEventListener('click', openModal)
})
