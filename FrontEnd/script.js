// Definition des boutons et identification
const buttons = [
  { label: 'Tous', id: 'noFilter' },
  { label: 'Objets', id: 'Objets' },
  { label: 'Hotels & restaurants', id: 'HotelsRestaurants' },
  { label: 'Appartements', id: 'Appartements' },
]

// Selection du container
const container = document.getElementById('buttonContainer')

// Creation des boutons dans le container
buttons.forEach((button) => {
  const btn = document.createElement('button')
  btn.className = 'filterButton'
  btn.id = button.id
  btn.textContent = button.label
  container.appendChild(btn)
})
document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    // Ajoutez ici la logique de validation ou l'envoi des données au serveur
    console.log('Email:', email, 'Password:', password)
  })
