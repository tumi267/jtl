'use client'
import { useEffect, useState } from "react"
import Filters from "../Filters/Filters"
import { UserState } from "@/app/context/context"
import { useRouter } from 'next/navigation'
import formatDuration from "@/app/lib/formatDuration"
import Image from "next/image"
import getAudioDuration from "@/app/lib/getduration"
import Playlist from "../Playlist/Playlist"
import styles from '../Playlist/PlayList.module.css'
function UserPlaylist() {
    const {user}=UserState()
    const router=useRouter()
    const [filters,setfilters]=useState(null)
    const [data,setData]=useState({
        name:'',
        songs:[],
        priceplan:''
    })
    const [songList,setSongList]=useState([])
    useEffect(()=>{
       const data=async()=>{
        const list= await fetch('/api/getuser',{
            method:'POST',
          body:JSON.stringify({user:user?.email})
        })
        const listinfo=await list.json()
        setData(listinfo.user)
        const songdata=listinfo.songlist.map(async(e)=>{
          
            const duration = await getAudioDuration(e?.songUrl);
            if(duration){
              return {...e,duration}
            }
        })
        const results = await Promise.all(songdata);
        const newlist=results.filter(e=>{return e!=undefined})
        setSongList(newlist)
       } 
       data()
    },[user?.email])
    useEffect(()=>{
        if(user==null){
          router.push('/signin')
        }
      },[user])
     const handleDownLoad=()=>{
        alert('download')
     }
  return (
    <>
        <h1>{data?.name.toUpperCase()}</h1>
        <div>
        {/* <Filters/> */}
        <div >
        <h2>songs bought</h2>
        {songList.map((e,i)=>{return <div key={i} className={styles.audio_card}>
        <div className={styles.image_discription}>
      <Image src={e?.imageUrl} alt={e?.name} width={100} height={100}/>
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
      <span>
        <button onClick={handleDownLoad}>download</button>
        </span>
        </div>})}
        </div>
        <div>
        <h2>you may also like</h2>
        {/* need logic based on songs bought else random
        if song bought then dont render
        */}
        <Playlist
        selete={'genre'}
        genre={songList[Math.floor(Math.random()*songList.length)]?.genre}
        options={filters}
        />   
       
        </div>
        </div>
    </>
  )
}

export default UserPlaylist