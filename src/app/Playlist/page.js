'use client'
import { useState } from "react"
import Filters from "../components/Filters/Filters"
import Playlist from "../components/Playlist/Playlist"
import styles from './palylist.module.css'
function Page() {
  const [openRecent,setOpenRecent]=useState(false)
  const [openPlayList,setPlayList]=useState(false)
  const [openVote,setVote]=useState(true)
  const [filters,setfilters]=useState(null)
  return (
    <div className={styles.contain}>
      <Filters
      options={setfilters}
      />
      <div>
      <div>
        <h2>vote for new songs</h2>
        {openVote==false&&
        <button onClick={()=>{
          setVote(!openVote)
          setPlayList(false)
          setOpenRecent(false)
        }}>view</button>
        }
        {openVote==true&&
        <div >
        <Playlist
        selete={'vote'}
        options={filters}
        />
        </div>
        } 
      </div>
      <div>
      <h2>Recently Added</h2>
      {openRecent==false&&
      <button onClick={()=>{
        setOpenRecent(!openRecent)
        setVote(false)
        setPlayList(false)
      }}>view</button>
      }
      {/* map for 10 display ten at a time */}
      {openRecent==true&&
      <div>
        <Playlist
        selete={'recent'}
        options={filters}
        />
      </div>
      }  
      </div>
      <div>
      <h2>PlayList</h2>
      {openPlayList==false&&
      <button onClick={()=>{
        setPlayList(!openPlayList)
        setOpenRecent(false)
        setVote(false)
      }}>view</button>
      }
      {openPlayList==true&&
      <div>
        <Playlist
        selete={'fulllist'}
        options={filters}
        />
      </div>
      }
      </div>
      </div>
    </div>
  )
}

export default Page