
function AdminMenu({select}) {
  return (
    <div>
        <button onClick={()=>{select(0)}}>Add Song</button>
        <button onClick={()=>{select(1)}}>Remove Song</button>
        <button onClick={()=>{select(2)}}>Admin Votes</button>
        <button onClick={()=>{select(3)}}>States</button>
        <button onClick={()=>{select(4)}}>Q&A</button>
    </div>
  )
}

export default AdminMenu