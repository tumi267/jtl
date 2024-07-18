import AddSong from "../components/AddSong/AddSong"
import RemoveSong from "../components/RemoveSong/RemoveSong"
import AdminVotes from "../components/AdminVotes/AdminVotes"
function Page() {
  return (
    <div>
      <h1>Admin</h1>
        
      <AddSong/>

      <RemoveSong/>
      
      <AdminVotes/>
      
      {/* <div>states</div>

      <div>Q&A</div> */}
      
    </div>
  )
}

export default Page