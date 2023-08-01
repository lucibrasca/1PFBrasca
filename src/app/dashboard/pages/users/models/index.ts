export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
  }

  export interface CreateUserData {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
  }

  export interface UpdateUserData {
    nombre?: string;
    apellido?: string;
    email?: string;
    contrasenia?: string;
  }