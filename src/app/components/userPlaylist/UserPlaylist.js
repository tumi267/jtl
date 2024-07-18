// Import necessary modules and components
import { useEffect, useState } from "react"; // State management hooks from React
import Filters from "../Filters/Filters"; // Component for filtering songs
import { UserState } from "@/app/context/context"; // Context for user state
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import formatDuration from "@/app/lib/formatDuration"; // Utility function for formatting durations
import Image from "next/image"; // Next.js component for optimized images
import getAudioDuration from "@/app/lib/getduration"; // Function to get audio durations
import Playlist from "../Playlist/Playlist"; // Component for displaying playlists
import styles from '../Playlist/PlayList.module.css'; // CSS module for styling
import PlaylistCard from "../PlaylistCard/PlaylistCard"; // Component for displaying playlist cards

// Define the UserPlaylist component
function UserPlaylist() {
    // Retrieve user state and functions from context
    const { user, setInfo, setuserinfo } = UserState();
    const router = useRouter(); // Next.js router instance for navigation

    // State variables for filters, user data, and song list
    const [filters, setFilters] = useState(null); // Placeholder for filters (not implemented)
    const [data, setData] = useState({
        name: '',
        songs: [],
        priceplan: ''
    }); // Placeholder for user data
    const [songList, setSongList] = useState([]); // State variable for user's bought songs list

    // Effect to fetch user data and song list when component mounts or user changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user and song data from API
                const response = await fetch('/api/getuser', {
                    method: 'POST',
                    body: JSON.stringify({ user: user?.email })
                });
                const userData = await response.json();

                // Update user info and song list state variables
                setuserinfo(userData.user);
                setData(userData.user);

                // Fetch and set audio durations for each song in the user's list
                const songData = userData.songlist.map(async (e) => {
                    const duration = await getAudioDuration(e?.songUrl);
                    if (duration) {
                        return { ...e, duration };
                    }
                });

                // Resolve promises and filter out undefined entries
                const results = await Promise.all(songData);
                const filteredList = results.filter(e => e !== undefined);
                setSongList(filteredList);

                // Update global song info context
                setInfo(filteredList);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Call fetchData function on component mount or when user changes
        if (user?.email) {
            fetchData();
        }
    }, [user?.email]);

    // Effect to redirect to signin page if user is null
    useEffect(() => {
        if (!user) {
            router.push('/signin');
        }
    }, [user]);

    // JSX structure for rendering the component
    return (
        <>
            <h1>{data?.name.toUpperCase()}</h1>
            <div>
                {/* Display filters component (not implemented) */}
                {/* <Filters/> */}

                {/* Display section for songs bought */}
                <div>
                    <h2>Songs Bought</h2>
                    {songList.map((e, i) => (
                        <div key={i} className={styles.audio_card}>
                            <PlaylistCard e={e} />
                            <span>{/* Additional actions */}</span>
                        </div>
                    ))}
                </div>

                {/* Display section for recommended playlists */}
                <div>
                    <h2>You May Also Like</h2>
                    <Playlist
                        selete={'genre'}
                        genre={songList[Math.floor(Math.random() * songList.length)]?.genre}
                        options={filters}
                    />
                </div>
            </div>
        </>
    );
}

export default UserPlaylist;
