'use client'
import Image from 'next/image'
import styles from './PlayList.module.css'
import { useEffect, useState } from 'react'
import Upvote from '../upvote/Upvote'
import comapreDate from '@/app/lib/compareDate'
import formatDuration from '@/app/lib/formatDuration'
import getAudioDuration from '@/app/lib/getduration'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import { UserState } from '@/app/context/context'
import UpdateUserSongs from '@/app/lib/UpdateUserSongs'

function Playlist({ selete, options, genre }) {
  const { user } = UserState()
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchAudioList = async () => {
      try {
        const getAudioList = await fetch('/api/getaudio', {
          method: 'POST',
          body: JSON.stringify({ options, genre })
        })
        const res = await getAudioList.json()

        // Fetch durations for each audio asynchronously
        const listWithDurations = await Promise.all(res.songUrl.map(async (audio) => {
          const duration = await getAudioDuration(audio.songUrl)
          return { ...audio, duration }
        }))

        // Filter and set list based on selected 'selete'
        switch (selete) {
          case 'vote':
            const voteList = listWithDurations.filter(e => e.voteList !== false)
            setList(voteList)
            break
          case 'recent':
            const recentList = listWithDurations.filter(e => comapreDate(e) !== null)
            setList(recentList)
            break
          case 'fulllist':
          case 'user':
          case 'recommended':
          case 'genre':
            setList(listWithDurations)
            break
          default:
            break
        }
      } catch (error) {
        console.error('Error fetching audio list:', error)
      }
    }

    fetchAudioList()
  }, [options, genre])

  return (
    <div className={styles.contain}>
      {/* Map through the list of audio */}
      {list.map((e, i) => (
        <div className={styles.audio_card} key={i}>
          <PlaylistCard e={e} selete={selete} />
        </div>
      ))}
    </div>
  )
}

export default Playlist
