// Kode for å automatisk lage flere input-felt for spillerinnskriving

const playerAmountInput = document.getElementById('player-amount-input');
const playerInputsContainer = document.querySelector('.player-inputs');
const playerInputFields = playerInputsContainer.querySelectorAll('input[type="text"]');

const minFields = 4;
const maxFields = 24;

// Sett minimum og maksimum antall spillere til slideren
playerAmountInput.min = minFields;
playerAmountInput.max = maxFields;

playerAmountInput.addEventListener('input', () => {
    const playerCount = parseInt(playerAmountInput.value, 10);
    updatePlayerInputFields(playerCount);
});

function updatePlayerInputFields(playerCount) {
    const currentFields = playerInputsContainer.children.length;
    const difference = playerCount - currentFields;

    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.id = `player-${currentFields + i + 1}-input`;
            newInput.name = `player-${currentFields + i + 1}`;
            newInput.placeholder = `Player ${currentFields + i + 1}`;
            playerInputsContainer.appendChild(newInput);
        }
    } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
            playerInputsContainer.removeChild(playerInputsContainer.lastChild);
        }
    }
}