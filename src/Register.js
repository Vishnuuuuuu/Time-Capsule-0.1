import React, { useState } from 'react';
import './Register.css'; // Ensure this CSS file exists and is styled as needed
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            navigate('/verify-email');
          })
          .catch(err => setError(err.message));
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className='register-container'>
      <div className='register-form'>
        <h1>Sign Up</h1>
        {error && <div className='register-error'>{error}</div>}
        <form onSubmit={register}>
          <input
            type='email'
            value={email}
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            value={password}
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='terms-container'>
            <input
              type='checkbox'
              id='acceptTerms'
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor='acceptTerms'>
              I agree to the <Link to='/terms'>Terms and Conditions</Link>
            </label>
          </div>
          <button type='submit' disabled={!acceptTerms}>Register</button>
        </form>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
