-- 1.) Total Number of Students
SELECT COUNT(*) AS total_students FROM students;

-- 2.) Average Grade Across All Students
SELECT ROUND(AVG(score), 2) AS avg_grade FROM grades;

-- 3.) Attendance Rate
SELECT 
    ROUND(SUM(CASE WHEN s.status_name = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS attendance_rate
FROM attendance a
JOIN attendance_status s ON a.status_id = s.status_id;

-- 4.) Number of Top Performing Students (Average Grade ≥ 90%)
SELECT COUNT(*) AS top_performers
FROM (
        SELECT student_id, AVG(score) AS avg_score
        FROM grades
        GROUP BY student_id
        HAVING avg_score >= 90
) AS top_students;

-- 5.) Monthly Grade Trend (Line Chart)
SELECT DATE_FORMAT(date_recorded, '%Y-%m') AS month, ROUND(AVG(score),2) AS avg_grade
FROM grades
GROUP BY month
ORDER BY month;

-- 6.) Grade Distribution by Subject (Bar Chart)
SELECT sub.subject_name, ROUND(AVG(g.score), 2) AS avg_score
FROM grades g
JOIN subjects sub ON g.subject_id = sub.subject_id
GROUP BY sub.subject_name;

-- 7.) Attendance Breakdown (Pie/Donut Chart)
SELECT s.status_name, COUNT(*) AS count
FROM attendance a
JOIN attendance_status s ON a.status_id = s.status_id
GROUP BY s.status_name;

-- 8.) Performance vs Attendance Correlation (Radar/Scatter Chart)
SELECT stu.name,
             ROUND(AVG(g.score),2) AS avg_grade,
             ROUND(SUM(CASE WHEN ats.status_name = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.attendance_id), 2) AS attendance_percentage
FROM students stu
JOIN grades g ON stu.student_id = g.student_id
JOIN attendance a ON stu.student_id = a.student_id
JOIN attendance_status ats ON a.status_id = ats.status_id
GROUP BY stu.student_id;

-- 9.) Gender Distribution (Pie/Donut Chart)
SELECT g.gender_name, COUNT(*) AS count
FROM students s
JOIN genders g ON s.gender_id = g.gender_id
GROUP BY g.gender_name;

-- 10.) Students With Perfect Attendance
SELECT s.name
FROM students s
WHERE NOT EXISTS (
        SELECT 1 FROM attendance a
        JOIN attendance_status ats ON a.status_id = ats.status_id
        WHERE a.student_id = s.student_id AND ats.status_name != 'Present'
);

-- 11.) Average Activity Score by Type
SELECT at.type_name, ROUND(AVG(a.score), 2) AS avg_score
FROM activities a
JOIN activity_types at ON a.activity_type_id = at.activity_type_id
GROUP BY at.type_name;
