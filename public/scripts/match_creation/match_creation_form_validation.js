// Script for å sjekke om alle nødvendige inputs/innstillinger er fylt ut.

const error_text_element = document.getElementById("error-text");
const form_container = document.querySelector(".match-creation-container");

function validateForm(players, algorithm, points) {
    // Sjekker etter feil i formen med getErrors() funksjonen, å legger feilene in i en array
    let errors = getErrors(players, algorithm, points);
    let is_error = false;

    // Hvis det er noen feil i formen så endrer vi teksten til error tekst elemente til errorene, vi setter også "is_error" til True
    if (errors.length > 0) {
        error_text_element.innerText = errors.join(". ");
        is_error = true;
    }

    // Hvis det ikke er noe feil melding i teksten, endre padding til hoved container-en. (Fikser et spacing problem hvor "gap" spacing var der selvom teksten var borte, endrer padding for å countere det)
    if (error_text_element.innerText.trim() === "") {
        form_container.style.padding = "2em 2.5em 0 2.5em";
    } else {
        form_container.style.padding = "2em 2.5em"
    }

    return is_error;
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
function checkPlayerInputs(error_array, player_inputs) {
    let error_amount = 0;

    // Sjekker etter feil å sender elementene med feiler til feil håndtering funksjonen
    for (const input_field of player_inputs) {
        if (input_field.value.trim() === "") {
            error_amount += 1;
            errorHandler(error_array, input_field);
            input_field.addEventListener('input', () => {
                input_field.classList.remove("form-error")
                error_text_element.innerText = ''
            });
        }
    }
    // Sender error melding til error listen, meldingen er basert på antall feil
    if (error_amount > 1) {
        error_array.push("One or more player names are unfilled");
    }

}

// Sjekker om en algoritme er valgt, å pusher en error om det ikke er det.
function checkAlgorithmInput(error_array, algorithm_input) {
    if (algorithm_input.innerText === "Algorithm") {
        errorHandler(error_array, algorithm_input.parentElement, "Selecting an algorithm is required")
    }
}

// Sjekker om antall poeng brukern skal spille er valgt, å pusher en error om det ikke er det.
function checkPointsInput(error_array, points_input) {
    if (points_input.innerText === "Best of") {
        errorHandler(error_array, points_input.parentElement, "Selecting number of points to play is required")
    }
}

// Liten funksjon for å håndtere feil
function errorHandler(error_array, element, error_text = "") {
    // Sjekker hvis det er en error tekst, hvis det er det så blir den pushet til error listen
    if (error_text) {
        error_array.push(error_text);
    }
    element.classList.add("form-error");
}

export { validateForm };