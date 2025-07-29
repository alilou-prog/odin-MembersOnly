import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginProxy() {
    const navigate = useNavigate();
    useEffect(() => {
        async function check_already_auth() {
            const response = await fetch('/api/users/login');

            const json = await response.json();
            if(json.is_auth) {
                navigate(`/users/${json.user.username}/dashbord`, {state: {user: json.user}})
            }
            else {
                navigate('/users/login')
            }
        }
        check_already_auth();
    }, []);

    return (
        <>
            <h1>Loading</h1>
        </>
    )
}

function Login() {
    const navigate = useNavigate();
    const [err, set_err] = useState("")

    async function handle_submit(e) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);
        const response = await fetch('/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(form_data.entries())),
        });
        const json = await response.json();
        if (json.is_auth) {
            navigate(`/users/${json.user.username}/dashbord`, {state: {user: json.user}})
        }
        else {
            set_err(json.msg)
        }
    }

    return (
        <div className="log-in">
            <h1>Log-in</h1>
            <form method="POST" onSubmit={handle_submit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" autoComplete="on" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="on" />
                </div>
                <button type="submit">Submit</button>
                <span className="errors">{err}</span>
            </form>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export {LoginProxy, Login}