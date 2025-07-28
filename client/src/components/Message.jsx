export default function Message({message}) {
    return (
        <li>
            <h2>{message.title}</h2>
            <p>{message.text}</p>
            <p>{message.user_id}</p>
        </li>
    )
}