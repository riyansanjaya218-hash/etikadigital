import React from 'react';
import { BookOpen, Award, ShieldCheck, CheckCircle2, GraduationCap, MapPin, Sparkles, FileText, Cpu, Gamepad2 } from 'lucide-react';
import { AdminConfig } from '../types';

interface FooterProps {
  adminConfig: AdminConfig;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ adminConfig, darkMode }) => {
  return (
    <footer className={`border-t text-xs relative transition-colors duration-300 print:hidden ${
      darkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-100' 
        : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Ambient Top Gradient Border Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-400" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 space-y-10">
        
        {/* Main Grid Section (4 Columns on Large Screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Institutional Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-amber-300 font-extrabold shadow-lg shadow-indigo-500/30 border border-indigo-400/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight font-serif uppercase">
                  {adminConfig.moduleTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold text-[10px] uppercase tracking-wider border border-amber-400/30">
                  PERSI UNJ • 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              E-Modul Interaktif Etika Informasi dikembangkan sebagai media pembelajaran digital berbasis riset untuk memperkuat literasi media, kesadaran pelindungan data pribadi (UU PDP), dan pencegahan plagiarisme akademik.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Terintegrasi Kurikulum Pendidikan Tinggi</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Program Studi Perpustakaan dan Sains Informasi • Fakultas Ilmu Pendidikan • Universitas Negeri Jakarta
              </p>
            </div>
          </div>

          {/* Column 2: Tim Penyusun & Dosen Peneliti (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>TIM PENULIS & DOSEN PENELITI PERSI UNJ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Riyan Sanjaya, M.Hum</h4>
                  <span className="text-[10px] text-slate-400">Ketua Tim / Dosen Pertama</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Laylatul Munawaroh, S.IP., MA.</h4>
                  <span className="text-[10px] text-slate-400">Dosen Peneliti PERSI</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Dr. Ahmad Rifqy A., M.Pd.</h4>
                  <span className="text-[10px] text-slate-400">Dosen Peneliti PERSI</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Maydi Aula Riski, S.IP., MA.</h4>
                  <span className="text-[10px] text-slate-400">Dosen Peneliti PERSI</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 sm:col-span-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                  05
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Wisnu Putri Airmas Jati, S.IP., MA.</h4>
                  <span className="text-[10px] text-slate-400">Dosen Peneliti PERSI UNJ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Fitur & Modul Cetak Luring (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>FITUR MODUL INTERAKTIF</span>
            </div>

            <ul className="space-y-2 text-[11px] text-slate-300">
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Simulasi SIFT 4 Langkah Cek Fakta</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Pemeriksa Kemiripan Teks (Plagiarisme)</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Sertifikat Digital Verifikasi Otomatis</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Modul Cetak Luring (PDF 21 Halaman)</span>
              </li>
              <li className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Asisten Tutor AI Etika Pembelajaran</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Institutional Address & Copyright Line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Fakultas Ilmu Pendidikan • Gedung FIP Kampus A UNJ, Rawamangun, Jakarta Timur</span>
          </div>

          <div className="text-center md:text-right font-medium">
            <p>© 2026 <strong className="text-white">{adminConfig.moduleTitle} — PERSI UNJ</strong>. Hak Cipta Dilindungi Undang-Undang.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};


