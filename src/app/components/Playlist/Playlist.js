'use client'
import Image from 'next/image'
import styles from './PlayList.module.css'
import { useEffect, useState } from 'react'
import Upvote from '../upvote/Upvote'
import comapreDate from '@/app/lib/compareDate'
import formatDuration from '@/app/lib/formatDuration'
import getAudioDuration from '@/app/lib/getduration'
import PlaylistCard from '../PlaylistCard/PlaylistCard'

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
      switch (selete) {
        case 'vote':
         
          setlist(listWithDurations)
          break;
          case 'recent':
            const recent=listWithDurations.filter((e)=>{
              if(comapreDate(e)!==null){
                return e
              }
            })
            setlist(recent)
          break;
          case 'fulllist':
            setlist(listWithDurations)
            break;
          case 'user':
              setlist(listWithDurations)
              break;
          case 'recomennded':
              setlist(listWithDurations)
              break;
          case 'genre':
            
                setlist(listWithDurations)
                break;
        default:
          break;
      }
      }
      audioloader()
     
    },[options]
  )

  const handleDownLoad =async()=>{
    // download logic gose here lib call
    alert('buy')
  }
  return (
    <div className={styles.contain}>
    
    {/* map lsit call 
    research how to make audio look better look in to 
    wave surfer
    
    */}
    {/* loading state when loading song */}
    {list.map((e,i)=>{return<div className={styles.audio_card} key={i}>
      <PlaylistCard
      e={e}/>
      <span>{selete=='vote'?<span>
        <Upvote
        song={e}
        />
        </span>:<span>
        <button onClick={handleDownLoad}>buy</button>
        </span>}
        </span>
      </div>
    })}
  
    </div>
  )
}

export default Playlist