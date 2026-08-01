import React from 'react';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Map, 
  ShieldCheck, 
  Gamepad2, 
  Award,
  Sparkles,
  FileCheck2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { ActiveTab, ProgressState, StudentProfile } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: StudentProfile;
  progress: ProgressState;
  onOpenKataPengantar: () => void;
  onOpenPetaKonsep: () => void;
  onOpenEvaluationModal?: () => void;
  darkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  progress,
  onOpenKataPengantar,
  onOpenPetaKonsep,
  onOpenEvaluationModal,
  darkMode,
}) => {
  const isLocked = !profile.isRegistered;

  const handleNavClick = (tab: ActiveTab) => {
    if (isLocked && tab !== 'cover' && tab !== 'admin' && tab !== 'guide') {
      alert('🔒 FITUR E-MODUL TERKUNCI!\n\nSilakan isi dan simpan Form Identitas Peserta di Halaman Sampul terlebih dahulu untuk membuka seluruh materi & fitur e-modul.');
      setActiveTab('cover');
      return;
    }
    setActiveTab(tab);
  };

  const unitsNav = [
    {
      num: '01',
      title: 'Mengenal Etika Informasi di...',
      sub: 'KONSEP DASAR & TANTANGAN GENE...',
      tab: 'unit-1' as ActiveTab,
    },
    {
      num: '02',
      title: 'Menjadi Detektif Informasi',
      sub: 'VERIFIKASI & PENANGKAL HOAKS',
      tab: 'unit-2' as ActiveTab,
    },
    {
      num: '03',
      title: 'Menjaga Privasi & Keamanan...',
      sub: 'PERLINDUNGAN DATA PRIBADI & UU P...',
      tab: 'unit-3' as ActiveTab,
    },
    {
      num: '04',
      title: 'Menghargai Karya Orang Lain',
      sub: 'HAK CIPTA, PLAGIARISME & ETIKA AI',
      tab: 'unit-4' as ActiveTab,
    },
    {
      num: '05',
      title: 'Bijak Bersosial Media',
      sub: 'ETIKA BERKOMENTAR & ANTI-CYBER...',
      tab: 'unit-5' as ActiveTab,
    },
  ];

  return (
    <aside className={`w-full lg:w-80 shrink-0 p-3 space-y-4 select-none ${
      darkMode ? 'bg-slate-900 border-r border-slate-800 text-slate-100' : 'bg-[#f0f3f6] border-r border-slate-300 text-slate-900'
    }`}>
      {/* Peserta Terdaftar Card */}
      <div className={`p-4 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-200/90 border-slate-300/80 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 border border-slate-700 shadow-sm"
            style={{ backgroundColor: profile.avatarColor || '#0f172a' }}
          >
            {profile.nama ? profile.nama.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              PESERTA TERDAFTAR
              {isLocked && <Lock className="w-3 h-3 text-amber-500" />}
            </span>
            <span className={`font-black text-xs sm:text-sm truncate block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {profile.nama || 'Belum Mengisi Identitas'}
            </span>
            <div className="flex items-center justify-between mt-1 text-[11px] font-bold">
              <span className="text-slate-500 uppercase tracking-wider">AKSES MODUL:</span>
              <span className={`font-mono ${profile.isRegistered ? 'text-emerald-500' : 'text-amber-500 font-black'}`}>
                {profile.isRegistered ? 'TERBUKA' : 'TERKUNCI 🔒'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PENDAHULUAN */}
      <div className="space-y-1">
        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-3 block mb-1">
          PENDAHULUAN
        </span>

        {/* Halaman Sampul */}
        <button
          onClick={() => handleNavClick('cover')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
            activeTab === 'cover'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Halaman Sampul (Identitas)</span>
          </div>
          {isLocked && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[9px] uppercase">
              FORM WAJIB
            </span>
          )}
        </button>

        {/* Kata Pengantar */}
        <button
          onClick={onOpenKataPengantar}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
            darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Kata Pengantar</span>
        </button>

        {/* Petunjuk Penggunaan */}
        <button
          onClick={() => handleNavClick('guide')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
            activeTab === 'guide'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800 font-bold'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Petunjuk Penggunaan</span>
        </button>

        {/* Peta Konsep & Alur */}
        <button
          onClick={onOpenPetaKonsep}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
            darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <Map className="w-4 h-4 shrink-0" />
          <span>Peta Konsep & Alur</span>
        </button>

        {/* Fitur Cek Fakta Online (FITUR AI) */}
        <button
          onClick={() => handleNavClick('sift-lab')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
            activeTab === 'sift-lab'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Fitur Cek Fakta Online</span>
          </div>
          {isLocked ? (
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[9px] font-extrabold border border-amber-500/40">
              FITUR AI
            </span>
          )}
        </button>
      </div>

      {/* UNIT PEMBELAJARAN */}
      <div className="space-y-1.5 pt-2">
        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-3 block mb-1">
          UNIT PEMBELAJARAN
        </span>

        {unitsNav.map((u) => {
          const isActive = activeTab === u.tab;
          const isCompleted = progress.completedUnits.includes(parseInt(u.num));

          return (
            <button
              key={u.num}
              onClick={() => handleNavClick(u.tab)}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-800 shadow-md'
                  : darkMode 
                    ? 'bg-slate-950/40 border-slate-800 text-slate-200 hover:bg-slate-800' 
                    : 'bg-white/80 border-slate-200 text-slate-800 hover:bg-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className={`font-mono font-black text-sm ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {u.num}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`font-bold block truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                      {u.title}
                    </span>
                    {isLocked ? (
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                    ) : isCompleted ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Selesai" />
                    ) : null}
                  </div>
                  <span className={`text-[10px] block truncate mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {u.sub}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* EVALUASI & SERTIFIKAT */}
      <div className="space-y-1 pt-2">
        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-3 block mb-1">
          EVALUASI & SERTIFIKAT
        </span>

        <button
          onClick={() => handleNavClick('ethics-game')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
            activeTab === 'ethics-game'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800 font-bold'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Game Etika Digital</span>
          </div>
          {isLocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        <button
          onClick={() => handleNavClick('final-quiz')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
            activeTab === 'final-quiz'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-800 hover:bg-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-purple-500 shrink-0" />
            <span>Kuis & Evaluasi Akhir</span>
          </div>
          {isLocked ? (
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          ) : progress.finalExamPassed ? (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 font-bold text-[9px]">
              LULUS
            </span>
          ) : null}
        </button>

        {/* Evaluasi E-Modul Form Button */}
        {onOpenEvaluationModal && (
          <button
            onClick={onOpenEvaluationModal}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              darkMode ? 'text-purple-300 hover:bg-slate-800' : 'text-purple-900 hover:bg-purple-100/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Evaluasi E-Modul</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 font-mono text-[9px] font-extrabold">
              SURVEI
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};
