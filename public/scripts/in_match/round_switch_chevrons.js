import { totalRounds, activeRound, goToRound } from "./in_match.js";

const previous_round = document.getElementById("previous-round-chevron");
const next_round = document.getElementById("next-round-chevron")

var previous_active = false;
var next_active = false;

previous_round.addEventListener("click", (event) => {
    if (previous_active) {
        goToRound(activeRound - 1);
    }
})

next_round.addEventListener("click", (event) => {
    if (next_active) {
        goToRound(activeRound + 1);
    }
})


function updateChevronStates() {
    if (totalRounds == 1) {
        previous_round.classList.add("chevron-icon-inactive");
        next_round.classList.add("chevron-icon-inactive");
        previous_active = false;
        next_active = false;
    }
    else if (totalRounds > 1) {
        previous_round.classList.remove("chevron-icon-inactive");
        next_round.classList.remove("chevron-icon-inactive");
        previous_active = true;
        next_active = true;

        if (activeRound == 1) {
            previous_round.classList.add("chevron-icon-inactive");
            previous_active = false;
        }

        if (activeRound == totalRounds) {
            next_round.classList.add("chevron-icon-inactive");
            next_active = true;
        }
    }
}
export { updateChevronStates };
