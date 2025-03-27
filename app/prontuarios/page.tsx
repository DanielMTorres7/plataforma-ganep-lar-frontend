'use client';

import { useEffect, useState } from "react";

import './styles.css';

import useFetchData from '@/app/hooks/useFetchData';



export default function HospitalizacoesDashboard() {
    const { data: prontuarioData, loading } = useFetchData<any>({
        endpoint: 'prontuario',
        body: {
            prontuario: 59
        },
        defaultData: null,
    });

    // se nn tiver data ou estiver carregando, exibe mensagem de carregando
    if (!prontuarioData || loading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div className="dashboard" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '100%' }}>

            <h1>Dashboard de Hospitalizações</h1>
            <h2>Paciente: {prontuarioData.PACIENTE}</h2>
            <h3>Prontuário: {prontuarioData.PRONTUARIO}</h3>
            <h4>Sexo: {prontuarioData.SEXO}</h4>
            <h5>Nascimento: {prontuarioData.NASCIMENTO}</h5>
            </div>
            {prontuarioData.ATENDIMENTOS.map((atendimento:any, index:any) => {
                const key = Object.keys(atendimento)[0];
                const data = atendimento[key];
                return (
                    <div key={index} style={{ border: '1px solid black', padding: '10px', width: '20%' }}>
                        <h1>ATENDIMENTO: {data.ATENDIMENTO}</h1>
                        <h1>ENTRADA: {data.ENTRADA}</h1>
                        <h1>ALTA: {data.ALTA}</h1>
                        <h1>PROGRAMA: {data.PROGRAMA}</h1>
                        <h1>COMPLEXIDADE: {data.COMPLEXIDADE}</h1>
                        <h1>GRUPO_CID: {data.GRUPO_CID}</h1>
                        <h1>GRUPO_CEP: {data.GRUPO_CEP}</h1>
                        <h1>GRUPO: {data.GRUPO}</h1>
                        <h1>REGIAO: {data.REGIAO}</h1>
                        <h1>STATUS: {data.STATUS}</h1>
                        {data.INTERCORRENCIAS.map((intercorrencia:any, index:any) => {
                            return (
                                <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                                    <h1>CLASSIFICACAO: {intercorrencia.CLASSIFICACAO}</h1>
                                    <h1>DATA_INICIO: {intercorrencia.DATA_INICIO}</h1>
                                    <h1>DETALHE: {intercorrencia.DETALHE}</h1>
                                    <h1>STATUS: {intercorrencia.STATUS}</h1>
                                    <h1>TIPO: {intercorrencia.TIPO}</h1>
                                    <h1>URGENCIA: {intercorrencia.URGENCIA}</h1>
                                </div>
                            );
                        }
                        )}
                    </div>
                );
            })}

        </div>
    );
}