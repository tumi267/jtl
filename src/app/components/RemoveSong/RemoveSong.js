// Import necessary libraries and functions
import formatDuration from "@/app/lib/formatDuration"; // Function to format audio duration
import search from "@/app/lib/search"; // Function to search for songs
import Image from "next/image"; // Component for displaying images
import { useState } from "react"; // State management hook from React
import styles from '../Playlist/PlayList.module.css'; // Stylesheet for component
import getfilename from '../../lib/getfilename'; // Function to get file names
import deletefilefromstorage from '../../lib/deletefilefromstorage'; // Function to delete files from storage

// Define the RemoveSong component
function RemoveSong() {
    // State variables for managing search input and list of songs
    const [searchinput, setSearchinput] = useState('');
    const [song, setSongs] = useState([]);

    // Function to handle search submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const list = await search(searchinput); // Call search function with search input
        setSongs(list); // Update state with list of songs matching search criteria
    };

    // Function to handle deletion of a song
    const handleDelete = async (e) => {
        const songName = await getfilename(e.songUrl); // Get file name of the song
        const imageName = await getfilename(e.imageUrl); // Get file name of the image
        deletefilefromstorage(songName, imageName, e); // Call function to delete files from storage
    };

    // JSX structure for rendering the component
    return (
        <div>
            {/* Form to input search text */}
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search" onChange={(e) => { setSearchinput(e.target.value) }} />
                <button type="submit">Search</button>
            </form>
            <br />
            {/* Display searched songs */}
            {song.map((e, i) => {
                return (
                    <div className={styles.audio_card} key={i}>
                        <div className={styles.image_discription}>
                            {/* Display song image */}
                            <Image src={e.imageUrl} alt={e.name} width={100} height={100} />
                            <div>
                                {/* Display song details */}
                                <p>{e?.name}</p>
                                <p>{formatDuration(e?.duration)}</p>
                                <p>{e?.mood}</p>
                                <p>{e?.bpm}</p>
                            </div>
                        </div>
                        {/* Audio player for the song */}
                        <audio controls controlsList='nodownload'>
                            <source src={e?.songUrl} />
                        </audio>
                        {/* Button to delete the song */}
                        <button onClick={() => { handleDelete(e) }}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default RemoveSong;
