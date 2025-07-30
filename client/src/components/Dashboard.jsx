import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { fetch_messages } from "../lib/common";
import Message from "./Message";
import CreateMessage from "./CreateMessage";
import BecomeMember from "./BecomeMember";

export default function Dashboard() {
    const create_msg_dialog = useRef(null)
    const become_member_dialog = useRef(null)

    const [err, set_err] = useState()
    const [messages, set_messages] = useState()
    const navigate = useNavigate()
    const user = useLocation().state?.user
    const [fetch_signal, set_fetch_signal] = useState(true)

    async function logout() {
        const res = await fetch(`/api/users/logout`, {
            method: "DELETE"
        });
        const json = await res.json()
        if (json.is_logout) {
            navigate('/')
        }
        else {
            set_err(json.err)
        }
    }

    useEffect(() => {
        async function fetch_data() {
            set_messages(await fetch_messages())
        }
        fetch_signal && fetch_data()
        set_fetch_signal(false)
    }, [fetch_signal])

    function show_dialog(dialog) {
        dialog.showModal();
    }

    function close_dialog(dialog) {
        dialog.close();
    }

    return (
        <>
            <h1>Dashborad (Username: {user.username})</h1>
            <nav className="actions">
                {!user.is_member && <button onClick={() => show_dialog(become_member_dialog.current)}>Become a member</button>}
                <button onClick={() => show_dialog(create_msg_dialog.current)}>Create message</button>
                <button onClick={logout}>Logout</button>
            </nav>

            <div className="dialogs">
                <dialog ref={become_member_dialog}>
                    <BecomeMember close_dialog={() => close_dialog(become_member_dialog.current)} />
                </dialog>
                <dialog ref={create_msg_dialog}>
                    <CreateMessage close_dialog={() => close_dialog(create_msg_dialog.current)} set_fetch_signal={set_fetch_signal} />
                </dialog>
            </div>

            <section className="logout">
                <div className="errors">
                    {JSON.stringify(err)}
                </div>
            </section>

            <section className="messages">

                <div className="messages">
                    {messages ?
                        (<ul>
                            {messages.map(message => <Message key={message.id} message={message} set_fetch_signal={set_fetch_signal} />)}
                        </ul>)
                        : <span> Loading </span>
                    }
                </div>
            </section>
        </>
    )
}