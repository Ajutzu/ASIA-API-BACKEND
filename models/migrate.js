import db from '../database/connection.js';
import colors from 'colors';

const migrations = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS genders (
      gender_id INT NOT NULL AUTO_INCREMENT,
      gender_name VARCHAR(10) NULL,
      PRIMARY KEY (gender_id)
    );`,

    `CREATE TABLE IF NOT EXISTS sections (
      section_id INT NOT NULL AUTO_INCREMENT,
      section_name VARCHAR(50) NULL,
      PRIMARY KEY (section_id)
    );`,

    `CREATE TABLE IF NOT EXISTS students (
      student_id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NULL,
      gender_id INT NOT NULL,
      section_id INT NOT NULL,
      date_of_birth DATE NULL,
      PRIMARY KEY (student_id)
    );`,

    `CREATE TABLE IF NOT EXISTS subjects (
      subject_id INT NOT NULL AUTO_INCREMENT,
      subject_name VARCHAR(100) NULL,
      PRIMARY KEY (subject_id)
    );`,

    `CREATE TABLE IF NOT EXISTS grades (
      grade_id INT NOT NULL AUTO_INCREMENT,
      subject_id INT NOT NULL,
      student_id INT NOT NULL,
      score DECIMAL(5,2) NULL,
      date_recorded DATE NULL,
      PRIMARY KEY (grade_id)
    );`,

    `CREATE TABLE IF NOT EXISTS attendance_status (
      status_id INT NOT NULL AUTO_INCREMENT,
      status_name VARCHAR(20) NULL,
      PRIMARY KEY (status_id)
    );`,

    `CREATE TABLE IF NOT EXISTS attendance (
      attendance_id INT NOT NULL AUTO_INCREMENT,
      student_id INT NOT NULL,
      date DATE NULL,
      status_id INT NOT NULL,
      PRIMARY KEY (attendance_id)
    );`,

    `CREATE TABLE IF NOT EXISTS activity_types (
      activity_type_id INT NOT NULL AUTO_INCREMENT,
      type_name VARCHAR(50) NULL,
      PRIMARY KEY (activity_type_id)
    );`,

    `CREATE TABLE IF NOT EXISTS activities (
      activity_id INT NOT NULL AUTO_INCREMENT,
      student_id INT NOT NULL,
      activity_type_id INT NOT NULL,
      score DECIMAL(5,2) NULL,
      date DATE NULL,
      PRIMARY KEY (activity_id)
    );`,

    `ALTER TABLE students
      ADD CONSTRAINT FK_genders_TO_students
      FOREIGN KEY (gender_id) REFERENCES genders(gender_id);`,

    `ALTER TABLE students
      ADD CONSTRAINT FK_sections_TO_students
      FOREIGN KEY (section_id) REFERENCES sections(section_id);`,

    `ALTER TABLE grades
      ADD CONSTRAINT FK_students_TO_grades
      FOREIGN KEY (student_id) REFERENCES students(student_id);`,

    `ALTER TABLE grades
      ADD CONSTRAINT FK_subjects_TO_grades
      FOREIGN KEY (subject_id) REFERENCES subjects(subject_id);`,

    `ALTER TABLE attendance
      ADD CONSTRAINT FK_students_TO_attendance
      FOREIGN KEY (student_id) REFERENCES students(student_id);`,

    `ALTER TABLE attendance
      ADD CONSTRAINT FK_attendance_status_TO_attendance
      FOREIGN KEY (status_id) REFERENCES attendance_status(status_id);`,

    `ALTER TABLE activities
      ADD CONSTRAINT FK_students_TO_activities
      FOREIGN KEY (student_id) REFERENCES students(student_id);`,

    `ALTER TABLE activities
      ADD CONSTRAINT FK_activity_types_TO_activities
      FOREIGN KEY (activity_type_id) REFERENCES activity_types(activity_type_id);`,
  ];

  try {

    const connection = await db.getConnection();
    connection.release(); 

    for (const [index, query] of queries.entries()) {
      await db.query(query); 
      console.log(colors.green(`Query ${index + 1} succeeded.`));
    }
    console.log(colors.green('All migrations completed successfully.'));
  } catch (err) {
    console.error(colors.red('Migration failed:'), err.message);
  }
};

migrations();