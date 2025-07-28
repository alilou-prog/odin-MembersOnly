import { useEffect, useState } from "react"
import Message from "./components/Message";
import './styles/main.css'

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
        <a href="/log-in">Log in</a>
        <a href="/sign-up">sign up</a>
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
