const errorTextElement = document.getElementById("error-text");
const formContainer = document.querySelector(".match-creation-container");


const algorithm = document.querySelector("#team-algorithm-input .dropdown-selected-item");
const points = document.querySelector("#points-to-play-input .dropdown-selected-item");

function validateForm() {
    const players = document.querySelectorAll(".player-inputs input");

    let errors = getErrors(players, algorithm, points);
    let isError = false;

    // Hvis det er noen feil i formen så endrer vi teksten til error tekst elemente til errorene, vi setter også "isError" til True
    if (errors.length > 0) {
        errorTextElement.innerText = errors.join(". ");
        isError = true;
    }

    // Hvis det ikke er noe feil melding i teksten, endre padding til hoved container-en. (Fikser et spacing problem hvor "gap" spacing var der selvom teksten var borte, endrer padding for å countere det)
    if (errorTextElement.innerText.trim() === "") {
        formContainer.style.padding = "2em 2.5em 0 2.5em";
    } else {
        formContainer.style.padding = "2em 2.5em"
    }

    return isError;
}

// Sjekker om brukeren har skrevet inn eller valgt alt som er nødvendig, å legger alle feilene in i en array
function getErrors(players, algorithm, points) {
    let errors = [];
    
    checkPlayerInputs(errors, players);
    checkAlgorithmInput(errors, algorithm);
    checkPointsInput(errors, points);

    return errors;
}

// Sjekker om minst en av player elementene i "players" objektet er tomt, å pusher en error om det er det.
function checkPlayerInputs(errorArray, playerInputs) {
    let errorAmount = 0;

    // Sjekker etter feil å sender elementene med feiler til feil håndtering funksjonen
    for (const inputField of playerInputs) {
        if (inputField.value.trim() === "") {
            errorAmount += 1;
            errorHandler(errorArray, inputField);
            inputField.addEventListener('input', () => {
                inputField.classList.remove("form-error")
                errorTextElement.innerText = ''
            });
        }
    }
    // Sender error melding til error listen, meldingen er basert på antall feil
    if (errorAmount > 1) {
        errorArray.push("One or more player names are unfilled");
    }

}

// Sjekker om en algoritme er valgt, å pusher en error om det ikke er det.
function checkAlgorithmInput(errorArray, algorithmInput) {
    if (algorithmInput.innerText === "Algorithm") {
        errorHandler(errorArray, algorithmInput.parentElement, "Selecting an algorithm is required")
    }
}

// Sjekker om antall poeng brukern skal spille er valgt, å pusher en error om det ikke er det.
function checkPointsInput(errorArray, pointsInput) {
    if (pointsInput.innerText === "Best of") {
        errorHandler(errorArray, pointsInput.parentElement, "Selecting number of points to play is required")
    }
}

// Liten funksjon for å håndtere feil
function errorHandler(errorArray, element, errorText = "") {
    // Sjekker hvis det er en error tekst, hvis det er det så blir den pushet til error listen
    if (errorText) {
        errorArray.push(errorText);
    }
    element.classList.add("form-error");
}

export { validateForm };