import React from 'react';
import { Briefcase, CalendarDays, Star, CircleDollarSign, GraduationCap, MapPin } from 'lucide-react';

const JobCard = ({ job, tab, appliedJobIds, savedJobIds, toggleSaveJob, handleApply }: any) => {
  const isApplied = appliedJobIds.includes(job.id || job.positionId);
  const isSaved = savedJobIds.includes(job.id || job.positionId);
  const title = job.title || job.position || 'Unknown Position';

  return (
    <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow relative">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          {/* Top Tags */}
          <div className="flex items-center gap-2">
            {job.location && (
              <span className="px-3 py-1 bg-gray-50 text-[#003366] text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-100">{job.location}</span>
            )}
            {job.division && (
              <span className="px-3 py-1 bg-gray-50 text-[#003366] text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-100">{job.division}</span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-[#2563eb] leading-tight uppercase line-clamp-2 mt-1">
            {title}
          </h3>
          
          {/* Item No & Type */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-[#3b82f6] text-[11px] font-bold bg-blue-50 px-2.5 py-1 rounded-md uppercase">IPC: {job.itemNo || 'N/A'}</span>
            <span className="text-[#3b82f6] text-[11px] font-bold bg-blue-50 px-2.5 py-1 rounded-md uppercase">{job.type || 'Permanent'}</span>
          </div>
        </div>
        
        {/* Days Left Box */}
        <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[20px] p-3 w-20 h-20 shadow-sm shrink-0 ml-4">
          <span className="text-[22px] font-black text-[#f59e0b] leading-none">{job.daysLeft || 0}</span>
          <div className="w-8 h-1 bg-[#f59e0b] rounded-full my-1.5"></div>
          <span className="text-[9px] font-bold text-[#d97706] uppercase tracking-widest text-center leading-tight">DAYS<br/>LEFT</span>
        </div>
      </div>
      
      {/* Rows Section */}
      <div className="flex flex-col gap-3 mb-6 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PLACE OF ASSIGNMENT / SALARY GRADE</span>
            <span className="text-[14px] font-bold text-gray-800">{job.office || 'N/A'} • SG {job.sg || 'N/A'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <CircleDollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE POSTED</span>
            <span className="text-[14px] font-bold text-gray-800">{job.posted || 'N/A'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <CalendarDays className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DEADLINE OF APPLICATION</span>
            <span className="text-[14px] font-bold text-gray-800">{job.deadline || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      {tab === 'my-applications' && (
        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase">
              STATUS: {job.stage || job.realStatus || 'PENDING'}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-purple-50 text-purple-700 border border-purple-200 tracking-wide uppercase">
              ASSESSMENT: {job.assessmentStatus || 'N/A'}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wide uppercase">
              APPOINTMENT: {job.appointmentStatus || 'N/A'}
            </span>
          </div>
        </div>
      )}
      
      {/* Buttons */}
      <div className={`flex items-center gap-3 mt-auto ${tab !== 'my-applications' ? 'pt-4 border-t border-gray-100' : ''}`}>
        {(isApplied || tab === 'my-applications') ? (
           <button disabled className="flex-1 bg-gray-400 text-white font-bold py-3 px-4 rounded-xl text-[13px] tracking-wide cursor-not-allowed flex justify-center items-center gap-2">
             APPLIED
           </button>
        ) : (
          <button onClick={() => handleApply(job)} className="flex-1 bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2">
            <Briefcase className="w-4 h-4" /> APPLY NOW
          </button>
        )}
        <button onClick={() => toggleSaveJob(job.id || job.positionId)} className={`flex-1 border font-bold py-3 px-4 rounded-xl text-[13px] tracking-wide transition-colors flex justify-center items-center gap-2 ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
          <Star className={`w-4 h-4 ${isSaved ? 'fill-blue-500' : ''}`} /> {isSaved ? 'SAVED' : 'SAVE'}
        </button>
      </div>
    </div>
  );
};

const JobTableList = ({ jobs, tab, appliedJobIds, savedJobIds, toggleSaveJob, handleApply }: any) => {
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
                <tr key={job.id || job.positionId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-[#2563eb]">{title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">IPC: {job.itemNo || 'N/A'}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">{job.type || 'Permanent'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-800 text-sm">{job.office || 'N/A'}</span>
                      {job.division && <span className="text-gray-500 text-xs">{job.division}</span>}
                      {job.location && <span className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/> {job.location}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <span className="font-medium">SG {job.sg || 'N/A'}</span>
                      <span className="text-xs">Posted: {job.posted || 'N/A'}</span>
                      <span className="text-xs text-[#f59e0b] font-semibold">Deadline: {job.deadline || 'N/A'} ({job.daysLeft || 0} days left)</span>
                    </div>
                  </td>
                  {tab === 'my-applications' && (
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="px-2 py-0.5 w-fit text-[10px] font-bold rounded bg-blue-50 text-blue-700 uppercase tracking-wider">
                          STATUS: {job.stage || job.realStatus || 'PENDING'}
                        </span>
                        <span className="px-2 py-0.5 w-fit text-[10px] font-bold rounded bg-purple-50 text-purple-700 uppercase tracking-wider">
                          ASSESS: {job.assessmentStatus || 'N/A'}
                        </span>
                        <span className="px-2 py-0.5 w-fit text-[10px] font-bold rounded bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                          APPT: {job.appointmentStatus || 'N/A'}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col gap-2 items-end">
                      {(isApplied || tab === 'my-applications') ? (
                        <button disabled className="w-32 bg-gray-400 text-white font-bold py-1.5 px-3 rounded-lg text-xs cursor-not-allowed">
                          APPLIED
                        </button>
                      ) : (
                        <button onClick={() => handleApply(job)} className="w-32 bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors">
                          APPLY NOW
                        </button>
                      )}
                      <button onClick={() => toggleSaveJob(job.id || job.positionId)} className={`w-32 border font-bold py-1.5 px-3 rounded-lg text-xs transition-colors ${isSaved ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                        {isSaved ? 'SAVED' : 'SAVE'}
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
