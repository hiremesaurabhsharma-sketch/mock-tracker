"use client";

import { useState, useEffect } from "react";
import { Clock, Info, CheckCircle, Circle, ArrowRight, ArrowLeft, Bookmark } from "lucide-react";
import TestAnalysis from "./TestAnalysis";

// 25 Sectional Math Questions Extracted from User's PDF
const generateMathQuestions = () => {
  const images = [
    "p3_6.png", "p4_0.png", "p4_7.png", "p4_6.png", "p5_3.png",
    "p5_2.png", "p5_8.png", "p5_9.png", "p1_0.png", "p1_1.png",
    "p3_0.png", "p2_13.png", "p2_5.png", "p2_6.png", "p2_0.png",
    "p2_1.png", "p2_4.png", "p2_3.png", "p2_2.png", "p5_4.png",
    "p4_8.png", "p5_0.png", "p5_6.png", "p5_5.png", "p5_1.png"
  ];
  
  const fullList = [];
  for(let i = 0; i < 25; i++) {
    fullList.push({
      id: 1 + i,
      section: "Quantitative Aptitude",
      type: "image",
      src: `/q_images/${images[i]}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0
    });
  }
  return fullList;
};

const QUESTIONS = generateMathQuestions();

export default function MockTest({ onExit }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState(QUESTIONS.map(() => 'not-visited')); // not-visited, answered, not-answered, marked
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins = 900 seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitTest(); // Auto submit
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex) => {
    setAnswers({ ...answers, [currentQIndex]: optIndex });
  };

  const updateStatus = (index, newStatus) => {
    const newStatuses = [...status];
    newStatuses[index] = newStatus;
    setStatus(newStatuses);
  };

  const handleSaveNext = () => {
    if (answers[currentQIndex] !== undefined) {
      updateStatus(currentQIndex, 'answered');
    } else {
      updateStatus(currentQIndex, 'not-answered');
    }
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      if (status[currentQIndex + 1] === 'not-visited') updateStatus(currentQIndex + 1, 'not-answered');
    }
  };

  const handleMarkReview = () => {
    updateStatus(currentQIndex, 'marked');
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      if (status[currentQIndex + 1] === 'not-visited') updateStatus(currentQIndex + 1, 'not-answered');
    }
  };

  const handleClear = () => {
    const newAns = { ...answers };
    delete newAns[currentQIndex];
    setAnswers(newAns);
    updateStatus(currentQIndex, 'not-answered');
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    let correct = 0;
    let incorrect = 0;
    
    Object.keys(answers).forEach(qIdx => {
      if (answers[qIdx] === QUESTIONS[qIdx].correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const stats = {
      total: QUESTIONS.length,
      answered: Object.keys(answers).length,
      correct,
      incorrect,
      marked: status.filter(s => s === 'marked').length,
      notVisited: status.filter(s => s === 'not-visited').length,
      timeSpent
    };

    return <TestAnalysis stats={stats} onBackToDashboard={onExit} />;
  }

  const q = QUESTIONS[currentQIndex];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans fixed inset-0 z-50">
      {/* Top Header - TCS iON Style */}
      <header className="bg-white border-b border-slate-300 px-6 py-3 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Sectional Mock: Maths (15 Mins)</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Test Date: 12 Sep 2025 | Based on your PDF</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200">
            <Clock size={20} className="animate-pulse" />
            <span className="font-mono font-black text-2xl tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side: Question Area */}
        <div className="flex-1 flex flex-col bg-white m-4 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Section Bar */}
          <div className="bg-[#1d4ed8] text-white px-5 py-2.5 text-sm font-bold flex justify-between items-center">
            <span>PART-C: {q.section}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Single Choice Type</span>
          </div>
          
          {/* Question View */}
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
              <h2 className="font-black text-xl text-slate-800">Question {q.id}</h2>
              <div className="text-xs font-bold text-slate-400 flex flex-col items-end">
                <span>Marks: +2.0, -0.5</span>
              </div>
            </div>
            
            {q.type === 'image' ? (
              <div className="mb-8 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-4">
                <img src={q.src} alt={`Question ${q.id}`} className="max-w-full mix-blend-multiply" />
              </div>
            ) : (
              <div className="text-[17px] font-medium text-slate-800 mb-8 leading-relaxed">
                {q.text}
              </div>
            )}

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <label 
                  key={i} 
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[currentQIndex] === i 
                      ? 'border-[#1d4ed8] bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="option" 
                    className="w-5 h-5 text-[#1d4ed8]" 
                    checked={answers[currentQIndex] === i}
                    onChange={() => handleSelectOption(i)}
                  />
                  <span className="font-semibold text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex gap-3">
              <button onClick={handleMarkReview} className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                Mark for Review & Next
              </button>
              <button onClick={handleClear} className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                Clear Response
              </button>
            </div>
            <button onClick={handleSaveNext} className="px-8 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-lg transition-colors shadow-md flex items-center gap-2">
              Save & Next <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Palette */}
        <div className="w-80 bg-white m-4 ml-0 rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* User Profile */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1d4ed8] flex items-center justify-center font-black text-xl border-2 border-blue-200">
              U
            </div>
            <div>
              <div className="font-bold text-slate-800">SSC Aspirant</div>
              <button onClick={onExit} className="text-xs font-bold text-rose-500 hover:underline">Exit Exam</button>
            </div>
          </div>

          {/* Palette Stats */}
          <div className="p-4 grid grid-cols-2 gap-3 text-xs font-bold border-b border-slate-200">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center">{status.filter(s => s==='answered').length}</div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center">{status.filter(s => s==='not-answered').length}</div> Not Answered</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">{status.filter(s => s==='not-visited').length}</div> Not Visited</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">{status.filter(s => s==='marked').length}</div> Marked</div>
          </div>

          {/* Number Grid */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-bold text-slate-700 mb-3 text-sm">{q.section} (25 Qs)</h3>
            <div className="grid grid-cols-5 gap-2">
              {QUESTIONS.map((question, i) => {
                let bgColor = "bg-slate-100 text-slate-600 border-slate-200";
                if (status[i] === 'answered') bgColor = "bg-[#22c55e] text-white border-[#16a34a]";
                if (status[i] === 'not-answered') bgColor = "bg-rose-500 text-white border-rose-600";
                if (status[i] === 'marked') bgColor = "bg-purple-600 text-white border-purple-700";
                
                return (
                  <button 
                    key={i}
                    onClick={() => {
                      setCurrentQIndex(i);
                      if(status[i] === 'not-visited') updateStatus(i, 'not-answered');
                    }}
                    className={`w-10 h-10 rounded-md flex items-center justify-center font-bold border shadow-sm transition-all hover:scale-105 ${bgColor} ${currentQIndex === i ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button 
              onClick={handleSubmitTest}
              className="w-full py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-black rounded-lg transition-colors shadow-md uppercase tracking-wider"
            >
              Submit Section
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
