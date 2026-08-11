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
    <div className={`bg-white rounded-[20px] border-[1.5px] ${borderColor} ${shadowClass} p-6 flex flex-col transition-shadow relative`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1 w-full">
          {/* Test Data Badge */}
          {job.is_test && (
            <div className="mb-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-red-100 text-red-800 border border-red-300 shadow-sm uppercase tracking-wider">
                NOT TO APPLY (TEST DATA)
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#2563eb] leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Place of Assignment Tag */}
          <div className="mt-2 mb-1">
             <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide border border-blue-100">
               <MapPin className="w-3 h-3 mr-1" />
               {job.region || job.location ? `${job.region || job.location} - ` : ''}{job.school || job.division || job.office || 'N/A'}
             </span>
          </div>

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
              <span className="text-[14px] font-bold text-gray-900 tracking-wide mb-1">Qualification Standards:</span>
              {job.qsEducation && <div><strong className="text-gray-900 font-semibold">Education:</strong> <span className="text-gray-600">{job.qsEducation}</span></div>}
              <div><strong className="text-gray-900 font-semibold">Minimum Years of Experience:</strong> <span className="text-gray-600">{(job.qsExperienceMin === 0 || job.qsExperienceMin === '0' || job.qsExperience === 0 || job.qsExperience === '0') ? 'None Required' : (job.qsExperienceMin ?? job.qsExperience ?? '—')}</span></div>
              <div><strong className="text-gray-900 font-semibold">Minimum Hours of Training:</strong> <span className="text-gray-600">{(job.qsTrainingMin === 0 || job.qsTrainingMin === '0' || job.qsTraining === 0 || job.qsTraining === '0') ? 'None Required' : (job.qsTrainingMin ?? job.qsTraining ?? '—')}</span></div>
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
              <div className="flex-1 min-w-0 px-2 py-1.5 text-[10px] font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase shadow-sm flex flex-col items-center justify-center text-center p-2">
                <span className="text-[9px] text-blue-500 mb-0.5">Application Status</span>
                {job.stage || job.realStatus || 'PENDING'}
              </div>
              <div className="flex-1 min-w-0 px-2 py-1.5 text-[10px] font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 tracking-wide uppercase shadow-sm flex flex-col items-center justify-center text-center p-2">
                <span className="text-[9px] text-purple-500 mb-0.5">Assessment Status</span>
                {job.assessmentStatus || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {tab !== 'my-applications' && (
        <div className={`flex items-center gap-3 mt-auto pt-5`}>
          {isApplied ? (
            <button disabled className="flex-1 bg-gray-200 text-gray-500 font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide cursor-not-allowed flex justify-center items-center gap-2">
              <div className="bg-white rounded-full p-0.5"><Check className="w-3.5 h-3.5 text-gray-400" strokeWidth={4} /></div> APPLIED
            </button>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); isPublic && onApplyClick ? onApplyClick(job) : handleApply(job); }} className="flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2">
              <Briefcase className="w-4 h-4" /> APPLY NOW
            </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); toggleSaveJob(job.id || job.positionId); }} className={`flex-1 border font-bold py-3.5 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2 ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
            <Star className={`w-4 h-4 ${isSaved ? 'fill-blue-500' : ''}`} /> {isSaved ? 'SAVED' : 'SAVE'}
          </button>
        </div>
      )}
    </div>
  );
};

const JobTableList = ({ jobs, tab, appliedJobIds = [], savedJobIds = [], toggleSaveJob, handleApply, isPublic = false, onCardClick, onApplyClick }: any) => {
  const navigate = useNavigate();
  const borderColor = tab === 'my-applications' ? 'border-[#2563eb]' : 'border-[#fbbf24]';
  const shadowClass = tab === 'my-applications' 
    ? 'shadow-[0_8px_25px_rgba(37,99,235,0.15)]' 
    : 'shadow-[0_8px_25px_rgba(251,191,36,0.15)]';

  return (
    <div className={`w-full mt-6 bg-white rounded-[24px] border-[1.5px] ${borderColor} ${shadowClass} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Position Title</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Division</th>
              <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Salary Grade</th>
              {tab === 'my-applications' ? (
                <>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Application Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Assessment Status</th>
                </>
              ) : (
                <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Vacancies</th>
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
                  className={`hover:bg-blue-50/50 transition-colors group ${(isApplied || tab === 'my-applications') ? 'bg-blue-50/20' : ''}`}
                >
                  {/* Position Title Column */}
                  <td className="px-6 py-5 align-middle">
                    <div className="flex flex-col gap-1 items-start">
                      {job.is_test && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-300 shadow-sm uppercase tracking-wider">
                          NOT TO APPLY (TEST DATA)
                        </span>
                      )}
                      <span className="text-[15px] font-bold text-[#2563eb] group-hover:text-blue-700 transition-colors">{title}</span>
                    </div>
                  </td>

                  {/* Region Column */}
                  <td className="px-6 py-5 align-middle text-[13px] font-semibold text-gray-800">
                    {job.location || 'N/A'}
                  </td>

                  {/* Division Column */}
                  <td className="px-6 py-5 align-middle text-[13px] font-semibold text-gray-800">
                    {job.division || job.office || 'N/A'}
                  </td>

                  {/* Salary Grade Column */}
                  <td className="px-6 py-5 align-middle">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f0f4f8] text-[12px] font-bold text-gray-600 tracking-wider">
                      SG-{job.sg || 'N/A'}
                    </span>
                  </td>

                  {/* Vacancies OR Status Column */}
                  {tab === 'my-applications' ? (
                    <>
                      <td className="px-6 py-5 align-middle">
                        <span className="inline-block px-2 py-1 text-[11px] font-bold rounded bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase shadow-sm whitespace-nowrap text-center">
                          {job.stage || job.realStatus || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-5 align-middle">
                        <span className="inline-block px-2 py-1 text-[11px] font-bold rounded bg-purple-50 text-purple-700 border border-purple-200 tracking-wide uppercase shadow-sm whitespace-nowrap text-center">
                          {job.assessmentStatus || 'N/A'}
                        </span>
                      </td>
                    </>
                  ) : (
                    <td className="px-6 py-5 align-middle">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f0fdf4] text-[12px] font-bold text-emerald-600 tracking-wider">
                        {job.vacancyCount || 0}
                      </span>
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
                      <button onClick={() => toggleSaveJob(job.id || job.positionId)} className={`w-full border font-bold py-2 rounded-lg text-[11px] tracking-wide transition-colors flex justify-center items-center gap-1.5 shadow-sm ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                        <Star className={`w-3 h-3 ${isSaved ? 'fill-blue-500' : ''}`} /> {isSaved ? 'SAVED' : 'SAVE'}
                      </button>
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
