import React from 'react';
import './About.css'; // Make sure to create and import About.css

function About() {
  return (
    <div className="about-container">
      <h1>About DigiCapsule</h1>

      <section className="section-project-details">
        <h2>Overview</h2>
        <p>DigiCapsule is a digital platform aimed at preserving precious memories in the form of images and videos, encapsulating them in a unique, modern way...</p>
        {/* More overview content */}
      </section>

      <section className="section-project-details">
                <h2>Idea Generation</h2>
        <p>The concept of DigiCapsule originated from...</p>
        {/* More idea generation content */}
      </section>

      <section className="section-project-details">
                <h2>Problem Solving</h2>
        <p>Throughout the development process, we tackled various challenges such as...</p>
        {/* More problem-solving content */}
      </section>

      <section className="section-project-details">        <h2>Project Details</h2>
        <p>DigiCapsule is built with a focus on user experience, data security, and long-term digital preservation. Our journey began with...</p>
        {/* Detailed project description */}
      </section>
    </div>
  );
}

export default About;
