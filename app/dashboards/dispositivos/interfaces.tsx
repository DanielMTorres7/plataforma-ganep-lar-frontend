
export interface atendimento {
    PRONTUARIO: number;
    ALTA: string;
    ATENDIMENTO: number;
    CVA: boolean;
    CVD: boolean;
    ENTRADA: string;
    GTT: boolean;
    OPERADORA: string;
    PICC: boolean;
    SNE: boolean;
    STATUS: string;
    TQT: boolean;
}

export interface KeyValue {
    label: string;
    value: string;
}

export interface DispositivosData {
    atendimentos: number;
    tqt: atendimento[];
    gtt: atendimento[];
    sne: atendimento[];
    cvd: atendimento[];
    cva: atendimento[];
    picc: atendimento[];
    df_dispositivos: DFDispositivosData[];
    operadoras: KeyValue[];
}

export interface DFDispositivosData {
    mes: string;
    tqt: number;
    gtt: number;
    sne: number;
    cvd: number;
    cva: number;
    picc: number;
}