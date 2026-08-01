import React, { useState } from 'react';
import { StudentProfile, ProgressState } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Award,
  Edit3,
  UserPlus
} from 'lucide-react';
import { calculateCompletionPercentage } from '../utils/storage';

interface CoverProfileModalProps {
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  progress: ProgressState;
  onStartLearning: () => void;
  onSwitchNewStudent?: () => void;
}

export const CoverProfileModal: React.FC<CoverProfileModalProps> = ({
  profile,
  onSaveProfile,
  progress,
  onStartLearning,
  onSwitchNewStudent
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const colors = ['#0f172a', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];
  const completionPercentage = calculateCompletionPercentage(progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.jenisKelamin || !formData.pekerjaan.trim()) {
      alert('Mohon isi Nama Lengkap, Jenis Kelamin, dan Pekerjaan secara lengkap!');
      return;
    }
    const updated = {
      ...formData,
      isRegistered: true,
      registeredAt: formData.registeredAt || new Date().toISOString()
    };
    onSaveProfile(updated);
    setIsSaved(true);
    setIsEditingProfile(false);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Content Header Title Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-2">
        <h2 className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
          JELAJAH DIGITAL — ETIKA INFORMASI
        </h2>
        <span className="text-xs font-serif italic text-slate-600 dark:text-slate-400 font-semibold">
          E-Modul Literasi Digital 2026
        </span>
      </div>

      {/* Registered / Unregistered Banner */}
      {profile.isRegistered ? (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="font-extrabold text-xs block uppercase text-emerald-800 dark:text-emerald-300">
                IDENTITAS PESERTA TERDAFTAR (AKSES MODUL TERBUKA):
              </span>
              <span className="text-sm font-bold">
                {profile.nama} ({profile.jenisKelamin || 'Pria/Wanita'}) — {profile.pekerjaan}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3 py-1.5 bg-emerald-200/80 hover:bg-emerald-300 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Identitas</span>
            </button>

            {onSwitchNewStudent && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Registrasi / Ganti Peserta Baru?\n\nSesi peserta baru akan dibuka dan kuis/halaman akan kembali kosong untuk peserta baru ini.')) {
                    onSwitchNewStudent();
                  }
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-all flex items-center gap-1 shadow-sm"
                title="Sesi kuis akan kembali kosong untuk peserta baru"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Ganti / Peserta Baru</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500 text-amber-900 dark:text-amber-200 font-medium text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-pulse">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <span className="font-black text-xs block uppercase text-amber-700 dark:text-amber-300">
                🔒 FITUR E-MODUL MASIH TERKUNCI
              </span>
              <span>
                Harap isi dan simpan Form Identitas Peserta di bawah ini terlebih dahulu untuk membuka seluruh materi & fitur e-modul.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Registration Form Box */}
      {(!profile.isRegistered || isEditingProfile) && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-500/80 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase font-serif">
                Form Identitas Peserta E-Modul (Wajib)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
              SYARAT MEMBUKA MODUL
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-800 dark:text-slate-200 font-extrabold mb-1">Nama Lengkap *</label>
              <input
                type="text"
                required
                placeholder="misal: Udin Barudin"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-800 dark:text-slate-200 font-extrabold mb-1">Jenis Kelamin *</label>
              <select
                required
                value={formData.jenisKelamin || ''}
                onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'Pria' | 'Wanita' })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-800 dark:text-slate-200 font-extrabold mb-1">Pekerjaan *</label>
              <input
                type="text"
                required
                placeholder="misal: Mahasiswa / Dosen / Guru"
                value={formData.pekerjaan || ''}
                onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3 flex items-end pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>SIMPAN IDENTITAS & BUKA AKSES E-MODUL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Hero Card Cover (Halaman Sampul) - Dark Card with Thick Amber Left Border Accent */}
      <div className="relative overflow-hidden rounded-2xl bg-[#18181b] text-white p-8 sm:p-14 border-l-8 border-l-amber-500 shadow-2xl space-y-8 text-center">
        {/* Subtle Grid Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Tagline Badge */}
        <div className="relative z-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/30" />
            <span>E-MODUL INTERAKTIF LITERASI DIGITAL</span>
          </div>
        </div>

        {/* Big Display Titles */}
        <div className="relative z-10 space-y-3 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-white uppercase leading-none">
            ETIKA INFORMASI
          </h1>
          <p className="text-lg sm:text-2xl font-serif italic text-amber-400 font-medium">
            E-Modul Etika Informasi berbasis Literasi Digital
          </p>
        </div>

        {/* Center Circular Emblem Artwork Graphic */}
        <div className="relative z-10 flex justify-center my-4">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-amber-400/40 bg-slate-950/80 flex items-center justify-center p-4 shadow-2xl">
            {/* SVG Emblem Canvas */}
            <svg className="w-full h-full text-white" viewBox="0 0 200 200" fill="none">
              {/* Outer Circular Dashed Ring */}
              <circle cx="100" cy="100" r="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
              <circle cx="100" cy="100" r="82" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
              
              {/* Center Shield & Balance Scale Artwork */}
              <path d="M100 35 L140 50 V95 C140 125 100 155 100 155 C100 155 60 125 60 95 V50 Z" fill="#0284c7" opacity="0.25" stroke="#38bdf8" strokeWidth="2" />
              
              {/* Center Open Book Icon */}
              <path d="M70 115 C85 110 95 112 100 118 C105 112 115 110 130 115 V80 C115 75 105 77 100 83 C95 77 85 75 70 80 Z" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <line x1="100" y1="83" x2="100" y2="118" stroke="#ffffff" strokeWidth="2" />
              
              {/* Top Eye of Verification */}
              <circle cx="100" cy="62" r="10" stroke="#ffffff" strokeWidth="2" fill="#0f172a" />
              <circle cx="100" cy="62" r="4" fill="#38bdf8" />

              {/* Bottom Stars */}
              <circle cx="80" cy="135" r="2" fill="#f59e0b" />
              <circle cx="100" cy="140" r="3" fill="#f59e0b" />
              <circle cx="120" cy="135" r="2" fill="#f59e0b" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center pointer-events-none">
              <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-white uppercase bg-slate-900/90 px-2 py-0.5 rounded border border-amber-400/40">
                ETIKA INFORMASI
              </span>
              <span className="text-[8px] text-amber-300 font-mono tracking-tighter mt-0.5">
                AKURAT • ADIL • AMAN • BERTANGGUNG JAWAB
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Description Paragraph */}
        <p className="relative z-10 max-w-2xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
          Membentuk generasi muda yang cerdas, kritis, dan beretika dalam memanfaatkan informasi, smartphone, media sosial, dan kecerdasan buatan (AI).
        </p>

        {/* Institution & Author Footer Credit */}
        <div className="relative z-10 pt-4 border-t border-slate-700/80 max-w-2xl mx-auto space-y-2 text-center">
          <p className="font-extrabold text-xs sm:text-sm text-amber-300 dark:text-amber-300 tracking-wide leading-relaxed">
            Modul ini disusun dan dibuat oleh:
          </p>
          <div className="text-xs sm:text-sm font-black text-white dark:text-slate-100 tracking-wide uppercase space-y-0.5">
            <p className="text-white dark:text-slate-100 text-sm font-extrabold">Tim Dosen</p>
            <p className="text-amber-300 dark:text-amber-300 font-extrabold">Program Studi Perpustakaan dan Sains Informasi</p>
            <p className="text-slate-200 dark:text-slate-200">Fakultas Ilmu Pendidikan</p>
            <p className="text-slate-200 dark:text-slate-200">Universitas Negeri Jakarta</p>
          </div>
          <p className="text-[11px] text-slate-300 dark:text-slate-300 font-serif italic pt-1">
            E-Modul Interaktif Etika Informasi Berbasis Literasi Digital (2026)
          </p>
        </div>

        {/* Action CTA Button */}
        <div className="relative z-10 pt-2 flex justify-center">
          <button
            onClick={onStartLearning}
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-xl flex items-center gap-2 tracking-wide uppercase transform hover:scale-105"
          >
            <span>Mulai Pembelajaran Unit 1</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feature Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">5 Unit Pembelajaran</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            Materi konsep dasar, verifikasi hoaks SIFT, hak cipta & sitasi APA 7th, perlindungan data pribadi, hingga netiket.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Fitur Cek Fakta & Plagiarisme</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            Laboratorium uji fakta SIFT interaktif dan penganalisis kemiripan naskah terintegrasi AI.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Sertifikat Digital PDF</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            Penerbitan sertifikat resmi ber-QR Code otomatis setelah memenuhi batas minimal nilai evaluasi akhir.
          </p>
        </div>
      </div>
    </div>
  );
};
