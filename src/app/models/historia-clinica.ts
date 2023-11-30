export interface HistoriaClinica {
    id?: string,
    turno: string,
    paciente: string;
    especialista: string;
    especialidad: string;
    fecha: string;
    altura: number;
    peso: number;
    temperatura: number;
    presion: number;
    clave1?: string;
    valor1?: number;
    clave2?: string;
    valor2?: number;
    clave3?: string;
    valor3?: number;
}