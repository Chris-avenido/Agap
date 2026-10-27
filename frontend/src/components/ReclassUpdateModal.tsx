import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  BookOpen,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  Banknote,
  Info,
  Lock,
} from 'lucide-react';
import Swal from 'sweetalert2';

export interface PositionQS {
  id?: number;
  position_title: string;
  salary_grade: number;
  monthly_salary: number;
  education: string;
  experience: string;
  training: string;
  eligibility: string;
  years_experience: number;
  hours_of_training: number;
}

export const BENCHMARK_QS_DATA: PositionQS[] = [
  {
    position_title: 'School Counselor Associate I',
    salary_grade: 11,
    monthly_salary: 31705.0,
    education:
      "Bachelor's Degree in Guidance and Counseling or Psychology; or Any Bachelor's Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or Any related Bachelor's Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting",
    experience: 'None required',
    training: 'None required',
    eligibility: 'Career Service Professional / Second Level Eligibility',
    years_experience: 0,
    hours_of_training: 0,
  },
  {
    position_title: 'School Counselor Associate II',
    salary_grade: 12,
    monthly_salary: 33947.0,
    education:
      "Bachelor's Degree in Guidance and Counseling or Psychology; or Any Bachelor's Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or Any related Bachelor's Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting",
    experience:
      '1 year of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
    training:
      '4 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
    eligibility: 'Career Service Professional / Second Level Eligibility',
    years_experience: 1,
    hours_of_training: 4,
  },
  {
    position_title: 'School Counselor Associate III',
    salary_grade: 13,
    monthly_salary: 36125.0,
    education:
      "Bachelor's Degree in Guidance and Counseling or Psychology; or Any Bachelor's Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or Any related Bachelor's Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting",
    experience:
      '2 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
    training:
      '8 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
    eligibility: 'Career Service Professional / Second Level Eligibility',
    years_experience: 2,
    hours_of_training: 8,
  },
  {
    position_title: 'School Counselor Associate IV',
    salary_grade: 14,
    monthly_salary: 38764.0,
    education:
      "Bachelor's Degree in Guidance and Counseling or Psychology; or Any Bachelor's Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or Any related Bachelor's Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting",
    experience:
      '3 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
    training:
      '16 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
    eligibility: 'Career Service Professional / Second Level Eligibility',
    years_experience: 3,
    hours_of_training: 16,
  },
  {
    position_title: 'School Counselor Associate V',
    salary_grade: 15,
    monthly_salary: 42178.0,
    education:
      "Bachelor's Degree in Guidance and Counseling or Psychology; or Any Bachelor's Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or Any related Bachelor's Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting",
    experience:
      '3 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
    training:
      '24 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
    eligibility: 'Career Service Professional / Second Level Eligibility',
    years_experience: 3,
    hours_of_training: 24,
  },
  {
    position_title: 'School Counselor I',
    salary_grade: 16,
    monthly_salary: 45694.0,
    education: "Master's degree in Guidance and Counseling; or Master's degree in Psychology",
    experience: 'None required',
    training: 'None required',
    eligibility: 'RA 1080, as amended (Guidance Counselor or Psychologist)',
    years_experience: 0,
    hours_of_training: 0,
  },
  {
    position_title: 'School Counselor II',
    salary_grade: 18,
    monthly_salary: 53818.0,
    education: "Master's degree in Guidance and Counseling; or Master's degree in Psychology",
    experience:
      '1 year of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
    training:
      '8 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
    eligibility: 'RA 1080, as amended (Guidance Counselor or Psychologist)',
    years_experience: 1,
    hours_of_training: 8,
  },
  {
    position_title: 'School Counselor III',
    salary_grade: 20,
    monthly_salary: 66052.0,
    education: "Master's degree in Guidance and Counseling; or Master's degree in Psychology",
    experience:
      '2 years of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
    training:
      '16 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
    eligibility: 'RA 1080, as amended (Guidance Counselor or Psychologist)',
    years_experience: 2,
    hours_of_training: 16,
  },
  {
    position_title: 'School Counselor IV',
    salary_grade: 22,
    monthly_salary: 81796.0,
    education: "Master's degree in Guidance and Counseling; or Master's degree in Psychology",
    experience:
      '3 years of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
    training:
      '24 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
    eligibility: 'RA 1080, as amended (Guidance Counselor or Psychologist)',
    years_experience: 3,
    hours_of_training: 24,
  },
];

