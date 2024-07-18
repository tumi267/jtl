import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import { useEffect, useState } from 'react';
import { UserState } from '../context/context';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../db/firebase';

function Page() {
  const router = useRouter();
  const { user, setUser } = UserState();

  // State variables for form inputs and validation
  const [details, setDetails] = useState({ password: '', email: '', priceplan: '', name: '' });
  const [logger, setLogger] = useState('signin');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  // Function to handle email input change and validate email
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setDetails({ ...details, email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  // Function to handle password input change and validate password
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setDetails({ ...details, password });
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    setIsPasswordValid(passwordRegex.test(password));
    setDoPasswordsMatch(password === confirmPassword);
  };

  // Function to handle confirm password input change and validate matching passwords
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setDoPasswordsMatch(details.password === confirmPassword);
  };

  // Function to handle user registration
  const handleReg = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      createUserWithEmailAndPassword(auth, details.email, details.password)
        .then((userCredential) => {
          console.log('Registration successful');
          setDetails({ password: '', email: '', priceplan: '', name: '' });
          setConfirmPassword('');
          const userdetails = userCredential.user;
          setUser(userdetails);
          // Redirect to profile page or any other route after successful registration
          router.push('/Profile');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          // Handle error messages or display to the user
        });
    } else {
      // Show error message or handle invalid input
      console.log('Invalid input');
    }
  };

  // Function to handle user sign-in
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        const userdetails = userCredential.user;
        setUser(userdetails);
        // Redirect to profile page or any other route after successful sign-in
        router.push('/Profile');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert('Invalid email or password');
        console.log(errorMessage);
      });
  };

  // Effect to redirect user to profile page if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/Profile');
    }
  }, [user, router]);

  return (
    <div className={styles.contain}>
      {logger === 'signin' ? (
        <form className={styles.input_form} onSubmit={handleSubmit}>
          <input type='text' placeholder='Email' onChange={handleEmailChange} />
          <input type='password' placeholder='Password' onChange={handlePasswordChange} />
          <button type='submit'>Sign In</button>
          <br />
          <button type='button' onClick={() => setLogger('register')}>Register</button>
        </form>
      ) : (
        <form className={styles.input_form} onSubmit={handleReg}>
          <input type='text' placeholder='Email' onChange={handleEmailChange} />
          <input type='text' placeholder='Name' onChange={(e) => setDetails({ ...details, name: e.target.value })} />
          <select name="plan" value={details.priceplan} onChange={(e) => setDetails({ ...details, priceplan: e.target.value })}>
            <option value="" disabled>Select a plan</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan3">Plan 3</option>
          </select>
          <input type='password' placeholder='Password' onChange={handlePasswordChange} />
          {!isPasswordValid && <p>Password must be at least 8 characters, include at least one special character and one number</p>}
          <input type='password' placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
          {!doPasswordsMatch && <p>Passwords do not match</p>}
          <button type='submit' disabled={!isEmailValid || !isPasswordValid || !doPasswordsMatch}>Register</button>
          <br />
          <button type='button' onClick={() => setLogger('signin')}>Sign In</button>
        </form>
      )}
    </div>
  );
}

export default Page;



