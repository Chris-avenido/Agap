import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CustomDatePicker({ value, onChange, placeholder = "Select date", className = "" }: CustomDatePickerProps) {
  const safeValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(safeValue || new Date(1997, 7, 11)); // Default view if no value
  const [showYearSelector, setShowYearSelector] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (safeValue) setViewDate(safeValue);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowYearSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When year selector opens, scroll to the selected year
  useEffect(() => {
    if (showYearSelector && yearListRef.current) {
      const selectedYearElement = yearListRef.current.querySelector('.selected-year');
      if (selectedYearElement) {
        selectedYearElement.scrollIntoView({ block: 'center' });
      }
    }
  }, [showYearSelector]);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Previous month days for padding
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
  const paddingDays = Array.from({ length: firstDay }, (_, i) => prevMonthDays - firstDay + i + 1);
  
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Next month days for padding
  const totalSlots = 42; // 6 rows of 7
  const nextMonthPaddingLength = totalSlots - (paddingDays.length + monthDays.length);
  const nextMonthPadding = Array.from({ length: nextMonthPaddingLength }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
    setShowYearSelector(false);
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
    setShowYearSelector(false);
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange(newDate);
    setIsOpen(false);
  };

  const handleSelectYear = (year: number) => {
    setViewDate(new Date(year, currentMonth, 1));
    setShowYearSelector(false);
  };

  const formatDate = (d: Date | null) => {
    if (!d) return '';
    return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  // Generate years list (from 1940 to current year + 10)
  const currentYearActual = new Date().getFullYear();
  const years = Array.from({ length: currentYearActual - 1940 + 10 }, (_, i) => 1940 + i);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className={`w-full border bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer flex items-center ${
          isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={safeValue ? "text-blue-600" : "text-gray-400"}>
          {safeValue ? formatDate(safeValue) : placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-gray-200 rounded shadow-lg z-50 overflow-hidden font-sans">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-500">
              <ChevronLeft className="w-5 h-5 fill-current" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600 font-medium tracking-wide">{MONTHS[currentMonth]}</span>
              <button 
                type="button"
                onClick={() => setShowYearSelector(!showYearSelector)}
                className="text-[13px] text-gray-600 hover:text-blue-500 transition-colors px-2 py-0.5 rounded hover:bg-blue-50 relative flex items-center gap-1"
              >
                {currentYear}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {/* We don't render NextMonth button if year selector is open, to match image style slightly, but we can keep it */}
            <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-500">
              <ChevronRight className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="relative">
            {/* Days of week */}
            <div className="grid grid-cols-7 border-b border-gray-100 px-2 py-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-[10px] font-semibold text-gray-400">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 p-2">
              {paddingDays.map((day, i) => (
                <div key={`prev-${i}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-gray-300 mx-auto">
                  {day}
                </div>
              ))}
              
              {monthDays.map(day => {
                const isSelected = safeValue && safeValue.getDate() === day && safeValue.getMonth() === currentMonth && safeValue.getFullYear() === currentYear;
                return (
                  <button
                    type="button"
                    key={`day-${day}`}
                    onClick={() => handleSelectDay(day)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] mx-auto transition-colors ${
                      isSelected 
                        ? 'bg-[#3b82f6] text-white font-medium shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}

              {nextMonthPadding.map((day, i) => (
                <div key={`next-${i}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-gray-300 mx-auto">
                  {day}
                </div>
              ))}
            </div>

            {/* Year Selector Overlay */}
            {showYearSelector && (
              <div 
                ref={yearListRef}
                className="absolute top-0 right-0 w-24 h-[250px] bg-white border-l border-b border-gray-200 shadow-md overflow-y-auto z-10 custom-scrollbar"
              >
                {years.map(year => (
                  <button
                    type="button"
                    key={year}
                    onClick={() => handleSelectYear(year)}
                    className={`w-full text-center py-2 text-[13px] transition-colors ${
                      year === currentYear 
                        ? 'bg-[#3b82f6] text-white font-bold selected-year' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
