export default function CrudElement({ elem }) {
    return (
        <>
            {elem.content}
            <div className="control">
                <button>Update</button>
                <button>Delete</button>
            </div>
        </>
    )
}