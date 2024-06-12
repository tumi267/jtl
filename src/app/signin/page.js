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
    const [logger,setlogger]=useState('singin')
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
    const handleReg=async(e)=>{
      e.preventDefault()
      console.log(deatils)
    }
        useEffect(()=>{
          if(user){
            router.push('/Profile')
          }
        },[user])
        if(logger=='singin'){
          return (
            <div className={styles.contain}>
                <form className={styles.input_form} onSubmit={handleSubmit}>
                <input type='text' placeholder='email' onChange={(e)=>{setDetails({...deatils,email:e.target.value})}}/>
                <input type='password' placeholder='password' onChange={(e)=>{setDetails({...deatils,password:e.target.value})}}/>
                <button type='submit'>sign in</button>
                <br/>
                <button onClick={()=>{setlogger('register')}}>sing up</button>
                </form>
                
            </div>
          )
        }else{
          return(
            <div className={styles.contain}>
                <form className={styles.input_form} onSubmit={handleReg}>
                <input type='text' placeholder='email' onChange={(e)=>{setDetails({...deatils,email:e.target.value})}}/>
                <input type='text' placeholder='name' onChange={(e)=>{setDetails({...deatils,name:e.target.value})}}/>
                <select name="plan" onChange={(e)=>{setDetails({...deatils,plan:e.target.value})}}>
                  <option value="" disabled selected>Select a plan</option>
                  <option value="plan1">Plan 1</option>
                  <option value="plan2">Plan 2</option>
                  <option value="plan3">Plan 3</option>
                </select>
                <input type='password' placeholder='password' onChange={(e)=>{setDetails({...deatils,password:e.target.value})}}/>
                <button type='submit'>register acc</button>
                <br/>
                <button onClick={()=>{setlogger('singin')}}>sign in</button>
                </form>
                
            </div>
          )
        }

}

export default Page



