export default function Sign_up() {
    return (

        <div className="sign-up">
            <h1>Sign-up</h1>
            <form action="">
                <div>
                    <label htmlFor="first-name">Firstname</label>
                    <input type="text" id="first-name" name="first-name" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="last-name">Lastname</label>
                    <input type="text" id="last-name" name="last-name" autoComplete="true"/>
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
                    <input type="password" id="confirm-password" name="confirm-password" autoComplete="true"/>
                </div>

                <div>
                    <label htmlFor="is-admin">Is Admin</label>
                    <input type="checkbox" id="is-admin" name="is-admin" autoComplete="true"/>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <a href="/">Home</a>
        </div>

    )
}