export interface OrcamentoData {
  title: string;
  orcado: number;
  custo: number;
  custo_nao_orcado: number;
  receita_nao_realizada: number;
  atendimentos: number;
  ticket_medio: number;
  margem_contribuicao_geral: string;
  margem_contribuicao_dia: string;
  margem_contribuicao_mod: string;
  margem_contribuicao_mat: string;
  margem_contribuicao_eqg: string;
  margem_contribuicao_out: string;
  margem_participacao_dia: number;
  margem_participacao_mod: number;
  margem_participacao_mat: number;
  margem_participacao_eqg: number;
  margem_participacao_out: number;
  margem_participacao_imp: number;
  custo_receita_mod: string;
  custo_receita_mat: string;
  custo_receita_eqg: string;
  custo_receita_out: string;
  custo_receita_imp: string;
  children: any;
}


export interface DadosAtendimento {
  mes: string;
  atendimento: string;
  paciente: string;
  admissao: string;
  alta: string | null; // Alta pode ser uma string ou null (para NaN)
}

interface DadosTotais {
  nao_orcado: number | null;
  nao_programado: number | null;
  total_orcado: number | null;
  custo_total: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
}

interface DadosDiariasPacotes {
  orcado_diarias: number | null;
  custo_diarias: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
}

interface DadosMod {
  orcado_mod: number | null;
  custo_aberto: number | null;
  custo_total: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
  custo_receita: number | null;
}

interface DadosMat {
  orcado_mat: number | null;
  custo_aberto: number | null;
  custo_total: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
  custo_receita: number | null;
}

interface DadosEqg {
  orcado_eqg: number | null;
  custo_aberto: number | null;
  custo_total: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
  custo_receita: number | null;
}

interface DadosOut {
  orcado_out: number | null;
  custo_aberto: number | null;
  custo_total: number | null;
  margem_contribuicao: string | null; // Margem pode ser uma string ou null
  custo_receita: number | null;
  custo_impostos: number | null;
}

export interface DadosDetalhes {
  regional: string;
  servico: string;
  empresa: string;
  unidade: string;
  convenio: string;
  carteira: string;
  contrato: string;
}

export interface PlanilhaAtendimentos {
  atendimento: DadosAtendimento;
  totais: DadosTotais;
  diarias_pacotes: DadosDiariasPacotes;
  mao_obra_direta: DadosMod;
  materias_medicamentos: DadosMat;
  equipamentos_gases: DadosEqg;
  outros_insumos: DadosOut;
  detalhamento_grupos: DadosDetalhes;
}