import { useNavigate } from "react-router-dom";
import Form from "../lib/Form"

export default function BecomeMember({ close_dialog }) {
    const navigate = useNavigate()

    async function become_member(e, set_error) {
        e.preventDefault()
        const form_data = new FormData(e.currentTarget);
        const res = await fetch("/api/users/become-member", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(Object.fromEntries(form_data.entries()))
        })
        if (res.ok) {
            const json = await res.json()
            if(json.success) {
                close_dialog()
                navigate("/")
            }
            else {
                set_error(json.error)
            }
        }
        else {
           set_error("an error has occured")
        }
    }

    const form = {
        title: "Become a member",
        inputs: [
            {
                label: "Secret",
                name: "secret",
                type: "text"
            },
        ],
        on_submit: become_member
    }

    return (
        <Form form={form} />
    )
}