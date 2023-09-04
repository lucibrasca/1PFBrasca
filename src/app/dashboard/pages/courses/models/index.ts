import { Teacher } from "../../teachers/models";

export interface Course {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    teacherId: number;
}


export interface CourseWithTeacher extends Course {
    teacher: Teacher;
  } 

export interface CreateCourseData {
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    teacherId: number | null;
}

export interface UpdateCourseData {
    nombre?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    teacherId?: number;
}