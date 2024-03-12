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

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
        navigate('/verify-email');
      } else {
        navigate('/dashboard'); // Redirects to Dashboard upon successful login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Login</h1>
        {error && <div className='login-error'>{error}</div>}
        <form onSubmit={login} className='login-form'>
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className='login-input'
          />
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='login-input'
          />
          <button type='submit' className='login-button'>Sign In</button>
        </form>
        <div className='login-footer'>
          Don't have an account? 
          <Link to='/register' className='login-link'> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
