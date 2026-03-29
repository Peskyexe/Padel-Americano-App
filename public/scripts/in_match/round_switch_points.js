import { updateGradient } from "../utilities/slider.js";

const matchContainers = document.querySelectorAll(".match-container");
const errorText = document.getElementById("error-text");


// Hjelpe funksjon
function getTeamSliders(match, team) {
    return {
        slider: match.querySelector(`#team-${team}-score-input`),
        container: match.querySelector(`#team-${team}-score-container`),
        replacement: match.querySelector(`#team-${team}-replacement-label`)
    };
}


// Sjekker om alle lagene sine poeng har blitt satt
function validatePoints() {
    let isError = false;
    matchContainers.forEach(match => {
        const slidersContainer = match.querySelector(".scores-container");
        const team1Slider = match.querySelector("#team-1-score-input");
        const team2Slider = match.querySelector("#team-2-score-input");

        if (team1Slider.value == 0 && team2Slider.value == 0) {
            errorText.innerText = "Setting scored points is required.";
            errorText.style.display = "block";
            isError = true;

            slidersContainer.classList.add("incorrect");

            // Clear error on any slider input
            const clearError = () => {
                slidersContainer.classList.remove("incorrect");
                errorText.innerText = "";
                errorText.style.display = "none";
            };

            team1Slider.addEventListener("input", clearError, { once: true });
            team2Slider.addEventListener("input", clearError, { once: true });
        }
    });

    return isError;
}


// Funksjon som bytter ut slideren med en label som heller viser hvor mange poeng som ble skoret for den runden
function hideSliders(courtObject, courtIndex) {
    const match = document.getElementById(`court-${courtIndex}`);

    [1, 2].forEach(team => {
        const { container, replacement } = getTeamSliders(match, team);
        container.style.display = "none";
        replacement.style.display = "block";
        replacement.innerText = courtObject[`team${team}points`];
    });
}


// Motsatte av 'hideSliders'
function showSliders() {
    matchContainers.forEach(match => {
        match.querySelectorAll(".team-score-input").forEach(pointsContainer => {
            const slider = pointsContainer.querySelector("input");
            const value = pointsContainer.querySelector(".slider-value");
            const sliderContainer = pointsContainer.querySelector(".slider-container");
            const replacementText = pointsContainer.querySelector(".slider-replacement");

            slider.value = 0;
            value.innerText = 0;
            updateGradient(slider);

            replacementText.style.display = "none";
            sliderContainer.style.display = "flex";
        });
    });
}


export { validatePoints, hideSliders, showSliders };