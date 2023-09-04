

export interface Teacher {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    
  }


  export interface CreateTeacherData {
    nombre: string | null;
    apellido: string | null;
    email: string | null;
    
  }

