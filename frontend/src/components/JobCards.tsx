import React from 'react';
import { Briefcase, CalendarDays, Star, CircleDollarSign, GraduationCap, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Check } from 'lucide-react'; // Make sure to add Check if needed

const JobCard = ({ job, tab, appliedJobIds = [], savedJobIds = [], toggleSaveJob, handleApply, isPublic = false, onCardClick, onApplyClick }: any) => {
  const navigate = useNavigate();
  const isApplied = appliedJobIds.includes(job.id || job.positionId);
  const isSaved = savedJobIds.includes(job.id || job.positionId);
  const title = job.title || job.position || 'Unknown Position';

  const borderColor = isApplied || tab === 'my-applications' ? 'border-[#2563eb]' : 'border-[#fbbf24]'; // blue if applied, amber/yellow otherwise
  const shadowClass = isApplied || tab === 'my-applications' 
    ? 'shadow-[0_8px_25px_rgba(37,99,235,0.15)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.25)]' 
    : 'shadow-[0_8px_25px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_35px_rgba(251,191,36,0.25)]';

  return (
    <div onClick={(e) => { 
      if ((e.target as any).closest("button")) return; 
      if (isPublic && onCardClick) {
        onCardClick(job);
        return;
      }
      const vid = tab === 'my-applications' ? job.positionId : (job.id || job.positionId); 
      navigate(`/applicant-jobs/${vid}`); 
    }} className={`bg-white rounded-[20px] border-[1.5px] ${borderColor} ${shadowClass} p-6 flex flex-col transition-shadow relative cursor-pointer`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1 w-full">
          {/* Title */}
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#2563eb] leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Region - Division */}
          <p className="text-gray-600 font-medium text-[13px] md:text-sm mt-1">
            {job.location || 'N/A'} - {job.division || job.office || 'N/A'}
          </p>

          <div className="w-full h-px bg-gray-100 my-4" />

          {/* SG & Vacancies */}
          <div className="flex gap-4">
            <div className="flex flex-1 items-center justify-center gap-3 px-4 py-3 bg-[#f0f4f8] rounded-xl">
              <CircleDollarSign className="w-6 h-6 text-blue-600 shrink-0" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide leading-none mb-1">SALARY GRADE</span>
                <span className="text-[18px] font-extrabold text-gray-800 leading-none tracking-tight">{job.sg || 'N/A'}</span>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center gap-3 px-4 py-3 bg-[#f0fdf4] rounded-xl">
              <Users className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide leading-none mb-1">VACANCIES</span>
                <span className="text-[18px] font-extrabold text-gray-800 leading-none tracking-tight">{job.vacancyCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Qualification Standards */}
          {(job.qsEducation || job.qsExperience || job.qsTraining || job.qsEligibility) && (
            <div className="flex flex-col gap-1.5 mt-5 text-[13px]">
              <span className="text-[14px] font-bold text-gray-900 tracking-wide mb-1">QS:</span>
              {job.qsEducation && <div><strong className="text-gray-900 font-semibold">Education:</strong> <span className="text-gray-600">{job.qsEducation}</span></div>}
              {job.qsExperience && <div><strong className="text-gray-900 font-semibold">Experience:</strong> <span className="text-gray-600">{job.qsExperience}</span></div>}
              {job.qsTraining && <div><strong className="text-gray-900 font-semibold">Training:</strong> <span className="text-gray-600">{job.qsTraining}</span></div>}
              {job.qsEligibility && <div><strong className="text-gray-900 font-semibold">Eligibility:</strong> <span className="text-gray-600">{job.qsEligibility}</span></div>}
            </div>
          )}
        </div>
      </div>

      {/* Status Footer */}
      {tab === 'my-applications' && (
        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 mb-4">
          <div className="flex flex-col gap-1.5 w-full mt-1">
            <div className="flex items-stretch gap-1.5 w-full">
              <div className="flex-1 min-w-0 px-2 py-1.5 text-[9.5px] font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase shadow-sm flex items-center justify-center text-center">
                Application Status: {job.stage || job.realStatus || 'PENDING'}
              </div>
              <div className="flex-1 min-w-0 px-2 py-1.5 text-[9.5px] font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 tracking-wide uppercase shadow-sm flex items-center justify-center text-center">
                Assessment Status: {job.assessmentStatus || 'N/A'}
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="px-4 py-1.5 text-[9.5px] font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wide uppercase shadow-sm flex items-center justify-center text-center">
                Appointment Status: {job.appointmentStatus || 'N/A'}
              </div>
            </div>
          </div>
          {(() => {
            let scores: any = {};
            if (job.comparativeAssessmentScores) {
              try {
                scores = typeof job.comparativeAssessmentScores === 'string' ? JSON.parse(job.comparativeAssessmentScores) : job.comparativeAssessmentScores;
              } catch (e) {
                scores = {};
              }
            }
            return (
              <div className="flex flex-col gap-1 w-full mt-1.5">
                <span className={`w-full px-2 py-1 text-[9px] font-extrabold rounded-md border tracking-wider uppercase text-center truncate ${scores.bei !== undefined ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  Behavioral Events Interview (BEI): {scores.bei !== undefined ? scores.bei : 'processing'}
                </span>
                <span className={`w-full px-2 py-1 text-[9px] font-extrabold rounded-md border tracking-wider uppercase text-center truncate ${scores.wst !== undefined ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  Work Sample Test (WST): {scores.wst !== undefined ? scores.wst : 'processing'}
                </span>
                <span className={`w-full px-2 py-1 text-[9px] font-extrabold rounded-md border tracking-wider uppercase text-center truncate ${scores.we !== undefined ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  Written Examination (WE): {scores.we !== undefined ? scores.we : 'processing'}
                </span>
                <span className={`w-full px-2 py-1 text-[9px] font-extrabold rounded-md border tracking-wider uppercase text-center truncate ${job.overallFit ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  OVERALL FIT: {job.overallFit || 'processing'}
                </span>
              </div>
            );
          })()}
        </div>
      )}

      {/* Buttons */}
      <div className={`flex items-center gap-3 mt-auto ${tab !== 'my-applications' ? 'pt-5' : ''}`}>
        {isPublic && onCardClick && (
          <button onClick={(e) => { e.stopPropagation(); onCardClick(job); }} className="flex-1 bg-white border border-[#0f172a]/20 hover:bg-gray-50 text-[#0f172a] font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2">
            VIEW DETAILS
          </button>
        )}
        {(isApplied || tab === 'my-applications') ? (
          <button disabled className="flex-1 bg-gray-200 text-gray-500 font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide cursor-not-allowed flex justify-center items-center gap-2">
            <div className="bg-white rounded-full p-0.5"><Check className="w-3.5 h-3.5 text-gray-400" strokeWidth={4} /></div> APPLIED
          </button>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); isPublic && onApplyClick ? onApplyClick(job) : handleApply(job); }} className="flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2">
            <Briefcase className="w-4 h-4" /> APPLY NOW
          </button>
        )}
        {!isPublic && (
          <button onClick={(e) => { e.stopPropagation(); toggleSaveJob(job.id || job.positionId); }} className={`flex-1 border font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2 ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
            <Star className={`w-4 h-4 ${isSaved ? 'fill-blue-500' : ''}`} /> {isSaved ? 'SAVED' : 'SAVE'}
          </button>
        )}
      </div>
    </div>
  );
};

const JobTableList = ({ jobs, tab, appliedJobIds = [], savedJobIds = [], toggleSaveJob, handleApply, isPublic = false, onCardClick, onApplyClick }: any) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden w-full mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Position Title</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Assignment / Location</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Details</th>
              {tab === 'my-applications' && (
                <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              )}
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job: any) => {
              const isApplied = appliedJobIds.includes(job.id || job.positionId);
              const isSaved = savedJobIds.includes(job.id || job.positionId);
              const title = job.title || job.position || 'Unknown Position';

              return (
                <tr 
                  key={job.id || job.positionId} 
                  onClick={(e) => { 
                    if ((e.target as any).closest("button")) return; 
                    if (isPublic && onCardClick) {
                      onCardClick(job);
                      return;
                    }
                    const vid = tab === 'my-applications' ? job.positionId : (job.id || job.positionId); 
                    navigate(`/applicant-jobs/${vid}`); 
                  }} 
                  className={`hover:bg-blue-50/50 transition-colors cursor-pointer group ${(isApplied || tab === 'my-applications') ? 'bg-blue-50/20' : ''}`}
                >
                  {/* Position Title Column */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-bold text-[#2563eb] group-hover:text-blue-700 transition-colors">{title}</span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f0f4f8] text-[10px] font-bold text-gray-600 tracking-wider">
                          <CircleDollarSign className="w-3 h-3 text-blue-500" /> SG-{job.sg || 'N/A'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f0fdf4] text-[10px] font-bold text-emerald-600 tracking-wider">
                          <Users className="w-3 h-3" /> {job.vacancyCount || 0} VACANCIES
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Assignment Column */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-gray-800">{job.division || job.office || 'N/A'}</span>
                      <span className="text-[12px] font-medium text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" /> {job.location || 'N/A'}
                      </span>
                    </div>
                  </td>

                  {/* Details (QS) Column */}
                  <td className="px-6 py-5 align-top max-w-[300px]">
                    <div className="flex flex-col gap-1 text-[11px]">
                      {job.qsEducation && <div className="truncate" title={job.qsEducation}><span className="font-bold text-gray-700">Edu:</span> <span className="text-gray-500">{job.qsEducation}</span></div>}
                      {job.qsExperience && <div className="truncate" title={job.qsExperience}><span className="font-bold text-gray-700">Exp:</span> <span className="text-gray-500">{job.qsExperience}</span></div>}
                    </div>
                  </td>

                  {/* Status Column (Only for my-applications) */}
                  {tab === 'my-applications' && (
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-block px-2 py-1 text-[9.5px] font-bold rounded bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase shadow-sm whitespace-nowrap text-center">
                          App: {job.stage || job.realStatus || 'PENDING'}
                        </span>
                        <span className="inline-block px-2 py-1 text-[9.5px] font-bold rounded bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wide uppercase shadow-sm whitespace-nowrap text-center">
                          Apt: {job.appointmentStatus || 'N/A'}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Actions Column */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      {(isApplied || tab === 'my-applications') ? (
                        <button disabled className="w-full bg-gray-100 text-gray-500 font-bold py-2 rounded-lg text-[11px] tracking-wide cursor-not-allowed flex justify-center items-center gap-1.5 border border-gray-200">
                          <Check className="w-3 h-3" strokeWidth={4} /> APPLIED
                        </button>
                      ) : (
                        <button onClick={() => isPublic && onApplyClick ? onApplyClick(job) : handleApply(job)} className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-2 rounded-lg text-[11px] tracking-wide transition-colors flex justify-center items-center gap-1.5 shadow-sm">
                          <Briefcase className="w-3 h-3" /> APPLY NOW
                        </button>
                      )}
                      {!isPublic && (
                        <button onClick={() => toggleSaveJob(job.id || job.positionId)} className={`w-full border font-bold py-2 rounded-lg text-[11px] tracking-wide transition-colors flex justify-center items-center gap-1.5 shadow-sm ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                          <Star className={`w-3 h-3 ${isSaved ? 'fill-blue-500' : ''}`} /> {isSaved ? 'SAVED' : 'SAVE'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { JobCard, JobTableList };
