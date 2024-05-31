import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyA8zSNo2qo1WVSr0hiwwSM5nNIE_8cTxHk",
    authDomain: "jtlibrary-3b6c6.firebaseapp.com",
    projectId: "jtlibrary-3b6c6",
    storageBucket: "jtlibrary-3b6c6.appspot.com",
    messagingSenderId: "469437342483",
    appId: "1:469437342483:web:a2e345652d74cd6f0a30e6",
    measurementId: "G-W1K70RLSJP"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app