import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className='center'>
      <div className='dashboard'>
        <div className='dashboard-header'>
          <h1>Dashboard</h1>
          <div className='profile-icon' onClick={() => navigate('/profile')}>
            {/* Replace this with an actual icon if you have one */}
            <span role="img" aria-label="Profile">👤</span>
          </div>
        </div>
        <div className='dashboard-cards'>
          <div className='card' onClick={() => navigate('/capsule')}>
            Create Capsule
          </div>
          <div className='card' onClick={() => navigate('/capsule-list')}>
            Show Capsules
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
