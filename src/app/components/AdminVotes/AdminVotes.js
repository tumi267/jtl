'use client'
import { useEffect,useState} from 'react'
import firebase from "../../db/firebase";
import { db } from "../../db/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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
  try{
    const d=new Date();
    const date=`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    const docRef = doc(db, "songs", `${e.id}`);
    const newData =({...e,voteList:false,date:date})
    await setDoc(docRef, newData);
}catch(e) {
    console.error("Error writing document: ", e);
  }
alert(`${e.name} pushed to production`)
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