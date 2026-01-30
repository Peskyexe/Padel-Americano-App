// Henter inn host-bruker og kamp id
const params = new URLSearchParams(window.location.search);
const host_user_id = params.get('hostUserId');
const match_id = params.get('matchId');

console.log(host_user_id, match_id);
