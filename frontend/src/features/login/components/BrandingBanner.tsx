import { Building2, User, CheckCircle2, ShieldCheck, Clock, BarChart3 } from 'lucide-react';

export default function BrandingBanner() {
  return (
        <div className="hidden lg:flex relative w-0 flex-1 bg-[var(--navy)] flex-col items-center justify-center h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-2)] to-[var(--navy)] opacity-90"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center max-w-3xl mt-[-80px]">
            <div className="w-24 h-24 bg-[#0a386c] rounded-[24px] flex items-center justify-center mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              <Building2 className="w-12 h-12 text-[#fbbf24]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Streamlining Public Service Recruitment
            </h1>
            <p className="text-lg text-blue-100/90 max-w-xl leading-relaxed">
              A modern, efficient, and transparent platform for managing the entire hiring lifecycle.
              Automated screening, structured evaluation, and seamless onboarding.
            </p>
          </div>

          {/* Feature Icons Bottom Row */}
          <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center gap-12 px-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <User className="w-7 h-7 text-[#fbbf24] relative z-10" />
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] absolute bottom-3 right-3 z-10" />
              </div>
              <span className="text-xs font-semibold text-white/80 tracking-wide">Fair Process</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <ShieldCheck className="w-8 h-8 text-[#fbbf24] relative z-10" />
              </div>
              <span className="text-xs font-semibold text-white/80 tracking-wide">Secure Data</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <Clock className="w-8 h-8 text-[#fbbf24] relative z-10" />
              </div>
              <span className="text-xs font-semibold text-white/80 tracking-wide">Time Saving</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <BarChart3 className="w-8 h-8 text-[#fbbf24] relative z-10" />
              </div>
              <span className="text-xs font-semibold text-white/80 tracking-wide">Data Driven</span>
            </div>
          </div>
        </div>
  );
}
