// Dynamisk oppdatering av kampens display name basert på dato og antall kamper i dag

import { date_data, storageKey } from './match_creation.js';

const display_name_input = document.getElementById("match-display-name-input");
const total_matches_today = parseInt(localStorage.getItem(storageKey), 10) || 0;

// Endrer placeholder teksten til input feltet for kampens display name
display_name_input.placeholder = `untitled_match_${date_data.dateString}_${total_matches_today}`;
