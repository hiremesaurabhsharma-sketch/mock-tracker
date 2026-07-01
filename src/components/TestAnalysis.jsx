import { CheckCircle, XCircle, MinusCircle, Trophy, Target, Clock, ArrowLeft } from "lucide-react";

export default function TestAnalysis({ stats, onBackToDashboard }) {
  const { total, answered, correct, incorrect, marked, notVisited, timeSpent } = stats;
  
  // Scoring logic: +2 for correct, -0.5 for incorrect
  const marksScored = (correct * 2) - (incorrect * 0.5);
  const maxMarks = total * 2;
  const percentage = Math.max(0, (marksScored / maxMarks) * 100).toFixed(1);
  const accuracy = answered > 0 ? ((correct / answered) * 100).toFixed(1) : 0;
  
  const unattempted = total - answered;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans fixed inset-0 z-50 overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-black text-slate-800">Test Analysis</h1>
          <p className="text-sm font-semibold text-slate-500">SSC CGL Tier 1 • Sectional Test (Maths) • 2025</p>
        </div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full p-6 space-y-6">
        
        {/* Top Score Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-8 border-blue-100 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="#2563eb" strokeWidth="8" strokeDasharray="226" strokeDashoffset={226 - (226 * (percentage / 100))} className="transition-all duration-1000" />
              </svg>
              <div className="text-2xl font-black text-blue-600 z-10">{percentage}%</div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Your Score: {marksScored} <span className="text-lg text-slate-400">/ {maxMarks}</span></h2>
              <p className="text-slate-500 font-medium mt-1">Excellent effort! Keep practicing to improve accuracy.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-emerald-50 px-5 py-3 rounded-xl border border-emerald-100 text-center">
              <div className="text-emerald-600 mb-1 flex justify-center"><Target size={24} /></div>
              <div className="text-xl font-black text-emerald-700">{accuracy}%</div>
              <div className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider mt-0.5">Accuracy</div>
            </div>
            <div className="bg-amber-50 px-5 py-3 rounded-xl border border-amber-100 text-center">
              <div className="text-amber-600 mb-1 flex justify-center"><Clock size={24} /></div>
              <div className="text-xl font-black text-amber-700">{formatTime(timeSpent)}</div>
              <div className="text-xs font-bold text-amber-600/80 uppercase tracking-wider mt-0.5">Time Taken</div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Correct */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-emerald-500" size={24} />
              <h3 className="font-bold text-lg text-slate-700">Correct Answers</h3>
            </div>
            <div className="text-4xl font-black text-slate-800 mb-1">{correct}</div>
            <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block w-max">
              + {correct * 2} Marks
            </div>
          </div>

          {/* Incorrect */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="text-rose-500" size={24} />
              <h3 className="font-bold text-lg text-slate-700">Incorrect Answers</h3>
            </div>
            <div className="text-4xl font-black text-slate-800 mb-1">{incorrect}</div>
            <div className="text-sm font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded inline-block w-max">
              - {incorrect * 0.5} Marks
            </div>
          </div>

          {/* Unattempted */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <MinusCircle className="text-slate-400" size={24} />
              <h3 className="font-bold text-lg text-slate-700">Unattempted</h3>
            </div>
            <div className="text-4xl font-black text-slate-800 mb-1">{unattempted}</div>
            <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block w-max">
              0 Marks
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={onBackToDashboard}
            className="px-8 py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-black rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
