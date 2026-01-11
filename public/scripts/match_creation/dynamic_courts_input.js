// Kode for å automatisk endre min/max verdi på slideren for banevalg

// Henter inn hoved elementene
const court_slider = document.getElementById("court-amount-input");
const player_slider = document.getElementById("player-amount-input");

// Henter inn "Label" elementene, de viser bare brukeren min, max og hva verdien er
const court_slider_min = document.getElementById("court-slider-min")
const court_slider_max = document.getElementById("court-slider-max")
const court_slider_value = document.getElementById("court-slider-value")

// Henter inn elemente som trengs for å skru av og på slideren
const court_slider_container = document.querySelector(".court-amount-input-container .slider-container");
const court_replacement_text = document.getElementById("court-amount-replacement-text")

// Importerer "updateGradient()" funksjonen fra slider scripten
import { updateGradient } from "../utilities/slider.js";

// Oppdaterer sliderens min og max verdier når antall spillere endres
player_slider.addEventListener('input', () => {
    updateCourtSliderLimits();
});

// Funksjon for å oppdatere min og max verdier på bane-slideren, basert på antall spillere
function updateCourtSliderLimits() {
    const player_count = parseInt(player_slider.value, 10);
    let max_courts = Math.floor(player_count / 4);
    let min_courts = Math.ceil(player_count / 4) - 2;

    if (min_courts < 1) {
        min_courts = 1;
    }

    // Hvis minimum baner og maximum baner er det samme (aka du kan ikke flytte på slideren) så fjerner vi slideren. Eller skru den på
    if (min_courts === max_courts) {
        court_slider.value = max_courts;
        court_replacement_text.innerText = max_courts;

        disableCourtSlider();
    } else {
        // Setter de nye min og max verdiene på bane-slideren
        court_slider.min = min_courts;
        court_slider.max = max_courts;
        court_slider.value = max_courts;

        // Setter de nye verdiene til "labelsa" og
        court_slider_min.innerText = min_courts;    
        court_slider_max.innerText = max_courts;
        court_slider_value.innerText = max_courts;

        updateGradient(court_slider);
        enableCourtSlider();
    }
}

// Skrur av slideren via å gi "disabled" klassen, skrur på en annen verdi tekst for å vise hvor mange baner du må bruke
function disableCourtSlider() {
    court_slider_container.classList.add("disabled");
    court_replacement_text.classList.remove("disabled")
}

// Skrur på slideren via å fjerne "disabled" klassen, skrur også av verdi tekst igjen
function enableCourtSlider() {
    court_slider_container.classList.remove("disabled");
    court_replacement_text.classList.add("disabled")
}
