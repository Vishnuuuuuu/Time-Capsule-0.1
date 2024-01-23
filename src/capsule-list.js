import React, { useState, useEffect } from 'react';
import { storage, auth } from './firebase';
import { ref, listAll, getMetadata } from 'firebase/storage'; // Import the necessary functions
import { useNavigate } from 'react-router-dom';
import './capsule-list.css'; // Import the CSS file
// ... rest of your imports

function CapsuleList() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const fetchCapsules = async () => {
      try {
        const capsulesRef = ref(storage, `capsules/${auth.currentUser.uid}/`);
        const capsuleFolders = await listAll(capsulesRef);

        const capsulesData = [];
        for (const folder of capsuleFolders.prefixes) {
          const files = await listAll(folder);
          for (const fileRef of files.items) {
            const metadata = await getMetadata(fileRef);
            capsulesData.push({
              name: folder.name, // Assuming folder name is the capsule name
              maturityDate: metadata.customMetadata?.maturityDate
            });
          }
        }

        setCapsules(capsulesData);
      } catch (error) {
        console.error("Error fetching capsules:", error);
      }
    };

    fetchCapsules();
  }, [navigate]);

  return (
    <div className='center'>
      <div className='capsule-list'>
        <h1>Your Capsules</h1>
        {capsules.map((capsule, index) => (
          <div key={index} className='capsule-item'>
            <h2>{capsule.name}</h2>
            <p>Unlocking Date: {capsule.maturityDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CapsuleList;
