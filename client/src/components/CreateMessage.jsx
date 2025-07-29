import Form from "../lib/Form"

export default function CreateMessage({ close_dialog, set_fetch_signal }) {
    async function create_message(e) {
        e.preventDefault()
        const form_data = new FormData(e.currentTarget);
        const res = await fetch("/api/messages", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(Object.fromEntries(form_data.entries()))
        })
        if (res.ok) {
            console.log("Message created succeffully")
            set_fetch_signal(true)
        }
        else {
            console.error("Failed to create message")
        }
        close_dialog()
    }

    const form = {
        title: "Create Message",
        inputs: [
            {
                label: "Title",
                name: "title",
                type: "text"
            },
            {
                label: "Text",
                name: "text",
                type: "text",
            }
        ],
        on_submit: create_message
    }

    return (
        <Form form={form} />
    )
}