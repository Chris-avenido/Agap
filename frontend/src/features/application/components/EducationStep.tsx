// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";

/** Step C3 of the application modal. State and handlers come from the parent via `ctx`. */
export interface EducationStepCtx {
  activeTab: string;
  eduBg: any[];
}

export default function EducationStep({ ctx }: { ctx: EducationStepCtx }) {
  const {
    activeTab,
    eduBg,
  } = ctx;

  return (
    <div
      className={
        activeTab === "C3"
          ? "w-full animate-in fade-in slide-in-from-bottom-2"
          : "hidden"
      }
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Elementary
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Name of School (Write in full)
            </span>

            <input
              type="text"
              name="edu_0_school_name" defaultValue={eduBg[0]?.school_name || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Basic Education/Degree/Course
            </span>

            <input
              type="text"
              name="edu_0_degree_course" defaultValue={eduBg[0]?.degree_course || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Period of Attendance (From - To)
            </span>

            <div className="flex items-center gap-2">
              <ModernDatePicker name="edu_0_period_from" defaultValue={eduBg[0]?.period_from || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
              <span className="text-gray-400">-</span>
              <ModernDatePicker name="edu_0_period_to" defaultValue={eduBg[0]?.period_to || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Highest Level/Units Earned
            </span>

            <input
              type="text"
              name="edu_0_highest_level" defaultValue={eduBg[0]?.highest_level || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Year Graduated
            </span>

            <input
              type="text"
              name="edu_0_year_graduated" defaultValue={eduBg[0]?.year_graduated || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Secondary
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Name of School (Write in full)
            </span>

            <input
              type="text"
              name="edu_1_school_name" defaultValue={eduBg[1]?.school_name || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Basic Education/Degree/Course
            </span>

            <input
              type="text"
              name="edu_1_degree_course" defaultValue={eduBg[1]?.degree_course || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Period of Attendance (From - To)
            </span>

            <div className="flex items-center gap-2">
              <ModernDatePicker name="edu_1_period_from" defaultValue={eduBg[1]?.period_from || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
              <span className="text-gray-400">-</span>
              <ModernDatePicker name="edu_1_period_to" defaultValue={eduBg[1]?.period_to || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Highest Level/Units Earned
            </span>

            <input
              type="text"
              name="edu_1_highest_level" defaultValue={eduBg[1]?.highest_level || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Year Graduated
            </span>

            <input
              type="text"
              name="edu_1_year_graduated" defaultValue={eduBg[1]?.year_graduated || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Vocational / Trade Course
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Name of School (Write in full)
            </span>

            <input
              type="text"
              name="edu_2_school_name" defaultValue={eduBg[2]?.school_name || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Basic Education/Degree/Course
            </span>

            <input
              type="text"
              name="edu_2_degree_course" defaultValue={eduBg[2]?.degree_course || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Period of Attendance (From - To)
            </span>

            <div className="flex items-center gap-2">
              <ModernDatePicker name="edu_2_period_from" defaultValue={eduBg[2]?.period_from || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
              <span className="text-gray-400">-</span>
              <ModernDatePicker name="edu_2_period_to" defaultValue={eduBg[2]?.period_to || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Highest Level/Units Earned
            </span>

            <input
              type="text"
              name="edu_2_highest_level" defaultValue={eduBg[2]?.highest_level || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Year Graduated
            </span>

            <input
              type="text"
              name="edu_2_year_graduated" defaultValue={eduBg[2]?.year_graduated || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          College
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Name of School (Write in full)
            </span>

            <input
              type="text"
              name="edu_3_school_name" defaultValue={eduBg[3]?.school_name || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Basic Education/Degree/Course
            </span>

            <input
              type="text"
              name="edu_3_degree_course" defaultValue={eduBg[3]?.degree_course || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Period of Attendance (From - To)
            </span>

            <div className="flex items-center gap-2">
              <ModernDatePicker name="edu_3_period_from" defaultValue={eduBg[3]?.period_from || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
              <span className="text-gray-400">-</span>
              <ModernDatePicker name="edu_3_period_to" defaultValue={eduBg[3]?.period_to || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Highest Level/Units Earned
            </span>

            <input
              type="text"
              name="edu_3_highest_level" defaultValue={eduBg[3]?.highest_level || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Year Graduated
            </span>

            <input
              type="text"
              name="edu_3_year_graduated" defaultValue={eduBg[3]?.year_graduated || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Graduate Studies
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Name of School (Write in full)
            </span>

            <input
              type="text"
              name="edu_4_school_name" defaultValue={eduBg[4]?.school_name || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Basic Education/Degree/Course
            </span>

            <input
              type="text"
              name="edu_4_degree_course" defaultValue={eduBg[4]?.degree_course || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Period of Attendance (From - To)
            </span>

            <div className="flex items-center gap-2">
              <ModernDatePicker name="edu_4_period_from" defaultValue={eduBg[4]?.period_from || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
              <span className="text-gray-400">-</span>
              <ModernDatePicker name="edu_4_period_to" defaultValue={eduBg[4]?.period_to || ""}
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Highest Level/Units Earned
            </span>

            <input
              type="text"
              name="edu_4_highest_level" defaultValue={eduBg[4]?.highest_level || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Year Graduated
            </span>

            <input
              type="text"
              name="edu_4_year_graduated" defaultValue={eduBg[4]?.year_graduated || ""}
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
