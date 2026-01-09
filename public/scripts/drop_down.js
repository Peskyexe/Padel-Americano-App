// Kode for en custom dropdown meny

const button = document.querySelector('.dropdown-button');
const icon = button.querySelector('i');
const menu = document.querySelector('.dropdown-menu');
const items = document.querySelectorAll('.dropdown-item');
const selected_item = document.getElementById('dropdown-selected-item');

// Legger til event listener på dropdown knappen, som åpner/lukker menyen når du trykker på den
button.addEventListener('click', (event) => {
    // Uten stopPropagation vil klikket også bli fanget opp av vinduets event listener, som lukker menyen med en gang
    event.stopPropagation();
    toggleMenu();
});

// Legger til event listener på vinduet, som lukker menyen hvis du klikker utenfor den
window.addEventListener('click', closeMenu);

// Legger til event listeners på hvert menyvalg, som oppdaterer det valgte elementet når et valg blir trykket på
items.forEach(item => item.addEventListener('click', itemClickHandler));

// Lukker/Åpner dropdown menyen ved bruk av CSS klassen, endrer også ikonet
function toggleMenu() {
    menu.classList.toggle('dropdown-open');
    icon.classList.toggle('fa-caret-down');
    icon.classList.toggle('fa-caret-up');
}

// Lukker dropdown menyen ved bruk av CSS klassen, endrer også ikonet
function closeMenu() {
    menu.classList.remove('dropdown-open');
    icon.classList.remove('fa-caret-down');
    icon.classList.add('fa-caret-up');
}

// Håndterer klikk på et menyvalg
function itemClickHandler(event) {
    // Trenger ikke nødvendigvis stopPropagtion, men for sikkerhets skyld
    event.stopPropagation();

    // Endrer teksten til "placeholderen" til det valgte elementet
    selected_item.innerText = event.target.innerText;

    // Fjerner aktiv klassen fra det forrige valget
    items.forEach(item => item.classList.remove('dropdown-active'));

    // Legger til aktiv klassen på det nye valget
    event.target.classList.add('dropdown-active');
    closeMenu();
}