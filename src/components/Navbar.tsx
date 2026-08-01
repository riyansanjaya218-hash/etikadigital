import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Printer, 
  Moon, 
  Sun, 
  Shield, 
  Zap, 
  Menu, 
  X,
  User,
  GraduationCap
} from 'lucide-react';
import { ActiveTab, ProgressState, StudentProfile } from '../types';
import { calculateCompletionPercentage } from '../utils/storage';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: StudentProfile;
  progress: ProgressState;
  onOpenProfile: () => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onOpenSearch: () => void;
  onOpenAi: () => void;
  onOpenPdfLuring?: () => void;
  fontScale: number;
  setFontScale: React.Dispatch<React.SetStateAction<number>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  progress,
  onOpenProfile,
  isAdmin,
  setIsAdmin,
  onOpenSearch,
  onOpenAi,
  onOpenPdfLuring,
  fontScale,
  setFontScale,
  darkMode,
  setDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const completionPercentage = calculateCompletionPercentage(progress);

  const toggleFontSize = () => {
    if (fontScale === 1) setFontScale(1.1);
    else if (fontScale === 1.1) setFontScale(1.2);
    else setFontScale(1);
  };

  const handlePrintLuring = () => {
    if (onOpenPdfLuring) {
      onOpenPdfLuring();
    } else {
      window.print();
    }
  };

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-[#eef2f5] border-slate-300 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-[1500px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Left Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
            onClick={() => setActiveTab('cover')}
          >
            {/* Square Logo Box 'E' */}
            <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-serif text-xl font-black shadow-md border border-slate-700 group-hover:scale-105 transition-transform">
              E
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-sm sm:text-base tracking-tight font-serif ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Jelajah Digital
                </span>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[10px] font-extrabold tracking-wider rounded uppercase">
                  E-MODUL
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                ETIKA INFORMASI BERBASIS LITERASI DIGITAL
              </span>
            </div>
          </div>

          {/* Center Progress Bar Indicator */}
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-200/80 border border-slate-300/80">
            <div className="w-28 bg-slate-300 rounded-full h-2 overflow-hidden relative">
              <div 
                className="bg-slate-900 h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">
              {completionPercentage}%
            </span>
          </div>

          {/* Right Action Buttons Cluster */}
          <div className="hidden xl:flex items-center gap-2">
            {/* CEK FAKTA (Yellow Pill) */}
            <button
              onClick={() => setActiveTab('sift-lab')}
              className="px-3 py-1.5 bg-amber-300 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow-sm border border-amber-400 transition-all hover:scale-102"
            >
              <Zap className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
              <span>CEK FAKTA</span>
            </button>

            {/* CARI */}
            <button
              onClick={onOpenSearch}
              className={`px-3 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>CARI</span>
            </button>

            {/* ASISTEN AI */}
            <button
              onClick={onOpenAi}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow-md border border-slate-700 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
              <span>ASISTEN AI</span>
            </button>

            {/* PDF LURING */}
            <button
              onClick={handlePrintLuring}
              className={`px-3 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF LURING</span>
            </button>

            {/* FONT SCALE */}
            <button
              onClick={toggleFontSize}
              title="Ubah Ukuran Teks"
              className={`px-2.5 py-1.5 font-black text-xs rounded-lg flex items-center gap-0.5 transition-all ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <span className="text-[10px]">A</span>
              <span className="text-xs">A+</span>
            </button>

            {/* DARK / LIGHT THEME TOGGLE */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              title="Ganti Mode Gelap/Terang"
              className={`p-1.5 rounded-lg transition-all ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* ADMIN BUTTON */}
            <button
              onClick={() => {
                if (isAdmin) {
                  setActiveTab('cover');
                  setIsAdmin(false);
                } else {
                  setActiveTab('admin');
                  setIsAdmin(true);
                }
              }}
              className={`px-3 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all ${
                isAdmin || activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </button>
          </div>

          {/* Mobile Actions Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenAi}
              className="p-1.5 bg-slate-900 text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 text-white p-4 space-y-3 border-t border-slate-800">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab('sift-lab');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-amber-300 text-slate-950 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>CEK FAKTA</span>
            </button>

            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-slate-800 text-slate-200 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>CARI</span>
            </button>

            <button
              onClick={() => {
                onOpenAi();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-slate-950 text-amber-300 border border-slate-700 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>ASISTEN AI</span>
            </button>

            <button
              onClick={() => {
                if (isAdmin) {
                  setActiveTab('cover');
                  setIsAdmin(false);
                } else {
                  setActiveTab('admin');
                  setIsAdmin(true);
                }
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-amber-500 text-slate-950 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              <span>ADMIN</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
