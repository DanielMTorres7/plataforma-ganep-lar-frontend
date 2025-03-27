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
      styles={
        {
          control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            borderRadius: '5px',
            border: '1px solid #d9d9d9',
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#f0f0f0',
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: '#333',
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: '#333',
            ':hover': {
              backgroundColor: '#d9d9d9',
              color: '#333',
            },
          }),
          option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? '#f0f0f0' : 'white',
            color: isSelected ? '#333' : '#333',
            ':hover': {
              backgroundColor: '#f0f0f0',
              color: '#333',
            },
          }),
        }
      }
    />
  );
};

export default MultiSelectComponent;