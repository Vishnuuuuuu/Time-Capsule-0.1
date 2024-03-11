import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthValue } from './AuthContext';
import { auth } from './firebase';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate('/verify-email');
            })
            .catch(err => setError(err.message));
        } else {
          navigate('/dashboard'); // Redirects to Dashboard upon successful login
        }
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Log in Version 1</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have an account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
