import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  X, Printer, Video, BookOpen, ShieldCheck, Award, ExternalLink, Key, 
  GraduationCap, UserCheck, HelpCircle, Sparkles, Download, Layers, 
  CheckCircle, AlertTriangle, FileText, Check, ChevronLeft, ChevronRight, 
  RotateCcw, Volume2, VolumeX, Play, Pause, BookOpenCheck, List, Eye, Loader2
} from 'lucide-react';
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

// Custom Embedded Visual Diagrams & Illustrations for Inside Materi Pages
const UnitDiagramGraphics: React.FC<{ unitNumber: number }> = ({ unitNumber }) => {
  if (unitNumber === 1) {
    return (
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-slate-900 my-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-700" />
            <span>GAMBAR 1.1: KERANGKA KERJA ETIKA INFORMASI SIBER</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
            INFOGRAFIS AKADEMIK
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-white p-2.5 rounded-lg border border-slate-200">
          <div className="flex flex-col items-center justify-center p-2 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-900 text-amber-300 flex items-center justify-center font-serif font-black text-lg mb-1 shadow-xs">
              P
            </div>
            <span className="text-xs font-bold text-indigo-950">Privasi Data</span>
            <span className="text-[10px] text-slate-600 font-mono">Hak Perlindungan Rekam Digital</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-amber-50 rounded-lg border border-amber-200 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-serif font-black text-lg mb-1 shadow-xs">
              A
            </div>
            <span className="text-xs font-bold text-amber-950">Akurasi & Integritas</span>
            <span className="text-[10px] text-slate-600 font-mono">Fakta Bebas Disinformasi</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-serif font-black text-lg mb-1 shadow-xs">
              H
            </div>
            <span className="text-xs font-bold text-blue-950">Hak Cipta (HAKI)</span>
            <span className="text-[10px] text-slate-600 font-mono">Atribusi Kekayaan Intelektual</span>
          </div>
        </div>
      </div>
    );
  }

  if (unitNumber === 2) {
    return (
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-slate-900 my-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
            <span>GAMBAR 2.1: TAKSONOMI LITERASI PRIVASI & KEAMANAN DIGITAL</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
            DIAGRAM VERIFIKASI
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded-lg border border-slate-200">
          <div className="p-2 bg-slate-100 rounded border border-slate-300 space-y-1">
            <span className="text-[11px] font-bold text-slate-900 block border-b border-slate-300 pb-0.5">
              🛡️ Prinsip Keamanan Akun
            </span>
            <ul className="text-[10px] text-slate-700 space-y-0.5 list-disc pl-3">
              <li>Otentikasi Dua Faktor (2FA) Mandatory</li>
              <li>Manajemen Kata Sandi Kompleks</li>
              <li>Enkripsi End-to-End Pesan SIBER</li>
            </ul>
          </div>
          <div className="p-2 bg-indigo-50 rounded border border-indigo-200 space-y-1">
            <span className="text-[11px] font-bold text-indigo-950 block border-b border-indigo-200 pb-0.5">
              👁️ Proteksi Rekam Jejak
            </span>
            <ul className="text-[10px] text-slate-700 space-y-0.5 list-disc pl-3">
              <li>Audit Izin Akses Aplikasi Ketiiga</li>
              <li>Minimisasi Pembagian Data Sensitif</li>
              <li>Pembersihan Cookie & Cache Berkala</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (unitNumber === 3) {
    return (
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-slate-900 my-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>GAMBAR 3.1: ALUR METODE SIFT (STOP, INVESTIGATE, FIND, TRACE)</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
            VERIFIKASI INFORMASI
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center bg-white p-2 rounded-lg border border-slate-200">
          <div className="p-1.5 bg-amber-100 rounded border border-amber-300">
            <span className="font-extrabold text-xs text-amber-950 block">S - STOP</span>
            <span className="text-[9px] text-slate-700">Hentikan Emosi & Reaksi</span>
          </div>
          <div className="p-1.5 bg-blue-100 rounded border border-blue-300">
            <span className="font-extrabold text-xs text-blue-950 block">I - INVESTIGATE</span>
            <span className="text-[9px] text-slate-700">Cek Kredibilitas Sumber</span>
          </div>
          <div className="p-1.5 bg-emerald-100 rounded border border-emerald-300">
            <span className="font-extrabold text-xs text-emerald-950 block">F - FIND</span>
            <span className="text-[9px] text-slate-700">Cari Pelaporan Kunci</span>
          </div>
          <div className="p-1.5 bg-purple-100 rounded border border-purple-300">
            <span className="font-extrabold text-xs text-purple-950 block">T - TRACE</span>
            <span className="text-[9px] text-slate-700">Lacak Konteks Asli</span>
          </div>
        </div>
      </div>
    );
  }

  if (unitNumber === 4) {
    return (
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-slate-900 my-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
            <span>GAMBAR 4.1: MATRIKS INTEGRITAS AKADEMIK VS GENERATIVE AI</span>
          </span>
          <span className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
            ETIKA AI AKADEMIK
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded-lg border border-slate-200">
          <div className="p-2 bg-emerald-50 rounded border border-emerald-200 space-y-1">
            <span className="text-[11px] font-bold text-emerald-950 block border-b border-emerald-200 pb-0.5">
              ✅ PENGGUNAAN ETIS (DIIZINKAN)
            </span>
            <ul className="text-[10px] text-slate-700 space-y-0.5 list-disc pl-3">
              <li>Curah pendapat (Brainstorming) topik karya ilmiah</li>
              <li>Pemeriksaan tata bahasa & keterbacaan teks</li>
              <li>Pencarian referensi studi awal</li>
            </ul>
          </div>
          <div className="p-2 bg-rose-50 rounded border border-rose-200 space-y-1">
            <span className="text-[11px] font-bold text-rose-950 block border-b border-rose-200 pb-0.5">
              ❌ PELANGGARAN ETIS (DILARANG)
            </span>
            <ul className="text-[10px] text-slate-700 space-y-0.5 list-disc pl-3">
              <li>Copy-paste teks AI tanpa verifikasi & sitasi</li>
              <li>Pemalsuan referensi / Sitasi Halusinasi AI</li>
              <li>Penyerahan tugas penuh hasil buatan mesin</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-slate-900 my-2">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
        <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-indigo-700" />
          <span>GAMBAR 5.1: SIKLUS HAKI & TANGGUNG JAWAB ETIS AKADEMISI</span>
        </span>
        <span className="text-[9px] font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
          PEDOMAN HAK CIPTA
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-lg border border-slate-200 text-center">
        <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
          <span className="font-extrabold text-xs text-indigo-950 block">1. Sitasi Baku</span>
          <span className="text-[10px] text-slate-600">APA 7th / IEEE Style</span>
        </div>
        <div className="p-2 bg-amber-50 rounded border border-amber-200">
          <span className="font-extrabold text-xs text-amber-950 block">2. Lisensi CC</span>
          <span className="text-[10px] text-slate-600">Atribusi & Non-Komersial</span>
        </div>
        <div className="p-2 bg-blue-50 rounded border border-blue-200">
          <span className="font-extrabold text-xs text-blue-950 block">3. Turnitin Safe</span>
          <span className="text-[10px] text-slate-600">Skor Kemiripan &lt; 15%</span>
        </div>
      </div>
    </div>
  );
};

// Unified Academic Header and Footer for Pages 2 to 24
const PageHeader: React.FC<{ pageNum: number; title: string }> = ({ pageNum, title }) => (
  <div className="border-b-2 border-slate-900 pb-2 mb-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-800 uppercase tracking-wider">
    <div className="flex items-center gap-2">
      <span className="font-extrabold text-slate-950 bg-amber-300 px-2 py-0.5 rounded border border-slate-900">
        UNIVERSITAS NEGERI JAKARTA
      </span>
      <span className="font-serif font-bold text-slate-900 normal-case hidden sm:inline">
        {title}
      </span>
    </div>
    <span className="font-bold text-slate-950 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-400 font-mono">
      HALAMAN {pageNum} / 24
    </span>
  </div>
);

const PageFooter: React.FC<{ pageNum: number }> = ({ pageNum }) => (
  <div className="border-t border-slate-300 pt-2 mt-auto flex items-center justify-between text-[9px] sm:text-[10px] text-slate-600 font-mono">
    <span>E-Modul Luring Literasi Digital & Etika Informasi</span>
    <span className="font-bold text-slate-900">FIP UNJ • Perpusinfo</span>
    <span>Hal. {pageNum}</span>
  </div>
);

export const PdfLuringModal: React.FC<PdfLuringModalProps> = ({
  profile,
  adminConfig,
  units,
  progress,
  onClose
}) => {
  const [viewMode, setViewMode] = useState<'flipbook' | 'print'>('flipbook');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const totalBookPages = 24;

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const prevMode = viewMode;
    setViewMode('print');

    // Wait for DOM to expand and render all 24 pages completely
    await new Promise((resolve) => setTimeout(resolve, 600));

    const element = document.getElementById('printable-emodul-document');
    if (!element) {
      window.print();
      setIsGeneratingPdf(false);
      return;
    }

    const opt = {
      margin: [0, 0, 0, 0],
      filename: `E-Modul_Etika_Informasi_Luring_24Halaman_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    try {
      // @ts-ignore
      if (typeof html2pdf !== 'undefined') {
        // @ts-ignore
        await html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (err) {
      console.error('Direct PDF download error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
      setViewMode(prevMode);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const currentOnlineUrl = typeof window !== 'undefined' 
    ? (window.location.origin + window.location.pathname).replace(/\/$/, '')
    : 'https://e-modul-etika-informasi.com';

  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 1.6;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Ignore audio errors
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalBookPages) {
      setCurrentPage((prev) => prev + 1);
      playPageTurnSound();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      playPageTurnSound();
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalBookPages) {
      setCurrentPage(pageNumber);
      playPageTurnSound();
    }
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'flipbook') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, viewMode]);

  // Autoplay Effect
  useEffect(() => {
    let interval: any;
    if (isAutoplay && viewMode === 'flipbook') {
      interval = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= totalBookPages) {
            setIsAutoplay(false);
            return prev;
          }
          playPageTurnSound();
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, viewMode]);

  const chapterList = [
    { page: 1, title: 'Halaman 1: Cover Buku Utama' },
    { page: 2, title: 'Halaman 2: Kata Pengantar & Profil Modul' },
    { page: 3, title: 'Halaman 3: Petunjuk Penggunaan & Alur Luring' },
    { page: 4, title: 'Halaman 4: Peta Konsep Pembelajaran & CPMK' },
    { page: 5, title: 'Halaman 5: BAB I Cover - Pengantar Etika Informasi' },
    { page: 6, title: 'Halaman 6: BAB I Materi & Infografis' },
    { page: 7, title: 'Halaman 7: BAB I Latihan Kuis & Kunci Jawaban' },
    { page: 8, title: 'Halaman 8: BAB II Cover - Privasi & Keamanan SIBER' },
    { page: 9, title: 'Halaman 9: BAB II Materi & Infografis' },
    { page: 10, title: 'Halaman 10: BAB II Latihan Kuis & Kunci Jawaban' },
    { page: 11, title: 'Halaman 11: BAB III Cover - Hoaks & Cek Fakta' },
    { page: 12, title: 'Halaman 12: BAB III Materi & Infografis' },
    { page: 13, title: 'Halaman 13: BAB III Latihan Kuis & Kunci Jawaban' },
    { page: 14, title: 'Halaman 14: BAB IV Cover - Literasi Digital AI' },
    { page: 15, title: 'Halaman 15: BAB IV Materi & Infografis' },
    { page: 16, title: 'Halaman 16: BAB IV Latihan Kuis & Kunci Jawaban' },
    { page: 17, title: 'Halaman 17: BAB V Cover - AI & Integritas Akademik' },
    { page: 18, title: 'Halaman 18: BAB V Materi & Infografis' },
    { page: 19, title: 'Halaman 19: BAB V Latihan Kuis & Kunci Jawaban' },
    { page: 20, title: 'Halaman 20: BAB VI Post-Test Bagian 1 (Soal #1 - #5)' },
    { page: 21, title: 'Halaman 21: BAB VI Post-Test Bagian 2 (Soal #6 - #10)' },
    { page: 22, title: 'Halaman 22: Lampiran Video E-Learning & SIFT' },
    { page: 23, title: 'Halaman 23: Kuesioner Evaluasi Luring Bagian 1' },
    { page: 24, title: 'Halaman 24: Kuesioner Evaluasi Luring Bagian 2' },
  ];

  // Function determining if a page should be displayed in current view mode
  const isPageVisible = (pageNumber: number) => {
    if (viewMode === 'print') return true;
    return currentPage === pageNumber;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex justify-center p-1 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Pristine A4 CSS Print Engine */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
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
            height: auto !important;
            overflow: visible !important;
          }
          .print\\:hidden, nav, header, button, .sticky {
            display: none !important;
          }
          .fixed.inset-0 {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            height: auto !important;
            width: 100% !important;
            box-shadow: none !important;
          }
          #printable-emodul-document {
            display: block !important;
            width: 100% !important;
            max-width: 210mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
          }
          .pdf-book-page {
            box-sizing: border-box !important;
            width: 210mm !important;
            min-height: 285mm !important;
            overflow: visible !important;
            page-break-before: always !important;
            page-break-after: always !important;
            break-before: page !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            padding: 12mm 15mm !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .pdf-book-page-first {
            page-break-before: avoid !important;
            break-before: avoid !important;
          }
        }
      `}</style>

      <div className="bg-slate-900 text-slate-100 rounded-2xl sm:rounded-3xl max-w-5xl w-full p-2 sm:p-6 space-y-4 relative shadow-2xl my-1 sm:my-4 print:bg-white print:text-slate-900 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-none">
        
        {/* Interactive Control Toolbar */}
        <div className="space-y-3 print:hidden sticky top-0 bg-slate-900/95 backdrop-blur z-30 pt-1 pb-3 border-b border-slate-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-md shrink-0">
                <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-white font-serif flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span>Modul Ajar Cetak & Flipbook 3D (24 Halaman)</span>
                  <span className="text-[9px] sm:text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono font-bold uppercase shadow-xs">
                    E-MODUL LURING
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                  Persis dengan dokumen fisik A4. Dapat diunduh langsung sebagai file PDF / dicetak.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 ring-2 ring-amber-300/60 disabled:opacity-75 cursor-pointer"
                title="Langsung Download File PDF 24 Halaman Lengkap"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                    <span>MENGUNDUH FILE PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-950 animate-bounce" />
                    <span>📥 DOWNLOAD FILE PDF LANGSUNG (24 Hlm)</span>
                  </>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors shrink-0 border border-slate-700 cursor-pointer"
                title="Buka Dialog Cetak Browser"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 border border-slate-700 cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Controls Bar Row: Mode Switcher, Chapter Jump, Sound, Autoplay */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs pt-1">
            
            {/* View Mode Switcher */}
            <div className="sm:col-span-5 flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('flipbook')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'flipbook'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 Flipbook 3D Reader</span>
              </button>
              <button
                onClick={() => setViewMode('print')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'print'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>📄 Lihat Semua (A4)</span>
              </button>
            </div>

            {/* Jump To Chapter Selector */}
            <div className="sm:col-span-4 flex items-center bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
              <List className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
              <select
                value={currentPage}
                onChange={(e) => {
                  goToPage(Number(e.target.value));
                  setViewMode('flipbook');
                }}
                className="bg-transparent text-white text-xs font-medium focus:outline-none w-full cursor-pointer py-1"
              >
                {chapterList.map((ch) => (
                  <option key={ch.page} value={ch.page} className="bg-slate-900 text-white">
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Interactive Toggles: Sound & Autoplay */}
            <div className="sm:col-span-3 flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex-1 py-1 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  soundEnabled
                    ? 'bg-indigo-900 text-amber-300 border border-indigo-700'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title={soundEnabled ? 'Matikan Suara Kertas' : 'Aktifkan Suara Kertas'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Suara' : 'Mute'}</span>
              </button>

              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex-1 py-1 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  isAutoplay
                    ? 'bg-amber-400 text-slate-950 border border-amber-300 animate-pulse'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAutoplay ? 'Hentikan Putar Otomatis' : 'Putar Otomatis (4 Detik / Halaman)'}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoplay ? 'Autoplay' : 'Auto'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Flipbook Stage Wrapper */}
        <div className="relative w-full">
          
          {/* Direct Download Banner when in A4 View Mode */}
          {viewMode === 'print' && (
            <div className="mb-4 p-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-2xl text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl border-2 border-amber-300 print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 text-amber-300 rounded-xl shrink-0">
                  <Download className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base font-serif flex items-center gap-2">
                    <span>Dokumen A4 Lengkap (24 Halaman Berurutan)</span>
                    <span className="text-[10px] bg-slate-950 text-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">
                      VERSI LURING
                    </span>
                  </h4>
                  <p className="text-xs text-slate-900 font-medium">
                    Tampilan presisi siap cetak. Klik tombol di kanan untuk mengunduh langsung file PDF.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-5 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0 ring-2 ring-slate-900/50 cursor-pointer disabled:opacity-75"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>MENGUNDUH PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>📥 DOWNLOAD FILE PDF LANGSUNG (.PDF)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Floating Navigation Arrow - Left */}
          {viewMode === 'flipbook' && (
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 text-white hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl ring-2 ring-amber-400/40 print:hidden cursor-pointer"
              title="Halaman Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Navigation Arrow - Right */}
          {viewMode === 'flipbook' && (
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalBookPages}
              className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 text-white hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl ring-2 ring-amber-400/40 print:hidden cursor-pointer"
              title="Halaman Selanjutnya (Panah Kanan)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Book Frame Container */}
          <div className="relative bg-slate-950 p-1 sm:p-4 rounded-2xl border border-slate-800 shadow-2xl print:p-0 print:border-none print:shadow-none print:bg-white">
            
            {/* Spine Effect Overlay */}
            {viewMode === 'flipbook' && (
              <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-slate-950/40 via-slate-950/10 to-transparent z-20 border-r border-slate-700/20 print:hidden rounded-l-2xl" />
            )}

            {/* Document Printable Canvas Container */}
            <div 
              id="printable-emodul-document" 
              className="w-full bg-slate-100 print:bg-white p-2 sm:p-6 space-y-8 print:space-y-0 print:p-0"
            >

              {/* ==========================================
                  HALAMAN 1: COVER BUKU MODUL AJAR
                 ========================================== */}
              {isPageVisible(1) && (
                <div 
                  className="pdf-book-page pdf-book-page-first border-4 border-slate-900 p-6 sm:p-10 space-y-6 bg-white relative overflow-hidden my-4 print:my-0 shadow-xl print:shadow-none print:border-2"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  {/* Institution Header */}
                  <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4">
                    <span className="px-3 py-1 bg-slate-950 text-amber-300 font-mono font-black text-xs uppercase tracking-widest rounded inline-block shadow-xs">
                      UNIVERSITAS NEGERI JAKARTA
                    </span>
                    <p className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-slate-800">
                      Fakultas Ilmu Pendidikan • Program Studi Perpustakaan & Sains Informasi
                    </p>
                  </div>

                  {/* Main Title Section */}
                  <div className="space-y-4 text-center my-auto py-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-950 text-xs font-mono font-extrabold uppercase tracking-wide">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <span>MODUL AJAR LITERASI DIGITAL (EDISI LURING)</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-tight text-slate-950 leading-tight">
                      {adminConfig.moduleTitle || 'ETIKA INFORMASI'}
                    </h1>

                    <p className="text-sm font-medium text-slate-700 max-w-xl mx-auto leading-relaxed">
                      {adminConfig.moduleSubtitle || 'Panduan Penggunaan Informasi Beretika, Privasi Data SIBER, Penangkalan Hoaks, & Integritas Akademik Berbasis Generative AI'}
                    </p>

                    <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
                  </div>

                  {/* Metadata & Author Box */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-300 p-4 rounded-xl text-left font-sans text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Tim Penyusun & Peneliti:</span>
                      <p className="font-extrabold text-slate-900">{adminConfig.instructorName || 'Tim Dosen Pengampu & Peneliti UNJ'}</p>
                      <p className="text-[11px] text-slate-600">NIP / NIDN: {adminConfig.instructorNip || '198503122010121003'}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Target Pembelajar:</span>
                      <p className="font-bold text-slate-900">Mahasiswa & Praktisi Digital</p>
                      <p className="text-[11px] text-slate-600">Tahun Terbit: 2026 / 2027</p>
                    </div>
                  </div>

                  <PageFooter pageNum={1} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 2: KATA PENGANTAR & PROFIL MODUL
                 ========================================== */}
              {isPageVisible(2) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={2} title="BAGIAN I: KATA PENGANTAR & PROFIL MODUL" />

                  <div className="space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
                    <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                      Kata Pengantar
                    </h2>
                    <p>
                      Puji syukur kehadirat Tuhan Yang Maha Esa atas terbitnya <strong>E-Modul Ajar Luring Etika Informasi</strong> ini. Modul ini dirancang khusus untuk membekali mahasiswa dengan kecakapan literasi digital komprehensif di era transformasi kecerdasan buatan (Generative AI).
                    </p>
                    <p>
                      Etika informasi bukan sekadar konsep teoritis, melainkan fondasi moral dalam pencarian, evaluasi, penggunaan, dan penyebaran informasi secara akurat dan bertanggung jawab. Melalui modul ini, mahasiswa diajak memahami hak cipta, privasi data siber, verifikasi hoaks melalui metode SIFT, serta integritas akademik.
                    </p>

                    <div className="p-4 bg-slate-50 border-l-4 border-slate-900 rounded-r-xl space-y-2 my-2">
                      <h3 className="font-bold font-serif text-slate-950 text-xs uppercase tracking-wider">
                        Profil & Karakteristik Modul Ajar:
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                        <li><strong>Mata Kuliah:</strong> Literasi Informasi & Etika Digital (3 SKS)</li>
                        <li><strong>Pendekatan:</strong> Luring (Luar Jaringan) & Hybrid Interaktif</li>
                        <li><strong>Metode Pembelajaran:</strong> Case-Based Learning & SIFT Verification Lab</li>
                        <li><strong>Komposisi Halaman:</strong> 24 Halaman Berurutan Siap Cetak</li>
                      </ul>
                    </div>

                    <p className="italic text-slate-600 text-[11px]">
                      "Dengan etika informasi yang kuat, mahasiswa tidak hanya menjadi konsumen informasi yang kritis, tetapi juga pencipta karya ilmiah yang berintegritas tinggi."
                    </p>
                  </div>

                  <PageFooter pageNum={2} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 3: PETUNJUK PENGGUNAAN & ALUR LURING
                 ========================================== */}
              {isPageVisible(3) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={3} title="BAGIAN II: PETUNJUK PENGGUNAAN & ALUR PEMBELAJARAN" />

                  <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                    <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                      Petunjuk Penggunaan Modul Luring
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                        <span className="font-bold text-amber-950 text-xs flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-amber-800" />
                          <span>Bagi Mahasiswa:</span>
                        </span>
                        <ol className="list-decimal pl-4 space-y-0.5 text-[11px] text-slate-700">
                          <li>Bacalah setiap unit materi secara cermat.</li>
                          <li>Amati infografis & diagram penjelasan.</li>
                          <li>Kerjakan Latihan Kuis pada tiap akhir unit.</li>
                          <li>Cocokkan jawaban dengan Kunci Jawaban.</li>
                        </ol>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                        <span className="font-bold text-blue-950 text-xs flex items-center gap-1">
                          <UserCheck className="w-4 h-4 text-blue-800" />
                          <span>Bagi Dosen / Instruktur:</span>
                        </span>
                        <ol className="list-decimal pl-4 space-y-0.5 text-[11px] text-slate-700">
                          <li>Gunakan modul sebagai panduan tatap muka.</li>
                          <li>Fasilitasi diskusi studi kasus hoaks & AI.</li>
                          <li>Berikan instruksi evaluasi akhir (Post-Test).</li>
                          <li>Kumpulkan kuesioner evaluasi luring.</li>
                        </ol>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h3 className="font-bold font-serif text-slate-950 text-xs uppercase tracking-wider">
                        5 Alur Langkah Pembelajaran Luring:
                      </h3>
                      <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[10px]">
                        <div className="p-2 bg-slate-100 rounded border border-slate-300 font-bold">1. Apersepsi</div>
                        <div className="p-2 bg-slate-100 rounded border border-slate-300 font-bold">2. Eksplorasi</div>
                        <div className="p-2 bg-slate-100 rounded border border-slate-300 font-bold">3. Verifikasi</div>
                        <div className="p-2 bg-slate-100 rounded border border-slate-300 font-bold">4. Evaluasi</div>
                        <div className="p-2 bg-slate-100 rounded border border-slate-300 font-bold">5. Refleksi</div>
                      </div>
                    </div>
                  </div>

                  <PageFooter pageNum={3} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 4: PETA KONSEP PEMBELAJARAN & CPMK
                 ========================================== */}
              {isPageVisible(4) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={4} title="BAGIAN III: PETA KONSEP PEMBELAJARAN & CPMK" />

                  <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                    <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                      Peta Konsep & Capaian Pembelajaran
                    </h2>

                    {/* Conceptual Mindmap Tree Box */}
                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3">
                      <div className="text-center font-extrabold text-slate-950 text-xs uppercase bg-amber-300 p-1.5 rounded border border-slate-900 max-w-sm mx-auto shadow-xs">
                        ETIKA INFORMASI & LITERASI DIGITAL
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 bg-white rounded border border-slate-300 font-bold text-indigo-950">
                          BAB I & II<br/>
                          <span className="font-normal text-slate-600">Etika & Privasi Siber</span>
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-300 font-bold text-amber-950">
                          BAB III<br/>
                          <span className="font-normal text-slate-600">Metode SIFT & Cek Fakta</span>
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-300 font-bold text-blue-950">
                          BAB IV & V<br/>
                          <span className="font-normal text-slate-600">AI & Integritas Akademik</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h3 className="font-bold font-serif text-slate-950 text-xs uppercase tracking-wider">
                        Matriks Capaian Pembelajaran Mata Kuliah (CPMK):
                      </h3>
                      <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
                        <thead>
                          <tr className="bg-slate-900 text-white font-serif">
                            <th className="p-2 border border-slate-300 w-16">CPMK</th>
                            <th className="p-2 border border-slate-300">Deskripsi Capaian Pembelajaran</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="p-2 border border-slate-300 font-mono font-bold text-amber-800">CPMK-1</td>
                            <td className="p-2 border border-slate-300">Mampu menganalisis isu etika informasi dan privasi data siber secara kritis.</td>
                          </tr>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <td className="p-2 border border-slate-300 font-mono font-bold text-amber-800">CPMK-2</td>
                            <td className="p-2 border border-slate-300">Mampu mengaplikasikan teknik verifikasi SIFT untuk penangkalan disinformasi.</td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-slate-300 font-mono font-bold text-amber-800">CPMK-3</td>
                            <td className="p-2 border border-slate-300">Mampu menerapkan standar integritas akademik dan transparansi etika Generative AI.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <PageFooter pageNum={4} />
                </div>
              )}

              {/* ==========================================
                  PAGES 5 TO 19: 5 LEARNING UNITS (3 PAGES EACH)
                 ========================================== */}
              {units.map((unit, uIdx) => {
                const coverPageNum = 5 + (uIdx * 3);
                const materiPageNum = 6 + (uIdx * 3);
                const kuisPageNum = 7 + (uIdx * 3);

                return (
                  <React.Fragment key={unit.id}>
                    {/* ------------------------------------------
                        1. COVER BAB (PAGE 1 OF UNIT)
                       ------------------------------------------ */}
                    {isPageVisible(coverPageNum) && (
                      <div 
                        className="pdf-book-page border-4 border-slate-900 p-6 sm:p-10 space-y-6 bg-slate-950 text-white relative overflow-hidden my-4 print:my-0 shadow-xl print:shadow-none print:border-2"
                        style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                          <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black rounded uppercase">
                            BAB {uIdx + 1}
                          </span>
                          <span className="text-amber-300">HALAMAN {coverPageNum} / 24</span>
                        </div>

                        <div className="space-y-4 my-auto text-center py-6">
                          <h2 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-amber-300 leading-tight">
                            {unit.title}
                          </h2>
                          <p className="text-sm font-sans text-slate-300 max-w-xl mx-auto leading-relaxed">
                            {unit.description}
                          </p>
                          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-left font-sans text-xs">
                          <span className="font-mono text-[10px] text-amber-400 font-bold uppercase block">Indikator Keberhasilan Pembelajaran:</span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                            <li>Memahami konsep kunci {unit.title} secara komprehensif.</li>
                            <li>Mampu mengidentifikasi studi kasus konkret di lingkungan akademis.</li>
                            <li>Menyelesaikan Latihan Kuis Unit dengan nilai minimal 80.</li>
                          </ul>
                        </div>

                        <div className="border-t border-slate-800 pt-3 text-center font-mono text-[10px] text-slate-400">
                          E-Modul Luring UNJ • Bab {uIdx + 1}: {unit.title}
                        </div>
                      </div>
                    )}

                    {/* ------------------------------------------
                        2. MATERI & INFOGRAFIS (PAGE 2 OF UNIT)
                       ------------------------------------------ */}
                    {isPageVisible(materiPageNum) && (
                      <div 
                        className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                        style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                      >
                        <PageHeader pageNum={materiPageNum} title={`BAB ${uIdx + 1}: MATERI & INFOGRAFIS`} />

                        <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                          <h3 className="text-base font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                            Pembahasan Materi Pembelajaran Bab {uIdx + 1}
                          </h3>

                          <div className="prose text-xs text-slate-800 leading-relaxed max-w-none">
                            <p className="font-medium text-slate-900">
                              {unit.content.summary}
                            </p>
                          </div>

                          {/* Embedded Infographic Diagram */}
                          <UnitDiagramGraphics unitNumber={uIdx + 1} />

                          {/* Core Learning Points Box */}
                          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5">
                            <span className="font-bold font-serif text-amber-950 text-xs uppercase tracking-wider block">
                              📌 Poin Kunci Pembelajaran Bab {uIdx + 1}:
                            </span>
                            <ul className="list-disc pl-4 text-[11px] text-slate-800 space-y-1">
                              {unit.content.keyPoints?.map((kp, kIdx) => (
                                <li key={kIdx}><strong>{kp.title}:</strong> {kp.description}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <PageFooter pageNum={materiPageNum} />
                      </div>
                    )}

                    {/* ------------------------------------------
                        3. KUIS & KUNCI JAWABAN (PAGE 3 OF UNIT)
                       ------------------------------------------ */}
                    {isPageVisible(kuisPageNum) && (
                      <div 
                        className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                        style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                      >
                        <PageHeader pageNum={kuisPageNum} title={`BAB ${uIdx + 1}: LATIHAN KUIS & KUNCI JAWABAN`} />

                        <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                            <h3 className="text-base font-bold font-serif text-slate-950">
                              Latihan Kuis Bab {uIdx + 1}
                            </h3>
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                              {unit.quiz.length} Soal Pilihan Ganda
                            </span>
                          </div>

                          {/* Quiz Questions List */}
                          <div className="space-y-3">
                            {unit.quiz.map((q, qIdx) => (
                              <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                                <p className="font-bold text-slate-900 text-xs">
                                  {qIdx + 1}. {q.question}
                                </p>
                                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono pt-1">
                                  {q.options.map((opt, oIdx) => (
                                    <div 
                                      key={oIdx} 
                                      className={`p-1.5 rounded border ${
                                        oIdx === q.correctAnswerIndex 
                                          ? 'bg-amber-100 border-amber-400 font-bold text-slate-950' 
                                          : 'bg-white border-slate-300 text-slate-700'
                                      }`}
                                    >
                                      {optionLetters[oIdx]}. {opt}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Answer Key & Explanation Box */}
                          <div className="p-3 bg-slate-900 text-white rounded-xl space-y-2 mt-2">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                              <span className="font-bold font-serif text-amber-300 text-xs uppercase tracking-wider">
                                🔑 KUNCI JAWABAN & PEMBAHASAN BAB {uIdx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">PANDUAN EVALUASI</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              {unit.quiz.map((q, qIdx) => (
                                <div key={q.id} className="p-1.5 bg-slate-800 rounded border border-slate-700">
                                  <span className="text-amber-300 font-bold font-mono">Soal #{qIdx + 1}: Option {optionLetters[q.correctAnswerIndex]}</span>
                                  <p className="text-slate-300 line-clamp-1 mt-0.5">{q.explanation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <PageFooter pageNum={kuisPageNum} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* ==========================================
                  HALAMAN 20: POST-TEST EVALUASI AKHIR (SOAL 1 - 5)
                 ========================================== */}
              {isPageVisible(20) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={20} title="BAB VI: POST-TEST EVALUASI AKHIR (BAGIAN 1)" />

                  <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                    <div className="border-b border-slate-200 pb-2 space-y-1">
                      <h3 className="text-base font-bold font-serif text-slate-950">
                        Evaluasi Komprehensif (Soal #1 - #5)
                      </h3>
                      <p className="text-[11px] text-slate-600">
                        Petunjuk: Pilihlah satu jawaban yang paling tepat untuk mengukur pencapaian CPMK.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {defaultFinalQuestions.slice(0, 5).map((q, qIdx) => (
                        <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                          <p className="font-bold text-slate-900 text-xs">
                            {qIdx + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="p-1.5 bg-white border border-slate-300 rounded text-slate-800">
                                {optionLetters[oIdx]}. {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <PageFooter pageNum={20} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 21: POST-TEST EVALUASI AKHIR (SOAL 6 - 10)
                 ========================================== */}
              {isPageVisible(21) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={21} title="BAB VI: POST-TEST EVALUASI AKHIR (BAGIAN 2)" />

                  <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                    <div className="border-b border-slate-200 pb-2 space-y-1">
                      <h3 className="text-base font-bold font-serif text-slate-950">
                        Evaluasi Komprehensif (Soal #6 - #10) & Kunci Jawaban
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {defaultFinalQuestions.slice(5, 10).map((q, qIdx) => (
                        <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                          <p className="font-bold text-slate-900 text-xs">
                            {qIdx + 6}. {q.question}
                          </p>
                          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="p-1.5 bg-white border border-slate-300 rounded text-slate-800">
                                {optionLetters[oIdx]}. {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Master Answer Key Table for Post-Test */}
                    <div className="p-3 bg-slate-900 text-white rounded-xl space-y-2 mt-2">
                      <span className="font-bold font-serif text-amber-300 text-xs uppercase tracking-wider block border-b border-slate-800 pb-1">
                        🔑 KUNCI JAWABAN POST-TEST EVALUASI AKHIR (10 SOAL)
                      </span>
                      <div className="grid grid-cols-5 gap-2 text-[10px] font-mono text-center">
                        {defaultFinalQuestions.map((q, idx) => (
                          <div key={q.id} className="p-1 bg-slate-800 rounded border border-slate-700">
                            <span className="text-slate-400 block">Soal #{idx + 1}</span>
                            <span className="text-amber-300 font-bold">{optionLetters[q.correctAnswerIndex]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <PageFooter pageNum={21} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 22: LAMPIRAN VIDEO E-LEARNING & SIFT
                 ========================================== */}
              {isPageVisible(22) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={22} title="LAMPIRAN: VIDEO E-LEARNING & METODE SIFT" />

                  <div className="space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
                    <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                      Direktori Video Pembelajaran Interaktif
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-center">
                        <span className="font-bold text-slate-900 text-xs block">
                          🎥 Video Etika Informasi & Hak Cipta
                        </span>
                        <div className="p-2 bg-white rounded border border-slate-200 inline-block shadow-xs">
                          <QrCodeSvg value={`${currentOnlineUrl}#video-1`} size={80} />
                        </div>
                        <p className="text-[10px] text-slate-600 font-mono">Pindai QR Code untuk menonton video di web</p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-center">
                        <span className="font-bold text-slate-900 text-xs block">
                          🔬 Video SIFT Verification Lab
                        </span>
                        <div className="p-2 bg-white rounded border border-slate-200 inline-block shadow-xs">
                          <QrCodeSvg value={`${currentOnlineUrl}#sift-lab`} size={80} />
                        </div>
                        <p className="text-[10px] text-slate-600 font-mono">Pindai QR Code untuk simulasi praktikum</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                      <h3 className="font-bold font-serif text-amber-950 text-xs uppercase tracking-wider">
                        Panduan Ringkas Praktikum Metode SIFT:
                      </h3>
                      <ol className="list-decimal pl-4 text-[11px] text-slate-800 space-y-1">
                        <li><strong>Stop:</strong> Saat menemukan klaim provokatif, tahan emosi sebelum menyebarkan.</li>
                        <li><strong>Investigate the Source:</strong> Periksa latar belakang penulis & domain media.</li>
                        <li><strong>Find Better Coverage:</strong> Cari apakah media terpercaya lain melaporkan hal sama.</li>
                        <li><strong>Trace Claims:</strong> Lacak gambar asli menggunakan Google Reverse Image Search.</li>
                      </ol>
                    </div>
                  </div>

                  <PageFooter pageNum={22} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 23: KUESIONER EVALUASI LURING (BAGIAN 1)
                 ========================================== */}
              {isPageVisible(23) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={23} title="INSTRUMEN EVALUASI LURING (BAGIAN 1)" />

                  <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                    <div className="border-b border-slate-200 pb-2 space-y-1">
                      <h3 className="text-base font-bold font-serif text-slate-950">
                        Kuesioner Evaluasi Kelayakan E-Modul (Likert 1-5)
                      </h3>
                      <p className="text-[11px] text-slate-600">
                        Isilah angka 1 (Sangat Tidak Setuju) sampai 5 (Sangat Setuju) sesuai pengalaman Anda.
                      </p>
                    </div>

                    <table className="w-full text-left border-collapse border border-slate-300 text-[10px]">
                      <thead>
                        <tr className="bg-slate-900 text-white font-serif">
                          <th className="p-1.5 border border-slate-300 w-8 text-center">No</th>
                          <th className="p-1.5 border border-slate-300">Indikator Evaluasi Modul Luring</th>
                          <th className="p-1.5 border border-slate-300 w-20 text-center">Skala (1-5)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defaultLikertQuestions.slice(0, 8).map((q, idx) => (
                          <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-1.5 border border-slate-300 text-center font-mono font-bold">{idx + 1}</td>
                            <td className="p-1.5 border border-slate-300">{q.statement}</td>
                            <td className="p-1.5 border border-slate-300 text-center font-mono">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <PageFooter pageNum={23} />
                </div>
              )}

              {/* ==========================================
                  HALAMAN 24: KUESIONER EVALUASI LURING (BAGIAN 2)
                 ========================================== */}
              {isPageVisible(24) && (
                <div 
                  className="pdf-book-page border border-slate-300 p-6 sm:p-8 space-y-4 bg-white my-4 print:my-0 shadow-xl print:shadow-none"
                  style={{ minHeight: '285mm', boxSizing: 'border-box' }}
                >
                  <PageHeader pageNum={24} title="INSTRUMEN EVALUASI LURING (BAGIAN 2)" />

                  <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-sans">
                    <table className="w-full text-left border-collapse border border-slate-300 text-[10px]">
                      <thead>
                        <tr className="bg-slate-900 text-white font-serif">
                          <th className="p-1.5 border border-slate-300 w-8 text-center">No</th>
                          <th className="p-1.5 border border-slate-300">Indikator Evaluasi Modul Luring</th>
                          <th className="p-1.5 border border-slate-300 w-20 text-center">Skala (1-5)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defaultLikertQuestions.slice(8, 16).map((q, idx) => (
                          <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-1.5 border border-slate-300 text-center font-mono font-bold">{idx + 9}</td>
                            <td className="p-1.5 border border-slate-300">{q.statement}</td>
                            <td className="p-1.5 border border-slate-300 text-center font-mono">[ &nbsp;&nbsp;&nbsp;&nbsp; ]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="p-3 bg-slate-50 border border-slate-300 rounded-xl space-y-1">
                      <span className="font-bold text-slate-900 text-xs">Saran & Masukan Pengembangan Modul:</span>
                      <div className="h-16 border border-dashed border-slate-300 rounded bg-white p-2 text-[10px] text-slate-400">
                        (Tuliskan saran perbaikan di sini...)
                      </div>
                    </div>

                    {/* Signature & Confirmation Box */}
                    <div className="grid grid-cols-2 gap-4 pt-2 font-sans text-xs text-center">
                      <div className="space-y-8">
                        <p className="text-[11px] text-slate-600 font-mono">Mahasiswa / Responden</p>
                        <p className="font-bold border-b border-slate-400 w-36 mx-auto">( .................................... )</p>
                      </div>
                      <div className="space-y-8">
                        <p className="text-[11px] text-slate-600 font-mono">Dosen Pengampu / Instruktur</p>
                        <p className="font-bold border-b border-slate-400 w-36 mx-auto">( .................................... )</p>
                      </div>
                    </div>
                  </div>

                  <PageFooter pageNum={24} />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Navigation Control Bar (Flipbook Mode Only) */}
        {viewMode === 'flipbook' && (
          <div className="mt-4 flex items-center justify-between gap-4 max-w-4xl mx-auto print:hidden bg-slate-900/90 text-white p-3 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="text-center">
              <span className="text-xs font-mono font-bold text-amber-400 block">
                Halaman {currentPage} dari {totalBookPages}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Gunakan Tombol Panah Kiri/Kanan pada Keyboard
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalBookPages}
              className="px-4 py-2 bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Action Bar for A4 Mode */}
        {viewMode === 'print' && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto print:hidden bg-slate-900/90 text-white p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-medium text-slate-200">
                Menampilkan 24 Halaman A4 Modul Luring Lengkap
              </span>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-75 cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                  <span>MENGUNDUH FILE PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950 animate-bounce" />
                  <span>📥 DOWNLOAD FILE PDF LANGSUNG (.PDF)</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
