import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      // Parse as local time to avoid timezone offset issues
      const [year, month, day] = val.split('-').map(Number);
      onChange(new Date(year, month - 1, day));
    }
  };

  return (
    <input
      type="date"
      value={dateString}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full border border-gray-300 bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer focus:border-blue-500 text-gray-700 ${className}`}
    />
  );
}
