"use client";

import { useState } from "react";
import { FileText, Download, Clock, Calendar, ChevronRight } from "lucide-react";

const PYQ_DATA = {
  "SSC CGL": {
    "2023": [
      { id: 1, title: "CGL Tier-1: 14th July", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "2.4 MB" },
      { id: 2, title: "CGL Tier-1: 14th July", shift: "Shift 2 (11:45 AM - 12:45 PM)", questions: 100, size: "2.5 MB" },
      { id: 3, title: "CGL Tier-1: 14th July", shift: "Shift 3 (02:30 PM - 03:30 PM)", questions: 100, size: "2.3 MB" },
      { id: 4, title: "CGL Tier-1: 14th July", shift: "Shift 4 (05:15 PM - 06:15 PM)", questions: 100, size: "2.6 MB" },
      { id: 5, title: "CGL Tier-1: 17th July", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "2.4 MB" },
      { id: 6, title: "CGL Tier-1: 17th July", shift: "Shift 2 (11:45 AM - 12:45 PM)", questions: 100, size: "2.2 MB" },
      { id: 7, title: "CGL Tier-1: 18th July", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "2.5 MB" },
      { id: 8, title: "CGL Tier-2: 26th Oct", shift: "Paper 1 (09:00 AM - 11:15 AM)", questions: 130, size: "3.8 MB" },
    ],
    "2022": [
      { id: 9, title: "CGL Tier-1: 1st Dec", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "2.1 MB" },
      { id: 10, title: "CGL Tier-1: 1st Dec", shift: "Shift 2 (11:45 AM - 12:45 PM)", questions: 100, size: "2.0 MB" },
      { id: 11, title: "CGL Tier-1: 2nd Dec", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "2.2 MB" },
      { id: 12, title: "CGL Tier-2: 2nd March", shift: "Paper 1 (09:00 AM - 11:15 AM)", questions: 130, size: "3.5 MB" },
      { id: 13, title: "CGL Tier-2: 3rd March", shift: "Paper 1 (09:00 AM - 11:15 AM)", questions: 130, size: "3.6 MB" },
    ]
  },
  "SSC CHSL": {
    "2023": [
      { id: 14, title: "CHSL Tier-1: 2nd Aug", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "1.8 MB" },
      { id: 15, title: "CHSL Tier-1: 2nd Aug", shift: "Shift 2 (11:45 AM - 12:45 PM)", questions: 100, size: "1.9 MB" },
      { id: 16, title: "CHSL Tier-1: 3rd Aug", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "1.8 MB" },
      { id: 17, title: "CHSL Tier-2: 2nd Nov", shift: "Paper 1 (09:00 AM - 11:15 AM)", questions: 130, size: "2.9 MB" },
    ],
    "2022": [
      { id: 18, title: "CHSL Tier-1: 9th March", shift: "Shift 1 (09:00 AM - 10:00 AM)", questions: 100, size: "1.7 MB" },
      { id: 19, title: "CHSL Tier-1: 9th March", shift: "Shift 2 (11:45 AM - 12:45 PM)", questions: 100, size: "1.8 MB" },
      { id: 20, title: "CHSL Tier-2: 26th June", shift: "Paper 1 (09:00 AM - 11:15 AM)", questions: 130, size: "3.0 MB" },
    ]
  },
  "SSC CPO": {
    "2023": [
      { id: 21, title: "CPO Tier-1: 3rd Oct", shift: "Shift 1 (09:00 AM - 11:00 AM)", questions: 200, size: "4.5 MB" },
      { id: 22, title: "CPO Tier-1: 3rd Oct", shift: "Shift 2 (02:00 PM - 04:00 PM)", questions: 200, size: "4.6 MB" },
      { id: 23, title: "CPO Tier-1: 4th Oct", shift: "Shift 1 (09:00 AM - 11:00 AM)", questions: 200, size: "4.4 MB" },
    ],
    "2022": [
      { id: 24, title: "CPO Tier-1: 9th Nov", shift: "Shift 1 (09:00 AM - 11:00 AM)", questions: 200, size: "4.2 MB" },
      { id: 25, title: "CPO Tier-1: 10th Nov", shift: "Shift 1 (09:00 AM - 11:00 AM)", questions: 200, size: "4.3 MB" },
    ]
  },
  "SSC MTS": {
    "2023": [
      { id: 26, title: "MTS Phase 1: 1st Sept", shift: "Shift 1 (09:00 AM - 10:30 AM)", questions: 90, size: "1.5 MB" },
      { id: 27, title: "MTS Phase 1: 1st Sept", shift: "Shift 2 (12:30 PM - 02:00 PM)", questions: 90, size: "1.6 MB" },
      { id: 28, title: "MTS Phase 1: 4th Sept", shift: "Shift 1 (09:00 AM - 10:30 AM)", questions: 90, size: "1.5 MB" },
    ],
    "2022": [
      { id: 29, title: "MTS Phase 1: 2nd May", shift: "Shift 1 (09:00 AM - 10:30 AM)", questions: 90, size: "1.4 MB" },
      { id: 30, title: "MTS Phase 1: 3rd May", shift: "Shift 1 (09:00 AM - 10:30 AM)", questions: 90, size: "1.5 MB" },
    ]
  }
};

