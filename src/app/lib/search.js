import { collection, getDocs, query, where } from "firebase/firestore"; 
import firebase from "@/app/db/firebase";
import { db } from "../db/firebase";
const search=async (song)=>{
  // Fetch the documents from the "songs" collection

  const q = query(collection(db, "songs"), where("name", "==", `${song}`));
  
  const querySnapshot = await getDocs(q);

  // Initialize an array to hold the song data
  const songsArray = [];
 
  // Iterate over each document in the snapshot
  querySnapshot.forEach((doc) => {
    // Add each document's data to the array
    console.log(doc.data())
    songsArray.push(doc.data());
  });

  // Return the accumulated array of song data
  return songsArray;
}


export default search