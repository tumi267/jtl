import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import firebase from "@/app/db/firebase";
import { db } from "@/app/db/firebase";
import { NextResponse } from "next/server";

export async function POST(request)  {
    const req=await request.json()
    // get user doc
    const querySnapshot = await getDocs(collection(db, "profiles"),where('email','==',`${req.user}`));
    const userdata=[]
    const songlist=[]
    querySnapshot.forEach((doc) => {
      userdata.push(doc.data())
    });
    const user=userdata[0]
    // get songs 
    const list=user.songs
    const promises = list.map(async (e) => {
        const docRef = doc(db, "songs", `${e}`);
        const docs = await getDoc(docRef);
        return docs.data();
    });
    const results = await Promise.all(promises);
    songlist.push(...results);  
    return NextResponse.json({user,songlist},{status:200})
}