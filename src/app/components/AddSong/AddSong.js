'use client'
import firebase from "@/app/db/firebase";
import uploadsongdata from "@/app/lib/uploadsongdata";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect, useState } from "react"
function AddSong() {
    const [bpm,setBPM]=useState(120)
    const [name,setName]=useState('')
    const [mood,setMood]=useState('Happy')
    const [genre,setGenre]=useState('Hip-Hop')
    const [key,setKey]=useState('C')
    const [songFile,setSongFile]=useState(null)
    const [imageFile,setImageFile]=useState(null)
    const [songUrl,setSongUrl]=useState(null)
    const [imageUrl,setImageUrl]=useState(null)
    const handleupload=()=>{
       if(name!==''||imageFile!=null||songFile!=null){
          if(songFile){ 
              const storage = getStorage();    
              // Upload file and metadata to the object 'images/mountains.jpg'
              const storageRef = ref(storage, `songs/` + songFile.name);
              const uploadTask = uploadBytesResumable(storageRef, songFile);
              const storageimageRef = ref(storage, `images/` + imageFile.name);
              const uploadimageTask = uploadBytesResumable(storageimageRef , imageFile);
              // Listen for state changes, errors, and completion of the upload.
              uploadTask.on('state_changed',
                (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                }, 
                (error) => {
                  // A full list of error codes is available at
                  // https://firebase.google.com/docs/storage/web/handle-errors
                  switch (error.code) {
                    case 'storage/unauthorized':
                      // User doesn't have permission to access the object
                      break;
                    case 'storage/canceled':
                      // User canceled the upload
                      break;
              
                    // ...
              
                    case 'storage/unknown':
                      // Unknown error occurred, inspect error.serverResponse
                      break;
                  }
                }, 
                () => {
                  // Upload completed successfully, now we can get the download URL
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setSongUrl(downloadURL);
                    
                  });
                }
              );
                // Listen for state changes, errors, and completion of the upload.
                uploadimageTask.on('state_changed',
                (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                }, 
                (error) => {
                  // A full list of error codes is available at
                  // https://firebase.google.com/docs/storage/web/handle-errors
                  switch (error.code) {
                    case 'storage/unauthorized':
                      // User doesn't have permission to access the object
                      break;
                    case 'storage/canceled':
                      // User canceled the upload
                      break;
              
                    // ...
              
                    case 'storage/unknown':
                      // Unknown error occurred, inspect error.serverResponse
                      break;
                  }
                }, 
                () => {
                  // Upload completed successfully, now we can get the download URL
                  getDownloadURL(uploadimageTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                  });
                }
              );
          }else{
              alert("no file added")
          }
     
       }else{
        alert('name can not be empty')
       }
        
    }

    useEffect(()=>{
      if(imageUrl!==null&&songUrl!==null){
        uploadsongdata(imageUrl,songUrl,bpm.toString(),name,mood,genre,key)
      }
    },[songUrl])
  return (
    <div>
        <h2>Add Song</h2>
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleupload()}
            }>
            <h3>Name</h3>
            <input type='text' placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
            <h3>BPM</h3>
            <input type="number" step="0.01" placeholder="120" onChange={(e)=>{setBPM(e.target.value)}}/>
            <h3>Genre</h3>
            <select name="genre" id="3" onChange={(e)=>{setGenre(e.target.value)}}>
            <option value="hip hop">hip hop</option>
            <option value="rock">rock</option>
            <option value="pop">pop</option>
            <option value="piano">piano</option>
            </select>
            <h3>Mood</h3>
            <select onChange={(e)=>{setMood(e.target.value)}}>
            <option value="Happy">Happy</option>
            <option value="Angry">Angry</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Calm">Calm</option>
            <option value="Cheerful">Cheerful</option>
            <option value="Positive">Positive</option>
            <option value="Brave">Brave</option>
            <option value="Excited">Excited</option>
            <option value="Scary">Scary</option>
            </select>
            <h3>Key</h3>
            <select onChange={(e)=>{setKey(e.target.value)}}>
            <option value="A">A</option>
            <option value="A#">A#</option>
            <option value="Bb">Bb</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Db">Db</option>
            <option value="D">D</option>
            <option value="D#">D#</option>
            <option value="Eb">Eb</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="Gb">Gb</option>
            <option value="G">G</option>
            <option value="G#">G#</option>
            <option value="A">A</option>
            </select>
            <h3>Song</h3>
            <input type='file' onChange={(e)=>{setSongFile(e.target.files[0])}}/>
            <h3>Image</h3>
            <input type='file' onChange={(e)=>{setImageFile(e.target.files[0])}}/>
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default AddSong