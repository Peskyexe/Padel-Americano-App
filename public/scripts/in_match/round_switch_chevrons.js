import { matchState } from "./controller.js";
import { goToRound } from "./core/rounds.js";

const previous_round = document.getElementById("previous-round-chevron");
const next_round = document.getElementById("next-round-chevron")

var previous_active = false;
var next_active = false;

previous_round.addEventListener("click", (event) => {
    if (previous_active) {
        goToRound(matchState.activeRoundIndex - 1);
        // console.log(`(Chevron)\nTotal: ${matchState.totalRounds}\nActive: ${matchState.activeRoundIndex}`);
    }
})

next_round.addEventListener("click", (event) => {
    if (next_active) {
        goToRound(matchState.activeRoundIndex + 1);
        // console.log(`(Chevron)\nTotal: ${matchState.totalRounds}\nActive: ${matchState.activeRoundIndex}`);
    }
})


function updateChevronStates() {
    // console.log(`(Status update)\nTotal: ${matchState.totalRounds}\nActive: ${matchState.activeRoundIndex}`);

    if (matchState.totalRounds == 0) {
        previous_round.classList.add("chevron-icon-inactive");
        next_round.classList.add("chevron-icon-inactive");
        previous_active = false;
        next_active = false;
    }
    else if (matchState.totalRounds > 0) {
        previous_round.classList.remove("chevron-icon-inactive");
        next_round.classList.remove("chevron-icon-inactive");
        previous_active = true;
        next_active = true;

        if (matchState.activeRoundIndex == 0) {
            previous_round.classList.add("chevron-icon-inactive");
            previous_active = false;
        }

        if (matchState.activeRoundIndex == matchState.totalRounds) {
            next_round.classList.add("chevron-icon-inactive");
            next_active = true;
        }
    }
}
export { updateChevronStates };
