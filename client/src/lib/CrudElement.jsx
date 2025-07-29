import { useState } from "react"
import Form from "./Form"

export default function CrudElement({ elem }) {
    const [is_updating, set_is_updating] = useState(false)

    async function update(e) {
        e.preventDefault()
        const form_data = new FormData(e.currentTarget)
        const res = await fetch(elem.update_url, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({ ...Object.fromEntries(form_data.entries()), id: elem.id })
        })
        if (res.ok) {
            elem.set_fetch_signal(true)
        }
        else {
            console.error("UPDATE failed")
        }
        set_is_updating(false)
    }

    async function handle_delete() {
        const res = await fetch(elem.delete_url, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log(elem.set_fetch_signal)
            elem.set_fetch_signal(true)
        }
        else {
            console.error("DELETE failed")
        }
    }

    async function start_updating() {
        set_is_updating(true)
    }

    return (
        <>
            {is_updating ? <Form form={{...elem.update_form, on_submit: update}} /> : elem.content}
            <div className="control">
                {is_updating ? null : <button onClick={start_updating}>Update</button>}
                <button onClick={handle_delete}>Delete</button>
            </div>
        </>
    )
}