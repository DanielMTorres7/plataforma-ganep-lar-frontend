import { atendimento } from "./atendimento";

export interface GestaoRiscoData {
    n_atendimentos: number;
    n_risco_nutri: atendimento[];
    n_ID: atendimento[];
    n_AD: atendimento[];
    n_gtt: atendimento[];
    n_sne: atendimento[];
    n_tqt: atendimento[];
    n_diabetes: atendimento[];
    visitas: {
        ESPECIALIDADE: string;
        PACIENTES: {
            PACIENTE: string;
            PRONTUARIO: number;
            ATENDIMENTO: number;
            OPERADORA: string;
            VISITCOUNT: number;
        }[]
        VISITCOUNT: number;
    }[]
    n_ccids:atendimento[];
}