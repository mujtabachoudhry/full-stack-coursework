const express = require("express");
const router = express.Router();

const {
    createFitnessLog,
    getFitnessLogs,
    updateFitnessLog,
    deleteFitnessLog,
} = require("../controllers/fitness");

// API routes
router.get("/fitness-logs", getFitnessLogs);                 // Retrieve fitness logs with pagination
router.post("/fitness-logs", createFitnessLog);              // Create a new fitness log
router.put("/fitness-logs/:logId", updateFitnessLog);        // Update a specific fitness log by ID
router.delete("/fitness-logs/:logId", deleteFitnessLog);     // Delete a specific fitness log by ID

module.exports = router;
