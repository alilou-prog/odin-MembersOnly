import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sign_up() {
    const [errors, set_errors] = useState(null)
    const navigate = useNavigate()

    async function handle_submit(e) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);

        const res = await fetch('/api/users', 
            {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(Object.fromEntries(form_data.entries()))
            }
        )
        if(res.ok) {
            navigate("/")
        }
        else {
            const data = await res.json()
            set_errors(data.errors)
        }
    }

    return (
        <div className="sign-up">
            <h1>Sign-up</h1>
            <form onSubmit={handle_submit}>
                <div>
                    <label htmlFor="first-name">Firstname</label>
                    <input type="text" id="first-name" name="first_name" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="last-name">Lastname</label>
                    <input type="text" id="last-name" name="last_name" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input type="password" id="confirm-password" name="confirm_password" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="is-admin">Is Admin</label>
                    <input type="checkbox" id="is-admin" name="is_admin" autoComplete="true"/>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
            <div className="error">{errors && errors.map(error => <span key={error.path}>{error.msg}</span>)}</div>
            <Link to="/" />
            
        </div>

    )
}