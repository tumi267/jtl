'use client'
import { useRouter } from 'next/navigation'
import styles from './signin.module.css'
import { useEffect, useState } from 'react'
import { UserState } from '../context/context'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db/firebase'
function Page() {
    const router = useRouter()
    const {user,setUser}=UserState()
    const [deatils,setDetails]=useState({password:'',email:''})
    const handleSubmit=(e)=>{
        e.preventDefault()
      signInWithEmailAndPassword(auth, deatils.email, deatils.password)
      .then((userCredential) => {
        const userdetails = userCredential.user;
        setUser(userdetails)
      })
      .catch((error) => {
       const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      });
        }
        useEffect(()=>{
          if(user){
            router.push('/Profile')
          }
        },[user])
          return (
            <div className={styles.contain}>
                <form className={styles.input_form} onSubmit={handleSubmit}>
                <input type='password' placeholder='password' onChange={(e)=>{setDetails({...deatils,password:e.target.value})}}/>
                <input type='text' placeholder='email' onChange={(e)=>{setDetails({...deatils,email:e.target.value})}}/>
                <button type='submit'>sign in</button>
                </form>
            </div>
          )
}

export default Page



