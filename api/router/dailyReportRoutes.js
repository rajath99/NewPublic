// backend/routes/dailyReportRoutes.js

const express = require('express');
const router = express.Router();
const { saveOrUpdateReport, getReport } = require('../controller/dailyReportController');
// const auth = require('../middleware/auth'); // IMPORTANT: You MUST protect these routes!

// Route to save or update a report
router.post('/', /* auth, */ saveOrUpdateReport);

// Route to get a specific report
router.get('/:classId/:date', /* auth, */ getReport);

module.exports = router;