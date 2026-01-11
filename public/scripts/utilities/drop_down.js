// Kode for custom dropdown menyer

const error_text_element = document.getElementById("error-text");

// Initializerer en dropdown meny
function initializeDropdown(wrapper) {
    const button = wrapper.querySelector('.dropdown-button');
    const icon = button.querySelector('i');
    const menu = wrapper.querySelector('.dropdown-menu');
    const items = wrapper.querySelectorAll('.dropdown-item');
    const selected_item = wrapper.querySelector('.dropdown-selected-item');

    // Legger til event listener på dropdown knappen, som åpner/lukker menyen når du trykker på den
    button.addEventListener('click', (event) => {
        // Uten stopPropagation vil klikket også bli fanget opp av vinduets event listener, som lukker menyen med en gang
        event.stopPropagation();
        toggleMenu(menu, icon);

        if (button.classList.contains("form-error")) {
            menu.classList.add("form-error")
            items.forEach(item => {
                item.classList.add("form-error")
            });
        }
    });

    // Legger til event listeners på hvert menyvalg, som oppdaterer det valgte elementet når et valg blir trykket på
    items.forEach(item => item.addEventListener('click', (event) => {
        // Trenger ikke nødvendigvis stopPropagation, men for sikkerhets skyld
        event.stopPropagation();

        // Endrer teksten til "placeholderen" til det valgte elementet
        selected_item.innerText = event.target.innerText;

        // Fjerner aktiv klassen fra det forrige valget 
        items.forEach(i => i.classList.remove('dropdown-active'));

        // Legger til aktiv klassen på det nye valget
        event.target.classList.add('dropdown-active');
        closeMenu(menu, icon);

        // Fjerner error klassene til alle meny elementene når noe blir valgt
        if (button.classList.contains("form-error")) {
            error_text_element.innerText = ""
            button.classList.remove("form-error")
            menu.classList.remove("form-error")
            items.forEach(item => {
                item.classList.remove("form-error")
            });
        }
    }));
}

// Lukker/Åpner dropdown menyen ved bruk av CSS klassen, endrer også ikonet
function toggleMenu(menu, icon) {
    menu.classList.toggle('dropdown-open');
    icon.classList.toggle('fa-caret-down');
    icon.classList.toggle('fa-caret-up');
}

// Lukker dropdown menyen ved bruk av CSS klassen, endrer også ikonet
function closeMenu(menu, icon) {
    menu.classList.remove('dropdown-open');
    icon.classList.remove('fa-caret-down');
    icon.classList.add('fa-caret-up');
}

// Initializer alle dropdown menyer på siden
const dropdowns = document.querySelectorAll('.dropdown-wrapper');
dropdowns.forEach((dropdown) => {
    console.log("Initializing dropdown for: ", dropdown);
    initializeDropdown(dropdown);
});

// Legger til event listener på vinduet, som lukker alle menyer hvis du klikker utenfor dem
window.addEventListener('click', () => {
    dropdowns.forEach(wrapper => {
        const menu = wrapper.querySelector('.dropdown-menu');
        const icon = wrapper.querySelector('.dropdown-button i');
        closeMenu(menu, icon);
    });
});