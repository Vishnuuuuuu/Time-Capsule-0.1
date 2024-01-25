import React from 'react';
import './profile.css';
import { useAuthValue } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Profile() {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to About Project page
  const goToAboutProject = () => {
    navigate('/about'); // Navigate to the 'about' route
  };

  return (
    <div className='center'>
      <div className='profile'>
        <h1>Profile</h1>
        <p><strong>Email: </strong>{currentUser?.email}</p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
        <br />
        <span onClick={goToAboutProject} style={{ cursor: 'pointer', textDecoration: 'underline' }}>About Project</span> {/* Link to About Project */}
      </div>
    </div>
  );
}

export default Profile;
