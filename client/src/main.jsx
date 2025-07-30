import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Login, LoginProxy} from './components/Login.jsx'
import Signup from "./components/Signup";
import Dashboard from './components/Dashboard.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/users/login-proxy', element: <LoginProxy /> },
  { path: '/users/login', element: <Login />},
  { path: '/users/signup', element: <Signup /> },
  { path: '/users/:user_id/dashboard', element: <Dashboard />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
