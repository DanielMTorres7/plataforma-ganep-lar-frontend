import React from 'react';
import Datepicker from "react-tailwindcss-datepicker";

import './styles.css';

// Tipo para o valor do DatePicker
interface DateValue {
  startDate: Date | null;
  endDate: Date | null;
}

// Props do componente
interface DatePickerProps {
  value: DateValue;
  onChange: (value: DateValue) => void;
  placeholder?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ value, onChange, placeholder }) => {
  const handleValueChange = (newValue: DateValue) => {
    onChange(newValue);
  };

  return (
    <Datepicker
      i18n='pt-br'
      value={value}
      onChange={newValue => handleValueChange(newValue!)}
      inputClassName="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder || 'Selecione uma data'}
      displayFormat="DD/MM/YYYY"
      showShortcuts={true}
      configs={
        {
          shortcuts: {
            currentMonth: "Mês atual",
            pastMonth: "Mês anterior",
            thisYear: {
              text: "Este ano",
              period: {
                  start: (new Date(new Date().getFullYear(), 0, 1)),
                  end: new Date()
              }
            },
            lastYear: {
              text: "Ano passado",
              period: {
                  start: (new Date(new Date().getFullYear() - 1, 0, 1)),
                  end: (new Date(new Date().getFullYear() - 1, 11, 31))
              }
            },
            last12Months: {
              text: "Últimos 12 meses",
              period: {
                  start: (new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1)),
                  end: new Date()
              }
            },

        },
        }
      }
    />
  );
};

export default DatePickerComponent;