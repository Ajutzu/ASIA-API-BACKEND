import express from 'express';
import * as analytics from '../controllers/analytics.js';

const router = express.Router();

router.get('/total-students', analytics.totalStudents);
router.get('/average-grade', analytics.averageGrade);
router.get('/attendance-rate', analytics.attendanceRate);
router.get('/top-performers', analytics.topPerformers);
router.get('/monthly-grade-trend', analytics.monthlyGradeTrend);
router.get('/grade-distribution', analytics.gradeDistribution);
router.get('/attendance-breakdown', analytics.attendanceBreakdown);
router.get('/performance-vs-attendance', analytics.performanceVsAttendance);
router.get('/gender-distribution', analytics.genderDistribution);
router.get('/perfect-attendance', analytics.perfectAttendance);
router.get('/activity-score-average', analytics.activityScoreAverage);

export default router;
