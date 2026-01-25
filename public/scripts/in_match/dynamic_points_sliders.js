// Henter in containerene til de 2 sliderene
const team_1_slider_container = document.getElementById("team-1-score-container");
const team_2_slider_container = document.getElementById("team-2-score-container");

const points_to_play = 11;

// Importerer "updateGradient()" funksjonen fra slider scripten
import { updateGradient } from "../utilities/slider.js";

initializeSlider(team_1_slider_container, team_2_slider_container, points_to_play);
initializeSlider(team_2_slider_container, team_1_slider_container, points_to_play);

function initializeSlider(slider_container, other_slider_container, points_to_play) {
    const slider_element = slider_container.querySelector("input");

    slider_element.addEventListener('input', () => {
        let new_point_limit = calculateLimitedPoints(slider_element.value, points_to_play);
        updateSliderValue(other_slider_container, new_point_limit);
    });
}

// Funksjon for å kalkulere hvor mange poeng det er mulig for det andre lage å ha, basert på hvor mange poeng ditt lag har
function calculateLimitedPoints(slider_value, points_to_play) {
    let other_point_limit = points_to_play - slider_value;
    return other_point_limit;
}

// Funksjon for å oppdaterere verdiene til slideren
function updateSliderValue(slider_container, new_limit) {
    // Henter inn elementene vi skal oppdatere 
    let slider_element = slider_container.querySelector("input");
    let value_element = slider_container.querySelector(".slider-value");

    // Oppdaterer elementene med den nye max verdien
    slider_element.value = new_limit;
    value_element.innerText = new_limit;

    // Oppdaterer bakgrunns gradienten till slideren
    updateGradient(slider_element);
}