import firebase from "@/app/db/firebase";
import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebase";

export async function POST(request) {
    const req = await request.json();

    // Query to get user document based on email
    const querySnapshot = await getDocs(query(collection(db, "profiles"), where('email', '==', `${req.user}`)));
    const userdata = [];
    const songlist = [];

    // Process user query snapshot
    querySnapshot.forEach((doc) => {
        userdata.push(doc.data());
    });

    // Get the first user document (assuming one user per email)
    const user = userdata[0];

    // List of user's songs
    const list = user.songs;

    // Create promises to fetch each song document
    const promises = list.map(async (e) => {
        const docRef = doc(db, "songs", `${e}`);
        const docs = await getDoc(docRef);
        return docs.data();
    });

    // Resolve all promises and store the results in songlist
    const results = await Promise.all(promises);
    songlist.push(...results);

    // Return the user and song list in the response
    return NextResponse.json({ user, songlist }, { status: 200 });
}
