"use client";

import { useState } from "react";
import { get, set } from "idb-keyval";
import { Lock, User, ArrowRight } from "lucide-react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const users = (await get("authUsers")) || [];
      const userStr = username.trim().toLowerCase();

      if (isLogin) {
        const foundUser = users.find((u) => u.username.toLowerCase() === userStr && u.password === password);
        if (foundUser) {
          onLogin(foundUser.username);
        } else {
          setError("Invalid username or password.");
        }
      } else {
        const userExists = users.some((u) => u.username.toLowerCase() === userStr);
        if (userExists) {
          setError("Username already exists.");
        } else {
          const newUser = { username: username.trim(), password };
          await set("authUsers", [...users, newUser]);
          onLogin(newUser.username);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during authentication.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-100 rounded-full mix-blend-multiply blur-3xl z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-blue-100 rounded-full mix-blend-multiply blur-3xl z-0"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-[#ec1d24] text-white px-5 py-2.5 flex items-center justify-center transform -skew-x-6 shadow-[4px_4px_0px_#1e293b] border-2 border-[#1e293b] rounded-sm">
            <span className="font-black text-3xl tracking-tighter leading-none" style={{ fontFamily: 'Impact, Arial, sans-serif' }}>SSC</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{" "}
          <button onClick={toggleMode} className="font-medium text-[#2563eb] hover:text-[#1d4ed8] focus:outline-none transition-colors">
            {isLogin ? "sign up for a new account" : "sign in to your existing account"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:rounded-[2rem] sm:px-10 border border-[#e2e8f0]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-2 focus:ring-[#2563eb] focus:border-transparent block w-full pl-10 sm:text-sm border-slate-300 rounded-xl p-3 bg-slate-50 border transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-2 focus:ring-[#2563eb] focus:border-transparent block w-full pl-10 sm:text-sm border-slate-300 rounded-xl p-3 bg-slate-50 border transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-all transform hover:-translate-y-0.5"
              >
                {isLogin ? "Sign in" : "Create Account"}
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
