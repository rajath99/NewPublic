// backend/routes/lessonPlanRoutes.js

const express = require('express');
const router = express.Router();
const { saveOrUpdateLessonPlan, getLessonPlan } = require('../controller/lessonPlanController');
// const auth = require('../middleware/auth'); // IMPORTANT: Protect these routes

// @route POST /api/lesson-plans
router.post('/', /* auth, */ saveOrUpdateLessonPlan);

// @route GET /api/lesson-plans/:teacherId/:date
router.get('/:teacherId/:date', /* auth, */ getLessonPlan);

module.exports = router;