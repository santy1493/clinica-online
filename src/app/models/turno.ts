export interface Turno {
    id?: string;
    paciente: string;
    especialista: string;
    especialidad?: string; 
    fecha: string;
    horaInicio: number;
    horaFin: number;
    estado: string;
    cancelado?: string[];
    rechazado?: string;
    finalizado?: string;
}
