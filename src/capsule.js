import React, { useState } from 'react';
import { storage, auth } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './capsule.css';

function Capsule() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [capsuleName, setCapsuleName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const themeDescriptions = {
    'Celebration': "Store the memories of celebrations, e.g., B'day, party etc.",
    'Milestones': "Record key milestones, e.g., graduations, achievements, etc.",
    'Reflection': "Capture reflective moments, e.g., personal growth, life lessons, etc.",
    'Tribute': "Pay tribute, e.g., to loved ones, memorable events, etc.",
    'Union': "Cherish moments of union, e.g., weddings, reunions, etc.",
    'Wanderlust': "Document your travel adventures and explorations.",
    'Other': "Enter a custom description for your capsule."
  };

 const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    if (theme !== 'Other') {
      setCustomDescription('');
    }
  };
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 20 * 1024 * 1024) {
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

  const onCustomDescriptionChange = (e) => {
    setCustomDescription(e.target.value);
  };

  const createCapsule = async () => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate < currentDate) {
      setError("You can't travel back in time. Please select a future date.");
      return;
    }

    if (!file || !date || !capsuleName) {
      setError('Please select a file, a date, and enter a capsule name');
      return;
    }

    const metadata = {
      customMetadata: {
        'maturityDate': date,
        'userEmail': auth.currentUser.email,
        'capsuleName': capsuleName,
        'theme': selectedTheme,
        'customDescription': customDescription
      }
    };

    const fileRef = ref(storage, `capsules/${auth.currentUser.uid}/${capsuleName}/${file.name}`);

    try {
      await uploadBytes(fileRef, file, metadata);
      alert('Capsule created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating capsule:', error);
      setError(error.message);
    }
  };

  return (
    <div className='capsule-container'>
      <div className='capsule-form'>
        <h1>Create Capsule</h1>
        <input type="text" onChange={onCapsuleNameChange} placeholder="Enter Capsule Name" />
        <input type="file" onChange={onFileChange} />
        <input type="date" onChange={onDateChange} />
        
       <div className="theme-selection">
          {Object.keys(themeDescriptions).map((theme) => (
            <div
              key={theme}
              className={`theme-option ${selectedTheme === theme ? 'selected' : ''}`}
              onClick={() => handleThemeSelect(theme)}
            >
              {theme}
            </div>
          ))}
        </div>
        
        {selectedTheme && (
          <input
            type="text"
            value={customDescription}
            onChange={onCustomDescriptionChange}
            placeholder={themeDescriptions[selectedTheme]}
          />
        )}

        <button onClick={createCapsule}>Create Capsule</button>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
}

export default Capsule;
