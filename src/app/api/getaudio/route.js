
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
    let songarr = [];

    // Function to process and store song documents
    const songlist = (songs) => {
        songs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            songarr.push({ id: doc.id, ...doc.data() });
        });
    }

    // Check if options are provided in the request
    if (req.options !== null) {
  
        let list = req.options;
        // Use Promise.all to handle all queries in parallel
        await Promise.all(
            list.map(async (e) => {
                // Construct the query dynamically using reduce
                const q = Object.entries(e).reduce((acc, [key, value]) => {
                    return query(acc, where(key, '==', value));
                }, songsCollection);

                // Execute the query and process the results
                const songs = await getDocs(q);
                songs.forEach((doc) => {
                    songarr.push({ id: doc.id, ...doc.data() });
                });
            })
        );
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
      // Remove duplicates based on the id key
      songarr = Array.from(new Map(songarr.map(item => [item.id, item])).values());
      
      songarr = songarr.filter(song => {
        // Check if req.options exists and is an array
        if (req.options && Array.isArray(req.options)) {
            return req.options.every(obj => {
                // Check if every key-value pair in the current object matches the song
                return Object.entries(obj).every(([key, value]) => song[key] === value);
            });
        }
        return true; // If there are no options, return true to keep all songs
    });
      
    // Return the response with the list of songs
    return NextResponse.json({ songUrl: songarr }, { status: 200 });
}
