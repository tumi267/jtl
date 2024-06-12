import firebase from "@/app/db/firebase";
import { db } from "../db/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const deletefilefromstorage=(song,image)=>{
const storage = getStorage();
// Create a reference to the file to delete
const imageRef = ref(storage, `images/${image}`);
const songRef = ref(storage, `songs/${song}`);
// Delete the file
deleteObject(imageRef).then(() => {
    console.log('image deleted')
  // File deleted successfully
}).catch((error) => {
    console.log(error)
  // Uh-oh, an error occurred!
});
// Delete the file
deleteObject(songRef).then(() => {
    console.log('song deleted')
  // File deleted successfully
}).catch((error) => {
    console.log(error)
  // Uh-oh, an error occurred!
});

}
export default deletefilefromstorage