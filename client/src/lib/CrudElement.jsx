export default function CrudElement({ elem }) {
    async function handle_delete() {
        const res = await fetch(elem.delete_url, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log(elem.set_fetch_signal)
            elem.set_fetch_signal(true)
        }
        else {
            console.error("DELETE failed")
        }
    }

    return (
        <>
            {elem.content}
            <div className="control">
                <button>Update</button>
                <button onClick={handle_delete}>Delete</button>
            </div>
        </>
    )
}