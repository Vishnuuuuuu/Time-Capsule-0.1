import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Ensure this file contains the necessary CSS

function Dashboard() {
  const navigate = useNavigate();

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
        <h1>Dashboard</h1>
        <div className='dashboard-cards'>
          <Card
            title="Create Capsule"
            description="Create a new time capsule to store your memories."
            image="/public/Capsule.jpeg" // Replace with your image path
            onClick={() => navigate('/capsule')}
          />
          <Card
            title="Show Capsules"
            description="View your existing time capsules."
            image="/path/to/your/show-capsules-image.jpg" // Replace with another image path
            onClick={() => navigate('/capsule-list')}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
