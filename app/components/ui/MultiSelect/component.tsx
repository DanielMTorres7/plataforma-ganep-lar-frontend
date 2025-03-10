import React from 'react';
import Select, { MultiValue } from 'react-select';
import './styles.css';
// Defina o tipo para as opções
interface OptionType {
  value: string;
  label: string;
}

// Props do componente
interface MultiSelectProps {
  options: OptionType[];
  onChange: (selectedOptions: MultiValue<OptionType>) => void;
  placeholder?: string;
}

const MultiSelectComponent: React.FC<MultiSelectProps> = ({ options, onChange, placeholder }) => {
  return (
    <Select
      isMulti
      options={options}
      onChange={onChange}
      placeholder={placeholder || 'Selecione...'}
      className="multi_select"
      classNamePrefix="multi_select"
    />
  );
};

export default MultiSelectComponent;