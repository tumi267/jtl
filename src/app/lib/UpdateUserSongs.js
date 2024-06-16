import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../db/firebase";

const UpdateUserSongs = async (user, songID) => {
  try {
    const q = query(collection(db, "profiles"), where("email", "==", user));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    querySnapshot.forEach(async (document) => {
      const userId = document.id;
      const userRef = doc(db, "profiles", userId);
      const userData = document.data();

      if (!userData.songs) {
        userData.songs = [];
      }

      if (userData.songs.includes(songID)) {
        alert("Song already exists in the user's song list.");
      } else {
        userData.songs.push(songID);
        // paygate logic
        await setDoc(userRef, userData);
        alert("Song added to the user's song list.");
      }
    });
  } catch (error) {
    console.error("Error updating user songs: ", error);
  }
};

export default UpdateUserSongs;