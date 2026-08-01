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
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 border-2 border-indigo-200 space-y-3 text-slate-900 my-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-700" />
            <span>GAMBAR 1.1: MASKOT SIBER & HIERARKI KERANGKA KERJA ETIKA INFORMASI</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">INFOGRAFIS KARTUN MATERI</span>
        </div>

        {/* Cartoon Illustration Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center bg-white p-3 rounded-xl border border-indigo-100 shadow-xs">
          {/* Cartoon Character SVG */}
          <div className="flex flex-col items-center justify-center p-2 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
            <svg viewBox="0 0 100 100" className="w-20 h-20">
              {/* Background Glow */}
              <circle cx="50" cy="50" r="45" fill="#e0e7ff" />
              {/* Head */}
              <circle cx="50" cy="38" r="18" fill="#fbcfe8" stroke="#3730a3" strokeWidth="2" />
              {/* Hair */}
              <path d="M 32 36 Q 50 18 68 36 Q 60 22 40 22 Z" fill="#312e81" />
              {/* Eyes */}
              <circle cx="43" cy="38" r="2.5" fill="#1e1b4b" />
              <circle cx="57" cy="38" r="2.5" fill="#1e1b4b" />
              <circle cx="44" cy="37" r="0.8" fill="#ffffff" />
              <circle cx="58" cy="37" r="0.8" fill="#ffffff" />
              {/* Smile */}
              <path d="M 44 46 Q 50 51 56 46" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
              {/* Body / Shirt */}
              <path d="M 28 85 Q 50 60 72 85 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="2" />
              {/* Shield Icon in Hand */}
              <path d="M 50 62 L 62 67 L 62 78 Q 50 86 50 86 Q 50 86 38 78 L 38 67 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 50 66 L 50 82" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M 42 72 L 58 72" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <span className="text-[10px] font-extrabold text-indigo-950 mt-1">Duta Siber UNJ</span>
            <span className="text-[9px] text-indigo-700 font-bold">Maskot Literasi Digital</span>
          </div>

          {/* Explanation Text */}
          <div className="md:col-span-2 space-y-1.5 text-xs">
            <div className="px-2.5 py-1 bg-indigo-600 text-white font-extrabold text-[10px] rounded-lg inline-block uppercase tracking-wider">
              Pesan Etis Duta Siber:
            </div>
            <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
              "Sebagai mahasiswi/a masa kini, etika informasi bukan sekadar peraturan kaku, melainkan kompas moral kita saat membagikan data, menulis karya ilmiah, dan berkomunikasi secara santun di media sosial!"
            </p>
          </div>
        </div>

        {/* Pyramid Vector Graphic */}
        <svg viewBox="0 0 600 200" className="w-full h-auto max-h-[170px]">
          <polygon points="300,10 520,190 80,190" fill="#e0e7ff" stroke="#3730a3" strokeWidth="2.5" />
          <line x1="210" y1="95" x2="390" y2="95" stroke="#3730a3" strokeWidth="2" />
          <line x1="145" y1="145" x2="455" y2="145" stroke="#3730a3" strokeWidth="2" />

          {/* Tier 1 Text */}
          <text x="300" y="60" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 1: TANGGUNG JAWAB PRAKTIS SIBER</text>
          <text x="300" y="76" textAnchor="middle" fill="#4338ca" fontSize="9">Anti-Plagiarisme • Verifikasi Hoaks • Pemanfaatan AI Etis</text>

          {/* Tier 2 Text */}
          <text x="300" y="118" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 2: PRINSIP ETIS (Kebenaran, Keadilan, Kerahasiaan Data)</text>

          {/* Tier 3 Text */}
          <text x="300" y="172" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">TIER 3: LANDASAN HUKUM & MORAL (Pancasila & UU ITE No. 1/2024)</text>
        </svg>
        <p className="text-[10.5px] italic text-slate-600 font-serif text-center pt-1">
          Gambar 1.1 Maskot Duta Etika Digital dan Piramida Tiga Tingkatan Etika Siber Masyarakat Informasi Indonesia.
        </p>
      </div>
    );
  }

  if (unitNumber === 2) {
    return (
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 space-y-3 text-slate-900 my-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-amber-300 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>GAMBAR 2.1: MASKOT DETEKTIF SIFT & ALUR 4 LANGKAH CEK FAKTA</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">INFOGRAFIS KARTUN MATERI</span>
        </div>

        {/* Detective Mascot Banner */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-xs">
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#fef3c7" />
            {/* Detective Hat */}
            <path d="M 25 35 Q 50 15 75 35 L 85 40 L 15 40 Z" fill="#78350f" />
            <rect x="25" y="32" width="50" height="5" fill="#f59e0b" />
            {/* Face */}
            <circle cx="50" cy="52" r="18" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
            {/* Eyes behind glasses */}
            <circle cx="43" cy="50" r="5" fill="none" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="57" cy="50" r="5" fill="none" stroke="#78350f" strokeWidth="1.5" />
            <line x1="48" y1="50" x2="52" y2="50" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="43" cy="50" r="2" fill="#1e1b4b" />
            <circle cx="57" cy="50" r="2" fill="#1e1b4b" />
            {/* Smile */}
            <path d="M 45 60 Q 50 64 55 60" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
            {/* Magnifying Glass */}
            <circle cx="72" cy="65" r="10" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <line x1="79" y1="72" x2="90" y2="83" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-950 text-xs">Detektif Cek Fakta:</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                Lensa Verifikasi
              </span>
            </div>
            <p className="text-[11px] text-slate-800 leading-tight">
              "Sebelum membagikan kabar viral, gunakan metode SIFT! Berhentilah sejenak saat emosi terprovokasi, periksa kredibilitas sumber, cari liputan pembanding, dan lacak klaim asli foto atau videonya!"
            </p>
          </div>
        </div>

        {/* 4 Cards SIFT */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white border-2 border-red-400 shadow-xs space-y-1">
            <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm inline-flex items-center justify-center shadow-md">S</span>
            <strong className="block text-slate-900 text-xs">1. STOP</strong>
            <p className="text-[10px] text-slate-600 font-medium">Berhenti sejenak, tahan emosi & provokasi judul umpan klik.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border-2 border-amber-400 shadow-xs space-y-1">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-mono font-black text-sm inline-flex items-center justify-center shadow-md">I</span>
            <strong className="block text-slate-900 text-xs">2. INVESTIGATE</strong>
            <p className="text-[10px] text-slate-600 font-medium">Cek rekam jejak penulis, reputasi situs, dan keahlian narasumber.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border-2 border-blue-400 shadow-xs space-y-1">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono font-black text-sm inline-flex items-center justify-center shadow-md">F</span>
            <strong className="block text-slate-900 text-xs">3. FIND COVERAGE</strong>
            <p className="text-[10px] text-slate-600 font-medium">Cari berita pembanding dari media pers independen yang terverifikasi.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border-2 border-emerald-400 shadow-xs space-y-1">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-black text-sm inline-flex items-center justify-center shadow-md">T</span>
            <strong className="block text-slate-900 text-xs">4. TRACE CLAIMS</strong>
            <p className="text-[10px] text-slate-600 font-medium">Lacak dokumen primer, tanggal rilis awal foto, dan kutipan utuh.</p>
          </div>
        </div>
        <p className="text-[10.5px] italic text-slate-600 font-serif text-center pt-1">
          Gambar 2.1 Maskot Detektif Cek Fakta dan Kartu Alur 4 Langkah Metode Verifikasi Informasi SIFT.
        </p>
      </div>
    );
  }

  if (unitNumber === 3) {
    return (
      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border-2 border-purple-200 space-y-3 text-slate-900 my-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-purple-200 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-purple-700" />
            <span>GAMBAR 3.1: MASKOT PENULIS AKADEMIK & MATRIKS ANTI-PLAGIARISME APA 7TH</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">INFOGRAFIS KARTUN MATERI</span>
        </div>

        {/* Scholar Cartoon Banner */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-purple-200 shadow-xs">
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
            {/* Toga Grad Cap */}
            <path d="M 50 20 L 85 35 L 50 50 L 15 35 Z" fill="#4c1d95" />
            <rect x="42" y="45" width="16" height="12" fill="#4c1d95" />
            <line x1="85" y1="35" x2="85" y2="55" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="85" cy="57" r="2.5" fill="#f59e0b" />
            {/* Head */}
            <circle cx="50" cy="58" r="16" fill="#fbcfe8" stroke="#4c1d95" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="44" cy="57" r="2" fill="#1e1b4b" />
            <circle cx="56" cy="57" r="2" fill="#1e1b4b" />
            {/* Smile */}
            <path d="M 45 65 Q 50 69 55 65" fill="none" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
            {/* Quill / Pen */}
            <path d="M 70 75 Q 85 55 90 40 Q 75 55 70 75" fill="#a855f7" />
          </svg>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-purple-950 text-xs">Cendikiawan Muda:</span>
              <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded border border-purple-300">
                Integritas Ilmiah
              </span>
            </div>
            <p className="text-[11px] text-slate-800 leading-tight">
              "Menulis karya ilmiah dengan jujur adalah bentuk kehormatan tertinggi akademisi. Selalu sertakan sitasi APA 7th Edition baik saat mengutip langsung maupun merangkum gagasan orang lain!"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white border border-purple-200 space-y-1 shadow-2xs">
            <strong className="text-purple-950 text-xs block font-serif">Kutipan Langsung (Direct Quote)</strong>
            <p className="text-[10.5px] text-slate-700">Gunakan tanda petik ("...") untuk teks eksak di bawah 40 kata dan tuliskan nomor halaman.</p>
            <p className="text-[10px] font-mono text-indigo-900 bg-purple-50 p-2 rounded border border-purple-200">
              Format: Menurut Pratama (2026, hlm. 14), "Integritas akademik..."
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-purple-200 space-y-1 shadow-2xs">
            <strong className="text-purple-950 text-xs block font-serif">Parafrasa Akademik (Paraphrasing)</strong>
            <p className="text-[10.5px] text-slate-700">Tulis ulang kalimat dengan gaya bahasa sendiri tanpa mengubah esensi pesan penulis asli.</p>
            <p className="text-[10px] font-mono text-indigo-900 bg-purple-50 p-2 rounded border border-purple-200">
              Format: Pentingnya kejujuran penulisan... (Pratama, 2026).
            </p>
          </div>
        </div>
        <p className="text-[10.5px] italic text-slate-600 font-serif text-center pt-1">
          Gambar 3.1 Maskot Cendikiawan Muda dan Panduan Praktis Format Pengutipan APA 7th Edition.
        </p>
      </div>
    );
  }

  if (unitNumber === 4) {
    return (
      <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-2 border-sky-300 space-y-3 text-slate-900 my-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-sky-300 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-sky-950 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-sky-700" />
            <span>GAMBAR 4.1: MASKOT GARDA DATA & KLASIFIKASI DATA PRIBADI (UU PDP NO. 27/2022)</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-sky-900 bg-sky-100 px-2 py-0.5 rounded">INFOGRAFIS KARTUN MATERI</span>
        </div>

        {/* Cyber Security Guard Mascot Banner */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-sky-200 shadow-xs">
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
            <circle cx="50" cy="50" r="45" fill="#e0f2fe" />
            {/* Guard Helmet / Cap */}
            <path d="M 20 40 Q 50 15 80 40 L 85 45 L 15 45 Z" fill="#0369a1" />
            {/* Shield emblem on cap */}
            <circle cx="50" cy="30" r="4" fill="#f59e0b" />
            {/* Face */}
            <circle cx="50" cy="55" r="16" fill="#fed7aa" stroke="#0369a1" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="44" cy="53" r="2" fill="#1e1b4b" />
            <circle cx="56" cy="53" r="2" fill="#1e1b4b" />
            {/* Confident Smile */}
            <path d="M 45 61 Q 50 66 55 61" fill="none" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" />
            {/* Lock graphic */}
            <rect x="38" y="70" width="24" height="18" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <path d="M 43 70 L 43 64 Q 43 58 50 58 Q 57 58 57 64 L 57 70" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          </svg>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sky-950 text-xs">Garda Cyber PDP:</span>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-900 px-2 py-0.5 rounded border border-sky-300">
                Benteng Privasi Digital
              </span>
            </div>
            <p className="text-[11px] text-slate-800 leading-tight">
              "Data pribadi adalah aset berharga! UU PDP No. 27/2022 melindungi hak setiap warga negara dari kebocoran data, penyalahgunaan identitas, dan peretasan akun."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white border border-sky-200 space-y-1">
            <span className="text-[11px] font-extrabold text-sky-950 block">1. Data Pribadi Spesifik (Sensitif)</span>
            <ul className="list-disc pl-4 text-[10.5px] text-slate-700 space-y-0.5">
              <li>Data Rekam Medis & Kesehatan</li>
              <li>Data Biometrik, Sidik Jari & Iris Mata</li>
              <li>Data Keuangan, Pin & Sandi Akun</li>
              <li>Pandangan Politik, Agama, & Anak</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-white border border-sky-200 space-y-1">
            <span className="text-[11px] font-extrabold text-sky-950 block">2. Data Pribadi Umum</span>
            <ul className="list-disc pl-4 text-[10.5px] text-slate-700 space-y-0.5">
              <li>Nama Lengkap & Jenis Kelamin</li>
              <li>Kewarganegaraan & Status Nikah</li>
              <li>Nomor Telepon & Alamat Domisili</li>
              <li>Kombinasi Data Umum Identifikasi</li>
            </ul>
          </div>
        </div>
        <p className="text-[10.5px] italic text-slate-600 font-serif text-center pt-1">
          Gambar 4.1 Maskot Garda Cyber PDP dan Klasifikasi Jenis Data Pribadi Menurut UU PDP No. 27/2022.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border-2 border-emerald-300 space-y-3 text-slate-900 my-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-300 pb-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-emerald-700" />
          <span>GAMBAR 5.1: MASKOT SISWA BIJAK & ALUR KEPUTUSAN NETIKET</span>
        </span>
        <span className="text-[10px] font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">INFOGRAFIS KARTUN MATERI</span>
      </div>

      {/* Wise Student Mascot Banner */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0">
          <circle cx="50" cy="50" r="45" fill="#d1fae5" />
          {/* Glasses Student */}
          <circle cx="50" cy="48" r="18" fill="#fed7aa" stroke="#047857" strokeWidth="1.5" />
          {/* Eyeglasses */}
          <circle cx="43" cy="46" r="5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <circle cx="57" cy="46" r="5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <line x1="48" y1="46" x2="52" y2="46" stroke="#047857" strokeWidth="1.5" />
          <circle cx="43" cy="46" r="2" fill="#1e1b4b" />
          <circle cx="57" cy="46" r="2" fill="#1e1b4b" />
          {/* Smile */}
          <path d="M 44 56 Q 50 61 56 56" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          {/* Smartphone with checkmark */}
          <rect x="68" y="55" width="18" height="28" rx="3" fill="#0f766e" stroke="#047857" strokeWidth="1.5" />
          <path d="M 72 68 L 76 72 L 82 64" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-950 text-xs">Siswa Bijak Netiket:</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
              Pikirkan Sebelum Klik
            </span>
          </div>
          <p className="text-[11px] text-slate-800 leading-tight">
            "Ingatlah bahwa di balik setiap akun layar digital terdapat manusia nyata yang memiliki perasaan dan hak martabat. Berkomunikasilah secara santun, inklusif, dan bebas dari rundungan siber!"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs pt-1">
        <div className="p-2.5 bg-white rounded-xl border border-emerald-200 font-extrabold text-emerald-950 shadow-xs">
          1. Tahan Emosi & Periksa Niat
        </div>
        <div className="p-2.5 bg-white rounded-xl border border-emerald-200 font-extrabold text-emerald-950 shadow-xs">
          2. Uji Kebenaran & Kredibilitas
        </div>
        <div className="p-2.5 bg-white rounded-xl border border-emerald-200 font-extrabold text-emerald-950 shadow-xs">
          3. Pertimbangkan Dampak Hukum
        </div>
      </div>
      <p className="text-[10.5px] italic text-slate-600 font-serif text-center pt-1">
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
  const currentOnlineUrl = typeof window !== 'undefined' ? window.location.href : 'https://unj.ac.id';

  // Total pages calculation for multi-page book:
  // Cover (1) + Catalog/CPMK (1) + (5 units * 3 pages per unit = 15) + PostTest (1) + Appendix Video (1) + Evaluasi Page 1 (1) + Evaluasi Page 2 (1) = 21 pages total
  const totalBookPages = 2 + (units.length * 3) + 4;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Embedded High-Quality Print Styles for Direct Flipbook PDF Generation */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .page-break {
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="bg-white text-slate-900 rounded-3xl max-w-5xl w-full p-6 sm:p-10 space-y-6 relative shadow-2xl my-4 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-none">
        
        {/* Floating Non-Print Control Toolbar */}
        <div className="space-y-3 print:hidden sticky top-0 bg-white/95 backdrop-blur z-20 pt-2 pb-3 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-950 text-amber-300 shadow-md">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 font-serif flex items-center gap-2">
                  <span>Modul Ajar Cetak PDF & Flipbook (21 Halaman)</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                    SIAP DIUNGGAH FLIPBOOK
                  </span>
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  21 Halaman Buku Resmi • Sampul • CPMK • 5 Bab Materi + Infografis • Kuis & Jawaban • Form Evaluasi Luring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 hover:from-indigo-900 hover:to-indigo-800 text-amber-300 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95 ring-2 ring-amber-400/50"
              >
                <Download className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>📥 DOWNLOAD PDF LANGSUNG (21 Hlm)</span>
              </button>
              <button
                onClick={onClose}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Guidance Callout Box for Direct PDF Download */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-slate-800 text-xs flex items-start gap-2.5 font-sans shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-amber-950 font-bold block">Petunjuk Unduh PDF Langsung (Format Buku Flipbook):</strong>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Ketika Anda mengklik tombol <span className="font-bold text-indigo-950">"DOWNLOAD PDF LANGSUNG"</span>, jendela unduh browser akan terbuka. Pastikan memilih Tujuan/Destination <span className="font-extrabold text-amber-900 bg-amber-200/80 px-1 py-0.5 rounded">"Simpan sebagai PDF" ("Save as PDF")</span>. File PDF 21 halaman yang dihasilkan memiliki tata letak halaman A4 presisi tinggi dengan warna penuh, yang siap diunggah langsung ke software Flipbook (Heyzine, FlipPDF Pro, PubHTML5, Canva, dsb).
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
            className="border-8 border-slate-900 rounded-3xl p-8 sm:p-12 space-y-8 min-h-[900px] flex flex-col justify-between bg-gradient-to-b from-slate-50 via-white to-amber-50/40 relative overflow-hidden print:min-h-screen print:border-4 print:rounded-none page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            {/* Top Badge & Institute Banner */}
            <div className="space-y-4 text-center border-b-2 border-slate-900 pb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full shadow-sm">
                <GraduationCap className="w-4 h-4" />
                <span>MODUL AJAR CETAK & PEMBELAJARAN MANDIRI (FLIPBOOK READY)</span>
              </div>
              <p className="text-xs font-serif font-black uppercase tracking-wider text-slate-700">
                PROGRAM STUDI PERPUSTAKAAN DAN SAINS INFORMASI • FAKULTAS ILMU PENDIDIKAN • UNIVERSITAS NEGERI JAKARTA
              </p>
            </div>

            {/* Main Title Section */}
            <div className="space-y-4 text-center py-4">
              <h1 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-slate-950 leading-tight">
                {adminConfig.moduleTitle || 'ETIKA INFORMASI BERBASIS LITERASI DIGITAL'}
              </h1>
              <p className="text-base sm:text-lg font-serif italic text-slate-700 max-w-2xl mx-auto font-semibold">
                Buku Panduan Pembelajaran Modul Luring, Gambar Infografis Terintegrasi, Video Streaming QR Code, & Kunci Jawaban Kuis Evaluasi
              </p>
            </div>

            {/* DYNAMIC ONLINE ACCESS & QR CODE SECTION (Cover QR Code & Link) */}
            <div className="p-5 rounded-2xl bg-indigo-950 text-white border-2 border-indigo-900 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-800 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AKSES ONLINE & INTEGRASI E-MODUL FLIPBOOK (QR CODE DINAMIS)</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/30">
                  LIVE HOSTING LINK
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                <div className="bg-white p-2.5 rounded-2xl shadow-inner shrink-0">
                  <QrCodeSvg value={currentOnlineUrl} size={130} />
                </div>

                <div className="space-y-2 text-xs text-left">
                  <p className="text-slate-200 font-serif leading-relaxed">
                    Pindai Kode QR di samping atau klik tautan di bawah ini untuk mengakses E-Modul Interaktif secara online beserta fitur simulasi Cek Fakta, Penganalisis Plagiarisme, dan Game Etika secara langsung.
                  </p>
                  
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-700/50 space-y-1">
                    <span className="text-[10px] text-amber-300 font-mono font-bold block uppercase">Tautan Hosting E-Modul (Otomatis Menyesuaikan Link):</span>
                    <a 
                      href={currentOnlineUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[11px] text-sky-300 font-bold hover:underline underline break-all flex items-center gap-1"
                    >
                      <span>{currentOnlineUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tim Peneliti & Penyusun */}
            <div className="p-5 rounded-2xl bg-white border-2 border-slate-900 shadow-sm space-y-2 text-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 block">
                TIM PENELITI & PENYUSUN MODUL AJAR:
              </span>
              <div className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-1">
                <div>1. Riyan Sanjaya, M.Hum</div>
                <div>2. Laylatul Munawaroh, S.IP., MA.</div>
                <div>3. Dr. Ahmad Rifqy Ash-Shiddiqy, M.Pd.</div>
                <div>4. Maydi Aula Riski, S.IP., MA.</div>
                <div className="sm:col-span-2 text-center">5. Wisnu Putri Airmas Jati, S.IP., MA.</div>
              </div>
            </div>

            {/* Identitas Pemilik Buku Modul */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>IDENTITAS RESMI PEMILIK BUKU MODUL AJAR</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">STATUS: E-MODUL CETAK</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Nama Mahasiswa</span>
                  <strong className="text-amber-300 text-sm font-serif block truncate">{profile.nama || 'Peserta Literasi'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">NIM / ID</span>
                  <strong className="text-white font-mono block">{profile.nim || '-'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Kelas / Rombel</span>
                  <strong className="text-white block">{profile.kelas || '-'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Instansi / Kampus</span>
                  <strong className="text-white block truncate">{profile.instansi || 'FIP UNJ'}</strong>
                </div>
              </div>
            </div>

            {/* Footer Cover Stamp */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-300 text-[10px] font-mono text-slate-600">
              <span>UNJ PRESS • HAK CIPTA DILINDUNGI UNDANG-UNDANG</span>
              <span>CETAKAN DOKUMEN: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* ==========================================
              HALAMAN 2: KATA PENGANTAR, CPMK, & DAFTAR ISI
             ========================================== */}
          <div 
            className="space-y-8 min-h-[900px] flex flex-col justify-between pt-6 print:min-h-screen page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-6">
              <div className="border-b-4 border-slate-900 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-700">MODUL AJAR LURING</span>
                  <h2 className="text-2xl font-black font-serif uppercase text-slate-950">KATA PENGANTAR & DAFTAR ISI</h2>
                </div>
                <BookOpen className="w-8 h-8 text-slate-900" />
              </div>

              {/* Kata Pengantar */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs text-slate-800 leading-relaxed font-serif">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">Kata Pengantar Tim Peneliti</h3>
                <p>
                  Puji syukur kehadirat Tuhan Yang Maha Esa atas terwujudnya Modul Ajar Cetak E-Modul Interaktif Etika Informasi ini. Modul ajar ini disusun sebagai panduan pembelajaran mandiri maupun terstruktur untuk mahasiswa dalam memahami hakikat etika informasi, pelindungan data pribadi (UU PDP No. 27/2022), verifikasi disinformasi berbasis SIFT, serta pencegahan plagiarisme karya ilmiah.
                </p>
                <p>
                  Diharapkan modul ini dapat memberikan pengalaman belajar komprehensif baik saat digunakan secara luring maupun saat dikonversi menjadi e-book flipbook interaktif.
                </p>
              </div>

              {/* Capaian Pembelajaran Matakuliah (CPMK) */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border-2 border-amber-300 space-y-3 text-xs text-slate-900">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>CAPAIAN PEMBELAJARAN MODUL (CPMK)</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 font-serif text-[11.5px] leading-relaxed">
                  <li><strong>CPMK 1:</strong> Mampu menganalisis hakikat etika informasi dan urgensi literasi digital di era disrupsi.</li>
                  <li><strong>CPMK 2:</strong> Mampu mempraktikkan verifikasi hoaks dan disinformasi menggunakan metode 4 langkah SIFT.</li>
                  <li><strong>CPMK 3:</strong> Mampu menerapkan prinsip pencegahan plagiarisme dan teknik sitasi standar APA 7th Edition.</li>
                  <li><strong>CPMK 4:</strong> Mampu mengevaluasi aspek hukum pelindungan data pribadi (UU PDP No. 27 Tahun 2022) di media digital.</li>
                  <li><strong>CPMK 5:</strong> Mampu mengambil keputusan etis yang bertanggung jawab dalam penggunaan dan penyebaran informasi siber.</li>
                </ul>
              </div>

              {/* Daftar Isi Modul */}
              <div className="space-y-3">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-1">
                  STRUKTUR BAB & DAFTAR ISI MODUL (19 HALAMAN)
                </h3>
                <div className="space-y-2 text-xs font-serif">
                  {units.map((u, i) => {
                    const pageCoverNum = 3 + (i * 3);
                    const pageMateriNum = 4 + (i * 3);
                    const pageKuisNum = 5 + (i * 3);
                    return (
                      <div key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-200 bg-white font-bold gap-1">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-900 text-amber-300 font-mono flex items-center justify-center text-xs shrink-0">
                            0{u.unitNumber}
                          </span>
                          <span>BAB 0{u.unitNumber}: {u.title}</span>
                        </div>
                        <span className="text-slate-600 font-mono text-[11px]">
                          Judul: Hlm {pageCoverNum} • Materi & Gambar: Hlm {pageMateriNum} • Kuis: Hlm {pageKuisNum}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-purple-900 text-amber-300 font-mono flex items-center justify-center text-xs">
                        VI
                      </span>
                      <span>BAB VI: SOAL EVALUASI AKHIR (POST-TEST) & KUNCI JAWABAN</span>
                    </div>
                    <span className="text-slate-600 font-mono text-[11px]">Halaman {totalBookPages - 1}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 font-mono flex items-center justify-center text-xs">
                        L
                      </span>
                      <span>LAMPIRAN: DIREKTORI VIDEO, SIFT & REKAPITULASI EVALUASI</span>
                    </div>
                    <span className="text-slate-600 font-mono text-[11px]">Halaman {totalBookPages}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-200">
              Modul Ajar Luring • Kata Pengantar & CPMK • Halaman 2 dari {totalBookPages}
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
                  className="border-8 border-slate-900 rounded-3xl p-8 sm:p-12 space-y-8 min-h-[900px] flex flex-col justify-between bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden print:min-h-screen print:border-4 print:rounded-none page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between border-b border-indigo-800/80 pb-4">
                    <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                      HALAMAN SEPARASI JUDUL BAB 0{u.unitNumber}
                    </span>
                    <span className="text-xs font-mono text-indigo-300">MODUL AJAR BUKU CETAK</span>
                  </div>

                  {/* Main Banner Unit Title */}
                  <div className="space-y-6 text-center py-6">
                    <span className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 font-mono font-black text-3xl flex items-center justify-center mx-auto shadow-2xl border-4 border-white">
                      0{u.unitNumber}
                    </span>
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-amber-300 leading-tight">
                        BAB 0{u.unitNumber}: {u.title}
                      </h2>
                      <p className="text-base sm:text-xl font-serif italic text-slate-200 font-semibold max-w-2xl mx-auto">
                        "{u.subtitle}"
                      </p>
                    </div>
                  </div>

                  {/* Capaian & Indikator Bab */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-slate-100 space-y-3">
                    <span className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest block border-b border-white/10 pb-1">
                      INDIKATOR CAPAIAN PEMBELAJARAN BAB 0{u.unitNumber}:
                    </span>
                    <ul className="space-y-2 text-xs font-serif leading-relaxed">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu memahami secara konseptual dan yuridis pokok bahasan {u.title}.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu mengidentifikasi serta menganalisis studi kasus riil terkait {u.subtitle}.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mahasiswa mampu menyelesaikan latihan kuis dan evaluasi pemahaman secara mandiri.</span>
                      </li>
                    </ul>
                  </div>

                  {/* DEDICATED VIDEO BOX WITH HIGH-RES QR CODE & DIRECT STREAM LINK */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-amber-400/50 shadow-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-red-400" />
                        <span className="font-black text-xs uppercase tracking-wider text-amber-300">
                          VIDEO PEMBELAJARAN INTERAKTIF BAB 0{u.unitNumber}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase">
                        {u.video?.type || 'Stream Video'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                      <div className="bg-white p-2.5 rounded-2xl shrink-0 shadow-lg">
                        <QrCodeSvg value={u.video?.url || currentOnlineUrl} size={110} />
                      </div>

                      <div className="space-y-2 text-left w-full text-xs">
                        <p className="font-extrabold text-sm text-white">{u.video?.title || u.title}</p>
                        <p className="text-[11px] text-slate-300 font-serif">
                          Pindai Kode QR di samping menggunakan kamera ponsel Anda atau klik tautan di bawah ini untuk menyaksikan tayangan video penjelasan materi Bab 0{u.unitNumber}:
                        </p>
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-indigo-700/50">
                          <a 
                            href={u.video?.url || currentOnlineUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[11px] text-sky-300 font-mono font-bold underline break-all flex items-center gap-1.5"
                          >
                            <span className="truncate">{u.video?.url || currentOnlineUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] font-mono text-indigo-300 pt-3 border-t border-indigo-800">
                    Modul Ajar Cetak • Halaman Separasi Judul BAB 0{u.unitNumber} • Halaman {pageCoverNum} dari {totalBookPages}
                  </div>
                </div>

                {/* -------------------------------------------
                    2. HALAMAN MATERI PEMBAHASAN & GAMBAR INFOGRAFIS EMBEDDED
                   ------------------------------------------- */}
                <div 
                  className="space-y-6 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  <div className="space-y-6">
                    {/* Header Bab Badge */}
                    <div className="border-b-4 border-slate-900 pb-3 flex items-start justify-between">
                      <div>
                        <span className="px-3 py-1 bg-indigo-900 text-amber-300 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                          BAB 0{u.unitNumber} (MATERI & INFOGRAFIS)
                        </span>
                        <h2 className="text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                          {u.title}
                        </h2>
                        <p className="text-xs font-serif italic text-slate-600 font-semibold">{u.subtitle}</p>
                      </div>
                      <span className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-slate-900 font-black text-slate-950 font-mono text-base flex items-center justify-center shrink-0">
                        0{u.unitNumber}
                      </span>
                    </div>

                    {/* Sub-sections / Isi Pembahasan Materi Bab */}
                    {u.sections && u.sections.length > 0 ? (
                      <div className="space-y-5">
                        {/* Sub-Section 1 */}
                        {u.sections[0] && (
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs text-slate-800 leading-relaxed font-serif">
                            <h3 className="font-black text-sm text-slate-900 font-sans border-b border-slate-300 pb-1">
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
                          <div key={sec.id || sIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs text-slate-800 leading-relaxed font-serif">
                            <h3 className="font-black text-sm text-slate-900 font-sans border-b border-slate-300 pb-1">
                              {sIdx + 2}. {sec.subTitle}
                            </h3>
                            {sec.paragraphs.map((pText, pIdx) => (
                              <p key={pIdx}>{pText}</p>
                            ))}
                            {sec.keyTakeaway && (
                              <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950 font-sans text-[11px] font-bold">
                                💡 Inti Pokok Bahasan: {sec.keyTakeaway}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs text-slate-800 font-serif">
                          {u.summaryPoints.map((sp, spIdx) => (
                            <p key={spIdx}>• {sp}</p>
                          ))}
                        </div>
                        <UnitDiagramGraphics unitNumber={u.unitNumber} />
                      </div>
                    )}
                  </div>

                  <div className="text-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-200">
                    Modul Ajar Cetak • BAB 0{u.unitNumber} (Materi & Diagram Infografis) • Halaman {pageMateriNum} dari {totalBookPages}
                  </div>
                </div>

                {/* -------------------------------------------
                    3. HALAMAN LATIHAN KUIS & KUNCI JAWABAN BAB
                   ------------------------------------------- */}
                <div 
                  className="space-y-6 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen page-break"
                  style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
                >
                  <div className="space-y-6">
                    {/* Header Bab Badge */}
                    <div className="border-b-4 border-slate-900 pb-3 flex items-start justify-between">
                      <div>
                        <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                          BAB 0{u.unitNumber} (LATIHAN SOAL KUIS)
                        </span>
                        <h2 className="text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                          LATIHAN SOAL EVALUASI BAB 0{u.unitNumber}
                        </h2>
                        <p className="text-xs font-serif italic text-slate-600 font-semibold">
                          Menguji Pemahaman Konseptual & Penerapan Etis Materi {u.title}
                        </p>
                      </div>
                      <HelpCircle className="w-8 h-8 text-indigo-900 shrink-0" />
                    </div>

                    {/* List of Practice Questions + Answer Keys */}
                    <div className="space-y-4 text-xs">
                      {u.practiceQuiz.map((q, qIdx) => {
                        const correctAnsText = q.options[q.correctAnswerIndex];
                        const correctLetter = optionLetters[q.correctAnswerIndex] || 'A';

                        return (
                          <div key={q.id || qIdx} className="p-4 rounded-2xl border-2 border-slate-300 bg-white space-y-2.5 shadow-sm">
                            <p className="font-extrabold text-slate-900 text-sm">
                              {qIdx + 1}. {q.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-800 pl-2">
                              {q.options.map((opt, oIdx) => (
                                <div 
                                  key={oIdx} 
                                  className={oIdx === q.correctAnswerIndex ? 'font-extrabold text-emerald-900 bg-emerald-100 p-2 rounded-lg border border-emerald-400' : 'p-2 rounded-lg bg-slate-50 border border-slate-200'}
                                >
                                  {optionLetters[oIdx]}. {opt}
                                </div>
                              ))}
                            </div>

                            {/* KUNCI JAWABAN & PEMBAHASAN RESMI */}
                            <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 space-y-1 text-xs text-emerald-950">
                              <div className="flex items-center gap-1.5 font-black text-emerald-900">
                                <Key className="w-4 h-4 text-emerald-700" />
                                <span>KUNCI JAWABAN BAB 0{u.unitNumber} SOAL #{qIdx + 1}: [{correctLetter}] {correctAnsText}</span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-emerald-900 font-serif">
                                <strong>Pembahasan Dosen:</strong> {q.explanation}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-200">
                    Modul Ajar Cetak • BAB 0{u.unitNumber} (Latihan Kuis & Kunci Jawaban) • Halaman {pageKuisNum} dari {totalBookPages}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* ==========================================
              BAB VI: EVALUASI AKHIR (POST-TEST) & KUNCI JAWABAN
             ========================================== */}
          <div 
            className="space-y-6 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen page-break"
            style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
          >
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="border-b-4 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-purple-900 text-amber-300 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                    BAB VI (EVALUASI AKHIR)
                  </span>
                  <h2 className="text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                    SOAL EVALUASI AKHIR (POST-TEST) & KUNCI JAWABAN
                  </h2>
                  <p className="text-xs font-serif italic text-slate-600 font-semibold">
                    10 Soal Ujian Komprehensif Menguji Seluruh Pemahaman Unit 1 s/d Unit 5
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-900 shrink-0" />
              </div>

              {/* Soal Ujian Akhir List */}
              <div className="space-y-4 text-xs">
                {defaultFinalQuestions.map((fq, fIdx) => {
                  const correctFLetter = optionLetters[fq.correctAnswerIndex] || 'A';
                  const correctFOptionText = fq.options[fq.correctAnswerIndex];

                  return (
                    <div key={fq.id || fIdx} className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 space-y-2">
                      <p className="font-extrabold text-slate-900 text-sm">
                        Soal Ujian #{fIdx + 1}: {fq.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-800 font-medium pl-2">
                        {fq.options.map((fOpt, fOptIdx) => (
                          <div 
                            key={fOptIdx} 
                            className={`p-1.5 rounded ${fOptIdx === fq.correctAnswerIndex ? 'bg-emerald-100 border border-emerald-400 font-extrabold text-emerald-950' : 'bg-white border border-slate-200'}`}
                          >
                            {optionLetters[fOptIdx]}. {fOpt}
                          </div>
                        ))}
                      </div>

                      {/* Official Answer Key & Explanation */}
                      <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 font-black text-emerald-900">
                          <Key className="w-4 h-4 text-emerald-700" />
                          <span>KUNCI JAWABAN EVALUASI #{fIdx + 1}: [{correctFLetter}] {correctFOptionText}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-emerald-900 font-serif">
                          <strong>Pembahasan Dosen:</strong> {fq.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-200">
              Modul Ajar Cetak • BAB VI (POST-TEST) • Halaman {totalBookPages - 1} dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN TERAKHIR: LAMPIRAN DIREKTORI VIDEO, SIFT, & REKAPITULASI
             ========================================== */}
          <div 
            className="space-y-6 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b-4 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                    LAMPIRAN DOKUMEN
                  </span>
                  <h2 className="text-2xl font-black font-serif uppercase text-slate-950 mt-1">
                    DIREKTORI VIDEO, PEDOMAN SIFT, & REKAPITULASI EVALUASI
                  </h2>
                </div>
                <ShieldCheck className="w-8 h-8 text-slate-900 shrink-0" />
              </div>

              {/* Table Video Attachments */}
              <div className="space-y-2">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  <span>DIREKTORI VIDEO PEMBELAJARAN MODUL (AKSES TAUTAN DINAMIS)</span>
                </h3>
                <div className="overflow-x-auto border-2 border-slate-900 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-bold">
                        <th className="p-2 border-b border-slate-700">Bab / Unit</th>
                        <th className="p-2 border-b border-slate-700">Judul Video Pembelajaran</th>
                        <th className="p-2 border-b border-slate-700">Tipe Media</th>
                        <th className="p-2 border-b border-slate-700">Tautan Akses Video</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                      <tr className="bg-slate-50">
                        <td className="p-2 font-bold">Petunjuk</td>
                        <td className="p-2">Panduan Penggunaan E-Modul Interaktif</td>
                        <td className="p-2 font-mono text-[10px]">GDrive Video</td>
                        <td className="p-2 font-mono text-[10px] text-blue-700 underline">
                          <a href="https://drive.google.com/file/d/1gI264J2bH17p-O3o002N8K16O4I3N42a/view" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                            <span>Buka Video Petunjuk</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                      {units.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="p-2 font-bold text-slate-900">Bab 0{u.unitNumber}</td>
                          <td className="p-2">{u.video?.title || u.title}</td>
                          <td className="p-2 font-mono text-[10px] uppercase">{u.video?.type || 'Stream'}</td>
                          <td className="p-2 font-mono text-[10px] text-blue-700 underline truncate max-w-[220px]">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-1.5">
                  <h4 className="font-extrabold text-amber-950 text-xs uppercase flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>4 LANGKAH METODE SIFT (VERIFIKASI HOAKS)</span>
                  </h4>
                  <ul className="space-y-1 text-[11px] text-amber-950">
                    <li><strong>S - STOP:</strong> Berhenti sejenak, tahan emosi.</li>
                    <li><strong>I - INVESTIGATE:</strong> Cek kredibilitas penulis & domain.</li>
                    <li><strong>F - FIND COVERAGE:</strong> Cari pembanding dari media terverifikasi.</li>
                    <li><strong>T - TRACE CLAIMS:</strong> Lacak gambar/kutipan ke sumber asli.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-300 space-y-1.5">
                  <h4 className="font-extrabold text-indigo-950 text-xs uppercase flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>SITASI STANDAR BUKU (APA 7th EDITION)</span>
                  </h4>
                  <p className="text-[11px] text-indigo-950 font-mono">
                    NamaBelakang, Inisial. (Tahun). <em>Judul Buku Miring</em>. Penerbit.
                  </p>
                  <p className="text-[10.5px] font-mono text-slate-800 bg-white p-1.5 rounded border border-indigo-200">
                    Sanjaya, R. (2026). <em>Etika Informasi & Literasi Digital Gen-Z</em>. UNJ Press.
                  </p>
                </div>
              </div>

              {/* Status Kelulusan & Tanda Tangan Official */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 border-2 border-slate-950 shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                      REKAPITULASI CAPAIAN NILAI MESIN KUIS
                    </span>
                    <h4 className="font-extrabold text-base text-white">{profile.nama || 'Peserta Literasi'}</h4>
                    <p className="text-xs text-slate-300">
                      Nilai Ujian Akhir (Post-Test): {progress.finalExamScore !== null ? <span className="text-emerald-400 font-bold">{progress.finalExamScore} / 100</span> : <span className="text-amber-300 font-bold">Belum Mengerjakan / Dalam Proses</span>}
                    </p>
                    <p className="text-xs text-slate-300">
                      Status Kelulusan E-Modul: {progress.finalExamPassed ? <span className="text-emerald-400 font-bold uppercase">LULUS OFFICIAL</span> : <span className="text-slate-400">DALAM PROSES BELAJAR</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <Award className="w-8 h-8 text-amber-400" />
                    <div className="text-right text-[10px]">
                      <span className="font-bold text-slate-200 block">SERTA-EMODUL-2026</span>
                      <span className="text-slate-400 font-mono">OFFICIAL PRINTED COPY</span>
                    </div>
                  </div>
                </div>

                {/* Signature Blocks for Official Print out */}
                <div className="grid grid-cols-2 gap-8 text-center text-xs pt-2 font-serif text-slate-300">
                  <div className="space-y-12">
                    <p>Mahasiswa / Peserta Luring,</p>
                    <div className="border-b border-slate-500 w-3/4 mx-auto pb-1">
                      <strong className="text-white block font-sans">{profile.nama || '(.........................................)'}</strong>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400">NIM: {profile.nim || '-'}</p>
                  </div>

                  <div className="space-y-12">
                    <p>Dosen / Ketua Tim Peneliti,</p>
                    <div className="border-b border-slate-500 w-3/4 mx-auto pb-1">
                      <strong className="text-white block font-sans">Riyan Sanjaya, M.Hum</strong>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400">NIP: 199208152024061001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-200">
              Dokumen Buku Modul Ajar Luring ini dicetak dari E-Modul Interaktif Etika Informasi pada {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. • Halaman {totalBookPages - 1} dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 20: INSTRUMEN EVALUASI BAGIAN 1 (IDENTITAS & PERTANYAAN 1-8)
             ========================================== */}
          <div 
            className="space-y-4 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen page-break"
            style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
          >
            <div className="space-y-3">
              {/* Header Banner */}
              <div className="border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                    INSTRUMEN EVALUASI LURING • HALAMAN 1 DARI 2
                  </span>
                  <h2 className="text-xl font-black font-serif uppercase text-slate-950 mt-1">
                    KUISIONER EVALUASI RESPONDEN E-MODUL (SKALA LIKERT 1-5)
                  </h2>
                  <p className="text-[11px] font-bold text-slate-700">
                    Program Studi Perpustakaan dan Sains Informasi • Fakultas Ilmu Pendidikan • Universitas Negeri Jakarta
                  </p>
                </div>
                <FileText className="w-8 h-8 text-slate-900 shrink-0" />
              </div>

              {/* Form Identitas Responden */}
              <div className="p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 space-y-2 text-xs">
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  I. IDENTITAS RESPONDEN PENELITIAN (LEMBAR ISIAN CETAK)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-0.5 font-mono text-slate-800 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-32 font-bold shrink-0">Nama Lengkap</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold">{profile.nama || '.........................................................'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-32 font-bold shrink-0">Jenis Kelamin</span>
                    <span className="text-slate-400">:</span>
                    <span className="font-sans text-slate-900">(  ) Laki-laki &nbsp;&nbsp;&nbsp; (  ) Perempuan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-32 font-bold shrink-0">Program / Rombel</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold">{profile.kelas || '.........................................................'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-32 font-bold shrink-0">Instansi / Kampus</span>
                    <span className="text-slate-400">:</span>
                    <span className="border-b border-slate-400 flex-1 text-slate-900 font-sans font-bold">{profile.instansi || 'Universitas Negeri Jakarta'}</span>
                  </div>
                </div>
              </div>

              {/* Petunjuk Pengisian */}
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-[10.5px] text-amber-950 space-y-0.5">
                <p className="font-extrabold uppercase">PETUNJUK PENGISIAN:</p>
                <p>
                  Berilah tanda silang (X) atau centang (✓) pada salah satu kolom angka <strong>1 (STS) sampai 5 (SS)</strong> sesuai persepsi objektif Anda setelah membaca e-modul.
                </p>
                <div className="flex flex-wrap gap-2.5 font-mono font-bold text-[9.5px] pt-0.5 text-amber-900">
                  <span>1 = Sangat Tidak Setuju (STS)</span>
                  <span>2 = Tidak Setuju (TS)</span>
                  <span>3 = Cukup Setuju (CS)</span>
                  <span>4 = Setuju (S)</span>
                  <span>5 = Sangat Setuju (SS)</span>
                </div>
              </div>

              {/* Tabel Evaluasi Q1 - Q8 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <h4 className="p-2 bg-slate-900 text-amber-300 font-mono font-bold text-[10px] uppercase tracking-wider">
                  II. PERNYATAAN EVALUASI DIMENSI A (MATERI) & DIMENSI B (DESAIN UI/UX)
                </h4>
                <table className="w-full text-left text-[10.5px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[9.5px] border-b border-slate-400">
                      <th className="p-1.5 border-r border-slate-400 w-8 text-center">No</th>
                      <th className="p-1.5 border-r border-slate-400">Pernyataan Indikator Evaluasi Modul</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">STS<br/>(1)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">TS<br/>(2)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">CS<br/>(3)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">S<br/>(4)</th>
                      <th className="p-1.5 w-9 text-center">SS<br/>(5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 font-medium text-slate-900">
                    {defaultLikertQuestions.slice(0, 8).map((q, idx) => (
                      <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-1.5 text-center font-bold font-mono border-r border-slate-300">{idx + 1}</td>
                        <td className="p-1.5 border-r border-slate-300">
                          <span className="text-[8.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded mr-1.5">
                            [{q.dimension}]
                          </span>
                          <span>{q.statement}</span>
                        </td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400">( &nbsp; )</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Instrumen Kuesioner Evaluasi Luring E-Modul Etika Informasi • PERSI UNJ 2026 • Halaman 20 dari {totalBookPages}
            </div>
          </div>

          {/* ==========================================
              HALAMAN 21: INSTRUMEN EVALUASI BAGIAN 2 (PERTANYAAN 9-16 + SARAN & TANDA TANGAN)
             ========================================== */}
          <div 
            className="space-y-4 pt-6 min-h-[900px] flex flex-col justify-between print:min-h-screen page-break"
            style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
          >
            <div className="space-y-4">
              {/* Header Banner */}
              <div className="border-b-4 border-slate-900 pb-2 flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-widest rounded-md">
                    INSTRUMEN EVALUASI LURING • HALAMAN 2 DARI 2
                  </span>
                  <h2 className="text-xl font-black font-serif uppercase text-slate-950 mt-1">
                    PERNYATAAN DIMENSI C & D + CATATAN SARAN KUALITATIF
                  </h2>
                  <p className="text-[11px] font-bold text-slate-700">
                    Program Studi Perpustakaan dan Sains Informasi • Fakultas Ilmu Pendidikan • Universitas Negeri Jakarta
                  </p>
                </div>
                <FileText className="w-8 h-8 text-slate-900 shrink-0" />
              </div>

              {/* Tabel Evaluasi Q9 - Q16 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <h4 className="p-2 bg-slate-900 text-amber-300 font-mono font-bold text-[10px] uppercase tracking-wider">
                  III. PERNYATAAN EVALUASI DIMENSI C (FITUR INTERAKTIF) & DIMENSI D (DAMPAK PEMAHAMAN)
                </h4>
                <table className="w-full text-left text-[10.5px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[9.5px] border-b border-slate-400">
                      <th className="p-1.5 border-r border-slate-400 w-8 text-center">No</th>
                      <th className="p-1.5 border-r border-slate-400">Pernyataan Indikator Evaluasi Modul</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">STS<br/>(1)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">TS<br/>(2)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">CS<br/>(3)</th>
                      <th className="p-1.5 border-r border-slate-400 w-9 text-center">S<br/>(4)</th>
                      <th className="p-1.5 w-9 text-center">SS<br/>(5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 font-medium text-slate-900">
                    {defaultLikertQuestions.slice(8, 16).map((q, idx) => (
                      <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-1.5 text-center font-bold font-mono border-r border-slate-300">{idx + 9}</td>
                        <td className="p-1.5 border-r border-slate-300">
                          <span className="text-[8.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded mr-1.5">
                            [{q.dimension}]
                          </span>
                          <span>{q.statement}</span>
                        </td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400 border-r border-slate-300">( &nbsp; )</td>
                        <td className="p-1.5 text-center font-mono text-slate-400">( &nbsp; )</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Isian Saran Kualitatif & Tanda Tangan Responden */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div className="sm:col-span-2 p-3.5 rounded-xl border-2 border-slate-900 bg-white space-y-2">
                  <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider border-b border-slate-200 pb-1">
                    IV. CATATAN SARAN & MASUKAN RESPONDEN (KUALITATIF):
                  </h4>
                  <div className="space-y-3 text-[10px] text-slate-600 font-mono pt-1">
                    <div>
                      <p className="font-bold text-slate-900">1. Saran untuk Penyempurnaan Subtansi Materi Pembelajaran:</p>
                      <div className="border-b border-dashed border-slate-400 h-5 mt-1"></div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">2. Saran untuk Fitur Interaktif, Tampilan UI/UX & Media Digital:</p>
                      <div className="border-b border-dashed border-slate-400 h-5 mt-1"></div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 text-center flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-600 font-bold">Jakarta, ............................................ 2026</p>
                    <p className="text-[11px] font-extrabold text-slate-900">Responden Penelitian,</p>
                  </div>
                  <div className="py-7">
                    <div className="border-b border-slate-900 w-4/5 mx-auto"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 font-mono">
                    ({profile.nama || 'Nama Terang Responden'})
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
              Instrumen Kuesioner Evaluasi Luring E-Modul Etika Informasi • PERSI UNJ 2026 • Halaman 21 dari {totalBookPages}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
