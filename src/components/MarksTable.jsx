"use client";

import { Trash2, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";

export default function MarksTable({ marks, onRemoveMark }) {
  const [previewImage, setPreviewImage] = useState(null);

  if (marks.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white border border-slate-100 p-12 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center group">
        <div 
          className="absolute inset-0 z-0 opacity-50"
          style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
        ></div>
        <div className="relative z-10">
          <div className="inline-block p-4 bg-cyan-50 rounded-2xl mb-4 text-cyan-600">
            <ImageIcon size={32} />
          </div>
          <p className="text-slate-500 font-medium text-lg">No performance data found. Start scaling now!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Date</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Platform</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Test Name</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Score</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Accuracy</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs text-center print:hidden">Proof</th>
                <th className="p-5 font-bold text-slate-500 uppercase tracking-wider text-xs text-right print:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, idx) => {
                const percentage = ((mark.marksObtained / mark.totalMarks) * 100).toFixed(2);
                
                let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                if (percentage < 40) {
                  badgeColor = "bg-rose-50 text-rose-700 border-rose-100";
                } else if (percentage < 70) {
                  badgeColor = "bg-amber-50 text-amber-700 border-amber-100";
                }

                return (
                  <tr 
                    key={mark.id} 
                    className="border-b border-slate-50 hover:bg-blue-50 transition-colors bg-white"
                  >
                    <td className="p-5 text-sm font-medium text-slate-500">{mark.date}</td>
                    <td className="p-5">
                      <span className="font-bold text-slate-700">
                        {mark.platform}
                      </span>
                    </td>
                    <td className="p-5 text-slate-800 font-semibold">{mark.testName}</td>
                    <td className="p-5">
                      <span className="font-bold text-slate-900 text-lg">{mark.marksObtained}</span>
                      <span className="text-slate-400 text-sm font-medium"> / {mark.totalMarks}</span>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${badgeColor}`}>
                        {percentage}%
                      </span>
                    </td>
                    <td className="p-5 text-center print:hidden">
                      {mark.screenshot ? (
                        <button 
                          onClick={() => setPreviewImage(mark.screenshot)}
                          className="p-2 text-cyan-600 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-all mx-auto block hover:scale-105"
                          title="View Screenshot"
                        >
                          <ImageIcon size={18} />
                        </button>
                      ) : (
                        <span className="text-slate-300 text-sm font-medium">-</span>
                      )}
                    </td>
                    <td className="p-5 text-right print:hidden">
                      <button 
                        onClick={() => onRemoveMark(mark.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-105"
                        title="Remove Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal (Hidden in Print) */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a66] backdrop-blur-sm p-4 print:hidden">
          <div className="relative max-w-5xl w-full bg-white border border-slate-200 rounded-[2rem] p-2 shadow-2xl">
            <button 
              onClick={() => setPreviewImage(null)} 
              className="absolute -top-5 -right-5 bg-white text-slate-800 border border-slate-200 rounded-full p-2.5 shadow-lg hover:bg-slate-50 hover:scale-110 transition-all z-10"
            >
              <X size={20} strokeWidth={2} />
            </button>
            <div className="overflow-auto max-h-[85vh] rounded-[1.5rem] bg-slate-50 flex items-center justify-center border border-slate-100">
              <img src={previewImage} alt="Test Screenshot" className="w-full h-auto object-contain rounded-[1.5rem]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
