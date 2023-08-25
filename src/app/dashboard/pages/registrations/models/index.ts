import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Registration {
    id: number;
    studentId: number;
    courseId: number;
  }
  

  export interface RegistrationWithStudentAndCourse extends Registration {
    student: Student;
    course: Course;
  }

  export interface CreateRegistrationData {
    studentId: number | null;
    courseId: number | null;
  }