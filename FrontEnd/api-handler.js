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
function displayCategories(categories) {
  // Selection du container
  const container = document.getElementById('buttonContainer')
  const btn = document.createElement('button')
  btn.className = 'filterButton'
  btn.id = 0
  btn.textContent = 'Tous'
  container.appendChild(btn)
  // Creation des boutons dans le container
  categories.forEach((category) => {
    const btn = document.createElement('button')
    btn.className = 'filterButton'
    btn.id = category.id
    btn.textContent = category.name
    container.appendChild(btn)
  })
}
document.addEventListener('DOMContentLoaded', () => {
  // Autres appels de fonctions au chargement de la page
})
async function loadWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const works = await response.json()
    displayWorks(works)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

function displayWorks(works) {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = '' // Effacer le contenu existant

  works.forEach((work) => {
    const workElement = document.createElement('figure')
    workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `
    gallery.appendChild(workElement)
  })
}

document.addEventListener('DOMContentLoaded', loadWorks)
