'use client'
import { useEffect,useState} from 'react'
import firebase from "../../db/firebase";
import { db } from "../../db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import deletefilefromstorage from '@/app/lib/deletefilefromstorage';
import getfilename from '@/app/lib/getfilename';

function AdminVotes() {
const [data,setData]=useState([])
useEffect(()=>{
    const getdata=async()=>{
        const q = query(collection(db, "songs"), where("voteList", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setData([...data,{...doc.data(),id:doc.id}]);
        });
    }
    getdata()
},[])
const handleDelete=async(e)=>{
  const songName=await getfilename(e.songUrl)
  const imageName=await getfilename(e.imageUrl)
  deletefilefromstorage(songName,imageName,e)
}
const handlePushTosale=async(e)=>{
alert(e.name)
}
  return (
    <div>
      <h2>Votes</h2>
      {data.map((e)=>{
        return<div key={e.id}>
          {/* bar for votes charts */}
            <PlaylistCard
            e={e}/>
            <button onClick={()=>{handlePushTosale(e)}}>push to sale</button>
            <button onClick={()=>{handleDelete(e)}}>delete</button>
        </div>
    })}</div>
  )
}

export default AdminVotes