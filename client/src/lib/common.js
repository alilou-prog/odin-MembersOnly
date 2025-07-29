async function fetch_messages() {
    const res = await fetch('/api/messages');
    if (!res.ok) {
        console.error("App: Failed to fetch messages");
        return;
    }
    return await res.json();
}

export {fetch_messages}