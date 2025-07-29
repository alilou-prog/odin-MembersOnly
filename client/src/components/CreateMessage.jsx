import Form from "../lib/Form"

export default function CreateMessage({ set_dialog_open }) {
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
        }
        else {
            console.error("Failed to create message")
        }
        set_dialog_open(false)
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