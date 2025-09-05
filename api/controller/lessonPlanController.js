// backend/controllers/lessonPlanController.js

const LessonPlan = require('../model/LessonPlan');
const moment = require('moment');

// Save or Update a lesson plan (using upsert)
exports.saveOrUpdateLessonPlan = async (req, res) => {
    const { teacherId, date, planSections } = req.body;
    const schoolId = req.user.schoolId; // From your auth middleware

    if (!teacherId || !date || !planSections) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const query = {
            teacherId,
            date: moment(date).startOf('day').toDate(),
            schoolId,
        };
        const update = { planSections };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const lessonPlan = await LessonPlan.findOneAndUpdate(query, update, options);
        res.status(200).json({ message: 'Lesson plan saved successfully', lessonPlan });

    } catch (error) {
        console.error('Error saving lesson plan:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a lesson plan for a specific teacher and date
exports.getLessonPlan = async (req, res) => {
    const { teacherId, date } = req.params;
    const schoolId = req.user.schoolId;

    try {
        const lessonPlan = await LessonPlan.findOne({
            teacherId,
            date: moment(date).startOf('day').toDate(),
            schoolId,
        }).populate('planSections.classId').populate('planSections.subjectId'); // Populate for potential display needs

        // It's okay if a plan doesn't exist, just return null
        if (!lessonPlan) {
            return res.status(200).json(null);
        }

        res.json(lessonPlan);
    } catch (error) {
        console.error('Error fetching lesson plan:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};