'use client'
import AddSong from "../components/AddSong/AddSong"
import RemoveSong from "../components/RemoveSong/RemoveSong"
import AdminVotes from "../components/AdminVotes/AdminVotes"
import AdminMenu from "../components/AdminMenu/AdminMenu"
import { useState } from "react"
function Page() {
  const [selected,setSelected]=useState(0)
  return (
    <div>
      <h1>Admin</h1>
      <AdminMenu
      select={setSelected} />
      {selected==0&&<AddSong/>}

      {selected==1&&<RemoveSong/>}
      
      {selected==2&&<AdminVotes/>}

      {selected==3&&<div>states</div>}

      {selected==4&&<div>Q&A</div>}
      
    </div>
  )
}

export default Page