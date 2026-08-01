import React from 'react';
import { X, Printer, Video, BookOpen, ShieldCheck, Award, ExternalLink, Key, GraduationCap, UserCheck, HelpCircle, Sparkles, Download, Layers, CheckCircle, AlertTriangle, FileText, Check } from 'lucide-react';
import { AdminConfig, LearningUnit, ProgressState, StudentProfile } from '../types';
import { defaultFinalQuestions, defaultLikertQuestions } from '../data/defaultData';
import { QrCodeSvg } from './QrCodeSvg';

interface PdfLuringModalProps {
  profile: StudentProfile;
  adminConfig: AdminConfig;
  units: LearningUnit[];
  progress: ProgressState;
  onClose: () => void;
}

// Custom Embedded Visual Diagrams & Cartoon Character Illustrations for Inside Materi Pages
const UnitDiagramGraphics: React.FC<{ unitNumber: number }> = ({ unitNumber }) => {
  if (unitNumber === 1) {
    return (
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 border border-indigo-200 space-y-2 text-slate-900 my-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-indigo-200 pb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-700" />
            <span>GAMBAR 1.1: MASKOT SIBER & HIERARKI KERANGKA KERJA ETIKA INFORMASI</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded">INFOGRAFIS MATERI</span>
        </div>

        {/* Cartoon Illustration Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-white p-2 rounded-lg border border-indigo-100">
          {/* Cartoon Character SVG */}
          <div className="flex flex-col items-center justify-center p-1 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <circle cx="50" cy="50" r="45" fill="#e0e7ff" />
              <circle cx="50" cy="38" r="18" fill="#fbcfe8" stroke="#3730a3" strokeWidth="2" />
              <path d="M 32 36 Q 50 18 68 36 Q 60 22 40 22 Z" fill="#312e81" />
              <circle cx="43" cy="38" r="2.5" fill="#1e1b4b" />
              <circle cx="57" cy="38" r="2.5" fill="#1e1b4b" />
              <circle cx="44" cy="37" r="0.8" fill="#ffffff" />
              <circle cx="58" cy="37" r="0.8" fill="#ffffff" />
              <path d="M 44 46 Q 50 51 56 46" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
              <path d="M 28 85 Q 50 60 72 85 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="2" />
              <path d="M 50 62 L 62 67 L 62 78 Q 50 86 50 86 Q 50 86 38 78 L 38 67 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 50 66 L 50 82" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M 42 72 L 58 72" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] font-extrabold text-indigo-950 mt-0.5">Duta Siber UNJ</span>
          </div>

          {/* Explanation Text */}
          <div className="sm:col-span-2 space-y-1 text-[10.5px]">
            <span className="px-2 py-0.5 bg-indigo-600 text-white font-extrabold text-[9px] rounded inline-block uppercase tracking-wider">
              Pesan Etis Duta Siber:
            </span>
            <p className="text-[10px] text-slate-800 leading-snug font-medium">
              "Etika informasi bukan sekadar peraturan kaku, melainkan kompas moral kita saat membagikan data, menulis karya ilmiah, dan berkomunikasi secara santun di media sosial!"
            </p>
          </div>
        </div>

        {/* Pyramid Vector Graphic */}
        <svg viewBox="0 0 600 180" className="w-full h-auto max-h-[110px]">
          <polygon points="300,10 520,170 80,170" fill="#e0e7ff" stroke="#3730a3" strokeWidth="2.5" />
          <line x1="210" y1="85" x2="390" y2="85" stroke="#3730a3" strokeWidth="2" />
          <line x1="145" y1="130" x2="455" y2="130" stroke="#3730a3" strokeWidth="2" />
          <text x="300" y="52" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 1: TANGGUNG JAWAB PRAKTIS SIBER</text>
          <text x="300" y="68" textAnchor="middle" fill="#4338ca" fontSize="9">Anti-Plagiarisme • Verifikasi Hoaks • Pemanfaatan AI Etis</text>
          <text x="300" y="108" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 2: PRINSIP ETIS (Kebenaran, Keadilan, Kerahasiaan Data)</text>
          <text x="300" y="152" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 3: LANDASAN HUKUM & MORAL (Pancasila & UU ITE No. 1/2024)</text>
        </svg>
        <p className="text-[9.5px] italic text-slate-600 font-serif text-center">
          Gambar 1.1 Maskot Duta Etika Digital dan Piramida Tiga Tingkatan Etika Siber Masyarakat Informasi Indonesia.
        </p>
      </div>
    );
  }

  if (unitNumber === 2) {
    return (
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-300 space-y-2 text-slate-900 my-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-amber-300 pb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>GAMBAR 2.1: MASKOT DETEKTIF SIFT & ALUR 4 LANGKAH CEK FAKTA</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">INFOGRAFIS MATERI</span>
        </div>

        {/* Detective Mascot Banner */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-amber-200">
          <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#fef3c7" />
            <path d="M 25 35 Q 50 15 75 35 L 85 40 L 15 40 Z" fill="#78350f" />
            <rect x="25" y="32" width="50" height="5" fill="#f59e0b" />
            <circle cx="50" cy="52" r="18" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="43" cy="50" r="5" fill="none" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="57" cy="50" r="5" fill="none" stroke="#78350f" strokeWidth="1.5" />
            <line x1="48" y1="50" x2="52" y2="50" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="43" cy="50" r="2" fill="#1e1b4b" />
            <circle cx="57" cy="50" r="2" fill="#1e1b4b" />
            <path d="M 45 60 Q 50 64 55 60" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="72" cy="65" r="10" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <line x1="79" y1="72" x2="90" y2="83" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="space-y-0.5 text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-amber-950 text-[10px]">Detektif Cek Fakta:</span>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-300">
                Lensa Verifikasi
              </span>
            </div>
            <p className="text-[10px] text-slate-800 leading-snug">
              "Sebelum membagikan kabar viral, gunakan metode SIFT! Berhentilah sejenak saat emosi terprovokasi, periksa kredibilitas sumber, cari liputan pembanding, dan lacak klaim asli foto atau videonya!"
            </p>
          </div>
        </div>

        {/* 4 Cards SIFT */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5 text-center text-xs">
          <div className="p-1.5 rounded-lg bg-white border border-red-300 space-y-0.5">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono font-black text-xs inline-flex items-center justify-center">S</span>
            <strong className="block text-slate-900 text-[10px]">1. STOP</strong>
            <p className="text-[9px] text-slate-600 leading-tight">Tahan emosi & provokasi judul umpan klik.</p>
          </div>

          <div className="p-1.5 rounded-lg bg-white border border-amber-300 space-y-0.5">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-mono font-black text-xs inline-flex items-center justify-center">I</span>
            <strong className="block text-slate-900 text-[10px]">2. INVESTIGATE</strong>
            <p className="text-[9px] text-slate-600 leading-tight">Cek rekam jejak & reputasi penulis/situs.</p>
          </div>

          <div className="p-1.5 rounded-lg bg-white border border-blue-300 space-y-0.5">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-black text-xs inline-flex items-center justify-center">F</span>
            <strong className="block text-slate-900 text-[10px]">3. FIND COVERAGE</strong>
            <p className="text-[9px] text-slate-600 leading-tight">Cari pembanding media pers independen.</p>
          </div>

          <div className="p-1.5 rounded-lg bg-white border border-emerald-300 space-y-0.5">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-black text-xs inline-flex items-center justify-center">T</span>
            <strong className="block text-slate-900 text-[10px]">4. TRACE CLAIMS</strong>
            <p className="text-[9px] text-slate-600 leading-tight">Lacak rilis awal foto, video, & kutipan.</p>
          </div>
        </div>
        <p className="text-[9.5px] italic text-slate-600 font-serif text-center">
          Gambar 2.1 Maskot Detektif Cek Fakta dan Kartu Alur 4 Langkah Metode Verifikasi Informasi SIFT.
        </p>
      </div>
    );
  }

  if (unitNumber === 3) {
    return (
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border border-purple-200 space-y-2 text-slate-900 my-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-purple-200 pb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-950 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-purple-700" />
            <span>GAMBAR 3.1: MASKOT PENULIS AKADEMIK & MATRIKS ANTI-PLAGIARISME APA 7TH</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-purple-900 bg-purple-100 px-1.5 py-0.5 rounded">INFOGRAFIS MATERI</span>
        </div>

        {/* Scholar Cartoon Banner */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-purple-200">
          <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
            <path d="M 50 20 L 85 35 L 50 50 L 15 35 Z" fill="#4c1d95" />
            <rect x="42" y="45" width="16" height="12" fill="#4c1d95" />
            <line x1="85" y1="35" x2="85" y2="55" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="85" cy="57" r="2.5" fill="#f59e0b" />
            <circle cx="50" cy="58" r="16" fill="#fbcfe8" stroke="#4c1d95" strokeWidth="1.5" />
            <circle cx="44" cy="57" r="2" fill="#1e1b4b" />
            <circle cx="56" cy="57" r="2" fill="#1e1b4b" />
            <path d="M 45 65 Q 50 69 55 65" fill="none" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 70 75 Q 85 55 90 40 Q 75 55 70 75" fill="#a855f7" />
          </svg>

          <div className="space-y-0.5 text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-purple-950 text-[10px]">Cendikiawan Muda:</span>
              <span className="text-[9px] font-bold bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded border border-purple-300">
                Integritas Ilmiah
              </span>
            </div>
            <p className="text-[10px] text-slate-800 leading-snug">
              "Menulis karya ilmiah dengan jujur adalah kehormatan akademisi. Selalu sertakan sitasi APA 7th Edition baik saat mengutip langsung maupun merangkum gagasan!"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-0.5">
          <div className="p-2 rounded-lg bg-white border border-purple-200 space-y-0.5">
            <strong className="text-purple-950 text-[10px] block font-serif">Kutipan Langsung (Direct Quote)</strong>
            <p className="text-[9.5px] text-slate-700">Tanda petik ("...") untuk teks eksak &lt; 40 kata + nomor halaman.</p>
            <p className="text-[9px] font-mono text-indigo-900 bg-purple-50 p-1 rounded border border-purple-200">
              Pratama (2026, hlm. 14), "Integritas akademik..."
            </p>
          </div>

          <div className="p-2 rounded-lg bg-white border border-purple-200 space-y-0.5">
            <strong className="text-purple-950 text-[10px] block font-serif">Parafrasa Akademik (Paraphrasing)</strong>
            <p className="text-[9.5px] text-slate-700">Tulis ulang kalimat dengan gaya sendiri tanpa mengubah esensi.</p>
            <p className="text-[9px] font-mono text-indigo-900 bg-purple-50 p-1 rounded border border-purple-200">
              Pentingnya kejujuran penulisan... (Pratama, 2026).
            </p>
          </div>
        </div>
        <p className="text-[9.5px] italic text-slate-600 font-serif text-center">
          Gambar 3.1 Maskot Cendikiawan Muda dan Panduan Praktis Format Pengutipan APA 7th Edition.
        </p>
      </div>
    );
  }

  if (unitNumber === 4) {
    return (
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-sky-300 space-y-2 text-slate-900 my-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-sky-300 pb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-950 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-sky-700" />
            <span>GAMBAR 4.1: MASKOT GARDA DATA & KLASIFIKASI DATA PRIBADI (UU PDP NO. 27/2022)</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-sky-900 bg-sky-100 px-1.5 py-0.5 rounded">INFOGRAFIS MATERI</span>
        </div>

        {/* Cyber Security Guard Mascot Banner */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-sky-200">
          <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#e0f2fe" />
            <path d="M 20 40 Q 50 15 80 40 L 85 45 L 15 45 Z" fill="#0369a1" />
            <circle cx="50" cy="30" r="4" fill="#f59e0b" />
            <circle cx="50" cy="55" r="16" fill="#fed7aa" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="44" cy="53" r="2" fill="#1e1b4b" />
            <circle cx="56" cy="53" r="2" fill="#1e1b4b" />
            <path d="M 45 61 Q 50 66 55 61" fill="none" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="38" y="70" width="24" height="18" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <path d="M 43 70 L 43 64 Q 43 58 50 58 Q 57 58 57 64 L 57 70" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          </svg>

          <div className="space-y-0.5 text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sky-950 text-[10px]">Garda Cyber PDP:</span>
              <span className="text-[9px] font-bold bg-sky-100 text-sky-900 px-1.5 py-0.2 rounded border border-sky-300">
                Benteng Privasi Digital
              </span>
            </div>
            <p className="text-[10px] text-slate-800 leading-snug">
              "Data pribadi adalah aset berharga! UU PDP No. 27/2022 melindungi hak setiap warga negara dari kebocoran data, penyalahgunaan identitas, dan peretasan akun."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-0.5">
          <div className="p-2 rounded-lg bg-white border border-sky-200 space-y-0.5">
            <span className="text-[10px] font-extrabold text-sky-950 block">1. Data Spesifik (Sensitif)</span>
            <ul className="list-disc pl-3 text-[9.5px] text-slate-700 space-y-0.2">
              <li>Rekam Medis & Kesehatan</li>
              <li>Biometrik, Sidik Jari, Iris</li>
              <li>Keuangan, PIN & Password</li>
            </ul>
          </div>

          <div className="p-2 rounded-lg bg-white border border-sky-200 space-y-0.5">
            <span className="text-[10px] font-extrabold text-sky-950 block">2. Data Umum</span>
            <ul className="list-disc pl-3 text-[9.5px] text-slate-700 space-y-0.2">
              <li>Nama Lengkap & Kelamin</li>
              <li>Kewarganegaraan & Status</li>
              <li>Telepon & Alamat Domisili</li>
            </ul>
          </div>
        </div>
        <p className="text-[9.5px] italic text-slate-600 font-serif text-center">
          Gambar 4.1 Maskot Garda Cyber PDP dan Klasifikasi Jenis Data Pribadi Menurut UU PDP No. 27/2022.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border border-emerald-300 space-y-2 text-slate-900 my-2 shadow-xs">
      <div className="flex items-center justify-between border-b border-emerald-300 pb-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-emerald-700" />
          <span>GAMBAR 5.1: MASKOT SISWA BIJAK & ALUR KEPUTUSAN NETIKET</span>
        </span>
        <span className="text-[9px] font-mono font-bold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded">INFOGRAFIS MATERI</span>
      </div>

      {/* Wise Student Mascot Banner */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-emerald-200">
        <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
          <circle cx="50" cy="50" r="45" fill="#d1fae5" />
          <circle cx="50" cy="48" r="18" fill="#fed7aa" stroke="#047857" strokeWidth="1.5" />
          <circle cx="43" cy="46" r="5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <circle cx="57" cy="46" r="5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <line x1="48" y1="46" x2="52" y2="46" stroke="#047857" strokeWidth="1.5" />
          <circle cx="43" cy="46" r="2" fill="#1e1b4b" />
          <circle cx="57" cy="46" r="2" fill="#1e1b4b" />
          <path d="M 44 56 Q 50 61 56 56" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="68" y="55" width="18" height="28" rx="3" fill="#0f766e" stroke="#047857" strokeWidth="1.5" />
          <path d="M 72 68 L 76 72 L 82 64" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="space-y-0.5 text-[10.5px]">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-emerald-950 text-[10px]">Siswa Bijak Netiket:</span>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded border border-emerald-300">
              Pikirkan Sebelum Klik
            </span>
          </div>
          <p className="text-[10px] text-slate-800 leading-snug">
            "Ingatlah bahwa di balik setiap akun layar digital terdapat manusia nyata. Berkomunikasilah secara santun, inklusif, dan bebas dari rundungan siber!"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-center text-xs pt-0.5">
        <div className="p-1.5 bg-white rounded-lg border border-emerald-200 font-extrabold text-emerald-950 text-[10px]">
          1. Tahan Emosi & Periksa Niat
        </div>
        <div className="p-1.5 bg-white rounded-lg border border-emerald-200 font-extrabold text-emerald-950 text-[10px]">
          2. Uji Kebenaran & Kredibilitas
        </div>
        <div className="p-1.5 bg-white rounded-lg border border-emerald-200 font-extrabold text-emerald-950 text-[10px]">
          3. Pertimbangkan Dampak Hukum
        </div>
      </div>
      <p className="text-[9.5px] italic text-slate-600 font-serif text-center">
        Gambar 5.1 Maskot Siswa Bijak Netiket dan Tiga Tahapan Pengambilan Keputusan Komunikasi Siber yang Etis.
      </p>
    </div>
  );
};

export const PdfLuringModal: React.FC<PdfLuringModalProps> = ({
  profile,
  adminConfig,
  units,
  progress,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  // Dynamic Online Access URL (automatically updates depending on hosting origin/location)
  const currentOnlineUrl = typeof window !== 'undefined' 
    ? (window.location.origin + window.location.pathname).replace(/\/$/, '')
    : 'https://e-modul-etika-informasi.com';

  // Total pages calculation for multi-page book:
  // Cover (1) + Catalog/CPMK (1) + Petunjuk (1) + Peta Konsep (1) + (5 units * 3 pages per unit = 15) + PostTest Part 1 (1) + PostTest Part 2 (1) + Appendix Video (1) + Evaluasi Page 1 (1) + Evaluasi Page 2 (1) = 24 pages total
  const totalBookPages = 4 + (units.length * 3) + 5;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center p-1 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Embedded High-Quality Print Styles for Direct Flipbook PDF Generation */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 6mm 6mm 6mm;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .pdf-book-page {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 270mm !important;
            max-height: 276mm !important;
            overflow: hidden !important;
            page-break-before: always !important;
            page-break-after: always !important;
            break-before: page !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            padding: 4mm 5mm !important;
            margin: 0 !important;
            background: #ffffff !important;
            border: 1px solid #1e293b !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .pdf-book-page-first {
            page-break-before: avoid !important;
            break-before: avoid !important;
          }
          .pdf-book-page * {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Print compact adjustments */
          .print-compact-gap {
            gap: 1.5mm !important;
          }
          .print-compact-padding {
            padding: 1.5mm 2.5mm !important;
          }
          .print-text-sm {
            font-size: 9.5px !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>

      <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl max-w-5xl w-full p-3 sm:p-10 space-y-4 sm:space-y-6 relative shadow-2xl my-1 sm:my-4 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-none">
        
        {/* Floating Non-Print Control Toolbar */}
        <div className="space-y-2.5 print:hidden sticky top-0 bg-white/95 backdrop-blur z-20 pt-1 pb-3 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-950 text-amber-300 shadow-md shrink-0">
                <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 font-serif flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span>Modul Ajar Cetak PDF & Flipbook (21 Halaman)</span>
                  <span className="text-[9px] sm:text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                    SIAP FLIPBOOK
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium line-clamp-1 sm:line-clamp-none">
                  21 Halaman Buku Resmi • Sampul • CPMK • 5 Bab Materi + Infografis • Kuis & Jawaban • Form Evaluasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 hover:from-indigo-900 hover:to-indigo-800 text-amber-300 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 ring-2 ring-amber-400/50"
              >
                <Download className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>📥 DOWNLOAD PDF LANGSUNG (21 Hlm)</span>
              </button>
              <button
                onClick={onClose}
                className="p-2.5 sm:p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Guidance Callout Box for Direct PDF Download */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-300 text-slate-800 text-xs flex items-start gap-2 font-sans shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[11px] sm:text-xs">
              <strong className="text-amber-950 font-bold block">Petunjuk Unduh PDF Langsung (Format Buku Flipbook):</strong>
              <p className="text-[10.5px] sm:text-[11px] text-slate-700 leading-relaxed">
                Klik <span className="font-bold text-indigo-950">"DOWNLOAD PDF LANGSUNG"</span>, pilih Tujuan/Destination <span className="font-extrabold text-amber-900 bg-amber-200/80 px-1 py-0.5 rounded">"Simpan sebagai PDF" ("Save as PDF")</span>. File PDF 21 halaman presisi tinggi siap diunggah langsung ke software Flipbook (Heyzine, FlipPDF Pro, PubHTML5, Canva, dsb).
              </p>
            </div>
          </div>
        </div>

        {/* Printable Multi-Page Book Document Body */}
        <div className="space-y-12 text-slate-900 font-sans print:space-y-0">

          {/* ==========================================
              HALAMAN 1: COVER BUKU MODUL AJAR (COVER PAGE)
             ========================================== */}
          <div 
            className="pdf-book-page pdf-book-page-first border-4 sm:border-[6px] border-amber-600 rounded-none p-4 sm:p-8 space-y-4 sm:space-y-6 flex flex-col justify-between bg-[#FAF8F5] relative overflow-hidden print:border-2 print:border-amber-600 print:rounded-none page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            {/* Top Bar Banner */}
            <div className="space-y-2 text-center border-b-2 border-amber-600 pb-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-600 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-xs shadow-xs">
                  MODUL PEMBELAJARAN
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  EDISI SPESIAL 2026
                </span>
              </div>
            </div>

            {/* Eyebrow & Title Section */}
            <div className="space-y-3 text-center py-2">
              <p className="text-[10px] sm:text-xs font-serif font-black uppercase tracking-[0.2em] text-amber-900">
                J E L A J A H &nbsp; D I G I T A L &nbsp; • &nbsp; E T I K A &nbsp; I N F O R M A S I &nbsp; • &nbsp; L I T E R A S I &nbsp; K R I T I S
              </p>
              
              <h1 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-slate-950 leading-none py-1">
                {adminConfig.moduleTitle || 'ETIKA INFORMASI'}
              </h1>
              
              <p className="text-xs sm:text-base font-serif italic text-slate-700 max-w-2xl mx-auto font-medium">
                E-Modul Interaktif Berbasis Literasi Digital untuk Generasi Kritis, Cerdas, dan Bertanggung Jawab
              </p>
            </div>

            {/* Middle Feature Outline Box */}
            <div className="p-4 sm:p-5 bg-white border-2 border-slate-900 rounded-none shadow-xs space-y-2 text-center max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-center gap-4 text-amber-600 pb-1">
                <BookOpen className="w-5 h-5" />
                <Video className="w-5 h-5" />
                <ShieldCheck className="w-5 h-5" />
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-relaxed">
                Memuat 5 Unit Pembelajaran Utama, Video E-Learning dengan Scan QR Code, Simulasi Kasus Interaktif, Panduan Cek Fakta, Evaluasi Turnitin No-Repo, dan Kuis Akhir.
              </p>
            </div>

            {/* CENTER QR CODE BOX */}
            <div className="p-4 bg-white border border-slate-300 text-center space-y-2 max-w-md mx-auto w-full shadow-xs">
              <div className="flex justify-center py-1">
                <QrCodeSvg value={currentOnlineUrl} size={110} />
              </div>
              <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-tight">
                Scan untuk membuka Versi Interaktif Aplikasi Web
              </p>
              <a 
                href={currentOnlineUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="font-mono text-xs text-amber-700 font-extrabold hover:underline block break-all"
              >
                {currentOnlineUrl}
              </a>
            </div>

            {/* Footer Cover Stamp */}
            <div className="border-t-2 border-slate-300 pt-3 text-center space-y-1">
              <p className="text-xs sm:text-sm font-serif font-black uppercase tracking-wider text-slate-900">
                TIM DOSEN PRODI PERPUSTAKAAN DAN SAINS INFORMASI FIP UNJ
              </p>
              <p className="text-[10px] sm:text-xs font-serif italic text-slate-600">
                Hak Cipta Dilindungi Undang-Undang • Bebas Digunakan untuk Pendidikan
              </p>
            </div>
          </div>

          {/* ==========================================
              HALAMAN 2: KATA PENGANTAR (BAGIAN I)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-4 pt-4 sm:pt-6 flex flex-col justify-between bg-[#FAF8F5] page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-5">
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <h2 className="text-2xl font-black font-serif uppercase tracking-tight text-slate-950">KATA PENGANTAR</h2>
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                  BAGIAN I
                </span>
              </div>

              {/* Kata Pengantar Body Text */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif pt-2">
                <p className="first-letter:text-3xl first-letter:font-black first-letter:text-amber-800 first-letter:mr-1 first-letter:float-left">
                  Puji dan syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas terwujudnya E-Modul Etika Informasi Berbasis Literasi Digital ini. Di era ledakan informasi dan pesatnya perkembangan teknologi kecerdasan buatan (AI), kemampuan teknis saja tidak lagi cukup. Peserta didik membutuhkan pijakan etis yang kokoh agar tidak tersesat dalam arus informasi yang masif.
                </p>
                <p>
                  E-Modul ini disusun dengan pendekatan interaktif terintegrasi yang menggabungkan teori konseptual, analisis kasus nyata di Indonesia, video e-learning berbasis QR Code, hingga simulasi praktis seperti penangkalan hoaks dengan metode S.I.F.T., pengecekan privasi data pribadi (UU PDP No. 27/2022), uji kemiripan Turnitin No-Repo, serta etika berkomentar 5P di media sosial.
                </p>
                <p>
                  Diharapkan E-Modul ini dapat menjadi bahan ajar yang menarik, baik digunakan secara daring melalui aplikasi web interaktif, maupun secara luring melalui cetakan PDF dan model Digital Flipbook 3D.
                </p>
              </div>

              {/* Capaian Pembelajaran Matakuliah (CPMK) */}
              <div className="p-4 bg-amber-50/80 border border-amber-300 space-y-2 text-xs text-slate-900 mt-4">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-2 border-b border-amber-300 pb-1">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>CAPAIAN PEMBELAJARAN MODUL (CPMK)</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1 font-serif text-xs leading-relaxed">
                  <li><strong>CPMK 1:</strong> Mampu menganalisis hakikat etika informasi dan urgensi literasi digital di era disrupsi.</li>
                  <li><strong>CPMK 2:</strong> Mampu mempraktikkan verifikasi hoaks dan disinformasi menggunakan metode 4 langkah SIFT.</li>
                  <li><strong>CPMK 3:</strong> Mampu menerapkan prinsip pencegahan plagiarisme dan teknik sitasi standar APA 7th Edition.</li>
                  <li><strong>CPMK 4:</strong> Mampu mengevaluasi aspek hukum pelindungan data pribadi (UU PDP No. 27 Tahun 2022) di media digital.</li>
                  <li><strong>CPMK 5:</strong> Mampu mengambil keputusan etis yang bertanggung jawab dalam penggunaan dan penyebaran informasi siber.</li>
                </ul>
              </div>

              {/* Signature Block */}
              <div className="text-right pt-6 text-xs font-serif space-y-1 text-slate-800">
                <p className="font-bold">Jakarta, Juli 2026</p>
                <p className="italic text-slate-600">Tim Dosen Prodi Perpustakaan dan Sains Informasi FIP UNJ</p>
                <div className="pt-8">
                  <strong className="text-slate-950 font-sans text-sm underline">Riyan Sanjaya, M.Hum.</strong>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
              E-Modul Etika Informasi UNJ • Halaman 2 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 3: PETUNJUK PENGGUNAAN MODUL (BAGIAN II)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-4 pt-4 sm:pt-6 flex flex-col justify-between bg-[#FAF8F5] page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-4">
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <h2 className="text-2xl font-black font-serif uppercase tracking-tight text-slate-950">PETUNJUK PENGGUNAAN MODUL</h2>
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                  BAGIAN II
                </span>
              </div>

              {/* Box 1: Alur Pembelajaran Siswa */}
              <div className="p-4 bg-amber-50/60 border border-amber-300 space-y-2">
                <h3 className="font-black text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5 border-b border-amber-300 pb-1">
                  <span>🎯 ALUR PEMBELAJARAN SISWA</span>
                </h3>
                <ol className="list-decimal pl-5 space-y-1 text-xs font-serif text-slate-900 leading-relaxed">
                  <li>Bacalah <strong>Tujuan Pembelajaran</strong> pada setiap Unit.</li>
                  <li>Scan <strong>QR Code Video E-Learning</strong> untuk menonton penjelasan visual.</li>
                  <li>Pelajari <strong>ringkasan materi</strong> dan poin-poin penting.</li>
                  <li>Selesaikan <strong>Lembar Kerja & Simulasi Kasus</strong>.</li>
                  <li>Kerjakan <strong>Soal Latihan Unit (5 Soal)</strong> dan cocokkan dengan Kunci Jawaban.</li>
                  <li>Ikuti <strong>Evaluasi Kuis Akhir</strong> untuk mendapatkan Sertifikat.</li>
                </ol>
              </div>

              {/* Box 2: Glosarium Ikon Modul */}
              <div className="p-4 bg-white border border-slate-300 space-y-2">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  📚 GLOSARIUM IKON MODUL
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-slate-800">
                  <div>🎯 <strong>Tujuan:</strong> Target kompetensi yang harus dicapai.</div>
                  <div>📹 <strong>Video & QR:</strong> Link & scan video e-learning.</div>
                  <div>💡 <strong>Kasus & Refleksi:</strong> Lembar kerja studi kasus nyata.</div>
                  <div>📝 <strong>Soal Latihan:</strong> Evaluasi formatif tingkat unit.</div>
                  <div>🔍 <strong>Cek Fakta & Turnitin:</strong> Alat bantu verifikasi & etika.</div>
                </div>
              </div>

              {/* Box 3: Video Perkenalan Modul */}
              <div className="p-4 bg-white border-2 border-slate-900 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-amber-600" />
                    <span>Video Perkenalan E-Modul "Jelajah Digital"</span>
                  </span>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-900 font-mono text-[10px] font-bold rounded">
                    Durasi: 9:32 menit
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div className="space-y-1.5 text-xs font-serif text-slate-700 flex-1">
                    <p className="italic">
                      "Penjelasan latar belakang e-modul, gambaran 5 unit interaktif, serta pesan moral pentingnya generasi kritis di era banjir informasi."
                    </p>
                    <div className="p-2 bg-slate-100 border border-slate-300 text-[10.5px] font-mono break-all text-blue-800 font-bold">
                      Link URL: {currentOnlineUrl}
                    </div>
                  </div>
                  <div className="bg-white p-2 border border-slate-300 shrink-0 text-center">
                    <QrCodeSvg value={currentOnlineUrl} size={85} />
                    <span className="text-[9px] font-mono font-bold block mt-1 uppercase text-slate-600">SCAN VIDEO INTRO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
              E-Modul Etika Informasi UNJ • Halaman 3 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 4: PETA KONSEP PEMBELAJARAN (BAGIAN III)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-4 pt-4 sm:pt-6 flex flex-col justify-between bg-[#FAF8F5] page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-6">
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <h2 className="text-2xl font-black font-serif uppercase tracking-tight text-slate-950">PETA KONSEP PEMBELAJARAN</h2>
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                  BAGIAN III
                </span>
              </div>

              {/* Main Center Diagram Box */}
              <div className="p-4 bg-slate-900 text-amber-300 font-serif font-black text-center text-sm sm:text-base uppercase tracking-widest border-2 border-slate-950 max-w-xl mx-auto shadow-md">
                ETIKA INFORMASI DI ERA DIGITAL
              </div>

              {/* 5 Unit Concept Map Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs font-serif">
                {/* Unit 1 */}
                <div className="p-3 bg-emerald-50 border-2 border-emerald-400 space-y-1.5 text-slate-900">
                  <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-emerald-700 text-white block text-center">
                    UNIT 1
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-950">Konsep Etika Digital</h4>
                  <p className="text-[10.5px] text-slate-700">Prinsip Moral & Digital Native</p>
                </div>

                {/* Unit 2 */}
                <div className="p-3 bg-amber-50 border-2 border-amber-400 space-y-1.5 text-slate-900">
                  <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-amber-700 text-white block text-center">
                    UNIT 2
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-950">Detektif Informasi</h4>
                  <p className="text-[10.5px] text-slate-700">Metode S.I.F.T & Anti-Hoaks</p>
                </div>

                {/* Unit 3 */}
                <div className="p-3 bg-blue-50 border-2 border-blue-400 space-y-1.5 text-slate-900">
                  <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-blue-800 text-white block text-center">
                    UNIT 3
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-950">Privasi Data (UU PDP)</h4>
                  <p className="text-[10.5px] text-slate-700">Keamanan & 10 Langkah Privasi</p>
                </div>

                {/* Unit 4 */}
                <div className="p-3 bg-purple-50 border-2 border-purple-400 space-y-1.5 text-slate-900">
                  <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-purple-800 text-white block text-center">
                    UNIT 4
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-950">Hak Cipta & Etika AI</h4>
                  <p className="text-[10.5px] text-slate-700">Sitasi APA 7th & Anti-Plagiarisme</p>
                </div>

                {/* Unit 5 */}
                <div className="p-3 bg-rose-50 border-2 border-rose-400 space-y-1.5 text-slate-900">
                  <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-rose-800 text-white block text-center">
                    UNIT 5
                  </span>
                  <h4 className="font-extrabold text-xs text-slate-950">Bijak Bersosial Media</h4>
                  <p className="text-[10.5px] text-slate-700">Etika 5P & Anti-Cyberbullying</p>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
              E-Modul Etika Informasi UNJ • Halaman 4 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN BAB 01 S/D BAB 05 (3 HALAMAN LENGKAP PER BAB)
             ========================================== */}
          {units.map((u, uIdx) => {
            const pageCoverNum = 3 + (uIdx * 3);
            const pageMateriNum = 4 + (uIdx * 3);
            const pageKuisNum = 5 + (uIdx * 3);

            return (
              <React.Fragment key={u.id}>
                {/* -------------------------------------------
                    1. HALAMAN COVER/JUDUL BAB (SEPARASI HALAMAN)
                   ------------------------------------------- */}
                <div 
                  className="pdf-book-page border-4 sm:border-8 border-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 flex flex-col justify-between bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden print:border-2 print:rounded-none page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between border-b border-indigo-800/80 pb-3">
                    <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                      HALAMAN SEPARASI JUDUL BAB 0{u.unitNumber}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-indigo-300">MODUL AJAR BUKU CETAK</span>
                  </div>

                  {/* Main Banner Unit Title */}
                  <div className="space-y-3 text-center py-3 sm:py-4">
                    <span className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-amber-400 text-slate-950 font-mono font-black text-2xl sm:text-3xl flex items-center justify-center mx-auto shadow-xl border-2 sm:border-4 border-white">
                      0{u.unitNumber}
                    </span>
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-4xl font-black font-serif uppercase tracking-tight text-amber-300 leading-tight">
                        BAB 0{u.unitNumber}: {u.title}
                      </h2>
                      <p className="text-xs sm:text-lg font-serif italic text-slate-200 font-semibold max-w-2xl mx-auto">
                        "{u.subtitle}"
                      </p>
                    </div>
                  </div>

                  {/* Capaian & Indikator Bab */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-white/20 text-slate-100 space-y-2 sm:space-y-3">
                    <span className="text-[10px] sm:text-xs font-mono font-black text-amber-300 uppercase tracking-widest block border-b border-white/10 pb-1">
                      INDIKATOR CAPAIAN PEMBELAJARAN BAB 0{u.unitNumber}:
                    </span>
                    <ul className="space-y-1.5 text-[11px] sm:text-xs font-serif leading-relaxed">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu memahami secara konseptual dan yuridis pokok bahasan {u.title}.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu mengidentifikasi serta menganalisis studi kasus riil terkait {u.subtitle}.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu menyelesaikan latihan kuis dan evaluasi pemahaman secara mandiri.</span>
                      </li>
                    </ul>
                  </div>

                  {/* DEDICATED VIDEO BOX WITH HIGH-RES QR CODE & DIRECT STREAM LINK */}
                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/90 border-2 border-amber-400/50 shadow-xl space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                        <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-amber-300">
                          VIDEO PEMBELAJARAN INTERAKTIF BAB 0{u.unitNumber}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-mono font-bold uppercase">
                        {u.video?.type || 'Stream Video'}
                      </span>
                    </div>

                    <div className="flex flex-row items-center gap-3 sm:gap-5 pt-0.5">
                      <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl shrink-0 shadow-md">
                        <QrCodeSvg value={u.video?.url || currentOnlineUrl} size={85} />
                      </div>

                      <div className="space-y-1 sm:space-y-2 text-left w-full text-[11px] sm:text-xs">
                        <p className="font-extrabold text-xs sm:text-sm text-white line-clamp-1">{u.video?.title || u.title}</p>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 font-serif leading-tight">
                          Pindai Kode QR atau klik tautan untuk menyaksikan video materi Bab 0{u.unitNumber}:
                        </p>
                        <div className="p-1.5 sm:p-2.5 bg-slate-950 rounded-lg sm:rounded-xl border border-indigo-700/50">
                          <a 
                            href={u.video?.url || currentOnlineUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[10px] sm:text-[11px] text-sky-300 font-mono font-bold underline break-all flex items-center gap-1"
                          >
                            <span className="truncate">{u.video?.url || currentOnlineUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[9px] sm:text-[10px] font-mono text-indigo-300 pt-2 border-t border-indigo-800">
                    Modul Ajar Cetak • Separasi Judul BAB 0{u.unitNumber} • Halaman {pageCoverNum} dari {totalBookPages}
                  </div>
                </div>

                {/* -------------------------------------------
                    2. HALAMAN MATERI PEMBAHASAN & GAMBAR INFOGRAFIS EMBEDDED
                   ------------------------------------------- */}
                <div 
                  className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Header Bab Badge */}
                    <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-1 bg-indigo-900 text-amber-300 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                          BAB 0{u.unitNumber} (MATERI & INFOGRAFIS)
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                          {u.title}
                        </h2>
                        <p className="text-[11px] sm:text-xs font-serif italic text-slate-600 font-semibold">{u.subtitle}</p>
                      </div>
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400 border-2 border-slate-900 font-black text-slate-950 font-mono text-sm sm:text-base flex items-center justify-center shrink-0">
                        0{u.unitNumber}
                      </span>
                    </div>

                    {/* Sub-sections / Isi Pembahasan Materi Bab */}
                    {u.sections && u.sections.length > 0 ? (
                      <div className="space-y-3">
                        {/* Sub-Section 1 */}
                        {u.sections[0] && (
                          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-300 space-y-1.5 text-[11px] sm:text-xs text-slate-800 leading-relaxed font-serif">
                            <h3 className="font-black text-xs sm:text-sm text-slate-900 font-sans border-b border-slate-300 pb-0.5">
                              1. {u.sections[0].subTitle}
                            </h3>
                            {u.sections[0].paragraphs.map((pText, pIdx) => (
                              <p key={pIdx}>{pText}</p>
                            ))}
                          </div>
                        )}

                        {/* EMBEDDED DIAGRAM / INFOGRAPHIC IMAGE RIGHT INSIDE MATERI */}
                        <UnitDiagramGraphics unitNumber={u.unitNumber} />

                        {/* Sub-Section 2 / 3 Lanjutan */}
                        {u.sections.slice(1).map((sec, sIdx) => (
                          <div key={sec.id || sIdx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-300 space-y-1.5 text-[11px] sm:text-xs text-slate-800 leading-relaxed font-serif">
                            <h3 className="font-black text-xs sm:text-sm text-slate-900 font-sans border-b border-slate-300 pb-0.5">
                              {sIdx + 2}. {sec.subTitle}
                            </h3>
                            {sec.paragraphs.map((pText, pIdx) => (
                              <p key={pIdx}>{pText}</p>
                            ))}
                            {sec.keyTakeaway && (
                              <div className="p-2 rounded-lg sm:rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950 font-sans text-[10px] sm:text-[11px] font-bold">
                                💡 Inti Pokok Bahasan: {sec.keyTakeaway}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-300 space-y-1.5 text-[11px] sm:text-xs text-slate-800 font-serif">
                          {u.summaryPoints.map((sp, spIdx) => (
                            <p key={spIdx}>• {sp}</p>
                          ))}
                        </div>
                        <UnitDiagramGraphics unitNumber={u.unitNumber} />
                      </div>
                    )}
                  </div>

                  <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                    Modul Ajar Cetak • BAB 0{u.unitNumber} (Materi & Infografis) • Halaman {pageMateriNum} dari {totalBookPages}
                  </div>
                </div>

                {/* -------------------------------------------
                    3. HALAMAN LATIHAN KUIS & KUNCI JAWABAN BAB
                   ------------------------------------------- */}
                <div 
                  className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Header Bab Badge */}
                    <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                          BAB 0{u.unitNumber} (LATIHAN SOAL KUIS)
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                          LATIHAN SOAL EVALUASI BAB 0{u.unitNumber}
                        </h2>
                        <p className="text-[11px] sm:text-xs font-serif italic text-slate-600 font-semibold">
                          Menguji Pemahaman Konseptual & Penerapan Etis Materi {u.title}
                        </p>
                      </div>
                      <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-900 shrink-0" />
                    </div>

                    {/* List of Practice Questions + Answer Keys */}
                    <div className="space-y-3 text-xs">
                      {u.practiceQuiz.map((q, qIdx) => {
                        const correctAnsText = q.options[q.correctAnswerIndex];
                        const correctLetter = optionLetters[q.correctAnswerIndex] || 'A';

                        return (
                          <div key={q.id || qIdx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-300 bg-white space-y-2 shadow-xs">
                            <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                              {qIdx + 1}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs font-medium text-slate-800 pl-1">
                              {q.options.map((opt, oIdx) => (
                                <div 
                                  key={oIdx} 
                                  className={oIdx === q.correctAnswerIndex ? 'font-extrabold text-emerald-900 bg-emerald-100 p-1.5 rounded-lg border border-emerald-400' : 'p-1.5 rounded-lg bg-slate-50 border border-slate-200'}
                                >
                                  {optionLetters[oIdx]}. {opt}
                                </div>
                              ))}
                            </div>

                            {/* KUNCI JAWABAN & PEMBAHASAN RESMI */}
                            <div className="p-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 space-y-0.5 text-[11px] text-emerald-950">
                              <div className="flex items-center gap-1 font-black text-emerald-900">
                                <Key className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>KUNCI JAWABAN BAB 0{u.unitNumber} SOAL #{qIdx + 1}: [{correctLetter}] {correctAnsText}</span>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-emerald-900 font-serif">
                                <strong>Pembahasan Dosen:</strong> {q.explanation}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                    Modul Ajar Cetak • BAB 0{u.unitNumber} (Latihan Kuis & Kunci Jawaban) • Halaman {pageKuisNum} dari {totalBookPages}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* ==========================================
              BAB VI: EVALUASI AKHIR (POST-TEST) BAGIAN 1 (SOAL 1-5)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Header Banner */}
              <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-purple-900 text-amber-300 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                    BAB VI (POST-TEST - BAGIAN 1)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                    SOAL EVALUASI AKHIR (SOAL #1 - #5)
                  </h2>
                  <p className="text-[11px] sm:text-xs font-serif italic text-slate-600 font-semibold">
                    Ujian Komprehensif Menguji Pemahaman Unit 1 s/d Unit 5
                  </p>
                </div>
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-purple-900 shrink-0" />
              </div>

              {/* Soal Ujian Akhir List Part 1 (1-5) */}
              <div className="space-y-2 text-xs">
                {defaultFinalQuestions.slice(0, 5).map((fq, fIdx) => {
                  const correctFLetter = optionLetters[fq.correctAnswerIndex] || 'A';
                  const correctFOptionText = fq.options[fq.correctAnswerIndex];

                  return (
                    <div key={fq.id || fIdx} className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                      <p className="font-extrabold text-slate-900 text-[11px] sm:text-xs">
                        Soal Ujian #{fIdx + 1}: {fq.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-800 font-medium pl-1">
                        {fq.options.map((fOpt, fOptIdx) => (
                          <div 
                            key={fOptIdx} 
                            className={`p-1 rounded ${fOptIdx === fq.correctAnswerIndex ? 'bg-emerald-100 border border-emerald-400 font-extrabold text-emerald-950' : 'bg-white border border-slate-200'}`}
                          >
                            {optionLetters[fOptIdx]}. {fOpt}
                          </div>
                        ))}
                      </div>

                      {/* Official Answer Key & Explanation */}
                      <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-0.5 text-[9.5px]">
                        <div className="flex items-center gap-1 font-black text-emerald-900">
                          <Key className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span>KUNCI #{fIdx + 1}: [{correctFLetter}] {correctFOptionText}</span>
                        </div>
                        <p className="text-[9px] leading-tight text-emerald-900 font-serif">
                          <strong>Pembahasan:</strong> {fq.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Modul Ajar Cetak • BAB VI (POST-TEST Bagian 1) • Halaman 20 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              BAB VI: EVALUASI AKHIR (POST-TEST) BAGIAN 2 (SOAL 6-10)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Header Banner */}
              <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-purple-900 text-amber-300 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                    BAB VI (POST-TEST - BAGIAN 2)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                    SOAL EVALUASI AKHIR (SOAL #6 - #10) & KUNCI JAWABAN
                  </h2>
                  <p className="text-[11px] sm:text-xs font-serif italic text-slate-600 font-semibold">
                    Lanjutan Ujian Komprehensif Menguji Pemahaman Unit 1 s/d Unit 5
                  </p>
                </div>
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-purple-900 shrink-0" />
              </div>

              {/* Soal Ujian Akhir List Part 2 (6-10) */}
              <div className="space-y-2 text-xs">
                {defaultFinalQuestions.slice(5, 10).map((fq, fIdx) => {
                  const actualIdx = fIdx + 5;
                  const correctFLetter = optionLetters[fq.correctAnswerIndex] || 'A';
                  const correctFOptionText = fq.options[fq.correctAnswerIndex];

                  return (
                    <div key={fq.id || actualIdx} className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                      <p className="font-extrabold text-slate-900 text-[11px] sm:text-xs">
                        Soal Ujian #{actualIdx + 1}: {fq.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-800 font-medium pl-1">
                        {fq.options.map((fOpt, fOptIdx) => (
                          <div 
                            key={fOptIdx} 
                            className={`p-1 rounded ${fOptIdx === fq.correctAnswerIndex ? 'bg-emerald-100 border border-emerald-400 font-extrabold text-emerald-950' : 'bg-white border border-slate-200'}`}
                          >
                            {optionLetters[fOptIdx]}. {fOpt}
                          </div>
                        ))}
                      </div>

                      {/* Official Answer Key & Explanation */}
                      <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-0.5 text-[9.5px]">
                        <div className="flex items-center gap-1 font-black text-emerald-900">
                          <Key className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span>KUNCI #{actualIdx + 1}: [{correctFLetter}] {correctFOptionText}</span>
                        </div>
                        <p className="text-[9px] leading-tight text-emerald-900 font-serif">
                          <strong>Pembahasan:</strong> {fq.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Modul Ajar Cetak • BAB VI (POST-TEST Bagian 2) • Halaman 21 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN TERAKHIR: LAMPIRAN DIREKTORI VIDEO, SIFT, & REKAPITULASI
             ========================================== */}
          <div 
            className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                    LAMPIRAN DOKUMEN
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                    DIREKTORI VIDEO, PEDOMAN SIFT, & REKAPITULASI EVALUASI
                  </h2>
                </div>
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 shrink-0" />
              </div>

              {/* Table Video Attachments */}
              <div className="space-y-1.5">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  <span>DIREKTORI VIDEO PEMBELAJARAN MODUL (AKSES TAUTAN DINAMIS)</span>
                </h3>
                <div className="overflow-x-auto border-2 border-slate-900 rounded-xl">
                  <table className="w-full text-left text-[11px] sm:text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-bold text-[10px] sm:text-xs">
                        <th className="p-1.5 sm:p-2 border-b border-slate-700">Bab / Unit</th>
                        <th className="p-1.5 sm:p-2 border-b border-slate-700">Judul Video Pembelajaran</th>
                        <th className="p-1.5 sm:p-2 border-b border-slate-700">Tipe Media</th>
                        <th className="p-1.5 sm:p-2 border-b border-slate-700">Tautan Akses Video</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-800 text-[10.5px] sm:text-xs">
                      <tr className="bg-slate-50">
                        <td className="p-1.5 sm:p-2 font-bold">Petunjuk</td>
                        <td className="p-1.5 sm:p-2">Panduan Penggunaan E-Modul Interaktif</td>
                        <td className="p-1.5 sm:p-2 font-mono text-[9.5px]">GDrive Video</td>
                        <td className="p-1.5 sm:p-2 font-mono text-[9.5px] text-blue-700 underline">
                          <a href="https://drive.google.com/file/d/1gI264J2bH17p-O3o002N8K16O4I3N42a/view" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                            <span>Buka Video Petunjuk</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                      {units.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="p-1.5 sm:p-2 font-bold text-slate-900">Bab 0{u.unitNumber}</td>
                          <td className="p-1.5 sm:p-2">{u.video?.title || u.title}</td>
                          <td className="p-1.5 sm:p-2 font-mono text-[9.5px] uppercase">{u.video?.type || 'Stream'}</td>
                          <td className="p-1.5 sm:p-2 font-mono text-[9.5px] text-blue-700 underline truncate max-w-[180px]">
                            <a href={u.video?.url || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                              <span className="truncate">{u.video?.url || 'Belum diatur'}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SIFT & APA 7th Quick Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
                  <h4 className="font-extrabold text-amber-950 text-[11px] uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>4 LANGKAH METODE SIFT (VERIFIKASI HOAKS)</span>
                  </h4>
                  <ul className="space-y-0.5 text-[10.5px] text-amber-950">
                    <li><strong>S - STOP:</strong> Berhenti sejenak, tahan emosi.</li>
                    <li><strong>I - INVESTIGATE:</strong> Cek kredibilitas penulis & domain.</li>
                    <li><strong>F - FIND COVERAGE:</strong> Cari pembanding dari media terverifikasi.</li>
                    <li><strong>T - TRACE CLAIMS:</strong> Lacak gambar/kutipan ke sumber asli.</li>
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-300 space-y-1">
                  <h4 className="font-extrabold text-indigo-950 text-[11px] uppercase flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>SITASI STANDAR BUKU (APA 7th EDITION)</span>
                  </h4>
                  <p className="text-[10.5px] text-indigo-950 font-mono">
                    NamaBelakang, Inisial. (Tahun). <em>Judul Buku Miring</em>. Penerbit.
                  </p>
                  <p className="text-[10px] font-mono text-slate-800 bg-white p-1 rounded border border-indigo-200">
                    Sanjaya, R. (2026). <em>Etika Informasi & Literasi Digital Gen-Z</em>. UNJ Press.
                  </p>
                </div>
              </div>

              {/* Status Kelulusan & Tanda Tangan Official */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 text-white space-y-3 border-2 border-slate-950 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-2">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest block">
                      REKAPITULASI CAPAIAN NILAI MESIN KUIS
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-white">{profile.nama || 'Peserta Literasi'}</h4>
                    <p className="text-[11px] text-slate-300">
                      Nilai Ujian Akhir (Post-Test): {progress.finalExamScore !== null ? <span className="text-emerald-400 font-bold">{progress.finalExamScore} / 100</span> : <span className="text-amber-300 font-bold">Belum Mengerjakan</span>}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Status Kelulusan: {progress.finalExamPassed ? <span className="text-emerald-400 font-bold uppercase">LULUS OFFICIAL</span> : <span className="text-slate-400">DALAM PROSES BELAJAR</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 bg-slate-800 p-2 sm:p-2.5 rounded-xl border border-slate-700">
                    <Award className="w-6 h-6 text-amber-400" />
                    <div className="text-right text-[9px]">
                      <span className="font-bold text-slate-200 block">SERTA-EMODUL-2026</span>
                      <span className="text-slate-400 font-mono">OFFICIAL COPY</span>
                    </div>
                  </div>
                </div>

                {/* Signature Blocks for Official Print out */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center text-[11px] sm:text-xs pt-1 font-serif text-slate-300">
                  <div className="space-y-8">
                    <p>Mahasiswa / Peserta Luring,</p>
                    <div className="border-b border-slate-500 w-3/4 mx-auto pb-0.5">
                      <strong className="text-white block font-sans truncate">{profile.nama || '(................................)'}</strong>
                    </div>
                    <p className="text-[9px] font-mono text-slate-400">NIM: {profile.nim || '-'}</p>
                  </div>

                  <div className="space-y-8">
                    <p>Dosen / Ketua Tim Peneliti,</p>
                    <div className="border-b border-slate-500 w-3/4 mx-auto pb-0.5">
                      <strong className="text-white block font-sans">Riyan Sanjaya, M.Hum</strong>
                    </div>
                    <p className="text-[9px] font-mono text-slate-400">NIP: 199208152024061001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Dokumen Modul Ajar Cetak • Halaman 22 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 23: INSTRUMEN EVALUASI BAGIAN 1 (IDENTITAS & PERTANYAAN 1-8)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
            style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
          >
            <div className="space-y-3">
              {/* Header Banner */}
              <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                    INSTRUMEN EVALUASI LURING • HALAMAN 1 DARI 2
                  </span>
                  <h2 className="text-lg sm:text-xl font-black font-serif uppercase text-slate-950 mt-1">
                    KUESIONER EVALUASI RESPONDEN E-MODUL (SKALA LIKERT 1-5)
                  </h2>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                    Program Studi Perpustakaan dan Sains Informasi • FIP UNJ
                  </p>
                </div>
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 shrink-0" />
              </div>

              {/* Form Identitas Responden */}
              <div className="p-2.5 sm:p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-1.5 text-xs">
                <h3 className="font-black text-[11px] sm:text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  I. IDENTITAS RESPONDEN PENELITIAN (LEMBAR ISIAN CETAK)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-0.5 font-mono text-slate-800 text-[10.5px]">
                  <div className="flex items-center gap-2">
                    <span className="w-28 font-bold shrink-0">Nama Lengkap</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold truncate">{profile.nama || '.............................................'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 font-bold shrink-0">Jenis Kelamin</span>
                    <span className="text-slate-400">:</span>
                    <span className="font-sans text-slate-900">(  ) Laki-laki &nbsp;&nbsp; (  ) Perempuan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 font-bold shrink-0">Program / Rombel</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold truncate">{profile.kelas || '.............................................'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 font-bold shrink-0">Instansi / Kampus</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold truncate">{profile.instansi || 'Universitas Negeri Jakarta'}</span>
                  </div>
                </div>
              </div>

              {/* Petunjuk Pengisian */}
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-300 text-[10px] text-amber-950 space-y-0.5">
                <p className="font-extrabold uppercase">PETUNJUK PENGISIAN:</p>
                <p>
                  Berilah tanda silang (X) atau centang (✓) pada kolom angka <strong>1 (STS) sampai 5 (SS)</strong> sesuai persepsi Anda.
                </p>
                <div className="flex flex-wrap gap-2 font-mono font-bold text-[9px] pt-0.5 text-amber-900">
                  <span>1=STS</span>
                  <span>2=TS</span>
                  <span>3=CS</span>
                  <span>4=S</span>
                  <span>5=SS</span>
                </div>
              </div>

              {/* Tabel Evaluasi Q1 - Q8 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <h4 className="p-1.5 bg-slate-900 text-amber-300 font-mono font-bold text-[9.5px] uppercase tracking-wider">
                  II. PERNYATAAN EVALUASI DIMENSI A (MATERI) & DIMENSI B (DESAIN UI/UX)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[9px] border-b border-slate-400">
                        <th className="p-1 border-r border-slate-400 w-7 text-center">No</th>
                        <th className="p-1 border-r border-slate-400">Pernyataan Indikator Evaluasi Modul</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">STS<br/>(1)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">TS<br/>(2)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">CS<br/>(3)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">S<br/>(4)</th>
                        <th className="p-1 w-8 text-center">SS<br/>(5)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300 font-medium text-slate-900">
                      {defaultLikertQuestions.slice(0, 8).map((q, idx) => (
                        <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-1 text-center font-bold font-mono border-r border-slate-300">{idx + 1}</td>
                          <td className="p-1 border-r border-slate-300">
                            <span className="text-[8px] font-mono font-extrabold uppercase px-1 py-0.2 bg-slate-200 text-slate-800 rounded mr-1">
                              [{q.dimension}]
                            </span>
                            <span>{q.statement}</span>
                          </td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400">( &nbsp; )</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Instrumen Kuesioner Evaluasi Luring • PERSI UNJ 2026 • Halaman 23 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 24: INSTRUMEN EVALUASI BAGIAN 2 (PERTANYAAN 9-16 + SARAN & TANDA TANGAN)
             ========================================== */}
          <div 
            className="pdf-book-page space-y-3 sm:space-y-4 pt-4 sm:pt-6 flex flex-col justify-between page-break"
            style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
          >
            <div className="space-y-3">
              {/* Header Banner */}
              <div className="border-b-2 sm:border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
                    INSTRUMEN EVALUASI LURING • HALAMAN 2 DARI 2
                  </span>
                  <h2 className="text-lg sm:text-xl font-black font-serif uppercase text-slate-950 mt-1">
                    PERNYATAAN DIMENSI C & D + CATATAN SARAN KUALITATIF
                  </h2>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                    Program Studi Perpustakaan dan Sains Informasi • FIP UNJ
                  </p>
                </div>
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 shrink-0" />
              </div>

              {/* Tabel Evaluasi Q9 - Q16 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <h4 className="p-1.5 bg-slate-900 text-amber-300 font-mono font-bold text-[9.5px] uppercase tracking-wider">
                  III. PERNYATAAN EVALUASI DIMENSI C (FITUR INTERAKTIF) & DIMENSI D (DAMPAK PEMAHAMAN)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[9px] border-b border-slate-400">
                        <th className="p-1 border-r border-slate-400 w-7 text-center">No</th>
                        <th className="p-1 border-r border-slate-400">Pernyataan Indikator Evaluasi Modul</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">STS<br/>(1)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">TS<br/>(2)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">CS<br/>(3)</th>
                        <th className="p-1 border-r border-slate-400 w-8 text-center">S<br/>(4)</th>
                        <th className="p-1 w-8 text-center">SS<br/>(5)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300 font-medium text-slate-900">
                      {defaultLikertQuestions.slice(8, 16).map((q, idx) => (
                        <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-1 text-center font-bold font-mono border-r border-slate-300">{idx + 9}</td>
                          <td className="p-1 border-r border-slate-300">
                            <span className="text-[8px] font-mono font-extrabold uppercase px-1 py-0.2 bg-slate-200 text-slate-800 rounded mr-1">
                              [{q.dimension}]
                            </span>
                            <span>{q.statement}</span>
                          </td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                          <td className="p-1 text-center font-mono text-slate-400">( &nbsp; )</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Isian Saran Kualitatif & Tanda Tangan Responden */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="sm:col-span-2 p-3 rounded-xl border-2 border-slate-900 bg-white space-y-1.5">
                  <h4 className="font-extrabold text-slate-900 uppercase text-[9.5px] tracking-wider border-b border-slate-200 pb-0.5">
                    IV. CATATAN SARAN & MASUKAN RESPONDEN (KUALITATIF):
                  </h4>
                  <div className="space-y-2 text-[9.5px] text-slate-600 font-mono pt-0.5">
                    <div>
                      <p className="font-bold text-slate-900">1. Saran untuk Penyempurnaan Subtansi Materi Pembelajaran:</p>
                      <div className="border-b border-dashed border-slate-400 h-4 mt-0.5"></div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">2. Saran untuk Fitur Interaktif, Tampilan UI/UX & Media Digital:</p>
                      <div className="border-b border-dashed border-slate-400 h-4 mt-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border-2 border-slate-900 bg-slate-50 text-center flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9.5px] text-slate-600 font-bold">Jakarta, ............................................ 2026</p>
                    <p className="text-[10.5px] font-extrabold text-slate-900">Responden Penelitian,</p>
                  </div>
                  <div className="py-4">
                    <div className="border-b border-slate-900 w-4/5 mx-auto"></div>
                  </div>
                  <p className="text-[9.5px] font-bold text-slate-800 font-mono truncate">
                    ({profile.nama || 'Nama Terang Responden'})
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] sm:text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Instrumen Kuesioner Evaluasi Luring • PERSI UNJ 2026 • Halaman 24 dari {totalBookPages}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