const EXAMS = Object.keys(PYQ_DATA);

export default function PyqSection({ onStartTest }) {
  const [selectedExam, setSelectedExam] = useState(EXAMS[0]);
  
  // Get available years for the selected exam, sorted descending (e.g. 2023, 2022, 2021)
  const availableYears = Object.keys(PYQ_DATA[selectedExam] || {}).sort((a, b) => b - a);
  
  // State for the selected year
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const handleExamChange = (exam) => {
    setSelectedExam(exam);
    const yearsForNewExam = Object.keys(PYQ_DATA[exam] || {}).sort((a, b) => b - a);
    setSelectedYear(yearsForNewExam[0]);
  };

  const papersToDisplay = PYQ_DATA[selectedExam]?.[selectedYear] || [];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-12 mb-8 print:hidden">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-[2rem] font-black text-slate-900 tracking-tight flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">
            <FileText size={28} strokeWidth={2.5} />
          </span>
          Previous Year Papers
        </h2>
        <p className="text-slate-500 font-medium mt-2 max-w-2xl">
          Pehle apna Exam select karein, fir Year choose karke official PDFs download karein.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: EXAM Selection */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto hide-scrollbar lg:w-64 flex-shrink-0">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 hidden lg:block px-2">
            1. Select Exam
          </div>
          {EXAMS.map(exam => (
            <button
              key={exam}
              onClick={() => handleExamChange(exam)}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-left transition-all whitespace-nowrap min-w-[140px] ${
                selectedExam === exam 
                  ? "bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/30 transform scale-[1.02]" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              <span className="text-base">{exam}</span>
              {selectedExam === exam && <ChevronRight size={18} className="hidden lg:block opacity-70" />}
            </button>
          ))}
        </div>

        {/* Right Area: YEAR Selection & Papers */}
        <div className="flex-1 bg-slate-50/50 rounded-3xl p-1 md:p-6 lg:p-8 border border-slate-100/50">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span className="text-blue-600">{selectedExam}</span> 
              <span className="text-slate-300">/</span> 
              <span>Year {selectedYear}</span>
            </div>

            {/* Year Pills */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${
                    selectedYear === year
                      ? "bg-slate-800 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {papersToDisplay.map((paper) => (
              <div 
                key={paper.id} 
                onClick={() => {
                  if(onStartTest) onStartTest();
                }}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col relative overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-extrabold text-slate-800 text-[17px] pr-8 leading-snug">
                    {paper.title}
                  </h3>
                  <button 
                    className="bg-blue-50 text-blue-600 p-2.5 rounded-xl group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors flex-shrink-0"
                  >
                    <Download size={18} strokeWidth={2.5} />
                  </button>
                </div>
                
                <div className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {paper.shift}
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
                    <Clock size={14} className="text-blue-500" />
                    {paper.questions} Qs
                  </span>
                  <span className="ml-auto text-[11px] uppercase tracking-wider bg-slate-100 px-2.5 py-1.5 rounded-md text-slate-600">
                    {paper.size}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {papersToDisplay.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <p className="text-slate-400 font-semibold">Is saal ke liye abhi koi PDF add nahi ki gayi hai.</p>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}
