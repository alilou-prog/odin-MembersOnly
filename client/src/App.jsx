import { useEffect, useState } from "react"
import Message from "./components/Message";
import './styles/main.css'
import { Link } from "react-router-dom";

function App() {
  const [messages, set_messages] = useState(null)
  useEffect(() => {
    async function fetch_messages() {
      const res = await fetch('/api/messages');
      if (!res.ok) {
        console.error("App: Failed to fetch messages");
        return;
      }
      set_messages(await res.json());
    }
    fetch_messages()
  }, [])
  return (
    <>
      <h1>Home page</h1>
      <nav className="auth">
        <Link to="/users/log-in-proxy">Login</Link>
        <Link to="/users/sign-up">Sign up</Link>
      </nav>
      {messages ?
        (<ul>
          {messages.map(message => <Message key={message.id} message={message} />)}
        </ul>)
        : <span> Loading </span>
      }
    </>
  )
}

export default App
