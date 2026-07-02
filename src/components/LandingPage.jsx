"use client";

import { useState } from "react";
import Auth from "./Auth";
import { ArrowRight, BarChart3, Target, Download, ShieldCheck } from "lucide-react";

export default function LandingPage({ onLogin }) {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowAuth(false)}
          className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 text-slate-500 hover:text-slate-900 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 font-medium transition-all hover:scale-105"
        >
          &larr; Back to Home
        </button>
        <Auth onLogin={onLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-200/40 rounded-full mix-blend-multiply blur-3xl z-0 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-200/40 rounded-full mix-blend-multiply blur-3xl z-0 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-cyan-200/40 rounded-full mix-blend-multiply blur-3xl z-0 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full px-6 py-6 sm:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#ec1d24] text-white px-3 py-1.5 transform -skew-x-6 shadow-[2px_2px_0px_#1e293b] border border-[#1e293b] rounded-sm">
            <span className="font-black text-xl tracking-tighter leading-none" style={{ fontFamily: 'Impact, Arial, sans-serif' }}>SSC</span>
          </div>
          <span className="font-bold text-slate-800 text-lg hidden sm:block">Skywalkers</span>
        </div>
        <button 
          onClick={() => setShowAuth(true)}
          className="text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] px-4 py-2 transition-colors"
        >
          Sign In
        </button>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24 flex flex-col items-center text-center">
        
        {/* Hero Section */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          The Ultimate Mock Tracker
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Track Your Mocks.<br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Conquer Your Exams.
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          "Paseena bahane se hi itihaas likha jata hai." Monitor your progress, identify weaknesses, and generate beautiful reports to secure your selection.
        </p>

        <button 
          onClick={() => setShowAuth(true)}
          className="group flex items-center gap-3 bg-[#2563eb] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#1d4ed8] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}
        >
          Get Started Now
          <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
            <ArrowRight size={20} />
          </div>
        </button>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24">
          <div className="bg-white/70 backdrop-blur-lg border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all animate-fade-in-up text-left" style={{ animationDelay: '0.4s' }}>
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Data-Driven Insights</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Log your scores from Oliveboard, Testbook, and more. Instantly see your accuracy and percentage metrics.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all animate-fade-in-up text-left" style={{ animationDelay: '0.5s' }}>
            <div className="bg-cyan-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-cyan-600">
              <Download size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">One-Click Exports</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Generate beautiful, printable PDF reports of your performance directly on your mobile device or desktop.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all animate-fade-in-up text-left" style={{ animationDelay: '0.6s' }}>
            <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Your data is stored securely on your local device. Multiple user profiles ensure data separation.</p>
          </div>
        </div>

      </main>

      {/* Global CSS for animations (can be handled by tailwind but added inline for safety if classes missing) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}} />
    </div>
  );
}
