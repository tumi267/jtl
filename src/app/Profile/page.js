'use client'
import React, { useEffect, useState } from 'react'
import Filters from '../components/Filters/Filters'
import Playlist from '../components/Playlist/Playlist'
import { useRouter } from 'next/navigation'
import { UserState } from '../context/context'
function page() {
  const [filters,setfilters]=useState(null)
  const router=useRouter()
  const {user}=UserState()
  useEffect(()=>{
    if(user==null){
      router.push('/signin')
    }
  },[user])


  return (
    <>
        <div>
          <h1>{user?.email}</h1>
        </div>
        <div>
          <h2>songs bought</h2>

          <div>
          <Filters
          options={setfilters}
          />
          <div>
            {/* in fire base store song url that have been purched then get doc for each url map */}
            <Playlist
            selete={'fulllist'}
            options={filters}
            />
          </div>
          </div>
        </div>
        <div>
        <h2>you may also like</h2>
        {/* based on average get genere and randomize list */}
        <Playlist
        selete={'fulllist'}
        options={filters}
        />
        </div>
    </>
  )

}

export default page