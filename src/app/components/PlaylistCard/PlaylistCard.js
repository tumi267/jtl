'use client'
import Image from "next/image"
import styles from '../Playlist/PlayList.module.css'
import formatDuration from "@/app/lib/formatDuration";
import { useEffect } from "react";
import getAudioDuration from "@/app/lib/getduration";
import { usePathname } from "next/navigation";
function PlaylistCard({e}) {
    const params = usePathname()
    useEffect(()=>{
        const getduration=async()=>{
            const duration = await getAudioDuration(e.songUrl);
        }
        getduration()
    },[])
    // Define the regex pattern to match any file extension
  let pattern = /\.[a-zA-Z0-9]+\b/g;
  return (
    <div className={styles.image_discription}>
    <Image src={e.imageUrl} alt={e.name} width={100} height={100}/>
    <div>
    <p>{e.name.replace(pattern, '')}</p>
    <p>{formatDuration(e.duration)}</p>
    <p>{e.mood}</p>
    <p>{e.bpm}</p>
    {params=='/admin'&&<p>votes:{e.votes}</p>}
    </div>
    <audio controls controlsList='nodownload'>
      <source src={e.songUrl}/>
      </audio>
    </div>
  )
}

export default PlaylistCard