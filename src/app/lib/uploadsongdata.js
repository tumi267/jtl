import { collection, doc, setDoc } from "firebase/firestore";
import firebase from "../db/firebase";
import { db } from "../db/firebase";
const uploadsongdata=async(imageUrl,songUrl,bpm,name,mood,genre,key)=>{
    let data={imageUrl,songUrl,bpm,name,mood,genre,key}
    // Add a new document in collection "songs"
    // Add a new document with a generated id
    const songRef = doc(collection(db, "songs"));
    await setDoc(songRef, data);
    
}

export default uploadsongdata