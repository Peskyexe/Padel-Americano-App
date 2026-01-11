// Kode for å automatisk lage flere input-felt for spillerinnskriving

const player_amount_input = document.getElementById('player-amount-input');
const player_inputs_container = document.querySelector('.player-inputs');
const player_input_fields = player_inputs_container.querySelectorAll('input[type="text"]');

const min_fields = 4;
const max_fields = 24;

// Sett minimum og maksimum antall spillere til slideren
player_amount_input.min = min_fields;
player_amount_input.max = max_fields;

player_amount_input.addEventListener('input', () => {
    const player_count = parseInt(player_amount_input.value, 10);
    updatePlayerInputFields(player_count);
});

function updatePlayerInputFields(player_count) {
    const current_fields = player_inputs_container.children.length;
    const difference = player_count - current_fields;

    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            const new_input = document.createElement('input');
            new_input.type = 'text';
            new_input.id = `player-${current_fields + i + 1}-input`;
            new_input.name = `player-${current_fields + i + 1}`;
            new_input.placeholder = `Player ${current_fields + i + 1}`;
            player_inputs_container.appendChild(new_input);
        }
    } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
            player_inputs_container.removeChild(player_inputs_container.lastChild);
        }
    }
}