interface ReclassUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantId: number | string;
  initialIsRegistered?: boolean;
  initialTargetPosition?: string;
  initialStep?: 1 | 2;
  isAlreadySCIV?: boolean;
  onSuccess: (updatedData: any) => void;
}

const NOT_REGISTERED_OPTIONS = [
  { value: 'SCHOOL COUNSELOR ASSOCIATE I', label: 'School Counselor Associate I', sg: 'SG-11' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE II', label: 'School Counselor Associate II', sg: 'SG-12' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE III', label: 'School Counselor Associate III', sg: 'SG-13' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE IV', label: 'School Counselor Associate IV', sg: 'SG-14' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE V', label: 'School Counselor Associate V', sg: 'SG-15' },
];

const REGISTERED_OPTIONS = [
  { value: 'SCHOOL COUNSELOR I', label: 'School Counselor I', sg: 'SG-16' },
  { value: 'SCHOOL COUNSELOR II', label: 'School Counselor II', sg: 'SG-18' },
  { value: 'SCHOOL COUNSELOR III', label: 'School Counselor III', sg: 'SG-20' },
  { value: 'SCHOOL COUNSELOR IV', label: 'School Counselor IV', sg: 'SG-22' },
];

export default function ReclassUpdateModal({
  isOpen,
  onClose,
  applicantId,
  initialIsRegistered,
  initialTargetPosition,
  initialStep = 1,
  isAlreadySCIV = false,
  onSuccess,
}: ReclassUpdateModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('SCHOOL COUNSELOR ASSOCIATE I');
  const [isSaving, setIsSaving] = useState(false);
  const [qsDataList, setQsDataList] = useState<PositionQS[]>(BENCHMARK_QS_DATA);

  // Fetch dynamic Qualification Standards from backend API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applicants/reclass-positions-qs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setQsDataList(data.data);
        }
      })
      .catch((err) => {
        console.warn('Using seeded benchmark QS standards:', err);
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isAlreadySCIV) {
        setStep(2);
        setIsRegistered(true);
        setSelectedPosition('SCHOOL COUNSELOR IV');
        return;
      }

      setStep(initialStep || 1);
      const isReg =
        initialIsRegistered !== undefined
          ? initialIsRegistered
          : (initialTargetPosition &&
              !initialTargetPosition.toUpperCase().includes('ASSOCIATE') &&
              (initialTargetPosition.toUpperCase().includes('COUNSELOR') ||
                initialTargetPosition.toUpperCase().includes('SPECIALIST')));

      const trackRegistered = !!isReg;
      setIsRegistered(trackRegistered);

      const available = trackRegistered ? REGISTERED_OPTIONS : NOT_REGISTERED_OPTIONS;
      const matched = available.find(
        (opt) =>
          opt.value === initialTargetPosition?.toUpperCase().trim() ||
          opt.label.toUpperCase() === initialTargetPosition?.toUpperCase().trim()
      );
      setSelectedPosition(matched ? matched.value : available[0].value);
    }
  }, [isOpen, initialIsRegistered, initialTargetPosition, initialStep, isAlreadySCIV]);

  if (!isOpen) return null;

  const handleTrackSelect = (registered: boolean) => {
    if (isAlreadySCIV) return;
    setIsRegistered(registered);
    const available = registered ? REGISTERED_OPTIONS : NOT_REGISTERED_OPTIONS;
    const isCurrentInAvailable = available.some((opt) => opt.value === selectedPosition);
    if (!isCurrentInAvailable) {
      setSelectedPosition(available[0].value);
    }
  };

  const handleProceedToStep2 = () => {
    const available = isRegistered ? REGISTERED_OPTIONS : NOT_REGISTERED_OPTIONS;
    const isCurrentInAvailable = available.some((opt) => opt.value === selectedPosition);
    if (!isCurrentInAvailable) {
      setSelectedPosition(available[0].value);
    }
    setStep(2);
  };

  const handleSave = async () => {
    if (!applicantId) return;
    if (isAlreadySCIV) {
      Swal.fire({
        icon: 'info',
        title: 'Updates Disabled',
        text: 'You are already assessed as School Counselor IV (SC IV), the maximum reclassification role. Further updates are disabled.',
      });
      return;
    }
    setIsSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applicants/${applicantId}/reclass-update-preference`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            update_application: true,
            is_registered: isRegistered,
            target_position: selectedPosition,
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        const available = isRegistered ? REGISTERED_OPTIONS : NOT_REGISTERED_OPTIONS;
        const opt = available.find((o) => o.value === selectedPosition);
        const positionLabel = opt ? opt.label : selectedPosition;
        const sg = opt ? opt.sg : '';

        Swal.fire({
          icon: 'success',
          title: 'Application Updated',
          text: `Desired Position: ${positionLabel} (${sg}) • Track: ${
            isRegistered ? 'Registered (RA 1080)' : 'Not Registered'
          }`,
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });

        onSuccess(data.data);
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'Unable to update reclassification application.',
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to the server to update application.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const currentOptions = isRegistered ? REGISTERED_OPTIONS : NOT_REGISTERED_OPTIONS;
  const currentSelectedOpt = currentOptions.find((o) => o.value === selectedPosition);

  // Match the active Qualification Standards (QS) from database or seeded benchmark
  const activeQS: PositionQS =
    qsDataList.find(
      (item) =>
        item.position_title.toUpperCase().trim() === selectedPosition.toUpperCase().trim() ||
        selectedPosition.toUpperCase().trim().includes(item.position_title.toUpperCase().trim())
    ) ||
    BENCHMARK_QS_DATA.find(
      (item) =>
        item.position_title.toUpperCase().trim() === selectedPosition.toUpperCase().trim() ||
        selectedPosition.toUpperCase().trim().includes(item.position_title.toUpperCase().trim())
    ) ||
    BENCHMARK_QS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#022851] to-[#034078] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Reclassification Application</h3>
              <p className="text-xs text-sky-200">
                {step === 1
                  ? 'Step 1 of 2: Registration Status'
                  : 'Step 2 of 2: Desired Position & Qualification Standards (QS)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="px-6 pt-3.5 pb-2.5 bg-slate-50/80 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between">
            {/* Step 1 Indicator */}
            <button
              type="button"
              onClick={() => {
                if (!isAlreadySCIV) setStep(1);
              }}
              disabled={isAlreadySCIV}
              className={`flex items-center gap-2 text-left transition-all ${
                isAlreadySCIV ? 'cursor-not-allowed opacity-60' : 'cursor-pointer group'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 1
                    ? 'bg-[#0284c7] text-white ring-2 ring-[#0284c7]/20 shadow-xs'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {step > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </div>
              <div>
                <span
                  className={`text-xs font-extrabold ${
                    step === 1 ? 'text-[#022851]' : 'text-emerald-700 group-hover:underline'
                  }`}
                >
                  Registration Status
                </span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  {step === 1 ? 'Current step' : isRegistered ? 'Registered (RA 1080)' : 'Not Registered'}
                </span>
              </div>
            </button>

            {/* Step Connector */}
            <div
              className={`flex-1 mx-3 h-0.5 rounded-full transition-colors ${
                step > 1 ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />

            {/* Step 2 Indicator */}
            <div className="flex items-center gap-2 text-left">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 2
                    ? 'bg-[#0284c7] text-white ring-2 ring-[#0284c7]/20 shadow-xs'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </div>
              <div>
                <span
                  className={`text-xs font-extrabold ${
                    step === 2 ? 'text-[#022851]' : 'text-slate-400'
                  }`}
                >
                  Desired Position & QS
                </span>
                <span className="text-[10px] text-gray-400 block leading-tight">
                  {step === 2 ? 'Current step' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* STEP 1: Ask if already registered Guidance Counselor or not */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Question Banner */}
              <div className="bg-sky-50/90 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#022851] leading-tight">
                    Are you already a Registered Guidance Counselor?
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Under DepEd Reclassification rules (DO No. 004, s. 2026), please declare whether you hold a valid
                    professional <strong>RA 1080 Guidance Counselor License</strong> before selecting your desired position.
                  </p>
                </div>
              </div>

              {/* Two Option Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select your registration status:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Yes, Registered (RA 1080) */}
                  <button
                    type="button"
                    onClick={() => handleTrackSelect(true)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isRegistered
                        ? 'border-[#0284c7] bg-sky-50/70 ring-2 ring-[#0284c7]/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    {isRegistered && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 mb-2.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-black text-[#022851] uppercase tracking-wide">
                        Yes, Registered
                      </div>
                      <p className="text-[11px] font-bold text-indigo-700 mt-0.5">
                        PRC Licensed (RA 1080)
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                        Counselor Track (SG 16–22)
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          School Counselor I to IV
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Option 2: No, Not Registered */}
                  <button
                    type="button"
                    onClick={() => handleTrackSelect(false)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      !isRegistered
                        ? 'border-[#0284c7] bg-sky-50/70 ring-2 ring-[#0284c7]/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    {!isRegistered && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-2.5">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-black text-[#022851] uppercase tracking-wide">
                        No, Not Registered
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                        Non-licensed / Associate
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                        Associate Track (SG 11–15)
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                          School Counselor Associate I to V
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-600 flex items-center justify-between">
                <span>Selected Status:</span>
                <span className="font-extrabold text-[#022851]">
                  {isRegistered
                    ? 'Registered Guidance Counselor (RA 1080)'
                    : 'Not Registered (Associate Track)'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Ask for the Desired Position & Show Qualification Standards (QS) */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* If user is already SC IV, show prominent terminal role banner */}
              {isAlreadySCIV && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                      Assessed as School Counselor IV (Maximum Reclassification Level)
                    </h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                      You were assessed as <strong>School Counselor IV (SG-22)</strong> during the initial assessment, which is the highest benchmark position in the School Counselor career track (DepEd Order No. 004, s. 2026). Further position or track updates are disabled. Below are the Qualification Standards (QS) for your role.
                    </p>
                  </div>
                </div>
              )}

              {/* Answered Step 1 Confirmation Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isRegistered ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isRegistered ? <ShieldCheck className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Registration Status
                    </span>
                    <p className="text-xs font-extrabold text-[#022851]">
                      {isRegistered
                        ? 'Registered Guidance Counselor (RA 1080)'
                        : 'Not Registered (Associate Track)'}
                    </p>
                  </div>
                </div>

                {!isAlreadySCIV ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer px-2.5 py-1 rounded-lg hover:bg-sky-50 transition-colors"
                    title="Change registration status"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Change Status</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Desired Position Selection Header & Quick Chips */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {isAlreadySCIV ? 'Reclassification Position:' : 'Select Desired Position:'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {currentSelectedOpt && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#022851] text-[#facc15] shadow-2xs">
                        {currentSelectedOpt.sg}
                      </span>
                    )}
                    {activeQS && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                        ₱{activeQS.monthly_salary.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Select or Locked View */}
                {isAlreadySCIV ? (
                  <div className="w-full text-xs font-black text-[#022851] bg-slate-50 border-2 border-emerald-300 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      <span>School Counselor IV (SG-22)</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      Maximum Career Role • Updates Disabled
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full text-xs font-bold text-[#022851] bg-white border-2 border-slate-300 focus:border-[#0284c7] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 shadow-xs cursor-pointer"
                  >
                    {currentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.sg})
                      </option>
                    ))}
                  </select>
                )}

                {/* Quick Selection Chips (only if not already SC IV) */}
                {!isAlreadySCIV && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[11px] font-semibold text-gray-500 mr-1">Quick Select:</span>
                    {currentOptions.map((opt) => {
                      const isSelected = opt.value === selectedPosition;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSelectedPosition(opt.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#022851] text-white shadow-xs ring-2 ring-[#0284c7]/40'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                              isSelected ? 'bg-white/20 text-[#facc15]' : 'bg-white text-slate-600'
                            }`}
                          >
                            {opt.sg}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* QUALIFICATION STANDARDS (QS) VISIBILITY PANEL */}
              <div className="bg-slate-50/90 border-2 border-[#0284c7]/40 rounded-2xl p-4.5 space-y-4 shadow-sm">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-2xs shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#022851] uppercase tracking-wide">
                        Qualification Standards (QS)
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium">
                        DepEd & CSC Minimum Standard for <strong className="text-[#022851]">{activeQS?.position_title || currentSelectedOpt?.label}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#022851] text-[#facc15]">
                      SG-{activeQS?.salary_grade}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ₱{activeQS?.monthly_salary?.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                    </span>
                  </div>
                </div>

                {/* QS 4-Criteria Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {/* 1. Education */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Education</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        Degree Requirement
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 leading-relaxed font-medium whitespace-pre-line pl-5.5">
                      {activeQS?.education}
                    </p>
                  </div>

                  {/* 2. Experience & Training Row (2 columns on sm+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Experience Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                          <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Experience</span>
                        </div>
                        {/* Display 'None Required' if years_experience is 0 per guidelines */}
                        {Number(activeQS?.years_experience) === 0 ? (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            None Required
                          </span>
                        ) : (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                            {activeQS?.years_experience} Year{Number(activeQS?.years_experience) > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium pl-5.5">
                        {Number(activeQS?.years_experience) === 0 ? 'None Required' : activeQS?.experience}
                      </p>
                    </div>

                    {/* Training Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                          <Award className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>Relevant Training</span>
                        </div>
                        {/* Display 'None Required' if hours_of_training is 0 per guidelines */}
                        {Number(activeQS?.hours_of_training) === 0 ? (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            None Required
                          </span>
                        ) : (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                            {activeQS?.hours_of_training} Hours
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium pl-5.5">
                        {Number(activeQS?.hours_of_training) === 0 ? 'None Required' : activeQS?.training}
                      </p>
                    </div>
                  </div>

                  {/* 3. Eligibility */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Eligibility / License</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {isRegistered ? 'RA 1080 (PRC License)' : 'Career Service Prof (2nd Level)'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 leading-relaxed font-medium pl-5.5 whitespace-pre-line">
                      {activeQS?.eligibility}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Selection Summary Card */}
              <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Application Summary
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Track:</span>
                  <span className="font-extrabold text-[#022851]">
                    {isRegistered ? 'Registered Counselor (SG 16–22)' : 'Associate Track (SG 11–15)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Desired Position:</span>
                  <span className="font-extrabold text-[#0284c7]">
                    {currentSelectedOpt?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Salary Grade & Salary:</span>
                  <span className="font-extrabold text-[#022851] bg-white px-2 py-0.5 rounded border border-sky-200">
                    {currentSelectedOpt?.sg} • ₱{activeQS?.monthly_salary?.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 1 ? (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProceedToStep2}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-md transition-all cursor-pointer group"
            >
              <span>Next: Select Desired Position & QS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : isAlreadySCIV ? (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Assessed as School Counselor IV • Updates Disabled</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#022851] hover:bg-[#033b77] rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Close</span>
            </button>
          </div>
        ) : (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>Save & Confirm</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
