"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";
import { get, set } from "idb-keyval";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    get("loggedInUser").then((user) => {
      if (user) setLoggedInUser(user);
      setIsAuthLoaded(true);
    }).catch(err => {
      console.error(err);
      setIsAuthLoaded(true);
    });
  }, []);

  const handleLogin = async (username) => {
    await set("loggedInUser", username);
    setLoggedInUser(username);
  };

  const handleLogout = async () => {
    await set("loggedInUser", null);
    setLoggedInUser(null);
  };

  if (!isAuthLoaded) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading...</div>;
  }

  return (
    <main>
      {loggedInUser ? (
        <Dashboard currentUser={loggedInUser} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </main>
  );
}
