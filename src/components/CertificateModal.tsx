import React from 'react';
import { StudentProfile, AdminConfig, ProgressState } from '../types';
import { Award, Printer, Download, CheckCircle2, X, ShieldCheck, GraduationCap, LogOut } from 'lucide-react';
import { LogoUnj } from './LogoUnj';

interface CertificateModalProps {
  profile: StudentProfile;
  adminConfig: AdminConfig;
  progress: ProgressState;
  onClose: () => void;
  onAutoExit?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  profile,
  adminConfig,
  progress,
  onClose,
  onAutoExit
}) => {
  const issueDate = progress.certificateIssuedDate || new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Generate a default 10-digit participant number
  const generateNomorPeserta = (nama: string) => {
    let hash = 0;
    const str = nama || 'PERSIUNJ';
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const positiveHash = Math.abs(hash) % 1000000;
    return `2026${positiveHash.toString().padStart(6, '7')}`;
  };

  const nomorPeserta = generateNomorPeserta(profile.nama);
  const verificationCode = `EMODUL-UNJ-${nomorPeserta}-${(progress.finalExamScore || 85)}`;

  const handlePrintAndExit = () => {
    window.print();
    if (onAutoExit) {
      setTimeout(() => {
        onAutoExit();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900/80 border border-white/20 backdrop-blur-2xl text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
        {/* Controls Bar (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-lg text-white">Sertifikat Kelulusan Digital</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAndExit}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/25 border border-emerald-400/30"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak & Keluar Otomatis</span>
            </button>
            {onAutoExit && (
              <button
                onClick={onAutoExit}
                className="px-3 py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-all border border-rose-400/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Sesi</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 transition-all backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet (Print Target Area) */}
        <div 
          id="certificate-print-area"
          className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 border-8 border-double border-teal-900 shadow-inner relative space-y-6 text-center select-none"
        >
          {/* Watermark Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600" />

          {/* Header with Official Seal */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <LogoUnj size={96} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-950 font-serif">
                Program Studi Perpustakaan dan Sains Informasi
              </h4>
              <p className="text-xs font-semibold text-slate-700">
                Fakultas Ilmu Pendidikan
              </p>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                Universitas Negeri Jakarta
              </p>
            </div>

            <div className="pt-2">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-teal-950 font-serif">
                Sertifikat Kelulusan
              </h1>
              <p className="text-[11px] text-slate-500 font-medium pt-0.5">
                Nomor Verifikasi: <span className="font-mono font-bold text-slate-800">{verificationCode}</span>
              </p>
            </div>
          </div>

          <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />

          {/* Main Awardee Section */}
          <div className="space-y-2">
            <p className="text-xs text-slate-600 font-medium">Sertifikat ini dengan bangga diberikan kepada:</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-teal-950 font-serif underline decoration-amber-500 decoration-2 underline-offset-8">
              {profile.nama || 'Nama Peserta'}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-1 font-semibold">
              <span className="bg-slate-100 border border-slate-300 px-3 py-1 rounded-full">
                Nomor Peserta: <strong className="font-mono text-teal-900">{nomorPeserta}</strong>
              </span>
              <span className="bg-slate-100 border border-slate-300 px-3 py-1 rounded-full">
                Instansi / Pekerjaan: <strong>{profile.instansi || profile.pekerjaan || 'Universitas Negeri Jakarta'}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Telah menyelesaikan seluruh rangkaian <strong>5 Unit Pembelajaran Interaktif E-Modul Etika Informasi & Literasi Digital</strong>, Simulasi Kasus Interaktif, dan dinyatakan <strong>LULUS EVALUASI AKHIR</strong> dengan Nilai Evaluasi: <strong className="text-teal-900 font-bold">{progress.finalExamScore || 85}%</strong>.
          </p>

          {/* Signatures & Seal */}
          <div className="pt-8 grid grid-cols-2 gap-8 items-end text-xs text-slate-800">
            <div className="space-y-1 text-left pl-4">
              <p className="text-slate-500 font-medium">Diterbitkan pada:</p>
              <p className="font-bold text-slate-900">{issueDate}</p>
              <div className="pt-4 flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Terverifikasi E-Modul Etika Informasi</span>
              </div>
            </div>

            <div className="space-y-1 text-right pr-4">
              <p className="text-slate-500 font-medium">Instruktur / Penanggung Jawab:</p>
              <div className="h-10 flex items-center justify-end">
                <span className="font-serif italic font-bold text-teal-950 border-b border-slate-900 text-sm sm:text-base">
                  Riyan Sanjaya
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-semibold">Ketua Tim Peneliti Etika Informasi</p>
              <p className="text-[10px] text-slate-500">Universitas Negeri Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
