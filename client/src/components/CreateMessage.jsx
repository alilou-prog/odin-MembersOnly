import Form from "../lib/Form"

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
    ]
}

export default function CreateMessage() {

    return (
        <Form form={form} />
    )
}