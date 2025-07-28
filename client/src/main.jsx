import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Log_in from './components/Log_in.jsx'
import Sign_up from "./components/Sign_up";

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/log-in', element: <Log_in /> },
  { path: '/sign-up', element: <Sign_up /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
