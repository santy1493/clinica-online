export interface Horario {
    id?: string;
    especialista: string;
    especialidad: string;
    duracionTurno: number;
    lunes?: number[];
    martes?: number[];
    miercoles?: number[];
    jueves?: number[];
    viernes?: number[];
    sabado?: number[];
}
