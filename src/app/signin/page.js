'use client'
import { useRouter } from 'next/navigation'
import styles from './signin.module.css'
import { useEffect, useState } from 'react'
import { UserState } from '../context/context'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db/firebase'
function Page() {
  const router = useRouter();
  const { user, setUser } = UserState();
  const [details, setDetails] = useState({ password: '', email: '', priceplan: '', name: '' });
  const [logger, setLogger] = useState('signin');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setDetails({ ...details, email });
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setDetails({ ...details, password });
    // Password must be at least 8 characters, include at least one special character and one number
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    setIsPasswordValid(passwordRegex.test(password));
    setDoPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setDoPasswordsMatch(details.password === confirmPassword);
  };

  const handleReg = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      // Proceed with registration
      console.log(details);
      console.log('Registration successful');
    } else {
      // Show error message or handle invalid input
      console.log('Invalid input');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        const userdetails = userCredential.user;
        setUser(userdetails);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (user) {
      router.push('/Profile');
    }
  }, [user, router]);

  return (
    <div className={styles.contain}>
      {logger === 'signin' ? (
        <form className={styles.input_form} onSubmit={handleSubmit}>
          <input type='text' placeholder='email' onChange={handleEmailChange} />
          <input type='password' placeholder='password' onChange={handlePasswordChange} />
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
          {isPasswordValid==false&&<p>Password must be at least 8 characters, include at least one special character and one number</p>}
          <input type='password' placeholder='confirm password' onChange={handleConfirmPasswordChange} />
          {doPasswordsMatch==false&&<p>password do not match</p>}
          <button type='submit' disabled={!isEmailValid || !isPasswordValid || !doPasswordsMatch}>Register</button>
          <br />
          <button type='button' onClick={() => setLogger('signin')}>Sign In</button>
        </form>
      )}
    </div>
  );
}

export default Page



