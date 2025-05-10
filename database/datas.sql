INSERT INTO genders (gender_name) VALUES
('Male'),
('Female'),
('Other');

INSERT INTO sections (section_name) VALUES
('Section A'),
('Section B'),
('Section C'),
('Section D');

INSERT INTO students (name, gender_id, section_id, date_of_birth) VALUES
('John Smith', 1, 1, '2010-05-15'),
('Emily Johnson', 2, 1, '2010-03-22'),
('Michael Williams', 1, 2, '2010-07-10'),
('Jessica Brown', 2, 2, '2010-09-08'),
('David Jones', 1, 3, '2010-01-30'),
('Sophia Garcia', 2, 3, '2010-11-12'),
('James Miller', 1, 4, '2010-04-25'),
('Olivia Davis', 2, 4, '2010-08-17'),
('Daniel Rodriguez', 1, 1, '2010-02-28'),
('Emma Martinez', 2, 2, '2010-06-19');

INSERT INTO subjects (subject_name) VALUES
('Mathematics'),
('Science'),
('English'),
('History'),
('Computer Science');

INSERT INTO grades (subject_id, student_id, score, date_recorded) VALUES
(1, 1, 85.50, '2024-04-10'),
(1, 2, 90.25, '2024-04-10'),
(1, 3, 78.75, '2024-04-10'),
(2, 1, 82.00, '2024-04-12'),
(2, 4, 88.50, '2024-04-12'),
(3, 5, 79.75, '2024-04-15'),
(3, 6, 92.00, '2024-04-15'),
(4, 7, 86.25, '2024-04-17'),
(4, 8, 81.50, '2024-04-17'),
(5, 9, 95.75, '2024-04-20'),
(5, 10, 89.00, '2024-04-20');

INSERT INTO attendance_status (status_name) VALUES
('Present'),
('Absent'),
('Late'),
('Excused');

INSERT INTO attendance (student_id, date, status_id) VALUES
(1, '2024-05-01', 1),
(2, '2024-05-01', 1),
(3, '2024-05-01', 2),
(4, '2024-05-01', 1),
(5, '2024-05-01', 3),
(6, '2024-05-02', 1),
(7, '2024-05-02', 1),
(8, '2024-05-02', 4),
(9, '2024-05-02', 1),
(10, '2024-05-02', 2);

INSERT INTO activity_types (type_name) VALUES
('Sports'),
('Art'),
('Music'),
('Debate'),
('Science Project');

INSERT INTO activities (student_id, activity_type_id, score, date) VALUES
(1, 1, 88.00, '2024-04-25'),
(2, 2, 92.50, '2024-04-26'),
(3, 3, 85.75, '2024-04-27'),
(4, 4, 90.25, '2024-04-28'),
(5, 5, 94.00, '2024-04-29'),
(6, 1, 87.50, '2024-04-30'),
(7, 2, 91.75, '2024-05-01'),
(8, 3, 89.25, '2024-05-02'),
(9, 4, 93.50, '2024-05-03'),
(10, 5, 86.00, '2024-05-04');