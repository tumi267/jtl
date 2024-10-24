import { NextResponse } from "next/server";
import { db } from "@/app/db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function POST(request) {
  const { searchInput } = await request.json();
  const list = new Set(); // Use a Set to store unique documents

  // Create queries for "name" field
  const qName = query(collection(db, "songs"), where("name", "<=", searchInput));
  const qName3 = query(collection(db, "songs"), where("name", "==", searchInput)); // Equality condition for name

  // Create queries for "genre" field
  const qGenre = query(collection(db, "songs"), where("genre", "<=", searchInput));
  const qGenre3 = query(collection(db, "songs"), where("genre", "==", searchInput)); // Equality condition for genre

  // Create queries for "mood" field
  const qMood = query(collection(db, "songs"), where("mood", "<=", searchInput));
  const qMood3 = query(collection(db, "songs"), where("mood", "==", searchInput)); // Equality condition for mood

  // Run the "name" queries and push unique docs into the set
  const querySnapshotName = await getDocs(qName);
  querySnapshotName.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() })); // Add serialized document to Set to ensure uniqueness
  });


  const querySnapshotName3 = await getDocs(qName3);
  querySnapshotName3.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() }));
  });

  // Run the "genre" queries and push unique docs into the set
  const querySnapshotGenre = await getDocs(qGenre);
  querySnapshotGenre.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() }));
  });



  const querySnapshotGenre3 = await getDocs(qGenre3);
  querySnapshotGenre3.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() }));
  });

  // Run the "mood" queries and push unique docs into the set
  const querySnapshotMood = await getDocs(qMood);
  querySnapshotMood.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() }));
  });



  const querySnapshotMood3 = await getDocs(qMood3);
  querySnapshotMood3.forEach((doc) => {
    list.add(JSON.stringify({ id: doc.id, ...doc.data() }));
  });

  // Convert Set to an array and parse back to object
  const uniqueList = Array.from(list).map((item) => JSON.parse(item));

   // If you want to ensure absolutely no duplicates (in case of a deeper comparison), you can add this final filtering step:
   const filteredUniqueList = uniqueList.filter(
    (value, index, self) =>
      index === self.findIndex((doc) => doc.id === value.id) // Ensure unique by document ID
  );

  return NextResponse.json({ list: filteredUniqueList }, { status: 200 });
}

