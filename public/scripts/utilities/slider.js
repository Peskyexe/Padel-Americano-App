// Kode for å gi mine sliders litt mere funskjonalitet, fungerer med flere sliders

// Henter inn alle sliderene på nettsiden, og initializer dem
const sliders = document.querySelectorAll(".slider-container");
sliders.forEach((slider) => {
    console.log("Initializing slider for: ", slider);
    initializeSlider(slider);
});

// Funksjon for å initialize slidere.
function initializeSlider(slider_container) {
    // Henter inn alle elementene som trengs
    const slider_element = slider_container.querySelector(".slider");
    const slider_value_element = slider_container.querySelector(".slider-value");
    const range_min_element = slider_container.querySelector(".slider-min");
    const range_max_element = slider_container.querySelector(".slider-max");

    // Setter verdiene til riktig verdig når siden først loadaer
    slider_value_element.innerText = slider_element.value;
    range_min_element.innerText = slider_element.min;
    range_max_element.innerText = slider_element.max;

    // Gir selve slideren en EventListener til å oppdatere verdiene og bakgrunns fargen når den endres
    slider_element.addEventListener('input', () => {
        slider_value_element.innerText = slider_element.value;
        updateGradient(slider_element);
    });
}

// Oppdaterer bakgrunns fargen til slideren basert på verdien
function updateGradient(slider_element, gradient_primary = "var(--primary)", gradient_secondary = "var(--border)") {
    // Regner ut hvem prosent av max verdien selve verdien er
    let slider_value_percentage = (slider_element.value - slider_element.min) / (slider_element.max - slider_element.min) * 100;

    // Lager en nye gradient som matcher verdien, sånn at alt til venstre for slider tommelen blir en annen farge
    let gradient = `linear-gradient(90deg, ${gradient_primary} ${slider_value_percentage}%, ${gradient_secondary} ${slider_value_percentage}%)`
    slider_element.style.background = gradient;
}

// Eksporterer funskjonen, den trengs av public/scripts/match_creation/dynamic_court_slider.js til å oppdatere bakgrunnen dens når verdiene blir automatisk endret
export { updateGradient };