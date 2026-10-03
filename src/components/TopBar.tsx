'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

export default function TopBar() {
  const [fontSize, setFontSize] = useState(100);

  const changeFontSize = (change: number) => {
    setFontSize(prev => {
      const newSize = prev + change;
      if (newSize >= 80 && newSize <= 120) {
        document.documentElement.style.fontSize = `${newSize}%`;
        return newSize;
      }
      return prev;
    });
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };

  const toggleContrast = (isDark: boolean) => {
    if (isDark) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  };

  return (
    <div className="bg-[#0a0f1c] text-gray-400 text-[11px] py-1.5 border-b border-white/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full px-4">
        <div className="flex space-x-4">
        <a href="#main" className="hover:text-white transition focus:ring-2 focus:ring-white outline-none">Skip to Main Content</a>
        <Link href="/screen-reader" className="hover:text-white transition">Screen Reader Access</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="flex space-x-2">
          <button onClick={() => changeFontSize(-10)} className="hover:text-white" title="Decrease Font Size">A-</button>
          <button onClick={resetFontSize} className="hover:text-white" title="Normal Font Size">A</button>
          <button onClick={() => changeFontSize(10)} className="hover:text-white" title="Increase Font Size">A+</button>
        </div>
        <div className="flex space-x-1 items-center">
          <button onClick={() => toggleContrast(false)} className="w-4 h-4 bg-white border border-gray-400 cursor-pointer" title="Standard Theme"></button>
          <button onClick={() => toggleContrast(true)} className="w-4 h-4 bg-black border border-gray-400 cursor-pointer" title="High Contrast Theme"></button>
        </div>
        <select 
          className="bg-transparent border-none outline-none text-xs text-gray-300 cursor-pointer"
          onChange={(e) => {
            if(e.target.value === 'hi') alert('Bhashini Multilingual API: Hindi language module initialization requested.');
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
        <div className="flex space-x-3 ml-2 border-l border-gray-600 pl-3">
          <Link href="/dashboard" className="flex items-center hover:text-white transition">
            <LogIn size={12} className="mr-1" /> Login
          </Link>
          <Link href="/dashboard" className="flex items-center hover:text-white transition">
            <UserPlus size={12} className="mr-1" /> Register
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
