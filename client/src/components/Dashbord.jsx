import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [err, set_err] = useState()
    const navigate = useNavigate()
    const user = useLocation().state?.user

    async function logout() {
        const res = await fetch(`/api/users/logout`, {
            method: "DELETE"
        });
        const json = await res.json()
        if(json.is_logout) {
            navigate('/users/login-proxy')
        }
        else {
            set_err(json.err)
        }
    }

    return (
        <>
            <h1>Dashborad (Username: {user.username})</h1>
            <button onClick={logout}>Logout</button>
            <div className="errors">
                {JSON.stringify(err)}
            </div>
        </>
    )
}