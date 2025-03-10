
export interface KeyValue {
    label: string;
    value: string;
}

export interface DispositivosData {
    atendimentos: number;
    tqt: number;
    gtt_sne: number;
    cvd_cva: number;
    picc: number;
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