import type { SetStateAction } from "react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";

/** Step C1 of the application modal. State and handlers come from the parent via `ctx`. */
export interface PersonalInfoStepCtx {
  activeTab: string;
  isPermBarangayOther: boolean | "";
  isResBarangayOther: boolean | "";
  jobTitle: string;
  otherInfo: any;
  permAddress: any;
  permBarangay: string;
  permBarangaysList: any[];
  permCitiesList: any[];
  permCity: string;
  permProvince: string;
  permProvincesList: any[];
  permRegion: string;
  regionsList: any[];
  resAddress: any;
  resBarangay: string;
  resBarangaysList: any[];
  resCitiesList: any[];
  resCity: string;
  resProvince: string;
  resProvincesList: any[];
  resRegion: string;
  sameAsRes: boolean;
  setPermBarangay: (value: SetStateAction<string>) => void;
  setPermCity: (value: SetStateAction<string>) => void;
  setPermProvince: (value: SetStateAction<string>) => void;
  setPermRegion: (value: SetStateAction<string>) => void;
  setResBarangay: (value: SetStateAction<string>) => void;
  setResCity: (value: SetStateAction<string>) => void;
  setResProvince: (value: SetStateAction<string>) => void;
  setResRegion: (value: SetStateAction<string>) => void;
  setSameAsRes: (value: SetStateAction<boolean>) => void;
  setSex: (value: SetStateAction<string>) => void;
  sex: string;
  userData: any;
}

