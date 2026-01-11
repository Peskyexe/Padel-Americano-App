// Kode for å automatisk endre min/max verdi på slideren for banevalg

// Henter inn hoved elementene
const court_amount_input = document.getElementById("court-amount-input");
const player_amount_input = document.getElementById("player-amount-input");

// "Label" elementene, de viser bare brukeren min, max og hva verdien er
const court_slider_min = document.getElementById("court-slider-min")
const court_slider_max = document.getElementById("court-slider-max")
const court_slider_value = document.getElementById("court-slider-value")

// Oppdaterer sliderens min og max verdier når antall spillere endres
player_amount_input.addEventListener('input', () => {
    updateCourtSliderLimits();
});

// Funksjon for å oppdatere min og max verdier på bane-slideren, basert på antall spillere
function updateCourtSliderLimits() {
    const player_count = parseInt(player_amount_input.value, 10);
    let max_courts = Math.floor(player_count / 4);
    let min_courts = Math.ceil(player_count / 4) - 1;

    if (min_courts < 1) {
        min_courts = 1;
    }

    // Setter de nye min og max verdiene på bane-slideren
    court_amount_input.min = min_courts;
    court_amount_input.max = max_courts;
    court_amount_input.value = max_courts;

    // Setter de nye verdiene til "labelsa" og
    court_slider_min.innerText = min_courts;    
    court_slider_max.innerText = max_courts;
    court_slider_value.innerText = max_courts;
}

