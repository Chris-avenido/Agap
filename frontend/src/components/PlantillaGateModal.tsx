import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Award, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface PlantillaGateModalProps {
  applicantId: number | string;
  onVerified: (reclassData: any) => void;
}

export default function PlantillaGateModal({ applicantId, onVerified }: PlantillaGateModalProps) {
  const [itemNumber, setItemNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanNumber = itemNumber.trim().toUpperCase();
    if (!cleanNumber) {
      setErrorMsg('Please enter your Plantilla Item Number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/verify-plantilla`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantilla_item_number: cleanNumber }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update local session
        const sessionStr = localStorage.getItem('session_data');
        if (sessionStr) {
          try {
            const session = JSON.parse(sessionStr);
            session.plantilla_item_number = cleanNumber;
            localStorage.setItem('session_data', JSON.stringify(session));
          } catch (e) {
            console.error('Failed to update session_data', e);
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Plantilla Item Verified',
          text: `Position: ${data.data?.current_position || data.data?.position_title || 'Guidance Counselor'} - ${data.data?.station_division || ''}`,
          timer: 2000,
          showConfirmButton: false,
        });

        onVerified(data.data);
      } else {
        setErrorMsg(data.message || 'Plantilla Item Number not found in DepEd incumbent records.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server error. Unable to verify plantilla number at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#022851] via-[#0369a1] to-[#0284c7] p-6 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Award className="w-8 h-8 text-[#fbbf24]" />
          </div>
          <span className="text-[11px] uppercase tracking-widest font-bold text-sky-200 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-2">
            Reclassification Gateway
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">
            Verify Plantilla Item Number
          </h2>
          <p className="text-xs text-sky-100/90 mt-1 max-w-sm mx-auto">
            As an incumbent Guidance Counselor registering for reclassification, you must verify your existing plantilla item number before proceeding.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerify} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Plantilla Item Number <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <input
                type="text"
                required
                value={itemNumber}
                onChange={(e) => {
                  setItemNumber(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="e.g. OSEC-DECSB-GCO1-540001-2015"
                className="w-full px-4 py-3 text-sm font-mono tracking-wide rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-all placeholder:font-sans placeholder:text-xs text-gray-800 uppercase"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
              Find this on your latest appointment paper, payslip, or Service Record issued by your Division Office.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-700 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#022851] to-[#0369a1] hover:from-[#011a38] hover:to-[#02527e] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying DepEd Record…</span>
                </>
              ) : (
                <>
                  <span>Verify and Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400">
            Records are verified directly against the DepEd Incumbent Guidance Counselor Database.
          </p>
        </form>
      </div>
    </div>
  );
}
