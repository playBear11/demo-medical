"use client"
// hooks/useTheme.tsx

import { useState, useEffect } from "react";

// Hook สำหรับจัดการธีม (Light / Dark)
const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // เช็คธีมจาก localStorage เมื่อคอมโพเนนต์โหลด
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
