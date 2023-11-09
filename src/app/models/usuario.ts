export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    dni: string;
    edad: number;
    obraSocial?: string;
    especialidad?: string[];
    email: string;
    imagenes?: string[];
    rol: string;
    activo: boolean;
}
