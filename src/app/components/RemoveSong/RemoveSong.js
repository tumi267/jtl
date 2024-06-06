'use client'
import { useState } from "react"

function RemoveSong() {
    const [search,setSearch]=useState('')
    const handleSearch=async(e)=>{
        e.preventDefault()
        alert(search)
    }
  return (
    <div>
        look for song
        <form onSubmit={handleSearch}>
        <input type="text" placeholder="search" onChange={(e)=>{setSearch(e.target.value)}}/>
        <button type="submit">Search</button>
        </form>
        <br/>
        preview
        <br/>
        delete
    </div>
  )
}

export default RemoveSong