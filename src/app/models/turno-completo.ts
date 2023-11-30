import { HistoriaClinica } from "./historia-clinica";
import { Usuario } from "./usuario";

export interface TurnoCompleto {
    id?: string;
    paciente: Usuario;
    especialista: Usuario;
    especialidad?: string; 
    fecha: string;
    horaInicio: number;
    horaFin: number;
    estado: string;
    cancelado?: string[];
    rechazado?: string;
    finalizado?: string;
    historia?: HistoriaClinica
}
