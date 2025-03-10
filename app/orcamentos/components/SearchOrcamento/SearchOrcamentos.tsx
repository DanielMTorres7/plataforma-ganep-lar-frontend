'use client'; // Indica que este é um Client Component

import { useState } from 'react';
import './styles.css';

interface SearchOrcamentosComponentProps {
  onSearch: (date: string) => void; // Função de callback para enviar a data ao pai
}

export default function SearchOrcamentosComponent({ onSearch }: SearchOrcamentosComponentProps) {
  const [selectedDate, setSelectedDate] = useState('2024-01-01'); // Estado para armazenar a data

  const handleSearch = () => {
    // Chama a função de callback passando a data selecionada
    onSearch(selectedDate);
  };

  return (
    <div className="search__orcamento">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} // Atualiza o estado com a nova data
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
}