"use client";

import { useState, useEffect, useRef } from "react";
import { Download, GraduationCap, Filter, X, ArrowRight, User, LogOut } from "lucide-react";
import { get, set } from "idb-keyval";
import MarksForm from "./MarksForm";
import MarksTable from "./MarksTable";

export default function Dashboard({ currentUser, onLogout }) {
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const reportRef = useRef(null);

  // Load marks for current user
  useEffect(() => {
    if (!currentUser) return;
    setIsLoaded(false);
    get(`mockMarks_${currentUser}`).then((saved) => {
      setMarks(saved || []);
      setIsLoaded(true);
    }).catch(e => {
      console.error("Failed to load marks", e);
      setMarks([]);
      setIsLoaded(true);
    });
  }, [currentUser]);

  useEffect(() => {
    if (isLoaded && currentUser) {
      set(`mockMarks_${currentUser}`, marks).catch(e => console.error("Failed to save marks", e));
    }
  }, [marks, isLoaded, currentUser]);

  const handleAddMark = (newMark) => setMarks([newMark, ...marks]);
  const handleRemoveMark = (id) => setMarks(marks.filter(m => m.id !== id));
  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      const opt = {
        margin: 0.5,
        filename: `${currentUser}_Mock_Report.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Failed to generate PDF", err);
      window.print(); // Fallback
    }
  };

  const filteredMarks = filterDate ? marks.filter(m => m.date === filterDate) : marks;

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-8 selection:bg-blue-200 selection:text-blue-900 relative">
      
      {/* Decorative Background Elements (Creative) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden print:hidden">
        {/* Global subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        {/* Small geometric elements scattered around */}
        {/* Top Left Cross */}
        <div className="absolute top-[12%] left-[4%] text-blue-200 rotate-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        {/* Top Right Circle */}
        <div className="absolute top-[8%] right-[15%] text-indigo-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        {/* Middle Right Cross */}
        <div className="absolute top-[45%] right-[5%] text-cyan-200 rotate-45">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        {/* Bottom Left Circle */}
        <div className="absolute bottom-[18%] left-[8%] text-purple-200">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        {/* Bottom Right Squiggle/Wave */}
        <div className="absolute bottom-[12%] right-[10%] text-teal-100 rotate-12">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        {/* Middle Left Square */}
        <div className="absolute top-[55%] left-[3%] text-rose-100 rotate-[15deg]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>
        </div>
        {/* Very large faded blobs just to give a tiny bit of depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-50 opacity-50 rounded-full mix-blend-multiply blur-3xl z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-blue-50 opacity-50 rounded-full mix-blend-multiply blur-3xl z-0"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Card */}
        <header 
          className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] border border-[#e5e7eb] p-8 md:p-10 shadow-[0_4px_30px_rgb(0,0,0,0.05)] flex flex-col lg:flex-row justify-between items-center gap-8 animate-slide-up"
        >
          {/* Background Grid & Blobs */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.3]"
            style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          ></div>
          
          {/* Marvel Custom SVGs (Faces + Instruments) */}
          <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
            {/* 1. Spider-Man Face & Web */}
            <div className="absolute top-[-10%] left-[5%] animate-fade-in-out flex flex-col items-center gap-2 transform rotate-12" style={{ animationDelay: '0s', animationDuration: '6s' }}>
              <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-2xl">
                <ellipse cx="50" cy="50" rx="35" ry="45" fill="#e23636" />
                <path d="M 30 40 Q 45 35 48 50 Q 48 65 30 70 Q 15 65 18 50 Q 20 40 30 40" fill="white" stroke="black" strokeWidth="2" />
                <path d="M 70 40 Q 55 35 52 50 Q 52 65 70 70 Q 85 65 82 50 Q 80 40 70 40" fill="white" stroke="black" strokeWidth="2" />
                <path d="M 50 5 L 50 95 M 15 50 L 85 50 M 25 25 L 75 75 M 25 75 L 75 25" stroke="black" strokeWidth="1" opacity="0.3"/>
              </svg>
              <span className="text-xs font-black text-red-600 tracking-widest drop-shadow-md">WEB-SHOOTER</span>
            </div>
            
            {/* 2. Iron Man Face & Arc Reactor */}
            <div className="absolute bottom-[-15%] right-[5%] animate-fade-in-out flex flex-col items-center gap-2 transform -rotate-12" style={{ animationDelay: '2s', animationDuration: '7s' }}>
              <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-2xl">
                <rect x="25" y="15" width="50" height="70" rx="20" fill="#e23636" />
                <path d="M 30 30 L 70 30 L 75 60 L 60 80 L 40 80 L 25 60 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
                <rect x="35" y="45" width="12" height="6" fill="#67e8f9" className="animate-pulse" />
                <rect x="53" y="45" width="12" height="6" fill="#67e8f9" className="animate-pulse" />
                <rect x="40" y="65" width="20" height="2" fill="black" />
                <circle cx="50" cy="90" r="8" fill="#67e8f9" className="animate-pulse" />
              </svg>
              <span className="text-xs font-black text-amber-500 tracking-widest drop-shadow-md">ARC REACTOR</span>
            </div>

            {/* 3. Captain America Shield */}
            <div className="absolute top-[20%] right-[30%] animate-fade-in-out flex flex-col items-center gap-2" style={{ animationDelay: '4s', animationDuration: '8s' }}>
              <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-2xl animate-spin" style={{ animationDuration: '10s' }}>
                <circle cx="50" cy="50" r="45" fill="#e23636" />
                <circle cx="50" cy="50" r="35" fill="white" />
                <circle cx="50" cy="50" r="25" fill="#e23636" />
                <circle cx="50" cy="50" r="15" fill="#0051ba" />
                <polygon points="50,38 53,46 62,46 55,51 58,59 50,54 42,59 45,51 38,46 47,46" fill="white" />
              </svg>
              <span className="text-xs font-black text-blue-600 tracking-widest drop-shadow-md">VIBRANIUM</span>
            </div>

            {/* 4. Thor's Hammer */}
            <div className="absolute bottom-[10%] left-[30%] animate-fade-in-out flex flex-col items-center gap-2 transform rotate-45" style={{ animationDelay: '1s', animationDuration: '6.5s' }}>
              <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-2xl">
                <rect x="45" y="40" width="10" height="40" fill="#8B4513" stroke="#5C4033" strokeWidth="2" />
                <rect x="42" y="80" width="16" height="5" fill="#4a5568" />
                <path d="M 25 20 L 75 20 L 80 40 L 20 40 Z" fill="#e2e8f0" stroke="#4a5568" strokeWidth="2" />
                <path d="M 20 20 L 25 20 L 20 40 L 15 40 Z" fill="#cbd5e1" stroke="#4a5568" strokeWidth="1" />
                <path d="M 75 20 L 80 20 L 85 40 L 80 40 Z" fill="#94a3b8" stroke="#4a5568" strokeWidth="1" />
                {/* Lightning */}
                <path d="M 10 10 L 20 25 L 15 30 L 30 50" stroke="#fbbf24" strokeWidth="3" fill="none" className="animate-pulse" />
                <path d="M 90 10 L 80 25 L 85 30 L 70 50" stroke="#fbbf24" strokeWidth="3" fill="none" className="animate-pulse" />
              </svg>
              <span className="text-xs font-black text-slate-500 tracking-widest drop-shadow-md">MJOLNIR</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8 relative z-10 w-full lg:w-auto flex-1">
            {/* Marvel Style Logo */}
            <div className="flex-shrink-0 animate-zoom-in anim-delay-100 mt-0 sm:mt-3">
              <div className="animate-float-continuous">
                <div className="bg-[#ec1d24] text-white px-5 py-2.5 flex items-center justify-center transform -skew-x-6 shadow-[4px_4px_0px_#1e293b] border-2 border-[#1e293b] rounded-sm hover:scale-105 transition-transform">
                  <span className="font-black text-4xl sm:text-[2.5rem] tracking-tighter leading-none" style={{ fontFamily: 'Impact, Arial, sans-serif' }}>SSC</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start mt-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1d4ed8] tracking-tight leading-tight mb-2 animate-slide-up anim-delay-200">
                SSC Skywalkers
              </h1>
              <p className="text-[#64748b] font-medium text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed animate-slide-up anim-delay-300 italic">
                "Paseena bahane se hi itihaas likha jata hai. Har mock test tumhare struggle ka gawah hai, aur har score tumhari mehnat ka aaina."
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full lg:w-auto animate-zoom-in anim-delay-300">
            {/* Logged in user info */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#e2e8f0] rounded-2xl p-1.5 shadow-sm print:hidden w-full sm:w-auto">
              <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                <User size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-slate-800 px-2 truncate max-w-[120px]">
                {currentUser}
              </span>
              <button 
                onClick={onLogout}
                className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-100 transition-colors ml-1"
                title="Logout"
              >
                <LogOut size={16} strokeWidth={2.5} />
              </button>
            </div>

            <button 
              onClick={handleDownloadPDF}
              disabled={filteredMarks.length === 0}
              className="hidden lg:flex group items-center justify-center gap-3 bg-transparent text-[#2563eb] font-bold hover:text-[#1d4ed8] transition-colors disabled:opacity-50 print:hidden"
            >
              <span className="text-sm uppercase tracking-wider font-extrabold whitespace-nowrap">Export Report</span>
              <div className="bg-[#2563eb] text-white p-3 rounded-full group-hover:bg-[#1d4ed8] transition-all shadow-md group-hover:shadow-lg group-hover:scale-105 group-disabled:bg-[#93c5fd]">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          <section className="print:hidden lg:col-span-12">
            <MarksForm onAddMark={handleAddMark} />
          </section>

          <section ref={reportRef} className="lg:col-span-12 print:m-0 print:p-0">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-2">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Kundali aapki
                </h2>
              </div>
              
              {/* Filter Area */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-2 rounded-xl border border-slate-200 print:hidden shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <Filter size={16} className="text-cyan-500 ml-2" />
                <input 
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-transparent text-sm font-semibold focus:outline-none text-slate-700 cursor-pointer"
                />
                {filterDate && (
                  <button 
                    onClick={() => setFilterDate("")} 
                    className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <MarksTable marks={filteredMarks} onRemoveMark={handleRemoveMark} />

            {/* Bottom Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-end gap-4 print:hidden">
              <a
                href="https://t.me/skywalkerssc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.25-5.59 3.69-.53.36-1.01.54-1.44.53-.48-.01-1.38-.27-2.06-.49-.83-.27-1.48-.42-1.42-.89.03-.25.38-.51 1.07-.78 4.2-1.82 7-3.03 8.4-3.61 4-.17 4.83.16 4.99.16.11 0 .36.03.49.13.11.08.14.19.16.27-.01.05-.01.12-.02.21z"/>
                </svg>
                <span className="text-sm uppercase tracking-wider font-extrabold whitespace-nowrap">Join Telegram</span>
              </a>
              <button 
                onClick={handleDownloadPDF}
                disabled={filteredMarks.length === 0}
                className="group flex items-center justify-center gap-3 bg-white text-[#2563eb] border-2 border-[#2563eb] px-6 py-3 rounded-xl font-bold hover:bg-[#2563eb] hover:text-white transition-all disabled:opacity-50 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Download size={20} strokeWidth={2.5} />
                <span className="text-sm uppercase tracking-wider font-extrabold whitespace-nowrap">Export Report</span>
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
