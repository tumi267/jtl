import firebase from "@/app/db/firebase";
import { NextResponse } from "next/server";
import { getDownloadURL, ref } from "firebase/storage";

export async function POST(request) {
    try {
        const req = await request.json();
        const { e } = req;
        if (e.songUrl) {
            // Fetch the file from Firebase Storage using the song URL
            const fileResponse = await fetch(e.songUrl);
            
        
            if (!fileResponse.ok) {
                return NextResponse.json({ msg: 'Failed to fetch file' }, { status: 404 });
            }

            // Get the file as a buffer or stream (depending on your use case)
            const fileBuffer = await fileResponse.arrayBuffer();

            // Send the file as a download
            return new Response(fileBuffer, {
                headers: {
                    'Content-Disposition': 'attachment; filename="downloaded-song.mp3"',
                    'Content-Type': 'audio/mpeg',  // Set the appropriate content type
                }
            });
        } else {
            return NextResponse.json({ msg: 'No song URL provided' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ msg: 'An error occurred', error: error.message }, { status: 500 });
    }
}
