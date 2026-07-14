import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';
import modernLogo from '../assets/modern_logo.png';

interface ApplicantHeaderProps {
  percentage: string | number;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
}

const ApplicantHeader: React.FC<ApplicantHeaderProps> = ({ percentage, firstName, lastName, photoUrl }) => {
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('session_data');
    navigate('/');
  };

  const handleChangePassword = () => {
    setIsProfileDropdownOpen(false);
    Swal.fire({
      title: 'Change Password',
      html: `
        <div class="flex flex-col gap-4 text-left pt-2">
          <div>
            <label class="text-[13px] font-semibold text-gray-600 block mb-1.5">Current Password</label>
            <input type="password" id="swal-curr-pass" class="w-full border border-gray-300 rounded p-2.5 text-[14px] outline-none focus:border-[#3b82f6] bg-gray-50/50 h-[42px]" placeholder="Enter current password">
          </div>
          <div>
            <label class="text-[13px] font-semibold text-gray-600 block mb-1.5">New Password</label>
            <input type="password" id="swal-new-pass" class="w-full border border-gray-300 rounded p-2.5 text-[14px] outline-none focus:border-[#3b82f6] bg-gray-50/50 h-[42px]" placeholder="Enter new password">
          </div>
          <div>
            <label class="text-[13px] font-semibold text-gray-600 block mb-1.5">Confirm New Password</label>
            <input type="password" id="swal-conf-pass" class="w-full border border-gray-300 rounded p-2.5 text-[14px] outline-none focus:border-[#3b82f6] bg-gray-50/50 h-[42px]" placeholder="Confirm new password">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#022851',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const curr = (document.getElementById('swal-curr-pass') as HTMLInputElement).value;
        const newP = (document.getElementById('swal-new-pass') as HTMLInputElement).value;
        const conf = (document.getElementById('swal-conf-pass') as HTMLInputElement).value;
        if (!curr || !newP || !conf) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }
        if (newP !== conf) {
          Swal.showValidationMessage('New passwords do not match');
          return false;
        }
        if (newP.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters long');
          return false;
        }
        return { curr, newP };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { curr, newP } = result.value;
        try {
          const sessionStr = localStorage.getItem('session_data');
          if (!sessionStr) {
            Swal.fire('Error', 'You must be logged in to change your password.', 'error');
            return;
          }
          const session = JSON.parse(sessionStr);

          Swal.fire({
            title: 'Updating Password...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
          });

          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/change-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword: curr, newPassword: newP })
          });

          const data = await response.json();
          if (response.ok && data.success) {
            Swal.fire('Success', 'Your password has been changed successfully.', 'success');
          } else {
            Swal.fire('Error', data.message || 'Failed to change password.', 'error');
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'An unexpected error occurred.', 'error');
        }
      }
    });
  };

  return (
    <header className="sticky top-0 bg-[#003366] text-white px-6 py-4 flex justify-between items-center z-30 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/applicant-dashboard')}>
        <div className="w-10 h-10 bg-[#facc15] rounded-[10px] flex items-center justify-center shrink-0 overflow-hidden border border-[#facc15]">
          <img src={modernLogo} alt="AGAP Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-tight tracking-wide">DEPED</span>
          <span className="text-gray-300 text-[10px] uppercase tracking-wider font-semibold mt-0.5">DEPARTMENT OF EDUCATION</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3 shadow-inner hidden sm:flex">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Account Completion</span>
            <span className="text-sm font-extrabold text-[#facc15]">{percentage}%</span>
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 transform -rotate-90">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/20" />
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={14 * 2 * Math.PI} strokeDashoffset={(14 * 2 * Math.PI) - ((parseFloat(percentage.toString()) / 100) * (14 * 2 * Math.PI))} className="text-[#facc15]" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex flex-col items-end gap-0.5 text-white hover:text-white transition-colors bg-transparent px-2 py-1 rounded-lg font-semibold tracking-wide uppercase"
          >
            <div className="flex items-center gap-2 text-sm">
              {photoUrl ? <img src={photoUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover border border-white/20" /> : null}
              {(firstName || lastName) ? `${firstName} ${lastName}`.trim() : 'APPLICANT'} <ChevronDown className="w-4 h-4" />
            </div>
            {(() => {
              const sessionStr = localStorage.getItem('session_data');
              if (sessionStr) {
                const session = JSON.parse(sessionStr);
                if (session.applicant_number) {
                  return <span className="text-[10px] text-[#facc15] font-bold tracking-wider">ID: {session.applicant_number}</span>;
                }
              }
              return null;
            })()}
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded shadow-lg py-2 z-50 text-gray-700">
              <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 transform border-l border-t border-gray-100"></div>
              <button onClick={handleChangePassword} className="w-full text-left px-5 py-3 text-[13px] hover:bg-blue-50 hover:text-[#003366] uppercase font-medium relative z-10 transition-colors">Change Password</button>
              <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-[13px] hover:bg-blue-50 hover:text-[#003366] uppercase font-medium relative z-10 transition-colors">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ApplicantHeader;
