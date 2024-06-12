import firebase from "@/app/db/firebase";
import { db } from "../db/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

const deletefilefromstorage=async(song,image,e)=>{
//delete doc 
await deleteDoc(doc(db, "songs", `${e.id}`));
const storage = getStorage();
// Create a reference to the file to delete
const imageRef = ref(storage, `images/${image}`);
const songRef = ref(storage, `songs/${song}`);
// Delete the file
deleteObject(imageRef).then(() => {
  // File deleted successfully
}).catch((error) => {
    console.log(error)
  // Uh-oh, an error occurred!
});
// Delete the file
deleteObject(songRef).then(() => {
  // File deleted successfully
}).catch((error) => {
    console.log(error)
  // Uh-oh, an error occurred!
});

}
export default deletefilefromstorage