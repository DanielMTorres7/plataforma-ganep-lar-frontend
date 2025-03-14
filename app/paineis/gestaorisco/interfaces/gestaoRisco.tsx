import { atendimento } from "./atendimento";

export interface GestaoRiscoData {
    n_atendimentos: number;
    n_risco_nutri: atendimento[];
    n_ID: atendimento[];
    n_AD: atendimento[];
    n_gtt: atendimento[];
    n_sne: atendimento[];
    n_diabetes: atendimento[];
}