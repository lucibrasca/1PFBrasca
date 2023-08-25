export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    token: string;
    rol: "ADMINISTRADOR" | "USUARIO";
  }

  export interface CreateUserData {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    rol: "ADMINISTRADOR" | "USUARIO";
  }

  export interface UpdateUserData {
    nombre?: string;
    apellido?: string;
    email?: string;
    contrasenia?: string;
    rol?: "ADMINISTRADOR" | "USUARIO";

  }