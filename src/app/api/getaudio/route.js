
import { collection, query, where, getDocs } from "firebase/firestore";
import firebase from "@/app/db/firebase";
import { db } from "@/app/db/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
    // Parse the request body to JSON
    const req = await request.json();

    // Define your collection
    const songsCollection = collection(db, 'songs');

    // Array to store song documents
    const songarr = [];

    // Function to process and store song documents
    const songlist = (songs) => {
        songs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            songarr.push({ id: doc.id, ...doc.data() });
        });
    }

    // Check if options are provided in the request
    if (req.options !== null) {
        // Construct the query dynamically using reduce
        const q = Object.entries(req.options[0]).reduce((acc, [key, value]) => {
            return query(acc, where(key, '==', value));
        }, songsCollection);

        // Execute the query and process the results
        const songs = await getDocs(q);
        songlist(songs);
    } else {
        // If no options, check if genre is provided in the request
        if (req.genre) {
            const q = query(collection(db, "songs"), where('genre', '==', req.genre));
            const songs = await getDocs(q);
            songlist(songs);
        } else {
            // If neither options nor genre are provided, get all songs
            const q = query(collection(db, "songs"));
            const songs = await getDocs(q);
            songlist(songs);
        }
    }

    // Return the response with the list of songs
    return NextResponse.json({ songUrl: songarr }, { status: 200 });
}
