'use client'
import formatDuration from "@/app/lib/formatDuration"
import search from "@/app/lib/search"
import Image from "next/image"
import { useState } from "react"
import styles from '../Playlist/PlayList.module.css'
function RemoveSong() {
    const [searchinput,setSearchinput]=useState('')
    const [song,setSongs]=useState([])
    const handleSearch=async(e)=>{
        e.preventDefault()
        const list=await search(searchinput)
        // map res to set durations
        // const duration = await getAudioDuration(e.songUrl);
        // return { ...audio, duration };
        setSongs(list)
    }
    const handleDelete=async(e)=>{
      alert('delete song')
    }
  return (
    <div>
        look for song
        <form onSubmit={handleSearch}>
        <input type="text" placeholder="search" onChange={(e)=>{setSearchinput(e.target.value)}}/>
        <button type="submit">Search</button>
        </form>
        <br/>
        {song.map((e,i)=>{return<div className={styles.audio_card} key={i}>
      <div className={styles.image_discription}>
      <Image src={e.imageUrl} alt={e.name} width={100} height={100}/>
      <div>
      
      <p>{e?.name}</p>
      <p>{formatDuration(e?.duration)}</p>
      <p>{e?.mood}</p>
      <p>{e?.bpm}</p>
      </div>
      </div>
      <audio controls controlsList='nodownload'>
      <source src={e?.songUrl}/>
      </audio>
        <button onClick={()=>{handleDelete(e)}}>delete</button>
      </div>
    })}
    </div>
  )
}

export default RemoveSong