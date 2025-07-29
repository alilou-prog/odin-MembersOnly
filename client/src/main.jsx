import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Login, LoginProxy} from './components/Log_in.jsx'
import Signup from "./components/Sign_up";
import Dashboard from './components/Dashbord.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/users/login-proxy', element: <LoginProxy /> },
  { path: '/users/login', element: <Login />},
  { path: '/users/signup', element: <Signup /> },
  { path: '/users/:user_id/dashbord', element: <Dashboard />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
