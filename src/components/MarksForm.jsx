"use client";

import { useState, useRef } from "react";
import { Plus, ImagePlus, X, Rocket, ArrowRight } from "lucide-react";

const PLATFORMS = ["Oliveboard", "Testbook", "Test Ranking", "The Pundits"];

export default function MarksForm({ onAddMark }) {
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [testName, setTestName] = useState("");
  const [totalMarks, setTotalMarks] = useState(200);
  const [marksObtained, setMarksObtained] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const [testDate, setTestDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshot(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testName || !marksObtained || !testDate) return;

    let finalScreenshot = screenshot;

    if (imageFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (data.success) {
          finalScreenshot = data.directImageUrl;
        } else {
          console.error("Upload failed", data.error);
          alert("Image upload failed! Using local preview instead.");
        }
      } catch (err) {
        console.error("Upload error", err);
        alert("Network error during upload! Using local preview instead.");
      }
      setIsUploading(false);
    }

    onAddMark({
      id: Date.now().toString(),
      platform,
      testName,
      totalMarks: Number(totalMarks),
      marksObtained: Number(marksObtained),
      date: testDate,
      screenshot: finalScreenshot || null,
    });

    setTestName("");
    setMarksObtained("");
    setScreenshot(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputClass = "w-full p-3 rounded-xl border border-slate-200 bg-[#f8fafc80] text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-slate-400";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5 ml-1";

  return (
    <div className="relative overflow-hidden bg-white border border-slate-100 p-8 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] group">
      
      {/* Background Dots & Blobs */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{ backgroundImage: "radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
      ></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[30rem] h-[30rem] bg-cyan-50 opacity-60 rounded-full mix-blend-multiply blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-100 p-3 rounded-2xl">
              <Rocket className="text-cyan-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              New Test Log
            </h2>
          </div>
          <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-cyan-100">
            Data Driven
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 items-end">
          
          <div className="lg:col-span-1">
            <label className={labelClass}>Date</label>
            <input 
              type="date" 
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="lg:col-span-1">
            <label className={labelClass}>Platform</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              className={inputClass}
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className={labelClass}>Test Name</label>
            <input 
              type="text" 
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Mock 01"
              className={inputClass}
              required
            />
          </div>

          <div className="lg:col-span-1">
            <label className={labelClass}>Total Marks</label>
            <input 
              type="number" 
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className={inputClass}
              required
              min="1"
            />
          </div>

          <div className="lg:col-span-1">
            <label className={labelClass}>Score</label>
            <input 
              type="number" 
              value={marksObtained}
              onChange={(e) => setMarksObtained(e.target.value)}
              placeholder="150.5"
              className={inputClass}
              required
              step="0.1"
            />
          </div>

          <div className="lg:col-span-1">
            <label className={labelClass}>Screenshot</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                id="screenshot-upload"
              />
              <label 
                htmlFor="screenshot-upload" 
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all shadow-sm ${
                  screenshot 
                  ? 'border-cyan-300 bg-cyan-50 text-cyan-600' 
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <ImagePlus size={18} />
                <span className="ml-2 text-sm font-semibold">{screenshot ? 'Added' : 'Upload'}</span>
              </label>
              {screenshot && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreenshot(null);
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 mt-2 flex justify-end">
            <button 
              type="submit"
              disabled={isUploading}
              className="group flex items-center gap-3 text-slate-900 font-bold hover:text-cyan-600 transition-colors disabled:opacity-50"
            >
              <span className="text-sm">{isUploading ? 'Uploading...' : 'Scale Now'}</span>
              <div className="bg-cyan-100 text-cyan-600 p-2.5 rounded-full group-hover:bg-cyan-200 transition-colors flex items-center justify-center">
                {isUploading ? (
                  <svg className="animate-spin h-5 w-5 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <ArrowRight size={18} />
                )}
              </div>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
