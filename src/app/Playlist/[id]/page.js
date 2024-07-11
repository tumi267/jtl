'use client'
import Playlist from '@/app/components/Playlist/Playlist'
import { useParams } from 'next/navigation'
import styles from '../palylist.module.css'
import Filters from '@/app/components/Filters/Filters'
import { useState } from 'react'
function Page() {
    const params = useParams()
    const [filters,setfilters]=useState(null)
  return (
    <div>
      <div className={styles.header}>
        <h1>{params.id}</h1>
      </div>
      <div className={styles.content_contain}>
        <Filters
        options={setfilters}
        />
        <Playlist
        selete={'genre'}
        genre={params.id}
        options={filters}
        />  
     </div> 
    </div>
  )
}

export default Page