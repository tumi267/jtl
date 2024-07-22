'use client'
import { useState } from "react"
import Filters from "../components/Filters/Filters"
import Playlist from "../components/Playlist/Playlist"
import styles from './palylist.module.css'
function Page() {
  const [filters,setfilters]=useState(null)
  const playlists=0
  const vote=1
  const Recently=2
  const [select,setSelect]=useState(playlists)

  return (
    <div className={styles.contain}>
      <Filters
      options={setfilters}
      />
      <div>
      {/* menu */}
      <div>
        <button onClick={()=>{setSelect(playlists)}}>Playlist</button>
        <button onClick={()=>{setSelect(vote)}}>Recently Added</button>
        <button onClick={()=>{setSelect(Recently)}}>vote</button>
      </div>
      {/* selected options */}
      {/* vote */}
      {select==vote&&<div>
        <h2>vote for new songs</h2>
        <div >
        <Playlist
        selete={'vote'}
        options={filters}
        />
        </div>
      </div>}
      {/* recently added */}
      {select==Recently&&<div>
      <h2>Recently Added</h2>
      {/* map for 10 display ten at a time */}
      <div>
        <Playlist
        selete={'recent'}
        options={filters}
        />
      </div>
      </div>}
      {/* full paylist */}
      {select==playlists&&<div>
      <h2>PlayList</h2>
      <div>
        <Playlist
        selete={'fulllist'}
        options={filters}
        />
      </div>
      </div>}
      </div>
    </div>
  )
}

export default Page