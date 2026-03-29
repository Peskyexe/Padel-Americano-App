// Kode for å automatisk endre min/max verdi på slideren for banevalg

// Henter inn hoved elementene
const courtSlider = document.getElementById("court-amount-input");
const playerSlider = document.getElementById("player-amount-input");

// Henter inn "Label" elementene, de viser bare brukeren min, max og hva verdien er
const courtSliderMin = document.getElementById("court-slider-min")
const courtSliderMax = document.getElementById("court-slider-max")
const courtSliderValue = document.getElementById("court-slider-value")

// Henter inn elemente som trengs for å skru av og på slideren
const courtSliderContainer = document.querySelector(".court-amount-input-container .slider-container");
const courtReplacementText = document.getElementById("court-amount-replacement-text")

// Importerer "updateGradient()" funksjonen fra slider scripten
import { updateGradient } from "../utilities/slider.js";

// Oppdaterer sliderens min og max verdier når antall spillere endres
playerSlider.addEventListener('input', () => {
    updateCourtSliderLimits();
});

// Funksjon for å oppdatere min og max verdier på bane-slideren, basert på antall spillere
function updateCourtSliderLimits() {
    const playerCount = parseInt(playerSlider.value, 10);
    let maxCourts = Math.floor(playerCount / 4);
    let minCourts = Math.ceil(playerCount / 4) - 2;

    if (minCourts < 1) {
        minCourts = 1;
    }

    // Hvis minimum baner og maximum baner er det samme (aka du kan ikke flytte på slideren) så fjerner vi slideren. Eller skru den på
    if (minCourts === maxCourts) {
        courtSlider.value = maxCourts;
        courtReplacementText.innerText = maxCourts;

        disableCourtSlider();
    } else {
        // Setter de nye min og max verdiene på bane-slideren
        courtSlider.min = minCourts;
        courtSlider.max = maxCourts;
        courtSlider.value = maxCourts;

        // Setter de nye verdiene til "labelsa" og
        courtSliderMin.innerText = minCourts;    
        courtSliderMax.innerText = maxCourts;
        courtSliderValue.innerText = maxCourts;

        updateGradient(courtSlider);
        enableCourtSlider();
    }
}

// Skrur av slideren via å gi "disabled" klassen, skrur på en annen verdi tekst for å vise hvor mange baner du må bruke
function disableCourtSlider() {
    courtSliderContainer.classList.add("disabled");
    courtReplacementText.classList.remove("disabled")
}

// Skrur på slideren via å fjerne "disabled" klassen, skrur også av verdi tekst igjen
function enableCourtSlider() {
    courtSliderContainer.classList.remove("disabled");
    courtReplacementText.classList.add("disabled")
}
