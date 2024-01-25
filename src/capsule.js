import React, { useState } from 'react';
import { storage, auth } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './capsule.css';

function Capsule() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [capsuleName, setCapsuleName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is authenticated
  if (!auth.currentUser) {
    navigate('/login');
    return null;
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 20 * 1024 * 1024) { // 20MB limit
      setFile(selectedFile);
      setError('');
    } else {
      setError('File size should be less than 20MB');
    }
  };

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const onCapsuleNameChange = (e) => {
    setCapsuleName(e.target.value);
  };

  const createCapsule = async () => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    // Check if the selected date is in the past
    if (selectedDate < currentDate) {
      setError("You can't travel back in time. Please select a future date.");
      return;
    }

    if (!file || !date || !capsuleName) {
      setError('Please select a file, a date, and enter a capsule name');
      return;
    }

    const fileRef = ref(storage, `capsules/${auth.currentUser.uid}/${capsuleName}/${file.name}`);
    const metadata = {
      customMetadata: {
        'maturityDate': date,
        'userEmail': auth.currentUser.email,
        'capsuleName': capsuleName
      }
    };

    try {
      await uploadBytes(fileRef, file, metadata);
      alert('Capsule created successfully ');
      navigate('/'); // Redirect to dashboard or capsule list
    } catch (error) {
      console.error('Error creating capsule:', error);
      setError(error.message);
    }
  };

  return (
    <div className='center'>
      <div className='capsule'>
        <h1>Create a New Capsule</h1>
        <input type="text" onChange={onCapsuleNameChange} placeholder="Enter Capsule Name" />
        <input type="file" onChange={onFileChange} />
        <input type="date" onChange={onDateChange} />
        <button onClick={createCapsule}>Create Capsule</button>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
}

export default Capsule;
