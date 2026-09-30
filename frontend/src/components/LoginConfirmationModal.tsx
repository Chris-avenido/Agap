import React from 'react';
import { ShieldCheck, User, Building2, MapPin, Award, ArrowRight, X, Briefcase, CheckCircle2 } from 'lucide-react';

export interface LoginConfirmationData {
  id: number | string;
  applicant_number?: string;
  full_name?: string;
  first_name?: string;
  middle_name?: string;
  surname?: string;
  email?: string;
  registrant_type: 'reclass' | 'jobseeker' | string;
  plantilla_item_number?: string | null;
  current_position?: string | null;
  target_position?: string | null;
  region?: string | null;
  division?: string | null;
}

interface LoginConfirmationModalProps {
  isOpen: boolean;
  data: LoginConfirmationData | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LoginConfirmationModal: React.FC<LoginConfirmationModalProps> = ({
  isOpen,
  data,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !data) return null;

  const isReclass = data.registrant_type === 'reclass';
  const displayName =
    data.full_name ||
    [data.first_name, data.middle_name, data.surname].filter(Boolean).join(' ') ||
    data.email ||
    'Applicant';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#022851] via-[#033b77] to-[#0a6fa6] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#facc15]">
              {isReclass ? <Award className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="modal-headline" className="text-lg font-extrabold tracking-tight leading-tight">
                {isReclass ? 'Confirm Reclassification Profile' : 'Confirm Account Details'}
              </h2>
              <p className="text-xs text-sky-100 font-medium">
                {isReclass ? 'DepEd Incumbent Verification' : 'AGAP Jobseeker Profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close"
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 bg-blue-50/70 border border-blue-100 rounded-xl p-3.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[13px] text-gray-700 font-medium leading-snug">
              {isReclass
                ? 'Your incumbent counselor credentials have been verified. Please confirm that the details below belong to you before proceeding.'
                : 'Login successful. Please confirm your account details below before proceeding to your dashboard.'}
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-4.5 space-y-3.5 text-left">
            {/* Name & ID Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#022851]/10 flex items-center justify-center text-[#022851]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</span>
                  <span className="text-[15px] font-extrabold text-[#022851] tracking-tight">{displayName}</span>
                </div>
              </div>
              {!isReclass && data.applicant_number && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#022851] text-[#facc15] self-start sm:self-center tracking-wider">
                  ID: {data.applicant_number}
                </span>
              )}
            </div>

            {/* If Reclass */}
            {isReclass ? (
              <div className="grid grid-cols-1 gap-3 pt-1 text-[13px]">
                {data.plantilla_item_number && (
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                      Plantilla Item Number
                    </span>
                    <span className="font-mono font-semibold text-gray-800 bg-white px-2.5 py-1 rounded border border-gray-200 inline-block text-xs">
                      {data.plantilla_item_number}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" /> Current Position
                    </span>
                    <span className="font-bold text-gray-700 text-[13px]">
                      {data.current_position || 'Guidance Counselor'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#0284c7]" /> Target Reclass Position
                    </span>
                    <span className="font-bold text-[#022851] text-[13px]">
                      {data.target_position || 'School Counselor'}
                    </span>
                  </div>
                </div>

                {(data.school_name || data.school_station || data.region || data.division) && (
                  <div className="pt-1 border-t border-gray-200/60">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> School / Station / Division
                    </span>
                    <span className="font-medium text-gray-700 text-[13px]">
                      {[data.school_name || data.school_station, data.division, data.region].filter(Boolean).join(' • ')}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* If Regular Jobseeker */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[13px]">
                {data.email && (
                  <div className="sm:col-span-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                      Email Address
                    </span>
                    <span className="font-medium text-gray-800">{data.email}</span>
                  </div>
                )}
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                    Account Type
                  </span>
                  <span className="font-bold text-[#022851]">Jobseeker</span>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center font-medium">
            Are you sure you want to proceed to the Applicant Dashboard with this account?
          </p>
        </div>

        {/* Modal Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold text-[13px] hover:bg-gray-100 hover:text-gray-900 transition-colors text-center"
          >
            No, Return to Login
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#022851] hover:bg-[#033a76] text-white font-bold text-[13px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Yes, Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginConfirmationModal;
