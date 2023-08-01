export interface Course {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
}

export interface CreateCourseData {
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
}

export interface UpdateCourseData {
    nombre?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
}