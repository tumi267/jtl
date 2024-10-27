'use client'

import styles from './PlayList.module.css'
import { useEffect, useState } from 'react'
import comapreDate from '@/app/lib/compareDate'
import getAudioDuration from '@/app/lib/getduration'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import Loading from '@/app/loading'

function Playlist({ selete, options, genre }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true) // loading state

  useEffect(() => {
    const fetchAudioList = async () => {
      try {
        const getAudioList = await fetch('/api/getaudio', {
          method: 'POST',
          body: JSON.stringify({ options, genre })
        })
        const res = await getAudioList.json()

        const listWithDurations = await Promise.all(res.songUrl.map(async (audio) => {
          const duration = await getAudioDuration(audio.songUrl)
          return { ...audio, duration }
        }))

        switch (selete) {
          case 'vote':
            setList(listWithDurations.filter(e => e.voteList !== false))
            break
          case 'recent':
            setList(listWithDurations.filter(e => comapreDate(e) !== null))
            break
          default:
            setList(listWithDurations)
            break
        }
      } catch (error) {
        console.error('Error fetching audio list:', error)
      } finally {
        setLoading(false) // set loading to false after fetching
      }
    }

    fetchAudioList()
  }, [options, genre])

  if (loading) return <div className={styles.spinner_contain}>
    <Loading /> 
    </div>

  return (
    <div className={styles.contain}>
      {list.map((e, i) => (
        <div className={styles.audio_card} key={i}>
          <PlaylistCard e={e} selete={selete} />
        </div>
      ))}
    </div>
  )
}

export default Playlist




