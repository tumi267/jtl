'use client'
import upvote from "@/app/lib/upvote";
import { useEffect, useState } from "react"
function Upvote({song}) {
    const [count,setCount]=useState(song.votes)
    const handleVote=async()=>{
        let newcount=count+1;
        setCount(newcount);
    }
    useEffect(()=>{
        if(song.votes!==count){
           upvote(song,count)
        }
    },[count])
  return (
    <div><button onClick={()=>{handleVote()}}>vote</button></div>
  )
}

export default Upvote