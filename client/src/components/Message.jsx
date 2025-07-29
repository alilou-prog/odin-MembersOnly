import CrudElement from "../lib/CrudElement"

export default function Message({ message }) {
    const content = (
        <>
            <h2>{message.title}</h2>
            <p>{message.text}</p>
            <p>{message.user_id}</p>
        </>
    )
    return (
        <li>
            <CrudElement elem={{content}}/>
        </li>
    )
}