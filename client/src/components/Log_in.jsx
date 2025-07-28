export default function Log_in() {
    return (

        <div className="log-in">
            <h1>Log-in</h1>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" autoComplete="true"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="true"/>
                </div>
                <button type="sumbit">Submit</button>
            </form>
            <a href="/">Home</a>
        </div>
    )
}