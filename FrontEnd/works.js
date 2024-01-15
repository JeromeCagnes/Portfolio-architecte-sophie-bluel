// Récupération des travaux depuis le localStorage ou via une requête API
let works = JSON.parse(window.localStorage.getItem('works'))
if (works === null) {
  works = await getWorks()
}

// Récupération des catégories depuis le localStorage ou via une requête API
let categories = JSON.parse(window.localStorage.getItem('categories'))
if (categories === null) {
  categories = await getCategories()
}

// Traitement pour les utilisateurs connectés
const bearerAuth = JSON.parse(window.localStorage.getItem('bearerAuth'))
if (bearerAuth && bearerAuth.token) {
  // Création de la barre d'administration
  const adminBar = document.createElement('div')
  adminBar.classList.add('admin-bar')
  adminBar.innerHTML = `
    <div class="admin-container">
      <div class="modify-container">
        <img src="./assets/icons/modify.png" alt="modifier" id="modify">
        Mode édition
      </div>
      <button class="publish">Publier les changements</button>
    </div>`
  document.querySelector('body').prepend(adminBar)

  // Modification du lien de connexion en déconnexion
  const loginLi = document.querySelector('.login')
  loginLi.innerHTML = `<a href="#">logout</a>`
  loginLi.classList.replace('login', 'logout')

  // Création des boutons de modification
  displayModifyContainers('#introduction figure', '#modal1', 'append')
  displayModifyContainers('article', '#modal2', 'prepend')
  displayModifyContainers('#portfolio', '#modal3-1', 'prepend')

  // Ajout de marge en tête
  document.querySelector('header').style.margin = '100px 0 50px 0'

  // Masquage des filtres
  document.querySelector('.filters-container').style.display = 'none'
}

// Gestion de la déconnexion
const logout = document.querySelector('.logout')
if (logout) {
  logout.addEventListener('click', function () {
    window.localStorage.removeItem('bearerAuth')
    document.querySelector('.admin-bar').remove()

    // Remplacement du lien de déconnexion par connexion
    const logoutLi = document.querySelector('.logout')
    logoutLi.innerHTML = `<a href="/login.html">login</a>`
    logoutLi.classList.replace('logout', 'login')

    // Suppression des conteneurs de modification
    document
      .querySelectorAll('.modify-container')
      .forEach((element) => element.remove())

    // Réaffichage des filtres
    document.querySelector('.filters-container').style.display = 'flex'
  })
}

// Initialisation de la galerie
document.querySelector('.gallery').innerHTML = ''
displayWorks(works)
displayThumbnails(works)
displayCategories(categories)

// Traitement des boutons de filtre
const buttonAll = document.getElementById('all')
buttonAll.addEventListener('click', function () {
  document.querySelector('.gallery').innerHTML = ''
  activate('all')
  displayWorks(works)
})

// Traitement des boutons de catégories spécifiques
categories.forEach((category) => {
  const categoryName = category.name.replaceAll(' ', '-').toLowerCase()
  const buttonName = document.getElementById(categoryName)
  buttonName.addEventListener('click', function () {
    const worksFiltered = works.filter(
      (work) => work.category.id === category.id
    )
    document.querySelector('.gallery').innerHTML = ''
    activate(categoryName)
    displayWorks(worksFiltered)
  })
})
