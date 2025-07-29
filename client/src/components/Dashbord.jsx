import { useLocation } from "react-router-dom"

export default function Dashboard() {
    const user = useLocation().state?.user
    return (
        <h1>Dashborad (Username: {user.username})</h1>
    )
}