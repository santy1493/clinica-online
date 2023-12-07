export interface Encuesta {
    id?: string;
    turno: string;
    paciente: string;
    especialista: string;
    especialidad?: string; 
    fecha: string;
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
}
