// backend/models/DailyReport.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportEntrySchema = new Schema({
    pds: { type: String, required: true },
    subject: { type: String, default: '' },
    activitiesDone: { type: String, default: '' },
    assignments: { type: String, default: '' },
}, { _id: false }); // _id: false prevents MongoDB from creating ids for sub-documents

const DailyReportSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class', // Assumes you have a 'Class' model
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    reportData: [ReportEntrySchema], // An array of the entries from your form
    lastModified: {
        type: Date,
        default: Date.now,
    },
});

// Create a compound index to ensure only one report exists per class per day.
DailyReportSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyReport', DailyReportSchema);