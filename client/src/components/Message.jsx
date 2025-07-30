import CrudElement from "../lib/CrudElement"

export default function Message({ message, set_fetch_signal }) {
    const content = (
        <div className="content">
            <h2>{message.title}</h2>
            <p>{message.text}</p>
            <p>{message.user_id}</p>
        </div>
    )

    const update_form = {
        inputs: [
            {
                name: "title",
                type: "text",
                placeholder: message.title,
            },
            {
                name: "text",
                type: "text",
                placeholder: message.text,
            }
        ],
    }

    const elem = {
        id: message.id,
        content,
        update_url: `/api/messages/${message.id}`,
        delete_url: `/api/messages/${message.id}`,
        set_fetch_signal,
        update_form,
    }

    return (
        <li>
            <CrudElement elem={elem} />
        </li>
    )
}