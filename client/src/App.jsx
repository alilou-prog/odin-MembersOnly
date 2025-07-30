import { useEffect, useState } from "react"
import Message from "./components/Message";
import './styles/main.css'
import { Link } from "react-router-dom";
import { fetch_messages } from "./lib/common";

function App() {
  const [messages, set_messages] = useState(null)
  const [fetch_signal, set_fetch_signal] = useState(true)

  useEffect(() => {
    async function fetch_data() {
      set_messages(await fetch_messages())
      set_fetch_signal(false)
    }
    fetch_signal &&  fetch_data()
  }, [fetch_signal])

  return (
    <>
      <h1>Home page</h1>
      <nav className="auth">
        <Link to="/users/login-proxy">Login</Link>
        <Link to="/users/signup">Sign up</Link>
      </nav>
      {messages ?
        (<ul>
          {messages.map(message => <Message key={message.id} message={message} set_fetch_signal={set_fetch_signal}/>)}
        </ul>)
        : <span> Loading </span>
      }
    </>
  )
}

export default App
