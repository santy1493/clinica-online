import { HistoriaClinica } from "./historia-clinica";
import { Usuario } from "./usuario";

export interface PacienteHistoria {
    paciente: Usuario;
    historias?: HistoriaClinica[];
}
