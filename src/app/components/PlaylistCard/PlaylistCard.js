'use client'
import Image from "next/image"
import styles from '../Playlist/PlayList.module.css'
import formatDuration from "@/app/lib/formatDuration";
import { useEffect } from "react";
import getAudioDuration from "@/app/lib/getduration";
import { usePathname } from "next/navigation";
import { UserState } from "@/app/context/context";
import Upvote from '../upvote/Upvote'
function PlaylistCard({e,selete}) {
  const {user,info}=UserState()
    const params = usePathname()
    useEffect(()=>{
        const getduration=async()=>{
            const duration = await getAudioDuration(e.songUrl);
        }
        getduration()

    },[])
    // Define the regex pattern to match any file extension
  let pattern = /\.[a-zA-Z0-9]+\b/g;
  const handleperchus =async(element)=>{
    if(user){
      const userEmail=user.email
      const songID=element.id
      UpdateUserSongs(userEmail,songID)
      alert('buy')
    }else{
      alert('please login or signup')
    }
  }
  const handleDownLoad=()=>{
    alert('download')
 }
 const renderButton = (songUrl) => {
  if(info){
    const songExists = info.some(el => el.songUrl == songUrl);
    console.log(songExists)
    return songExists 
      ? <button onClick={handleDownLoad}>download</button>
      : <button onClick={() => { handleperchus(e) }}>buy</button>;
  }else{
    return <button onClick={() => { handleperchus(e) }}>buy</button>;
  }

};
  return (
    <div className={styles.image_discription}>
    <Image src={e.imageUrl} alt={e.name} width={100} height={100}/>
    <div>
    <p>{e.name.replace(pattern, '')}</p>
    <p>{formatDuration(e.duration)}</p>
    <p>{e.mood}</p>
    <p>{e.bpm}</p>
    {params=='/admin'&&<p>votes:{e.votes}</p>}
    <span>{selete=='vote'?<span>
        <Upvote
        song={e}
        />
        </span>:<span>
        {renderButton(e.songUrl)}
        </span>}
        </span>
    </div>
    <audio controls controlsList='nodownload'>
      <source src={e.songUrl}/>
      </audio>
    </div>
  )
}

export default PlaylistCard