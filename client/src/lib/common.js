async function fetch_messages() {
    const res = await fetch('/api/messages');
    if (!res.ok) {
        console.error("App: Failed to fetch messages");
        return;
    }
    return await res.json();
}

async function check_already_auth() {
    const response = await fetch('/api/users/check-auth');

    const json = await response.json();
    if (json.is_auth) {
        return {is_auth: true, json};
    }
    else {
        return {is_auth: false, json: null};        
    }
}

export { fetch_messages, check_already_auth }