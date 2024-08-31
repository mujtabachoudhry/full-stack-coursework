import React, { useState } from 'react';
import FitnessForm from './FitnessForm'; // Import the FitnessForm component
import './Home.css';
import FitnessLogs from './FitnessLog';

function Home() {
    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    // Function to toggle the visibility of the form
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="home-container">
            <h1>Welcome To Fitness Application</h1>
            
            {/* Button to toggle the form visibility */}
            <button onClick={toggleForm}>
                {showForm ? 'Hide Form' : 'Show Form to create a fitness log'}
            </button>

            {/* Conditionally render the FitnessForm based on showForm state */}
            {showForm && <FitnessForm />}


            <FitnessLogs />
        </div>
    );
}

export default Home;
