// Dynamisk oppdatering av kampens display name basert på dato og antall kamper i dag

import { date_data_object, storageKey } from './match_creation.js';

const display_name_input = document.getElementById("match-display-name-input");
const total_matches_today = parseInt(localStorage.getItem(storageKey), 10) || 0;

// Endrer placeholder teksten til input feltet for kampens display name
display_name_input.placeholder = `untitled_match_${date_data_object.date_string}_${total_matches_today}`;
