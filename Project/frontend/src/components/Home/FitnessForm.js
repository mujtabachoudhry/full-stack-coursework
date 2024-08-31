import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function FitnessForm({ userId }) {
    const [date, setDate] = useState('');
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [intensity, setIntensity] = useState('medium');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Full URL for the POST request
            const url = 'http://localhost:8080/fitness-logs'; // Replace with your backend URL

            // Send POST request with the full URL
            await axios.post(url, {
                user_id: localStorage.getItem('user_id'),
                date,
                exercise,
                duration,
                calories_burned: caloriesBurned,
                intensity,
                notes,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
                },
            });

            // Handle successful response
            setMessage('Fitness log added successfully!');
            // Reset form fields
            setDate('');
            setExercise('');
            setDuration('');
            setCaloriesBurned('');
            setIntensity('medium');
            setNotes('');
        } catch (err) {
            // Handle errors
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Failed to add fitness log.');
            } else {
                setError('An unexpected error occurred.');
            }
            setMessage(''); // Clear success messages on error
        }
    };

    return (
        <div className="fitness-form">
            <h2>Log Your Fitness Activity</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Exercise:</label>
                    <input
                        type="text"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Calories Burned:</label>
                    <input
                        type="number"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Intensity:</label>
                    <select
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Notes:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FitnessForm;
