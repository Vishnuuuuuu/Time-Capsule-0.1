
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Ensure this file contains the necessary CSS
import { CgProfile } from "react-icons/cg";

function Dashboard() {
  const navigate = useNavigate();
  const [dynamicText, setDynamicText] = useState('');
  const sentences = [
      "We store memories, not just images/videos...",
      "We believe in quality over quantity(Max:3 capsules)...",
     "Unlock the past, relive the moment...",
      "Your future self will thank you...",
     "Time capsules: A journey to yesterday...",
      "Preserve today, cherish tomorrow...",
      "Where memories wait for you..."
  ];

  useEffect(() => {
    let currentSentence = 0;
    let currentChar = 0;
    let timer;

    const typeWriter = () => {
      if (currentChar < sentences[currentSentence].length) {
        setDynamicText((prev) => prev + sentences[currentSentence][currentChar]);
        currentChar++;
        timer = setTimeout(typeWriter, 100); // Speed of typing
      } else {
        setTimeout(() => {
          setDynamicText('');
          currentChar = 0;
          currentSentence = (currentSentence + 1) % sentences.length;
          typeWriter();
        }, 1000); // Wait a second after a sentence is completed
      }
    };

    typeWriter();

    return () => clearTimeout(timer);
  }, []);

  const Card = ({ title, description, image, onClick }) => {
    return (
      <div className='card' onClick={onClick}>
        <div className="card-image" style={{ backgroundImage: `url(${image})` }} />
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className='center'>
      <div className='dashboard'>
        
        {/* Profile Icon */}
        <div className="profile-icon" onClick={() => navigate('/profile')}>
            {/* Replace "👤" with an actual icon if you have one */}
            <span role="img" aria-label="Profile"><CgProfile /></span>
            <span className="profile-text">Profile</span> {/* Add this line */}
        </div>
        <h1>Dashboard</h1>
        
        <div className='dashboard-cards'>
          <Card
            title="Create Capsule"
            description="Create a new time capsule to store your memories."
            image="/image/CF.png" // Replace with your image path
            onClick={() => navigate('/capsule')}
          />
          <Card
            title="Show Capsules"
            description="View your existing time capsules."
            image="/image/Abc.png" // Replace with another image path
            onClick={() => navigate('/capsule-list')}
          />
        </div>
        <div className='dynamic-text-container'>
          <h2 className='dynamic-text'>{dynamicText}</h2>
          <h2 className='cursor' />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
