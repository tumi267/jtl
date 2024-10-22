'use client'
import AddSong from "../components/AddSong/AddSong"
import RemoveSong from "../components/RemoveSong/RemoveSong"
import AdminVotes from "../components/AdminVotes/AdminVotes"
import AdminMenu from "../components/AdminMenu/AdminMenu"
import { useState } from "react"
import styles from './admin.module.css'
function Page() {
  const [selected,setSelected]=useState(0)
  return (
    <div className={styles.contain}>
      <h1 className={styles.heading}>Admin</h1>
      <AdminMenu
      className={styles.menu}
      select={setSelected} />
      <div className={styles.content}>
      {selected==0&&<AddSong/>}

      {selected==1&&<RemoveSong/>}
      
      {selected==2&&<AdminVotes/>}

      {selected==3&&<div>states</div>}

      {selected==4&&<div>Q&A</div>}
      </div>
    </div>
  )
}

export default Page