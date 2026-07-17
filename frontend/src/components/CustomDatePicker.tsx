import React from 'react';
// @ts-ignore
import ModernDatePicker from './ModernDatePicker.jsx';

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDatePicker({ value, onChange, placeholder = "Select date", className = "" }: CustomDatePickerProps) {
  const safeValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
  
  const dateString = safeValue && !isNaN(safeValue.getTime()) 
    ? `${safeValue.getFullYear()}-${String(safeValue.getMonth() + 1).padStart(2, '0')}-${String(safeValue.getDate()).padStart(2, '0')}`
    : '';

  const handleChange = (dateStr: string) => {
    if (!dateStr) {
      // If user clears the date picker, but the prop requires a Date, 
      // we might need to handle it. For now, pass a dummy Date or ignore if the UI doesn't allow clearing.
      return;
    }
    const [year, month, day] = dateStr.split('-').map(Number);
    onChange(new Date(year, month - 1, day));
  };

  return (
    <ModernDatePicker
      value={dateString}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full border border-gray-300 bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer focus:border-blue-500 text-gray-700 ${className}`}
    />
  );
}
