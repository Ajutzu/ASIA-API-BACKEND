import db from '../database/connection.js';

export const totalStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total_students FROM students");
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const averageGrade = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT ROUND(AVG(score), 2) AS avg_grade FROM grades");
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const attendanceRate = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ROUND(SUM(CASE WHEN s.status_name = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS attendance_rate
      FROM attendance a
      JOIN attendance_status s ON a.status_id = s.status_id`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const topPerformers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS top_performers
      FROM (
          SELECT student_id, AVG(score) AS avg_score
          FROM grades
          GROUP BY student_id
          HAVING avg_score >= 90
      ) AS top_students`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const monthlyGradeTrend = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE_FORMAT(date_recorded, '%Y-%m') AS month, ROUND(AVG(score),2) AS avg_grade
      FROM grades
      GROUP BY month
      ORDER BY month`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const gradeDistribution = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT sub.subject_name, ROUND(AVG(g.score), 2) AS avg_score
      FROM grades g
      JOIN subjects sub ON g.subject_id = sub.subject_id
      GROUP BY sub.subject_name`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const attendanceBreakdown = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.status_name, COUNT(*) AS count
      FROM attendance a
      JOIN attendance_status s ON a.status_id = s.status_id
      GROUP BY s.status_name`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const performanceVsAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT stu.name,
             ROUND(AVG(g.score),2) AS avg_grade,
             ROUND(SUM(CASE WHEN ats.status_name = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.attendance_id), 2) AS attendance_percentage
      FROM students stu
      JOIN grades g ON stu.student_id = g.student_id
      JOIN attendance a ON stu.student_id = a.student_id
      JOIN attendance_status ats ON a.status_id = ats.status_id
      GROUP BY stu.student_id`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const genderDistribution = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT g.gender_name, COUNT(*) AS count
      FROM students s
      JOIN genders g ON s.gender_id = g.gender_id
      GROUP BY g.gender_name`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const perfectAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.name
      FROM students s
      WHERE NOT EXISTS (
          SELECT 1 FROM attendance a
          JOIN attendance_status ats ON a.status_id = ats.status_id
          WHERE a.student_id = s.student_id AND ats.status_name != 'Present'
      )`);
    if (rows.length === 0) return res.status(404).json({ message: 'No perfect attendance found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const activityScoreAverage = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT at.type_name, ROUND(AVG(a.score), 2) AS avg_score
      FROM activities a
      JOIN activity_types at ON a.activity_type_id = at.activity_type_id
      GROUP BY at.type_name`);
    if (rows.length === 0) return res.status(404).json({ message: 'No data found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
