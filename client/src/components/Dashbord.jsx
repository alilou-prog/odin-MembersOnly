import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { fetch_messages } from "../lib/common";
import Message from "./Message";
import CreateMessage from "./CreateMessage";

export default function Dashboard() {
    const dialog_ref = useRef(null)
    const [err, set_err] = useState()
    const [messages, set_messages] = useState()
    const navigate = useNavigate()
    const user = useLocation().state?.user

    async function logout() {
        const res = await fetch(`/api/users/logout`, {
            method: "DELETE"
        });
        const json = await res.json()
        if (json.is_logout) {
            navigate('/users/login-proxy')
        }
        else {
            set_err(json.err)
        }
    }

    useEffect(() => {
        async function fetch_data() {
            set_messages(await fetch_messages())
        }
        fetch_data()
    }, [])

    function create_message(e) {
        console.log("test")
        dialog_ref.current.showModal();
    }

    return (
        <>
            <h1>Dashborad (Username: {user.username})</h1>
            <button onClick={logout}>Logout</button>
            <div className="errors">
                {JSON.stringify(err)}
            </div>
            <section className="messages">
                <dialog ref={dialog_ref}>
                    <CreateMessage />
                </dialog>
                <button onClick={create_message}>Create message</button>
                <div className="messages">
                    {messages ?
                        (<ul>
                            {messages.map(message => <Message key={message.id} message={message} />)}
                        </ul>)
                        : <span> Loading </span>
                    }
                </div>
            </section>
        </>
    )
}