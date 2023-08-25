import { Course } from "../../courses/models";

export interface Teacher {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    courseId: number;
  }

  export interface TeacherWithCourse extends Teacher {
    course: Course;
  } 

  export interface CreateTeacherData {
    nombre: string | null;
    apellido: string | null;
    email: string | null;
    courseId: number | null;
  }

