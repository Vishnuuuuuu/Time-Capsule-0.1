import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Make sure this CSS file is updated with new styles
import { auth } from './firebase';

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
    <div className='auth-container'>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        {error && <div className='auth-error'>{error}</div>}
        <form onSubmit={register}>
          <input
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='auth-input'
          />
          <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className='auth-input'
          />
          <input
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='auth-input'
          />
          <div className='terms-container'>
            <input
              type='checkbox'
              id='acceptTerms'
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className='checkbox'
            />
            <label htmlFor='acceptTerms' className='checkbox-label'>
              I agree to the <Link to='/terms' className='auth-link'>Terms and Conditions</Link>
            </label>
          </div>
          <button type='submit' disabled={!acceptTerms} className='auth-button'>Register</button>
        </form>
        <p>
          Already have an account? <Link to='/login' className='auth-link'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
