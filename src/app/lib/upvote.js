import { collection, doc, setDoc } from "firebase/firestore";
import firebase from "../db/firebase";
import { db } from "../db/firebase";

async function upvote(song,count,id) {
    try{
        const docRef = doc(db, "songs", `${id}`);
        const newData =({...song,votes:count})
        await setDoc(docRef, newData);
    }catch(e) {
        console.error("Error writing document: ", e);
      }

}

export default upvote