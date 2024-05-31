
import { collection, query, where, getDocs } from "firebase/firestore";
import firebase from "@/app/db/firebase";
import { db } from "@/app/db/firebase";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const req=await request.json()
        // Define your collection
        const songsCollection = collection(db, 'songs');
        const songarr=[]
        const songlist=(songs)=>{        
            songs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
             songarr.push(doc.data());
          });}
        if(req.options!==null){       
        // Construct the query dynamically using reduce
        const q = Object.entries(req.options[0]).reduce((acc, [key, value]) => {
        return query(acc, where(key, '==', value));
        }, songsCollection);
        const songs = await getDocs(q);
        songlist(songs)
        }
        else{
            if(req.genre){
                const q = query(collection(db, "songs"),where('genre','==',req.genre));
                const songs = await getDocs(q);
                songlist(songs)
            }else{
                const q = query(collection(db, "songs"));
                const songs = await getDocs(q);
                songlist(songs)
            }
        }
    return NextResponse.json({songUrl:songarr},{status:200})
}