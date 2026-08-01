import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  X, Printer, BookOpen, ShieldCheck, Award, ExternalLink, Download, Layers, 
  CheckCircle2, AlertTriangle, FileText, ChevronLeft, ChevronRight, 
  Volume2, VolumeX, Play, Pause, BookOpenCheck, List, Eye, Loader2, Sparkles,
  GraduationCap, UserCheck, HelpCircle, Check, FileCheck
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
  const [downloadProgress, setDownloadProgress] = useState<string>('');

  const printableRef = useRef<HTMLDivElement>(null);
  const totalBookPages = 24;
  const optionLetters = ['A', 'B', 'C', 'D'];

  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.5;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio fallback
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

  // Direct High-Quality PDF File Download using html2pdf
  const handleDownloadPdfFile = async () => {
    try {
      setIsGeneratingPdf(true);
      setDownloadProgress('Menyiapkan format dokumen A4...');
      
      const prevMode = viewMode;
      setViewMode('print');

      // Allow DOM to expand all 24 pages
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = document.getElementById('printable-emodul-document');
      if (!element) {
        setDownloadProgress('Membuka dialog cetak browser...');
        window.print();
        setIsGeneratingPdf(false);
        setViewMode(prevMode);
        return;
      }

      setDownloadProgress('Membuat file PDF A4...');

      const opt = {
        margin: [5, 5, 5, 5],
        filename: `E-Modul_Etika_Informasi_Luring_24Halaman_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          scrollY: 0,
          windowWidth: 1024
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      // @ts-ignore
      if (typeof html2pdf !== 'undefined') {
        // @ts-ignore
        await html2pdf().set(opt).from(element).save();
        setDownloadProgress('Pengunduhan berhasil!');
      } else {
        window.print();
      }
    } catch (error) {
      console.error('Download PDF error:', error);
      // Fallback to native print dialog which lets user "Save as PDF"
      window.print();
    } finally {
      setIsGeneratingPdf(false);
      setDownloadProgress('');
    }
  };

  const handleNativePrint = () => {
    const prevMode = viewMode;
    setViewMode('print');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Keyboard navigation
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
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, viewMode]);

  const chapterList = [
    { page: 1, title: 'Halaman 1: Sampul Utama E-Modul Luring' },
    { page: 2, title: 'Halaman 2: Kata Pengantar & Profil Pembelajaran' },
    { page: 3, title: 'Halaman 3: Petunjuk Penggunaan Modul Cetak' },
    { page: 4, title: 'Halaman 4: Peta Konsep & Capaian CPMK' },
    { page: 5, title: 'Halaman 5: BAB I Cover - Pengantar Etika Informasi' },
    { page: 6, title: 'Halaman 6: BAB I Materi Utama & Diagram' },
    { page: 7, title: 'Halaman 7: BAB I Latihan Kuis & Kunci Jawaban' },
    { page: 8, title: 'Halaman 8: BAB II Cover - Privasi & Keamanan Data' },
    { page: 9, title: 'Halaman 9: BAB II Materi Utama & Diagram' },
    { page: 10, title: 'Halaman 10: BAB II Latihan Kuis & Kunci Jawaban' },
    { page: 11, title: 'Halaman 11: BAB III Cover - Penangkalan Hoaks & SIFT' },
    { page: 12, title: 'Halaman 12: BAB III Materi Utama & Infografis SIFT' },
    { page: 13, title: 'Halaman 13: BAB III Latihan Kuis & Kunci Jawaban' },
    { page: 14, title: 'Halaman 14: BAB IV Cover - Literasi Digital AI' },
    { page: 15, title: 'Halaman 15: BAB IV Materi Utama & Matriks Etika AI' },
    { page: 16, title: 'Halaman 16: BAB IV Latihan Kuis & Kunci Jawaban' },
    { page: 17, title: 'Halaman 17: BAB V Cover - Integritas Akademik & Hak Cipta' },
    { page: 18, title: 'Halaman 18: BAB V Materi Utama & Pedoman Sitasi' },
    { page: 19, title: 'Halaman 19: BAB V Latihan Kuis & Kunci Jawaban' },
    { page: 20, title: 'Halaman 20: BAB VI Post-Test Evaluasi Akhir (Bagian 1)' },
    { page: 21, title: 'Halaman 21: BAB VI Post-Test Evaluasi Akhir (Bagian 2)' },
    { page: 22, title: 'Halaman 22: Lampiran Video Pembelajaran & QR Code' },
    { page: 23, title: 'Halaman 23: Lembar Kuesioner Evaluasi Luring (Bagian 1)' },
    { page: 24, title: 'Halaman 24: Lembar Kuesioner Evaluasi Luring (Bagian 2)' },
  ];

  const isPageVisible = (pageNumber: number) => {
    if (viewMode === 'print') return true;
    return currentPage === pageNumber;
  };

  const PageHeader: React.FC<{ pageNum: number; title: string }> = ({ pageNum, title }) => (
    <div className="border-b-2 border-slate-900 pb-2 mb-4 flex items-center justify-between text-xs font-mono text-slate-900 uppercase">
      <div className="flex items-center gap-2">
        <span className="font-black bg-amber-300 text-slate-950 px-2 py-0.5 rounded border border-slate-900">
          UNJ
        </span>
        <span className="font-serif font-bold text-slate-900 normal-case hidden sm:inline">
          {title}
        </span>
      </div>
      <span className="font-bold bg-slate-100 text-slate-900 px-2.5 py-0.5 rounded border border-slate-400">
        HALAMAN {pageNum} / 24
      </span>
    </div>
  );

  const PageFooter: React.FC<{ pageNum: number }> = ({ pageNum }) => (
    <div className="border-t border-slate-300 pt-2 mt-auto flex items-center justify-between text-[10px] text-slate-600 font-mono">
      <span>E-Modul Luring Literasi Digital & Etika Informasi</span>
      <span className="font-bold text-slate-900">FIP UNJ • Perpusinfo</span>
      <span>Hal. {pageNum}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex justify-center p-2 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      
      {/* Global CSS Print Rules */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
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
          .print\\:hidden, nav, header, button {
            display: none !important;
          }
          .fixed.inset-0 {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #printable-emodul-document {
            display: block !important;
            width: 100% !important;
            background: #ffffff !important;
          }
          .a4-page-sheet {
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 210mm !important;
            min-height: 275mm !important;
            page-break-before: always !important;
            page-break-after: always !important;
            break-before: page !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            padding: 10mm 12mm !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .a4-page-sheet-first {
            page-break-before: avoid !important;
            break-before: avoid !important;
          }
        }

        .a4-page-sheet {
          box-sizing: border-box;
          width: 100%;
          max-width: 210mm;
          min-height: 285mm;
          background: #ffffff;
          padding: 12mm 15mm;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          page-break-after: always;
          break-after: page;
          page-break-inside: avoid;
          break-inside: avoid;
        }
      `}</style>

      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-5xl w-full p-3 sm:p-6 space-y-4 relative shadow-2xl my-2 print:bg-white print:text-slate-900 print:shadow-none print:p-0">
        
        {/* Navigation & Action Bar Header */}
        <div className="space-y-3 print:hidden sticky top-0 bg-slate-900/95 backdrop-blur z-30 pb-3 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-md shrink-0">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white font-serif flex items-center gap-2">
                  <span>E-Modul Cetak Luring (24 Halaman)</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                    A4 BUKU LENGKAP
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Dokumen modul ajar resmi Universitas Negeri Jakarta siap cetak & download PDF
                </p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleDownloadPdfFile}
                disabled={isGeneratingPdf}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 border border-amber-300 disabled:opacity-75 cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                    <span>{downloadProgress || 'MENGUNDUH PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-950 animate-bounce" />
                    <span>📥 DOWNLOAD FILE PDF (24 Hlm)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNativePrint}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Cetak via Dialog Browser"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Cetak</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reader Toolbar: View Mode, Chapter Selector, Sound, Autoplay */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs pt-1">
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
                <span>📖 Flipbook Reader</span>
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
                <span>📄 Lihat Semua (24 Halaman)</span>
              </button>
            </div>

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

            <div className="sm:col-span-3 flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex-1 py-1 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  soundEnabled
                    ? 'bg-indigo-900 text-amber-300 border border-indigo-700'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Suara' : 'Mute'}</span>
              </button>

              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex-1 py-1 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                  isAutoplay
                    ? 'bg-amber-400 text-slate-950 border border-amber-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoplay ? 'Auto' : 'Play'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flipbook Container Stage */}
        <div className="relative w-full">
          
          {/* Direct Download Banner for A4 view */}
          {viewMode === 'print' && (
            <div className="mb-4 p-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-2xl text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl border-2 border-amber-300 print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 text-amber-300 rounded-xl shrink-0">
                  <Download className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base font-serif flex items-center gap-2">
                    <span>Modul Cetak Luring 24 Halaman Berurutan</span>
                    <span className="text-[10px] bg-slate-950 text-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">
                      SIAP UNDUH
                    </span>
                  </h4>
                  <p className="text-xs text-slate-900 font-medium">
                    Tampilan dokumen presisi A4. Klik tombol kanan untuk mengunduh langsung sebagai file PDF.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadPdfFile}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-5 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-75"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>MENGUNDUH PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>📥 DOWNLOAD FILE PDF LANGSUNG</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {viewMode === 'flipbook' && (
            <>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 text-white hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl ring-2 ring-amber-400/40 print:hidden cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalBookPages}
                className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 text-white hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl ring-2 ring-amber-400/40 print:hidden cursor-pointer"
                title="Halaman Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Printable Element Wrapper */}
          <div 
            id="printable-emodul-document" 
            ref={printableRef} 
            className="w-full bg-slate-200 print:bg-white p-2 sm:p-6 space-y-8 print:space-y-0 print:p-0 rounded-2xl print:rounded-none"
          >

            {/* ==========================================
                HALAMAN 1: SAMPUL UTAMA E-MODUL LURING
               ========================================== */}
            {isPageVisible(1) && (
              <div className="a4-page-sheet a4-page-sheet-first border-4 border-slate-900 p-8 space-y-6 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                {/* Institution Header */}
                <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4">
                  <span className="px-3 py-1 bg-slate-950 text-amber-300 font-mono font-black text-xs uppercase tracking-widest rounded inline-block">
                    UNIVERSITAS NEGERI JAKARTA
                  </span>
                  <p className="text-xs font-serif font-bold uppercase tracking-wider text-slate-800">
                    Fakultas Ilmu Pendidikan • Program Studi Perpustakaan & Sains Informasi
                  </p>
                </div>

                {/* Main Title Banner */}
                <div className="space-y-4 text-center my-auto py-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-950 text-xs font-mono font-extrabold uppercase">
                    <BookOpen className="w-4 h-4 text-amber-800" />
                    <span>MODUL AJAR LITERASI DIGITAL (EDISI LURING RESMI)</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-tight text-slate-950 leading-tight">
                    {adminConfig.moduleTitle || 'ETIKA INFORMASI'}
                  </h1>

                  <p className="text-sm font-medium text-slate-700 max-w-xl mx-auto leading-relaxed">
                    {adminConfig.moduleSubtitle || 'Panduan Penggunaan Informasi Beretika, Privasi Data SIBER, Penangkalan Hoaks, & Integritas Akademik Berbasis Generative AI'}
                  </p>

                  <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
                </div>

                {/* Metadata Box */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-300 p-4 rounded-xl text-left font-sans text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Tim Penyusun & Peneliti:</span>
                    <p className="font-extrabold text-slate-900">{adminConfig.instructorName || 'Tim Dosen Pengampu & Peneliti UNJ'}</p>
                    <p className="text-[11px] text-slate-600">NIP: {adminConfig.instructorNip || '198503122010121003'}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Target Pembelajar:</span>
                    <p className="font-bold text-slate-900">Mahasiswa & Civitas Akademika</p>
                    <p className="text-[11px] text-slate-600">Tahun Akademik: 2026 / 2027</p>
                  </div>
                </div>

                <PageFooter pageNum={1} />
              </div>
            )}

            {/* ==========================================
                HALAMAN 2: KATA PENGANTAR & PROFIL PEMBELAJARAN
               ========================================== */}
            {isPageVisible(2) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={2} title="BAGIAN I: KATA PENGANTAR & PROFIL PEMBELAJARAN" />

                <div className="space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Kata Pengantar
                  </h2>
                  <p>
                    Puji syukur kehadirat Tuhan Yang Maha Esa atas terbitnya <strong>E-Modul Ajar Luring Etika Informasi</strong> ini. Modul ini dirancang khusus untuk membekali mahasiswa dengan kecakapan literasi digital komprehensif di era transformasi kecerdasan buatan (Generative AI).
                  </p>
                  <p>
                    Etika informasi merupakan fondasi moral utama dalam pencarian, evaluasi, penggunaan, dan penyebaran informasi secara akurat dan bertanggung jawab. Melalui modul ini, mahasiswa diajak memahami hak cipta, privasi data siber, verifikasi hoaks melalui metode SIFT, serta integritas akademik.
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
                HALAMAN 3: PETUNJUK PENGGUNAAN MODUL CETAK
               ========================================== */}
            {isPageVisible(3) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={3} title="BAGIAN II: PETUNJUK PENGGUNAAN MODUL CETAK" />

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
                HALAMAN 4: PETA KONSEP & CAPAIAN CPMK
               ========================================== */}
            {isPageVisible(4) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={4} title="BAGIAN III: PETA KONSEP & CAPAIAN CPMK" />

                <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Peta Konsep & Capaian Pembelajaran
                  </h2>

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
                HALAMAN 5 SAMPAI 19: 5 UNIT PEMBELAJARAN (3 HALAMAN PER UNIT)
               ========================================== */}
            {units.map((unit, uIdx) => {
              const coverPageNum = 5 + (uIdx * 3);
              const materiPageNum = 6 + (uIdx * 3);
              const kuisPageNum = 7 + (uIdx * 3);

              return (
                <React.Fragment key={unit.id}>
                  {/* COVER BAB */}
                  {isPageVisible(coverPageNum) && (
                    <div className="a4-page-sheet border-4 border-slate-900 p-8 space-y-6 bg-slate-950 text-white shadow-xl print:shadow-none my-4 print:my-0">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                        <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black rounded uppercase">
                          BAB {uIdx + 1}
                        </span>
                        <span className="text-amber-300">HALAMAN {coverPageNum} / 24</span>
                      </div>

                      <div className="space-y-4 my-auto py-8">
                        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block font-bold">
                          UNIT LEARNING MODULE #{uIdx + 1}
                        </span>
                        <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-white leading-tight border-b border-amber-400/40 pb-3">
                          {unit.title}
                        </h2>
                        <p className="text-sm text-slate-300 leading-relaxed font-sans">
                          {unit.subtitle}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs font-sans">
                        <span className="font-mono text-amber-400 uppercase text-[10px] block font-bold">Capaian Pembelajaran Khusus (CPMK):</span>
                        <p className="text-slate-200 font-medium">{unit.cpmk}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                          <span>Estimasi Durasi: {unit.duration}</span>
                          <span>Format: Luring & Cetak</span>
                        </div>
                      </div>

                      <PageFooter pageNum={coverPageNum} />
                    </div>
                  )}

                  {/* MATERI BAB */}
                  {isPageVisible(materiPageNum) && (
                    <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                      <PageHeader pageNum={materiPageNum} title={`BAB ${uIdx + 1}: MATERI URAIAN & INFOGRAFIS`} />

                      <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-base font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                          Uraian Konsep Utama Unit {uIdx + 1}
                        </h3>

                        <p className="text-slate-700 font-serif leading-relaxed text-justify">
                          {unit.overview}
                        </p>

                        <div className="space-y-2 pt-1">
                          <h4 className="font-bold font-serif text-slate-950 text-xs uppercase tracking-wider">
                            Poin-Poin Kunci Materi:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            {unit.materials.map((mat, mIdx) => (
                              <div key={mIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                                <span className="font-bold text-slate-900 block font-serif">
                                  {mIdx + 1}. {mat.title}
                                </span>
                                <p className="text-slate-600 line-clamp-3 text-[10px]">{mat.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Infographic summary card */}
                        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-1 text-[11px] text-amber-950">
                          <span className="font-bold uppercase tracking-wider block font-mono text-[10px] text-amber-900">
                            💡 RANGKUMAN ETIS BAB {uIdx + 1}:
                          </span>
                          <p className="font-serif">
                            Penerapan konsep etika pada bab ini wajib mengedepankan prinsip kebenaran fakta, tanggung jawab moral, serta asas keadilan bagi seluruh pengguna informasi siber.
                          </p>
                        </div>
                      </div>

                      <PageFooter pageNum={materiPageNum} />
                    </div>
                  )}

                  {/* KUIS BAB */}
                  {isPageVisible(kuisPageNum) && (
                    <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                      <PageHeader pageNum={kuisPageNum} title={`BAB ${uIdx + 1}: LATIHAN KUIS & KUNCI JAWABAN`} />

                      <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-base font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                          Latihan Kuis Pemahaman Unit {uIdx + 1}
                        </h3>

                        <div className="space-y-3">
                          {unit.quiz.map((q, qIdx) => (
                            <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                              <p className="font-bold text-slate-900 text-xs">
                                Soal #{qIdx + 1}: {q.question}
                              </p>

                              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                                {q.options.map((opt, oIdx) => (
                                  <div 
                                    key={oIdx} 
                                    className={`p-1.5 rounded border ${
                                      oIdx === q.correctAnswerIndex 
                                        ? 'bg-amber-100 border-amber-400 font-bold text-slate-950' 
                                        : 'bg-white border-slate-300 text-slate-700'
                                    }`}
                                  >
                                    <span className="font-mono text-slate-500 mr-1">{optionLetters[oIdx]}.</span>
                                    <span>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1.5 mt-2">
                          <span className="font-bold text-amber-300 uppercase font-mono text-[10px] block">
                            🔑 KUNCI JAWABAN & PEMBAHASAN UNIT {uIdx + 1}:
                          </span>
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
                HALAMAN 20 & 21: POST-TEST EVALUASI AKHIR
               ========================================== */}
            {isPageVisible(20) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={20} title="BAB VI: EVALUASI AKHIR (POST-TEST) - BAGIAN 1" />

                <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Ujian Akhir Literasi Digital (Soal #1 - #5)
                  </h2>

                  <p className="text-slate-600 text-[11px] font-sans">
                    Petunjuk: Pilih satu jawaban yang paling tepat pada setiap pertanyaan berikut.
                  </p>

                  <div className="space-y-3">
                    {defaultFinalQuestions.slice(0, 5).map((q, idx) => (
                      <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                        <p className="font-bold text-slate-900 text-xs">
                          {idx + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="p-1 bg-white rounded border border-slate-200 text-slate-700">
                              <span className="font-mono text-slate-500 mr-1">{optionLetters[oIdx]}.</span>
                              <span>{opt}</span>
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

            {isPageVisible(21) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={21} title="BAB VI: EVALUASI AKHIR (POST-TEST) - BAGIAN 2" />

                <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Ujian Akhir Literasi Digital (Soal #6 - #10)
                  </h2>

                  <div className="space-y-3">
                    {defaultFinalQuestions.slice(5, 10).map((q, idx) => (
                      <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                        <p className="font-bold text-slate-900 text-xs">
                          {idx + 6}. {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="p-1 bg-white rounded border border-slate-200 text-slate-700">
                              <span className="font-mono text-slate-500 mr-1">{optionLetters[oIdx]}.</span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1.5 mt-2">
                    <span className="font-bold text-amber-300 uppercase font-mono text-[10px] block">
                      🔑 KUNCI JAWABAN RESMI POST-TEST:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
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
                HALAMAN 22: LAMPIRAN VIDEO & QR CODE
               ========================================== */}
            {isPageVisible(22) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={22} title="LAMPIRAN: VIDEO PEMBELAJARAN & AKSELERASI SIFT" />

                <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Akses Video Pembelajaran & Lab SIFT
                  </h2>

                  <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1 font-sans">
                      <span className="font-extrabold text-slate-900 text-xs block font-serif">
                        Akses Portal Interaktif E-Modul Online:
                      </span>
                      <p className="text-[11px] text-slate-600">
                        Pindai kode QR di sebelah kanan untuk mengakses video pembelajaran multimedia, lab verifikasi SIFT interaktif, serta ujian online dengan sertifikat otomatis.
                      </p>
                      <span className="font-mono text-[10px] text-indigo-900 font-bold block pt-1">
                        URL: https://e-modul-etika-informasi.com
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded-xl border border-slate-300 shadow-sm shrink-0">
                      <QrCodeSvg value="https://e-modul-etika-informasi.com" size={90} />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                    <h3 className="font-bold text-amber-950 text-xs uppercase font-serif">
                      Panduan Praktik Mandiri Luring:
                    </h3>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                      <li>Lakukan penelusuran fakta balik (Trace) terhadap berita meragukan.</li>
                      <li>Periksa hak cipta dan lisensi gambar sebelum digunakan pada tugas ilmiah.</li>
                      <li>Gunakan AI hanya sebagai asisten riset awal, bukan pembuat karya penuh.</li>
                    </ul>
                  </div>
                </div>

                <PageFooter pageNum={22} />
              </div>
            )}

            {/* ==========================================
                HALAMAN 23 & 24: LEMBAR KUESIONER EVALUASI LURING
               ========================================== */}
            {isPageVisible(23) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={23} title="BAGIAN VII: KUESIONER EVALUASI LURING - BAGIAN 1" />

                <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Lembar Penilaian Kelayakan E-Modul (Item #1 - #8)
                  </h2>

                  <p className="text-slate-600 text-[11px]">
                    Petunjuk: Berikan tanda silang (X) atau ceklis (✓) pada skala 1 - 5 (1: Sangat Tidak Setuju, 5: Sangat Setuju).
                  </p>

                  <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-white font-serif">
                        <th className="p-2 border border-slate-300 w-8 text-center">No</th>
                        <th className="p-2 border border-slate-300">Pernyataan Evaluasi E-Modul</th>
                        <th className="p-2 border border-slate-300 w-24 text-center">Skala (1-5)</th>
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

            {isPageVisible(24) && (
              <div className="a4-page-sheet border border-slate-300 p-8 space-y-4 bg-white shadow-xl print:shadow-none my-4 print:my-0">
                <PageHeader pageNum={24} title="BAGIAN VII: KUESIONER EVALUASI LURING - BAGIAN 2" />

                <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
                  <h2 className="text-lg font-bold font-serif text-slate-950 border-b border-slate-200 pb-1">
                    Lembar Penilaian Kelayakan E-Modul (Item #9 - #16)
                  </h2>

                  <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-white font-serif">
                        <th className="p-2 border border-slate-300 w-8 text-center">No</th>
                        <th className="p-2 border border-slate-300">Pernyataan Evaluasi E-Modul</th>
                        <th className="p-2 border border-slate-300 w-24 text-center">Skala (1-5)</th>
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

                  {/* Student Signature Box */}
                  <div className="grid grid-cols-2 gap-4 border border-slate-300 p-4 rounded-xl mt-4 bg-slate-50">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-slate-900 block font-serif">Identitas Responden:</span>
                      <p>Nama: {profile.fullName || '...........................................'}</p>
                      <p>NIM: {profile.studentId || '...........................................'}</p>
                      <p>Prodi: {profile.studyProgram || '...........................................'}</p>
                    </div>
                    <div className="text-center space-y-8 text-xs font-sans">
                      <p>Jakarta, .............................. 2026</p>
                      <p className="font-bold border-b border-slate-400 w-32 mx-auto pb-1">
                        ( Tanda Tangan )
                      </p>
                    </div>
                  </div>
                </div>

                <PageFooter pageNum={24} />
              </div>
            )}

          </div>
        </div>

        {/* Footer Navigation Bar for A4 Mode */}
        {viewMode === 'print' && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-medium text-slate-200">
                Menampilkan Dokumen A4 Lengkap 24 Halaman Berurutan
              </span>
            </div>
            <button
              onClick={handleDownloadPdfFile}
              disabled={isGeneratingPdf}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-75 cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                  <span>{downloadProgress || 'MENGUNDUH FILE PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950 animate-bounce" />
                  <span>📥 DOWNLOAD FILE PDF LANGSUNG (24 Hlm)</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
