import { collection, doc, setDoc } from "firebase/firestore";
import firebase from "../db/firebase";
import { db } from "../db/firebase";
const uploadsongdata=async(imageUrl,songUrl,bpm,name,mood,genre,key)=>{
    const d=new Date();
    const date=`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

    let data={imageUrl,songUrl,bpm,name,mood,genre,key,date,votes:0,voteList:true}
    // Add a new document in collection "songs"
    // Add a new document with a generated id
    const songRef = doc(collection(db, "songs"));
    await setDoc(songRef, data);
    
}

export default uploadsongdata