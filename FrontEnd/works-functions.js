/**
 * get works from db, save them in localStorage and return works
 * @returns {JSONobject}
 */
async function getWorks() {
  const response = await fetch(
    'http://localhost:5678/api-docs/#/default/get_works'
  )
  return await response.JSON()
}
getWorks()

//* Get categories request
async function loadCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const categories = await response.json()
    displayCategories(categories)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

/**
 * Affichage des projets dans galerie
 * @param {JSONobject} works
 */
function displayWorks(works) {
  // getting works place
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  //Loop for works
  for (let i = 0; i < works.length; i++) {
    const work = works[i]
    // galleryItem element creation
    const galleryItem = document.createElement('figure')
    const img = document.createElement('img')
    galleryItem.innerHTML = `<img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="same-origin">
                            <figcaption>${works[i].title}</figcaption>`
    gallery.appendChild(galleryItem)
  }
}

/**
 * Displaying works thumbnails in modal3-1 window
 * @param {JSONobject} works
 */
function displayThumbnails(works) {
  // getting gallery
  const gallery = document.querySelector('.thumbnail-gallery-container')
  gallery.innerHTML = ''
  //Looping in works
  for (let i = 0; i < works.length; i++) {
    const work = works[i]
    // Creating galleryItem
    const galleryItem = document.createElement('figure')
    galleryItem.classList.add('modal-stop')
    const img = document.createElement('img')
    galleryItem.innerHTML = `<img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="same-origin">
        <a href="#" id="enlarge" class="enlarge" title="Agrandir">
            <img src="assets/icons/enlarge.svg">
        </a>
        <a href="#" deleteId="${works[i].id}" class="trashbin" title="Supprimer ce projet">
            <img src="assets/icons/trashbin.svg">
        </a>
        <figcaption>Éditer</figcaption>`
    gallery.appendChild(galleryItem)
    // adds event on trashbin click
    const trash = galleryItem.querySelector('.trashbin')
    const id = trash.getAttribute('deleteId')
    trash.addEventListener('click', function (e) {
      e.preventDefault()
      deleteEntry(id)
    })
    // displaying enlarge on mouseOver
    const figureImg = galleryItem.querySelector('img')
    const enlarge = galleryItem.querySelector('.enlarge')
    // adds event on enlarge button click
    enlarge.addEventListener('click', (e) => {
      enlargePicture(e)
    })
  }
}

/**
 * Displaying categories filters and modal3-2 window select options
 * @param {JSON} categories
 */
function displayCategories(categories) {
  const filtersContainer = document.querySelector('.filters-container')
  const all = `<button id="all" class="filter-button active">Tous</button>`
  filtersContainer.innerHTML = all
  const categorySelect = document.getElementById('category-input')
  for (let category of categories) {
    let idName = category.name.replaceAll(' ', '-').toLowerCase()
    const button = `<button id="${idName}" class="filter-button">${category.name}</button>`
    filtersContainer.innerHTML += button
    categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`
  }
}

/**
 * Displays modify container
 * @param {string} selector
 * @param {string} href
 * @param {string} method
 */
function displayModifyContainers(selector, href, method) {
  const modifyContainer = document.createElement('div')
  modifyContainer.classList.add('modify-container')
  modifyContainer.innerHTML = `<a href="${href}" class="modal" title="Modifier cet élément">
                                    <img src="./assets/icons/modify.png" alt="modifier" id="modify">
                                    Modifier
                                </a>`
  if (method === 'prepend') {
    document.querySelector(selector).prepend(modifyContainer)
  } else {
    document.querySelector(selector).append(modifyContainer)
  }
}

/**
 * Activate/unactivate filters
 * @param {string} element
 */
function activate(element) {
  document
    .querySelector('.filters-container .active')
    .classList.remove('active')
  document.getElementById(element).classList.add('active')
}

//variables for enlarge/unlarge
let previousThumbnailGallery = {}
let thumbnailGallery = {}
let elements = {}
let currentImg = {}
let link = {}

/**
 * enlarge thumbnail picture
 * @param {clickEvent} e
 */
function enlargePicture(e) {
  //previousThumbnailGallery = document.querySelector("#thumbnail-gallery").innerHTML;
  thumbnailGallery = document.querySelector('#thumbnail-gallery')
  elements = thumbnailGallery.querySelectorAll('h2, div, form')
  elements.forEach((e) => {
    e.setAttribute('style', 'display: none;')
  })
  currentImg = e.target.parentNode.previousElementSibling.cloneNode()
  currentImg.classList.add('gallery-preview')
  link = document.createElement('a')
  link.setAttribute('href', '#')
  link.classList.add('figure-a')
  link.appendChild(currentImg)
  link.addEventListener('click', (e) => {
    unlargePicture(e)
  })
  thumbnailGallery.setAttribute('style', 'padding: 0 10px;')
  thumbnailGallery.prepend(link)
  focusables = Array.from(modal.querySelectorAll(focusableSelector))
  focusables[0].focus()
}

/**
 * Display previous thumbnail gallery
 * @param {clickEvent} e
 */
async function unlargePicture(e) {
  link.removeEventListener('click', (e) => {
    unlargePicture(e)
  })
  thumbnailGallery.removeAttribute('style')
  thumbnailGallery.removeChild(thumbnailGallery.querySelector('.figure-a'))
  elements.forEach((e) => {
    e.removeAttribute('style')
  })
  // closing all features
  link = {}
  currentImg = {}
}

/**
 * Delete entry from db
 * @param {int} id
 */
async function deleteEntry(id) {
  const bearerAuth = JSON.parse(window.localStorage.getItem('bearerAuth'))
  console.log(id)
  await fetch('http://localhost:5678/api/works/' + id, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: 'Bearer ' + bearerAuth.token,
    },
  })
    .then((r) => {
      if (r.ok) {
        getWorks()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .catch((e) => console.log(e))
}
function displayThumbnails(works) {
  const gallery = document.querySelector('.thumbnail-gallery-container')
  if (gallery) {
    gallery.innerHTML = ''
    // Votre logique pour remplir gallery...
  } else {
    console.error("L'élément .thumbnail-gallery-container est introuvable.")
  }
}
