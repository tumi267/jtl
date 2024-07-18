'use client'

import { useEffect, useState } from 'react';
import { db } from "../../db/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import deletefilefromstorage from '@/app/lib/deletefilefromstorage';
import getfilename from '@/app/lib/getfilename';

function AdminVotes() {
  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "songs"), where("voteList", "==", true));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setData(newData);
    }
    getData();
  }, []);

  // Handle delete action
  const handleDelete = async (e) => {
    const songName = await getfilename(e.songUrl);
    const imageName = await getfilename(e.imageUrl);
    deletefilefromstorage(songName, imageName, e);
  };

  // Handle push to sale action
  const handlePushToSale = async (e) => {
    try {
      const d = new Date();
      const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      const docRef = doc(db, "songs", `${e.id}`);
      const newData = { ...e, voteList: false, date: date };
      await setDoc(docRef, newData);
      alert(`${e.name} pushed to production`);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <h2>Votes</h2>
      {data.map((e) => (
        <div key={e.id}>
          {/* Bar for votes charts */}
          <PlaylistCard e={e} />
          <button onClick={() => handlePushToSale(e)}>Push to Sale</button>
          <button onClick={() => handleDelete(e)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminVotes;
