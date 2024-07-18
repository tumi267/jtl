// Import necessary functions and hooks
import upvote from "@/app/lib/upvote"; // Function to handle upvoting
import { useEffect, useState } from "react"; // State management hooks from React

// Define the Upvote component
function Upvote({ song }) {
    // State variable to store the current count of votes
    const [count, setCount] = useState(song.votes);

    // Function to handle voting
    const handleVote = async () => {
        let newCount = count + 1; // Increment the count by 1
        setCount(newCount); // Update the count state
    };

    // Effect to execute when count state changes
    useEffect(() => {
        // Check if the current vote count in the song object is different from the state count
        if (song.votes !== count) {
            // Call the upvote function to update the vote count in the database
            upvote(song, count, song.id);
        }
    }, [count]); // Depend on count state change

    // JSX structure for rendering the component
    return (
        <div>
            <button onClick={handleVote}>Vote</button> {/* Button to trigger voting */}
        </div>
    );
}

export default Upvote;
