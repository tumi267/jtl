'use client'
import Image from 'next/image'
import styles from './PlayList.module.css'
import { useEffect, useState } from 'react'
import Upvote from '../upvote/Upvote'

function Playlist({selete,options,genre}) {
  const [list,setlist]=useState([])
  useEffect(
    ()=>{
      const audioloader=async()=>{
        // try catach
        const getaudiolist=fetch('/api/getaudio',{
          method:'POST',
          body:JSON.stringify({options,genre})
        })
        const audiolist=await getaudiolist
        const res= await audiolist?.json()
        const listWithDurations = await Promise.all(res.songUrl.map(async (audio) => {
        const duration = await getAudioDuration(audio.songUrl);
        return { ...audio, duration };
      }));
        setlist(listWithDurations)
      }
      audioloader()
     
    },[options]
  )
  const getAudioDuration = async (url) => {
    const audio = new Audio(url);
    await new Promise(resolve => {
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
    });
    return audio.duration;
  };
  // Define the function to format the duration
  const formatDuration = (duration) => {
    
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // Define the regex pattern to match any file extension
  let pattern = /\.[a-zA-Z0-9]+\b/g;

  const handleUpVote= async()=>{
    // upvote logic gose here lib call
    alert('upvote')
  }
  const handleDownLoad =async()=>{
    // download logic gose here lib call
    alert('download')
  }
  return (
    <div className={styles.contain}>
    
    {/* map lsit call 
    research how to make audio look better look in to 
    wave surfer
    
    */}
    {/* loading state when loading song */}
    {list.map((e,i)=>{return<div className={styles.audio_card} key={i}>
      <div className={styles.image_discription}>
      <Image src={e.imageUrl} alt={e.name} width={100} height={100}/>
      <div>
      
      <p>{e.name.replace(pattern, '')}</p>
      <p>{formatDuration(e.duration)}</p>
      <p>{e.mood}</p>
      <p>{e.bpm}</p>
      </div>
      </div>
      <audio controls controlsList='nodownload'>
      <source src={e.songUrl}/>
      </audio>
      <span>{selete=='vote'?<span>
        <Upvote
        song={e}
        />
        </span>:<span>
        <button onClick={handleDownLoad}>download</button>
        </span>}
        </span>
      </div>
    })}
  
    </div>
  )
}

export default Playlist