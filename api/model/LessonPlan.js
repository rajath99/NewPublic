// backend/models/LessonPlan.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This defines the structure for ONE of the 5 sections
const PlanSectionSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    lesson: { type: String, default: '' },
    teachingAids: { type: String, default: '' },
    topicPresentation: { type: String, default: '' },
    assignments: { type: String, default: '' },
}, { _id: false });

const LessonPlanSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    schoolId: { // Assuming you have this from your other models
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    planSections: [PlanSectionSchema], // This will be an array of our 5 sections
}, { timestamps: true });

// Ensure only one lesson plan per teacher per day
LessonPlanSchema.index({ teacherId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('LessonPlan', LessonPlanSchema);