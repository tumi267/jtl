'use client'
import { useRouter } from 'next/navigation'
import styles from './signin.module.css'
import { Suspense, useEffect, useState } from 'react'
import { UserState } from '../context/context'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db/firebase'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Loading from '../loading'

function Page() {
  // Initialize necessary hooks and state variables
  const router = useRouter(); // Next.js router hook
  const { user, setUser } = UserState(); // User context state
  const [details, setDetails] = useState({ password: '', email: '', priceplan: '', name: '' }); // Form input details
  const [logger, setLogger] = useState('signin'); // State to toggle between signin and register mode
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password
  const [isEmailValid, setIsEmailValid] = useState(false); // State to validate email format
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State to validate password format
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true); // State to check if passwords match
  const [passIsDisplay,setPassIsDisplay]=useState(false)
  // Handle email input change and validate format
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setDetails({ ...details, email });
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  // Handle password input change and validate format
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setDetails({ ...details, password });
    // Password must be at least 8 characters, include at least one special character and one number
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    setIsPasswordValid(passwordRegex.test(password));
    setDoPasswordsMatch(password === confirmPassword);
  };

  // Handle confirm password input change and validate match with password
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setDoPasswordsMatch(details.password === confirmPassword);
  };

  // Handle registration form submission
  const handleReg = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      // Proceed with registration
      createUserWithEmailAndPassword(auth, details.email, details.password)
        .then((userCredential) => {
    
          setDetails({ password: '', email: '', priceplan: '', name: '' }); // Clear form inputs
          setConfirmPassword(''); // Clear confirm password
          const userdetails = userCredential.user;
          setUser(userdetails); // Set user context
          // Redirect to profile page
          router.push('/Profile');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage); // Log error message
          // Handle error display or feedback
        });
    } else {
      // Show error message or handle invalid input
      console.log('Invalid input');
    }
  };

  // Handle signin form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        const userdetails = userCredential.user;
        setUser(userdetails); // Set user context
        // Redirect to profile page
        if(userdetails.uid==process.env.NEXT_PUBLIC_uid){
          router.push(`/admin?${process.env.NEXT_PUBLIC_uid}`);
        }else{
          router.push('/Profile');
        }

      })
      .catch((error) => {
        const errorMessage = error.message;
        alert('Invalid email or password'); // Alert for incorrect credentials
        console.log(errorMessage); // Log error message
      });
  };

  // Effect to redirect to profile page if user is logged in
  useEffect(() => {
    if (user) {
      if(user.uid==process.env.NEXT_PUBLIC_uid){
        router.push(`/admin?member=${process.env.NEXT_PUBLIC_uid}`);
      }else{
        router.push('/Profile');
      }
    }
  }, [user, router]);
  const displaypass=(e)=>{
    e.preventDefault()
    setPassIsDisplay((prev) => !prev)
  }
    // JSX structure for the signin/register form
    return (
      <div className={styles.contain}>
        
        {logger === 'signin' ? ( // Conditional rendering based on logger state
          <form className={styles.input_form} onSubmit={handleSubmit}>
            <input type='text' placeholder='email' onChange={handleEmailChange} />
            <span className={styles.contain_pass}>
            <input className={styles.input_password} type={passIsDisplay==false?'password':'text'} placeholder='password' onChange={handlePasswordChange} />
            {passIsDisplay==true?<VisibilityOffRoundedIcon onClick={displaypass}/>:
            <VisibilityRoundedIcon  onClick={displaypass}/>}
            </span>
            <button type='submit'>Sign In</button>
            <br />
            <button type='button' onClick={() => setLogger('register')}>Sign Up</button>
          </form>
        ) : (
          <form className={styles.input_form} onSubmit={handleReg}>
            <input type='text' placeholder='email' onChange={handleEmailChange} />
            <input type='text' placeholder='name' onChange={(e) => setDetails({ ...details, name: e.target.value })} />
            <select name="plan" value={details.priceplan} onChange={(e) => setDetails({ ...details, priceplan: e.target.value })}>
              <option value="" disabled>Select a plan</option>
              <option value="plan1">Plan 1</option>
              <option value="plan2">Plan 2</option>
              <option value="plan3">Plan 3</option>
            </select>
            <input type='password' placeholder='password' onChange={handlePasswordChange} />
            {isPasswordValid == false && <p>Password must be at least 8 characters, include at least one special character and one number</p>}
            <input type='password' placeholder='confirm password' onChange={handleConfirmPasswordChange} />
            {doPasswordsMatch == false && <p>Passwords do not match</p>}
            <button type='submit' disabled={!isEmailValid || !isPasswordValid || !doPasswordsMatch}>Register</button>
            <br />
            <button type='button' onClick={() => setLogger('signin')}>Sign In</button>
          </form>
        )}
        
      </div>
    );
  }

export default Page



