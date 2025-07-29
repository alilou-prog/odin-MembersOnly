import CrudElement from "../lib/CrudElement"

export default function Message({ message, set_fetch_signal }) {
    const content = (
        <>
            <h2>{message.title}</h2>
            <p>{message.text}</p>
            <p>{message.user_id}</p>
        </>
    )
    const elem = {
        content,
        delete_url: `/api/messages/${message.id}`,
        set_fetch_signal
    }

    return (
        <li>
            <CrudElement elem={elem}/>
        </li>
    )
}