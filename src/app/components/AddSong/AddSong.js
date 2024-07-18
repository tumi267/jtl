'use client'
import firebase from "@/app/db/firebase";
import uploadsongdata from "@/app/lib/uploadsongdata";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

function AddSong() {
    // State variables for song attributes
    const [bpm, setBPM] = useState(120);
    const [name, setName] = useState('');
    const [mood, setMood] = useState('Happy');
    const [genre, setGenre] = useState('Hip-Hop');
    const [key, setKey] = useState('C');
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [songUrl, setSongUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    // Handle file uploads
    const handleUpload = () => {
        if (name !== '' && imageFile != null && songFile != null) {
            const storage = getStorage();

            // Upload song file
            const songRef = ref(storage, `songs/` + songFile.name);
            const uploadSongTask = uploadBytesResumable(songRef, songFile);

            // Upload image file
            const imageRef = ref(storage, `images/` + imageFile.name);
            const uploadImageTask = uploadBytesResumable(imageRef, imageFile);

            // Monitor song file upload progress
            uploadSongTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Song upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Song upload is paused');
                            break;
                        case 'running':
                            console.log('Song upload is running');
                            break;
                    }
                },
                (error) => {
                    handleUploadError(error);
                },
                () => {
                    getDownloadURL(uploadSongTask.snapshot.ref).then((downloadURL) => {
                        setSongUrl(downloadURL);
                    });
                }
            );

            // Monitor image file upload progress
            uploadImageTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Image upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Image upload is paused');
                            break;
                        case 'running':
                            console.log('Image upload is running');
                            break;
                    }
                },
                (error) => {
                    handleUploadError(error);
                },
                () => {
                    getDownloadURL(uploadImageTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                    });
                }
            );
        } else {
            alert('Name cannot be empty and both files must be selected');
        }
    };

    // Handle upload errors
    const handleUploadError = (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
                console.error('User doesn\'t have permission to access the object');
                break;
            case 'storage/canceled':
                console.error('User canceled the upload');
                break;
            case 'storage/unknown':
                console.error('Unknown error occurred', error.serverResponse);
                break;
        }
    };

    // Effect to upload song data once URLs are available
    useEffect(() => {
        if (imageUrl !== null && songUrl !== null) {
            uploadsongdata(imageUrl, songUrl, bpm.toString(), name, mood, genre, key);
        }
    }, [songUrl, imageUrl]);

    return (
        <div>
            <h2>Add Song</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
            }}>
                <h3>Name</h3>
                <input type='text' placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                <h3>BPM</h3>
                <input type="number" step="0.01" placeholder="120" onChange={(e) => { setBPM(e.target.value) }} />
                <h3>Genre</h3>
                <select name="genre" id="3" onChange={(e) => { setGenre(e.target.value) }}>
                    <option value="hip hop">hip hop</option>
                    <option value="rock">rock</option>
                    <option value="pop">pop</option>
                    <option value="piano">piano</option>
                </select>
                <h3>Mood</h3>
                <select onChange={(e) => { setMood(e.target.value) }}>
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
                <select onChange={(e) => { setKey(e.target.value) }}>
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
                </select>
                <h3>Song</h3>
                <input type='file' onChange={(e) => { setSongFile(e.target.files[0]) }} />
                <h3>Image</h3>
                <input type='file' onChange={(e) => { setImageFile(e.target.files[0]) }} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddSong;
