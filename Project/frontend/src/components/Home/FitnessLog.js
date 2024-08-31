import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FitnessLogs.css'; // Import the CSS file for styling

const FitnessLogs = () => {
    const [fitnessLogs, setFitnessLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editedLog, setEditedLog] = useState({});

    useEffect(() => {
        const fetchFitnessLogs = async () => {
            try {
                const url = 'http://localhost:8080/fitness-logs'; // Adjusted URL
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFitnessLogs(response.data);
            } catch (err) {
                setError('Failed to fetch fitness logs.');
            } finally {
                setLoading(false);
            }
        };

        fetchFitnessLogs();
    }, []);

    const handleEdit = (log) => {
        setEditMode(log._id);
        setEditedLog(log);
    };

    const handleDelete = async (logId) => {
        try {
            const url = `http://localhost:8080/fitness-logs/${logId}`; // Adjusted URL
            await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFitnessLogs(fitnessLogs.filter(log => log._id !== logId));
        } catch (err) {
            setError('Failed to delete fitness log.');
        }
    };

    const handleUpdate = async () => {
        try {
            const url = `http://localhost:8080/fitness-logs/${editMode}`; // Adjusted URL
            const response = await axios.put(url, editedLog, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const updatedLog = response.data;
            setFitnessLogs(fitnessLogs.map(log => (log._id === updatedLog._id ? updatedLog : log)));
            setEditMode(null);
            setEditedLog({});
        } catch (err) {
            setError('Failed to update fitness log.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="fitness-logs-container">
            <h2>Fitness Logs</h2>
            <ul className="fitness-logs-list">
                {fitnessLogs.map(log => (
                    <li key={log._id} className="fitness-log-item">
                        <div className="fitness-log-details">
                            <div><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</div>
                            <div><strong>Exercise:</strong> {log.exercise}</div>
                            <div><strong>Duration:</strong> {log.duration} minutes</div>
                            <div><strong>Calories Burned:</strong> {log.calories_burned}</div>
                            <div><strong>Intensity:</strong> {log.intensity}</div>
                            <div><strong>Notes:</strong> {log.notes}</div>
                        </div>
                        <div className="fitness-log-actions">
                            {editMode === log._id ? (
                                <div className="fitness-log-edit">
                                    <input
                                        type="text"
                                        value={editedLog.exercise}
                                        onChange={(e) => setEditedLog({ ...editedLog, exercise: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        value={editedLog.duration}
                                        onChange={(e) => setEditedLog({ ...editedLog, duration: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        value={editedLog.calories_burned}
                                        onChange={(e) => setEditedLog({ ...editedLog, calories_burned: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        value={editedLog.intensity}
                                        onChange={(e) => setEditedLog({ ...editedLog, intensity: e.target.value })}
                                    />
                                    <textarea
                                        value={editedLog.notes}
                                        onChange={(e) => setEditedLog({ ...editedLog, notes: e.target.value })}
                                    />
                                    <button onClick={handleUpdate}>Update</button>
                                    <button onClick={() => setEditMode(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="fitness-log-buttons">
                                    <button onClick={() => handleEdit(log)}>Edit</button>
                                    <button onClick={() => handleDelete(log._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FitnessLogs;
