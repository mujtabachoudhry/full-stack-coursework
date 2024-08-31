import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use POST request for registration
            const response = await axios.post('http://localhost:8080/register', {
                username,
                email,
                password,
            });

            // Handle successful response
            setMessage('Signup Successful! Please Login to proceed.');
            setError(''); // Clear any previous errors
        } catch (err) {
            // Handle errors
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Username or email is taken.');
            } else {
                setError('An unexpected error occurred.');
            }
            setMessage(''); // Clear any previous success messages
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;

