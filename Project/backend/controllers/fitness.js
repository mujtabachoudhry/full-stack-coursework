const FitnessLog = require("../models/fitness");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var _ = require("lodash");

// Create a new fitness log
exports.createFitnessLog = async (req, res) => {

    const { user_id, date, exercise, duration, calories_burned, intensity, notes } = req.body;
    try {
        const fitnessLog = new FitnessLog({
            user_id,
            date,
            exercise,
            duration,
            calories_burned,
            intensity,
            notes
        });
        await fitnessLog.save();
        res.status(200).json(fitnessLog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create fitness log' });
    }
};


// Retrieve fitness logs with pagination
exports.getFitnessLogs = async (req, res) => {
    try {
        // Fetch all fitness logs from the database and sort them by date in descending order
        const fitnessLogs = await FitnessLog.find().sort({ date: -1 });

        // Send the fetched logs as the response
        res.status(200).json(fitnessLogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch fitness logs" });
    }
};

// Update a specific fitness log by ID
exports.updateFitnessLog = async (req, res) => {
    const { logId } = req.params;
    const updates = req.body;
    try {
        const fitnessLog = await FitnessLog.findByIdAndUpdate(
            logId,
            updates,
            { new: true }
        );
        if (!fitnessLog) {
            return res.status(404).json({ error: 'Fitness log not found' });
        }
        res.status(200).json(fitnessLog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update fitness log' });
    }
};

// Delete a specific fitness log by ID
exports.deleteFitnessLog = async (req, res) => {
    const { logId } = req.params;
    try {
        const fitnessLog = await FitnessLog.findByIdAndDelete(logId);
        if (!fitnessLog) {
            return res.status(404).json({ error: 'Fitness log not found' });
        }
        res.status(200).json({ message: 'Fitness log deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete fitness log' });
    }
};
