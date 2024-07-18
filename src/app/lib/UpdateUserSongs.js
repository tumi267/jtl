import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../db/firebase";

const UpdateUserSongs = async (user, songID) => {
  try {
    // Querying the Firestore collection "profiles" where email matches user
    const q = query(collection(db, "profiles"), where("email", "==", user));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No matching documents for user:", user);
      return;
    }

    // Iterating over each document in the query snapshot
    querySnapshot.forEach(async (document) => {
      const userId = document.id; // ID of the user document
      const userRef = doc(db, "profiles", userId); // Reference to the user document
      const userData = document.data(); // Data of the user document

      // Ensure userData.songs is initialized as an array if it doesn't exist
      if (!userData.songs) {
        userData.songs = [];
      }

      // Check if the songID is already in the user's songs array
      if (userData.songs.includes(songID)) {
        alert("Song already exists in the user's song list.");
      } else {
        // Add the songID to userData.songs array
        userData.songs.push(songID);

        // Update the user document in Firestore with the new userData
        await setDoc(userRef, userData);

        alert("Song added to the user's song list.");
      }
    });
  } catch (error) {
    console.error("Error updating user songs:", error);
  }
};

export default UpdateUserSongs;