export default function PersonalInfoStep({ ctx }: { ctx: PersonalInfoStepCtx }) {
  const {
    activeTab,
    isPermBarangayOther,
    isResBarangayOther,
    jobTitle,
    otherInfo,
    permAddress,
    permBarangay,
    permBarangaysList,
    permCitiesList,
    permCity,
    permProvince,
    permProvincesList,
    permRegion,
    regionsList,
    resAddress,
    resBarangay,
    resBarangaysList,
    resCitiesList,
    resCity,
    resProvince,
    resProvincesList,
    resRegion,
    sameAsRes,
    setPermBarangay,
    setPermCity,
    setPermProvince,
    setPermRegion,
    setResBarangay,
    setResCity,
    setResProvince,
    setResRegion,
    setSameAsRes,
    setSex,
    sex,
    userData,
  } = ctx;

  return (
    <div
      className={
        activeTab === "C1"
          ? "space-y-8 animate-in fade-in slide-in-from-bottom-2"
          : "hidden"
      }
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Name <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              First Name <span className="text-red-500">*</span>
            </span>
            <input name="first_name"
              required
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              type="text"
              defaultValue={userData?.first_name || ""}
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Middle Name
            </span>
            <input
              placeholder="Enter middle name"
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
              type="text"
              name="middle_name"
              defaultValue={userData?.middle_name || ""}
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Last Name <span className="text-red-500">*</span>
            </span>
            <input
              required
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              type="text"
              name="surname"
              defaultValue={userData?.surname || ""}
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Extension Name
            </span>
            <input
              placeholder="Enter extension name"
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
              type="text"
              name="extension_name"
              defaultValue={otherInfo?.extension_name || otherInfo?.extensionName || ""}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Birth Details <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-[35%] flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </span>
            <ModernDatePicker
              required
              placeholder="Select date of birth"
              className="w-full border border-gray-300 bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer focus:border-blue-500 text-gray-700 " name="date_of_birth"
              defaultValue={
                userData?.date_of_birth
                  ? userData.date_of_birth.split("T")[0]
                  : ""
              }
            />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              City, town, etc. <span className="text-red-500">*</span>
            </span>
            <input name="place_of_birth"
              required
              placeholder="Enter place of birth"
              className="w-full border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]"
              type="text"
              defaultValue={userData?.place_of_birth || ""}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
          Sex <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSex("MALE")}
            className={`${sex?.toUpperCase() === "MALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500"} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === "MALE" ? "bg-white" : "bg-gray-400"}`}
            ></div>{" "}
            MALE
          </button>
          <button
            type="button"
            onClick={() => setSex("FEMALE")}
            className={`${sex?.toUpperCase() === "FEMALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"} border border-gray-200 px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === "FEMALE" ? "bg-white" : "bg-gray-400"}`}
            ></div>{" "}
            FEMALE
          </button>
          <input type="hidden" name="sex" value={sex} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
          Civil Status <span className="text-red-500">*</span>
        </label>
        <select
          name="civil_status"
          defaultValue={userData?.civil_status || ""}
          required
          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 min-w-[200px] h-[42px] "
        >
          <option value="">Select civil status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Separated">Separated</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Statistics <span className="text-red-500">*</span>
          <div className="text-[10px] text-gray-400 font-normal mt-0.5 leading-tight">
            Specify your Height,
            <br />
            Weight, and Blood Type
          </div>
        </label>
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Height <span className="text-red-500">*</span>
            </span>
            <div className="flex">
              <input
                required
                placeholder="Enter height"
                className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                type="text"
                name="height"
                defaultValue={otherInfo?.height || ""}
              />
              <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">
                m
              </span>
            </div>
          </div>
          <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Weight <span className="text-red-500">*</span>
            </span>
            <div className="flex">
              <input
                required
                placeholder="Enter weight"
                className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                type="text"
                name="weight"
                defaultValue={otherInfo?.weight || ""}
              />
              <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">
                kg
              </span>
            </div>
          </div>
          <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Blood Type <span className="text-red-500">*</span>
            </span>
            <select
              name="blood_type"
              defaultValue={userData?.blood_type || ""}
              required
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
          Agency Employee No.
          <br />
          <span className="text-[12px] text-gray-400 font-normal">
            (if any)
          </span>
        </label>
        <input
          name="agency_employee_no"
          placeholder="Enter agency employee number"
          className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
          type="text"
          defaultValue={otherInfo?.agency_employee_no || otherInfo?.agencyEmployeeNo || ""}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
          Religion
        </label>
        <input
          name="religion"
          placeholder="Enter religion"
          className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
          type="text"
          defaultValue={userData?.religion || ""}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
          Citizenship <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
          <select
            name="citizenship"
            defaultValue={userData?.citizenship || ""}
            required
            className="w-full sm:w-[240px] border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px]"
          >
            <option value="">Enter citizenship</option>
            <option value="Filipino">Filipino</option>
            <option value="Dual Citizenship">Dual Citizenship</option>
          </select>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
              <input
                className="w-3.5 h-3.5 text-blue-600 border-gray-300"
                type="radio"
                name="citizenship_type"
                value="by Birth"
                defaultChecked={
                  otherInfo?.citizenship_type?.toLowerCase() === "by birth" ||
                  otherInfo?.citizenshipType?.toLowerCase() === "by birth"
                }
              />
              by Birth
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
              <input
                className="w-3.5 h-3.5 text-blue-600 border-gray-300"
                type="radio"
                name="citizenship_type"
                value="by Naturalization"
                defaultChecked={
                  otherInfo?.citizenship_type?.toLowerCase() === "by naturalization" ||
                  otherInfo?.citizenshipType?.toLowerCase() === "by naturalization"
                }
              />
              by Naturalization
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Residential Address <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  House / Block / Lot No.
                </span>
                <input
                  placeholder="Enter house / block / lot No."
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                  type="text"
                  name="res_house"
                  defaultValue={resAddress?.house || ""}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  Street
                </span>
                <input
                  placeholder="Enter street"
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                  type="text"
                  name="res_street"
                  defaultValue={resAddress?.street || ""}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  Subdivision / Village
                </span>
                <input
                  name="res_subdivision"
                  placeholder="Enter subdivision / village"
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                  type="text"
                  defaultValue={resAddress?.subdivision || ""}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  ZIP Code
                </span>
                <input
                  placeholder="Enter ZIP code"
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                  type="text"
                  name="res_zip"
                  defaultValue={resAddress?.zip || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  Region
                </span>
                <select
                  name="res_region"
                  value={resRegion}
                  onChange={(e: any) => {
                    setResRegion(e.target.value);
                    setResProvince("");
                    setResCity("");
                    setResBarangay("");
                  }}
                  required
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                >
                  <option value="">Select region</option>
                  {regionsList.map((r: any, idx: number) => (
                    <option
                      key={`${r.name}-${idx}`}
                      value={r.name}
                    >
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  Province
                </span>
                <select
                  name="res_province"
                  value={resProvince}
                  onChange={(e: any) => {
                    setResProvince(e.target.value);
                    setResCity("");
                    setResBarangay("");
                  }}
                  required
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                  disabled={!resRegion}
                >
                  <option value="">Select province</option>
                  {resProvincesList.map((p: any, idx: number) => (
                    <option
                      key={`${p.name}-${idx}`}
                      value={p.name}
                    >
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  City / Municipality
                </span>
                <select
                  name="res_city"
                  value={resCity}
                  onChange={(e: any) => {
                    setResCity(e.target.value);
                    setResBarangay("");
                  }}
                  required
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                  disabled={!resProvince}
                >
                  <option value="">Select city / municipality</option>
                  {resCitiesList.map((c: any, idx: number) => (
                    <option
                      key={`${c.name}-${idx}`}
                      value={c.name}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                  Barangay
                </span>
                <select
                  name={isResBarangayOther ? undefined : "res_barangay"}
                  value={isResBarangayOther ? "OTHER" : resBarangay}
                  onChange={(e) => setResBarangay(e.target.value)}
                  required
                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                  disabled={!resCity}
                >
                  <option value="">Select barangay</option>
                  {resBarangaysList.map((b: any, idx: number) => (
                    <option key={`${b.name}-${idx}`} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                  <option value="OTHER">Other</option>
                </select>
                {isResBarangayOther && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name={isResBarangayOther ? "res_barangay" : undefined}
                      required
                      placeholder="Type your barangay"
                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      value={resBarangay === "OTHER" ? "" : resBarangay}
                      onChange={(e) => setResBarangay(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Permanent Address <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex flex-col gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 mb-1">
            <input
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded"
              type="checkbox"
              checked={sameAsRes}
              onChange={(e) => setSameAsRes(e.target.checked)}
              name="same_as_res"
            />
            <span className="font-bold">
              Same as Residential Address?
            </span>{" "}
            <span className="italic text-gray-400">
              (check if permanent address is same with the above
              address)
            </span>
          </label>
          {!sameAsRes && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    House / Block / Lot No.
                  </span>
                  <input
                    name="perm_house"
                    placeholder="Enter house / block / lot No."
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                    type="text"
                    defaultValue={permAddress?.house || ""}
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    Street
                  </span>
                  <input
                    name="perm_street"
                    placeholder="Enter street"
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                    type="text"
                    defaultValue={permAddress?.street || ""}
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    Subdivision / Village
                  </span>
                  <input
                    name="perm_subdivision"
                    placeholder="Enter subdivision / village"
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                    type="text"
                    defaultValue={permAddress?.subdivision || ""}
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    ZIP Code
                  </span>
                  <input
                    name="perm_zip"
                    placeholder="Enter ZIP code"
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                    type="text"
                    defaultValue={permAddress?.zip || ""}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    Region
                  </span>
                  <select
                    name="perm_region"
                    value={permRegion}
                    onChange={(e: any) => {
                      setPermRegion(e.target.value);
                      setPermProvince("");
                      setPermCity("");
                      setPermBarangay("");
                    }}
                    required
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                  >
                    <option value="">Select region</option>
                    {regionsList.map((r: any, idx: number) => (
                      <option
                        key={`${r.name}-${idx}`}
                        value={r.name}
                      >
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    Province
                  </span>
                  <select
                    name="perm_province"
                    value={permProvince}
                    onChange={(e: any) => {
                      setPermProvince(e.target.value);
                      setPermCity("");
                      setPermBarangay("");
                    }}
                    required
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                    disabled={!permRegion}
                  >
                    <option value="">Select province</option>
                    {permProvincesList.map((p: any, idx: number) => (
                      <option
                        key={`${p.name}-${idx}`}
                        value={p.name}
                      >
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    City / Municipality
                  </span>
                  <select
                    name="perm_city"
                    value={permCity}
                    onChange={(e: any) => {
                      setPermCity(e.target.value);
                      setPermBarangay("");
                    }}
                    required
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                    disabled={!permProvince}
                  >
                    <option value="">
                      Select city / municipality
                    </option>
                    {permCitiesList.map((c: any, idx: number) => (
                      <option
                        key={`${c.name}-${idx}`}
                        value={c.name}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                    Barangay
                  </span>
                  <select
                    name={isPermBarangayOther ? undefined : "perm_barangay"}
                    value={isPermBarangayOther ? "OTHER" : permBarangay}
                    onChange={(e) => setPermBarangay(e.target.value)}
                    required
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                    disabled={!permCity}
                  >
                    <option value="">Select barangay</option>
                    {permBarangaysList.map((b: any, idx: number) => (
                      <option key={`${b.name}-${idx}`} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                    <option value="OTHER">Other</option>
                  </select>
                  {isPermBarangayOther && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name={isPermBarangayOther ? "perm_barangay" : undefined}
                        required
                        placeholder="Type your barangay"
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        value={permBarangay === "OTHER" ? "" : permBarangay}
                        onChange={(e) => setPermBarangay(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Contact Nos.
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Telephone No. <span className="text-gray-400 font-normal italic text-[10px]">(Optional)</span>
            </span>
            <input name="telephone_no"
              placeholder="Enter telephone no."
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              type="text"
              defaultValue={userData?.telephone_no || ""}
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Mobile No. <span className="text-red-500">*</span>
            </span>
            <input
              required
              placeholder="Enter mobile no."
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              type="text"
              name="mobile_no"
              defaultValue={userData?.mobile_no || ""}
              maxLength={11}
              onInput={(e: any) => { e.target.value = e.target.value.replace(/\D/g, '') }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Primary <span className="text-red-500">*</span>
            </span>
            <input
              name="email"
              required
              autoComplete="email"
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
              type="email"
              defaultValue={
                userData?.email_address || userData?.email || ""
              }
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
              Alternate
            </span>
            <input name="alternate_email"
              placeholder="Enter alternate email"
              autoComplete="email"
              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
              type="email"
              defaultValue={userData?.alternate_email || ""}
            />
          </div>
        </div>
      </div>
      {jobTitle === "General Registration" && (
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                Create Password <span className="text-red-500">*</span>
              </span>
              <input
                name="password"
                required
                autoComplete="new-password"
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full normal-case"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </span>
              <input
                name="confirm_password"
                required
                autoComplete="new-password"
                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full normal-case"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
