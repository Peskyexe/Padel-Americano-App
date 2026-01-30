// Henter inn host-bruker og kamp id
const params = new URLSearchParams(window.location.search);
const host_user_id = params.get('hostUserId');
const match_id = params.get('matchId');

const match_creation_data = fetch(`/api/matches/creation/${host_user_id}/${match_id}`);
