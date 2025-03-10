'use client'; // Indica que este é um Client Component

import { useState } from 'react';
import { OrcamentoData, PlanilhaAtendimentos } from '../../../types/types';
import PlanilhaAtendimentosComponent from '../PlanilhasAtendimentos/PlanilhaAtendimentos';
import './styles.css';

interface OrcamentosComponentProps {
  data: OrcamentoData;
}

export default function OrcamentosComponent({ data }: OrcamentosComponentProps) {
  const [visibleChildren, setVisibleChildren] = useState<{ [key: string]: boolean }>({});
  
  const toggleVisibility = (id: string) => {
    setVisibleChildren(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="orcamento">
      {data.children.length > 0 && <button className='toggle_visibility' onClick={() => toggleVisibility(data.title)}>{visibleChildren[data.title] ? "-" : "+" }</button>}
      <div className="infos">
        <div style={{ width: '170px', display: 'inline-block' }}>{data.title}</div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- Valor Orçado <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.orcado.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- Custo Total <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.custo.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- Não Orçado <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.custo_nao_orcado.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '205px', display: 'inline-block' }}>
          -- Não Programado <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.receita_nao_realizada.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '390px', display: 'inline-block' }}>
          -- Ticket Médio <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.ticket_medio.toLocaleString('pt-BR')} ({data.atendimentos} atendimentos)</span>
        </div>
        <br />
        <div style={{ width: '170px', display: 'inline-block' }}>
          MC Geral <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_geral}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- DIA <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_dia}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MOD <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_mod}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MAT <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_mat}%</span>
        </div>
        <div style={{ width: '205px', display: 'inline-block' }}>
          -- EQG <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_eqg}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- OUT <span style={{ fontWeight: 'normal' }}>&nbsp;{data.margem_contribuicao_out}</span>
        </div>
        <br />
        <div style={{ width: '170px', display: 'inline-block' }}>Margem | Participação</div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- DIA <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_dia.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MOD <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_mod.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MAT <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_mat.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '205px', display: 'inline-block' }}>
          -- EQG <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_eqg.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- OUT <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_out.toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- IMP <span style={{ fontWeight: 'normal' }}>&nbsp;R$ {data.margem_participacao_imp.toLocaleString('pt-BR')}</span>
        </div>
        <br />
        <div style={{ width: '365px', display: 'inline-block' }}>Custo/Receita | Pacote</div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MOD <span style={{ fontWeight: 'normal' }}>&nbsp;{data.custo_receita_mod}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- MAT <span style={{ fontWeight: 'normal' }}>&nbsp;{data.custo_receita_mat}%</span>
        </div>
        <div style={{ width: '205px', display: 'inline-block' }}>
          -- EQG <span style={{ fontWeight: 'normal' }}>&nbsp;{data.custo_receita_eqg}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- OUT <span style={{ fontWeight: 'normal' }}>&nbsp;{data.custo_receita_out}%</span>
        </div>
        <div style={{ width: '195px', display: 'inline-block' }}>
          -- IMP <span style={{ fontWeight: 'normal' }}>&nbsp;{data.custo_receita_imp}%</span>
        </div>
      </div>
      <div style={{ display: visibleChildren[data.title] ? 'block' : 'none' , width: '100%' }}>
        {
          data.children.map((child: OrcamentoData | Array<PlanilhaAtendimentos>) => (
            Array.isArray(child)
              ? <PlanilhaAtendimentosComponent key={child[0].atendimento.atendimento} Atendimentos={child} />
              : <OrcamentosComponent key={child.title} data={child} />
          ))
        }
      </div>
    </div>
  );
}