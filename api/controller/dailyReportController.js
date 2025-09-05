// backend/controllers/dailyReportController.js

const DailyReport = require('../model/DailyReport');
const moment = require('moment');

// @desc    Save or Update a daily report for a class
// @route   POST /api/daily-reports
// @access  Private (e.g., Teachers, Admins)
exports.saveOrUpdateReport = async (req, res) => {
    const { classId, date, reportData } = req.body;

    if (!classId || !date || !reportData) {
        return res.status(400).json({ msg: 'Please provide all required fields.' });
    }

    try {
        // The query to find the document
        const query = {
            classId,
            date: moment(date).startOf('day').toDate(), // Normalize date to remove time part
        };

        // The update to apply
        const update = {
            reportData,
            lastModified: Date.now(),
        };

        // Options:
        // upsert: true -> If no document matches the query, create a new one.
        // new: true -> Return the modified document rather than the original.
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const report = await DailyReport.findOneAndUpdate(query, update, options);

        res.status(200).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Get a daily report for a specific class and date
// @route   GET /api/daily-reports/:classId/:date
// @access  Private
exports.getReport = async (req, res) => {
    try {
        const { classId, date } = req.params;

        const report = await DailyReport.findOne({
            classId,
            date: moment(date).startOf('day').toDate(), // Normalize date
        });

        if (!report) {
            // It's not an error if a report doesn't exist yet,
            // so we return null and a 200 status. The frontend will handle this.
            return res.status(200).json(null);
        }

        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};