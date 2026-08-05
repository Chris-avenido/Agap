import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const startYear = 1900;
const YEARS = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

const ModernDatePicker = ({ name, value, defaultValue, onChange, placeholder, maxDate, className, isMonthPicker, isYearPicker }) => {
    const datePickerRef = React.useRef(null);
    const [internalValue, setInternalValue] = React.useState(value || defaultValue || '');

    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        } else if (defaultValue !== undefined && internalValue === '') {
            setInternalValue(defaultValue);
        }
    }, [value, defaultValue]);

    let selectedDate = null;
    if (internalValue) {
        if (isYearPicker) {
            selectedDate = new Date(internalValue.toString(), 0, 1);
        } else {
            selectedDate = isMonthPicker ? new Date(internalValue + '-01') : new Date(internalValue);
        }
    }

    const handleChange = (date) => {
        let newValue = '';
        if (date) {
            if (isYearPicker) {
                newValue = date.getFullYear().toString();
            } else {
                const offset = date.getTimezoneOffset();
                const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
                newValue = isMonthPicker 
                    ? adjustedDate.toISOString().split('T')[0].substring(0, 7)
                    : adjustedDate.toISOString().split('T')[0];
            }
        }

        setInternalValue(newValue);

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="relative w-full">
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key !== 'Tab' && e.key !== 'Escape' && e.key !== 'Enter') {
                        e.preventDefault();
                    }
                }}
                onChangeRaw={(e) => e.preventDefault()}
                maxDate={maxDate}
                placeholderText={placeholder || "Select a date"}
                showMonthDropdown={!(isMonthPicker || isYearPicker)}
                showYearDropdown
                dropdownMode="select"
                portalId="root-portal"
                popperClassName="!z-[9999]"
                {...(!(isMonthPicker || isYearPicker) ? {
                    renderCustomHeader: ({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div className="flex items-center justify-between px-2 py-2">
                            <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                type="button"
                                className="p-1 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50"
                            >
                                <FiChevronLeft size={16} />
                            </button>

                            <div className="flex items-center space-x-2">
                                <div className="relative flex items-center">
                                    <select
                                        value={MONTHS[date.getMonth()]}
                                        onChange={({ target: { value } }) => changeMonth(MONTHS.indexOf(value))}
                                        className="appearance-none bg-white border border-slate-200 text-slate-600 text-[13px] rounded-lg pl-3 pr-8 py-1.5 outline-none focus:border-[#0038A8] focus:ring-1 focus:ring-blue-100 font-medium cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                                    >
                                        {MONTHS.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={16} />
                                </div>

                                <div className="relative flex items-center">
                                    <select
                                        value={date.getFullYear()}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                        className="appearance-none bg-white border border-slate-200 text-slate-600 text-[13px] rounded-lg pl-3 pr-8 py-1.5 outline-none focus:border-[#0038A8] focus:ring-1 focus:ring-blue-100 font-medium cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                                    >
                                        {YEARS.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="absolute right-2 text-slate-500 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                type="button"
                                className="p-1 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    )
                } : {})}
                dateFormat={isYearPicker ? "yyyy" : (isMonthPicker ? "MM/yyyy" : "MM/dd/yy")}
                showMonthYearPicker={isMonthPicker && !isYearPicker}
                showYearPicker={isYearPicker}
                popperPlacement="bottom-start"
                ref={datePickerRef}
                wrapperClassName="w-full"
                className={`w-full bg-white border border-slate-200 focus:border-[#0038A8] focus:ring-2 focus:ring-blue-50/50 rounded-xl px-3 py-2 text-xs font-normal text-slate-800 outline-none transition-all pr-10 shadow-sm cursor-pointer ${className || ''}`}
            >
                <div className="flex justify-between items-center px-3 py-2 border-t border-slate-100 bg-slate-50 rounded-b-lg">
                    <button
                        type="button"
                        className="text-slate-500 hover:text-slate-700 font-semibold text-xs px-2 py-1 rounded hover:bg-slate-200 transition-colors"
                        onClick={() => {
                            handleChange('');
                            datePickerRef.current?.setOpen(false);
                        }}
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        className="text-[#0038A8] hover:text-blue-800 font-semibold text-xs px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                        onClick={() => {
                            handleChange(new Date());
                            datePickerRef.current?.setOpen(false);
                        }}
                    >
                        Today
                    </button>
                </div>
            </DatePicker>
            <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            {name && <input type="hidden" name={name} value={internalValue} />}
        </div>
    );
};

export default ModernDatePicker;
