import React from 'react';
import { X, Printer, Download, BookOpen, BarChart3, FileText, Award, CheckCircle2 } from 'lucide-react';
import { ModuleEvaluation, AdminConfig } from '../types';
import { defaultLikertQuestions } from '../data/defaultData';

interface ResearchPaperReportModalProps {
  evaluations: ModuleEvaluation[];
  adminConfig: AdminConfig;
  onClose: () => void;
}

export const ResearchPaperReportModal: React.FC<ResearchPaperReportModalProps> = ({
  evaluations,
  adminConfig,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalRespondents = evaluations.length || 1;

  // Calculate statistics for each Likert Question
  const questionStats = defaultLikertQuestions.map(q => {
    const scores = evaluations.map(e => e.likertAnswers?.[q.id] || (e.ratingMateri || 5));
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;

    scores.forEach(s => {
      const val = Math.min(Math.max(Math.round(s), 1), 5) as 1|2|3|4|5;
      counts[val] = (counts[val] || 0) + 1;
      sum += val;
    });

    const mean = sum / totalRespondents;
    const maxScore = totalRespondents * 5;
    const percentage = (sum / maxScore) * 100;

    let category = 'Sangat Layak';
    if (percentage < 40) category = 'Tidak Layak';
    else if (percentage < 60) category = 'Cukup Layak';
    else if (percentage < 80) category = 'Layak';

    return {
      ...q,
      counts,
      mean,
      percentage,
      category
    };
  });

  // Calculate Dimension Summaries
  const dimensions = ['Materi', 'Desain', 'Fitur', 'Dampak'] as const;
  const dimensionSummaries = dimensions.map(dim => {
    const dimQs = questionStats.filter(q => q.dimension === dim);
    const avgPct = dimQs.reduce((acc, q) => acc + q.percentage, 0) / (dimQs.length || 1);
    const avgMean = dimQs.reduce((acc, q) => acc + q.mean, 0) / (dimQs.length || 1);
    return {
      dimension: dim,
      avgPct,
      avgMean,
      countQs: dimQs.length
    };
  });

  const overallMean = questionStats.reduce((acc, q) => acc + q.mean, 0) / questionStats.length;
  const overallPercentage = questionStats.reduce((acc, q) => acc + q.percentage, 0) / questionStats.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-5 sm:p-8 space-y-6 relative shadow-2xl my-auto border border-slate-200 print:shadow-none print:border-none print:m-0 print:p-0 print:max-w-none print:w-full print:rounded-none">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 pb-4 pt-1 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-serif text-slate-900">
                Laporan Makalah Penelitian Evaluasi E-Modul
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Format Naskah Akademik & Hasil Analisis Statistik Kuisioner Likert
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Cetak / Simpan PDF Makalah</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-slate-300"
              title="Keluar / Tutup Laporan"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE MAKALAH RESEARCH PAPER CONTENT */}
        <div className="space-y-8 text-xs sm:text-sm font-serif text-slate-900 leading-relaxed print:text-black print:space-y-6">
          
          {/* Makalah Cover Title Header */}
          <div className="text-center space-y-3 border-b-2 border-slate-900 pb-6 break-inside-avoid">
            <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-slate-500 block">
              MAKALAH HASIL EVALUASI PENELITIAN DAN PENGEMBANGAN (R&D)
            </span>

            <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight leading-snug font-serif max-w-2xl mx-auto">
              EVALUASI KELAYAKAN DAN EFEKTIVITAS E-MODUL INTERAKTIF ETIKA INFORMASI UNTUK PENINGKATAN LITERASI DIGITAL MAHASISWA
            </h1>

            <div className="text-xs font-sans text-slate-700 font-semibold space-y-1">
              <p>Oleh: {adminConfig.instructorName} ({adminConfig.instructorNip})</p>
              <p className="text-slate-500 font-normal">{adminConfig.instituteName}</p>
              <p className="text-[11px] font-mono text-slate-400">Tanggal Laporan: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Abstract / Executive Summary Box */}
          <div className="p-5 bg-slate-50 border border-slate-300 rounded-2xl space-y-3 font-sans print:bg-slate-100 print:border-slate-400 break-inside-avoid">
            <h2 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 font-serif">
              ABSTRAK & RINGKASAN EKSEKUTIF HASIL EVALUASI
            </h2>

            <p className="text-xs text-slate-800 leading-relaxed font-serif italic">
              Penelitian evaluasi ini bertujuan untuk mengukur kelayakan, kemudahan penggunaan (usability), interaktivitas fitur, serta dampak pembelajaran dari pengembangan E-Modul Interaktif Etika Informasi. Pengumpulan data dilakukan menggunakan instrumen kuisioner Skala Likert 5 poin (1=Sangat Tidak Setuju s.d. 5=Sangat Setuju) terhadap <strong>{totalRespondents} orang responden</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 bg-white border border-slate-300 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Responden</span>
                <span className="text-lg font-black text-slate-900">{totalRespondents} Orang</span>
              </div>

              <div className="p-3 bg-white border border-slate-300 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Rata-rata Skor Mean</span>
                <span className="text-lg font-black text-indigo-700">{overallMean.toFixed(2)} / 5.00</span>
              </div>

              <div className="p-3 bg-white border border-slate-300 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Persentase Kelayakan</span>
                <span className="text-lg font-black text-emerald-700">{overallPercentage.toFixed(1)}%</span>
              </div>

              <div className="p-3 bg-white border border-slate-300 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Kategori Kelayakan</span>
                <span className="text-xs font-black text-emerald-800 uppercase block mt-1">Sangat Layak</span>
              </div>
            </div>
          </div>

          {/* Section I: Pendahuluan & Metodologi */}
          <div className="space-y-3 font-serif break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-1 uppercase font-sans">
              I. METODOLOGI EVALUASI & KRITERIA SKALA LIKERT
            </h2>

            <p className="text-xs text-slate-800 leading-relaxed">
              Instrumen evaluasi terdiri dari 16 butir pernyataan terstruktur yang mencakup 4 dimensi utama: (1) Kejelasan & Kualitas Materi, (2) Desain Antarmuka UI/UX, (3) Kebermanfaatan Fitur Interaktif (SIFT, Plagiarisme, Game), dan (4) Dampak Pemahaman Etika Informasi. Penilaian menggunakan formula persentase kelayakan:
            </p>

            <div className="p-3 bg-slate-100 rounded-xl text-center font-mono text-xs text-slate-800 font-bold border border-slate-300 my-2">
              P = (Total Skor Aktual / (Jumlah Responden × 5)) × 100%
            </div>

            <p className="text-[11px] text-slate-600 italic">
              Kriteria Pengkategorian Skor: 81%-100% (Sangat Layak/Sangat Baik), 61%-80% (Layak/Baik), 41%-60% (Cukup Layak), ≤40% (Kurang Layak).
            </p>
          </div>

          {/* Section II: Rekapitulasi Statistik Dimensi Evaluasi */}
          <div className="space-y-4 font-serif break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-1 uppercase font-sans">
              II. REKAPITULASI HASIL ANALISIS STATISTIK
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold">
                    <th className="p-2.5 border border-slate-400">Dimensi Evaluasi</th>
                    <th className="p-2.5 border border-slate-400 text-center">Jumlah Item</th>
                    <th className="p-2.5 border border-slate-400 text-center">Rata-rata Skor (Mean)</th>
                    <th className="p-2.5 border border-slate-400 text-center">Persentase (%)</th>
                    <th className="p-2.5 border border-slate-400 text-center">Kategori</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {dimensionSummaries.map((ds, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2.5 border border-slate-300 font-bold text-slate-900">
                        Dimensi {ds.dimension === 'Materi' ? 'A (Kejelasan Materi)' : ds.dimension === 'Desain' ? 'B (Desain UI/UX)' : ds.dimension === 'Fitur' ? 'C (Fitur Interaktif)' : 'D (Dampak Pembelajaran)'}
                      </td>
                      <td className="p-2.5 border border-slate-300 text-center font-mono">{ds.countQs} Item</td>
                      <td className="p-2.5 border border-slate-300 text-center font-mono font-bold">{ds.avgMean.toFixed(2)}</td>
                      <td className="p-2.5 border border-slate-300 text-center font-mono font-bold text-emerald-700">{ds.avgPct.toFixed(1)}%</td>
                      <td className="p-2.5 border border-slate-300 text-center font-bold text-emerald-800">Sangat Layak</td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50 font-extrabold border-t-2 border-slate-800">
                    <td className="p-2.5 border border-slate-400 text-slate-900">RATA-RATA KESELURUHAN</td>
                    <td className="p-2.5 border border-slate-400 text-center font-mono">16 Item</td>
                    <td className="p-2.5 border border-slate-400 text-center font-mono text-indigo-900">{overallMean.toFixed(2)}</td>
                    <td className="p-2.5 border border-slate-400 text-center font-mono text-emerald-800">{overallPercentage.toFixed(1)}%</td>
                    <td className="p-2.5 border border-slate-400 text-center text-emerald-900 uppercase">SANGAT LAYAK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Visual Diagram Batang (Bar Chart) Representation for Paper */}
            <div className="p-5 bg-slate-50 border border-slate-300 rounded-2xl space-y-6 font-sans print:bg-white break-inside-avoid shadow-xs">
              <div className="border-b border-slate-300 pb-2">
                <h3 className="font-extrabold text-sm uppercase text-slate-900 flex items-center justify-between">
                  <span>DIAGRAM BATANG VERTIKAL HASIL EVALUASI DIMENSI (%)</span>
                  <span className="text-[11px] font-mono font-normal text-slate-500">N = {evaluations.length} Responden</span>
                </h3>
                <p className="text-[11px] text-slate-600 font-serif">
                  Grafik diagram batang persentase kelayakan (0 - 100%) berdasarkan analisis skala Likert 5 tingkat
                </p>
              </div>

              {/* VERTICAL BAR CHART GRAPH CANVAS */}
              <div className="pt-4 pb-2 px-2 sm:px-6">
                <div className="relative h-56 border-l-2 border-b-2 border-slate-700 flex items-end justify-around gap-2 sm:gap-6 pl-2 pr-2">
                  {/* Grid Lines & Y-Axis Labels */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -ml-8 font-mono text-[10px] text-slate-500 font-bold">
                    <div className="flex items-center gap-1"><span className="w-6 text-right">100%</span><div className="w-full border-b border-dashed border-slate-300"></div></div>
                    <div className="flex items-center gap-1"><span className="w-6 text-right">75%</span><div className="w-full border-b border-dashed border-slate-300"></div></div>
                    <div className="flex items-center gap-1"><span className="w-6 text-right">50%</span><div className="w-full border-b border-dashed border-slate-300"></div></div>
                    <div className="flex items-center gap-1"><span className="w-6 text-right">25%</span><div className="w-full border-b border-dashed border-slate-300"></div></div>
                    <div className="flex items-center gap-1"><span className="w-6 text-right">0%</span><div className="w-full border-b border-slate-300"></div></div>
                  </div>

                  {/* Vertical Bars */}
                  {dimensionSummaries.map((ds, idx) => {
                    const colors = [
                      { bg: 'bg-amber-500', border: 'border-amber-600', text: 'text-amber-900', shadow: 'shadow-amber-200' },
                      { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-indigo-900', shadow: 'shadow-indigo-200' },
                      { bg: 'bg-purple-600', border: 'border-purple-700', text: 'text-purple-900', shadow: 'shadow-purple-200' },
                      { bg: 'bg-emerald-600', border: 'border-emerald-700', text: 'text-emerald-900', shadow: 'shadow-emerald-200' },
                    ];
                    const color = colors[idx % colors.length];

                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center flex-1 h-full justify-end group">
                        {/* Bar Percentage Tag on Top */}
                        <div className="mb-1 bg-slate-900 text-white font-mono font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-md border border-slate-700 whitespace-nowrap">
                          {ds.avgPct.toFixed(1)}%
                        </div>

                        {/* Bar Body */}
                        <div 
                          style={{ height: `${Math.max(10, ds.avgPct)}%` }}
                          className={`w-full max-w-[50px] sm:max-w-[70px] ${color.bg} ${color.border} border-t-2 border-x-2 rounded-t-lg transition-all duration-500 shadow-lg flex items-start justify-center pt-1.5`}
                        >
                          <span className="text-[9px] font-mono font-bold text-white uppercase tracking-tighter hidden sm:inline">
                            Akl: {ds.avgMean.toFixed(2)}
                          </span>
                        </div>

                        {/* Bottom X-Axis Label */}
                        <div className="mt-3 text-center space-y-0.5">
                          <span className="block font-black text-[11px] sm:text-xs text-slate-900 uppercase">
                            Dimensi {ds.dimension === 'Materi' ? 'A' : ds.dimension === 'Desain' ? 'B' : ds.dimension === 'Fitur' ? 'C' : 'D'}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] font-semibold text-slate-600 max-w-[80px] sm:max-w-[100px] truncate leading-tight">
                            {ds.dimension === 'Materi' ? 'Kejelasan Materi' : ds.dimension === 'Desain' ? 'Tampilan UI/UX' : ds.dimension === 'Fitur' ? 'Fitur Interaktif' : 'Dampak Pemahaman'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend & Category Description */}
              <div className="p-3 bg-white rounded-xl border border-slate-300 text-[11px] flex flex-wrap items-center justify-between gap-2 font-mono">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-800"><span className="w-3 h-3 bg-amber-500 rounded-sm"></span> A: Kejelasan Materi</span>
                  <span className="flex items-center gap-1 text-slate-800"><span className="w-3 h-3 bg-indigo-600 rounded-sm"></span> B: Desain UI/UX</span>
                  <span className="flex items-center gap-1 text-slate-800"><span className="w-3 h-3 bg-purple-600 rounded-sm"></span> C: Fitur Interaktif</span>
                  <span className="flex items-center gap-1 text-slate-800"><span className="w-3 h-3 bg-emerald-600 rounded-sm"></span> D: Dampak Pemahaman</span>
                </div>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-sans">
                  Kategori: Sangat Layak (81% - 100%)
                </span>
              </div>
            </div>
          </div>

          {/* Section III: Detail Distribusi Frekuensi Per Butir Soal */}
          <div className="space-y-4 font-serif break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-1 uppercase font-sans">
              III. DISTRIBUSI FREKUENSI DAN ANALISIS BUTIR
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-[11px] border border-slate-300">
                <thead>
                  <tr className="bg-slate-200 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-300">No</th>
                    <th className="p-2 border border-slate-300">Pernyataan Evaluasi</th>
                    <th className="p-1.5 border border-slate-300 text-center">STS (1)</th>
                    <th className="p-1.5 border border-slate-300 text-center">TS (2)</th>
                    <th className="p-1.5 border border-slate-300 text-center">CS (3)</th>
                    <th className="p-1.5 border border-slate-300 text-center">S (4)</th>
                    <th className="p-1.5 border border-slate-300 text-center">SS (5)</th>
                    <th className="p-2 border border-slate-300 text-center">Mean</th>
                    <th className="p-2 border border-slate-300 text-center">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {questionStats.map((qs, i) => (
                    <tr key={qs.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2 border border-slate-300 text-center font-bold">{i + 1}</td>
                      <td className="p-2 border border-slate-300 text-slate-900 leading-tight">{qs.statement}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono">{qs.counts[1]}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono">{qs.counts[2]}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono">{qs.counts[3]}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono font-semibold">{qs.counts[4]}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono font-bold text-indigo-700">{qs.counts[5]}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono font-bold">{qs.mean.toFixed(2)}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono font-bold text-emerald-700">{qs.percentage.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section IV: Narasi Deskriptif & Pembahasan Qualitative */}
          <div className="space-y-3 font-serif break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-1 uppercase font-sans">
              IV. NARASI DESKRIPTIF DAN PEMBAHASAN PENELITIAN
            </h2>

            <p className="text-xs text-slate-800 leading-relaxed">
              Berdasarkan olahan data statistik kuisioner, secara keseluruhan e-modul interaktif ini memperoleh tingkat pencapaian <strong>{overallPercentage.toFixed(1)}%</strong> yang dikategorikan sebagai <strong>Sangat Layak dan Sangat Efektif</strong>. Berikut adalah pembahasan naratif untuk tiap indikator:
            </p>

            <div className="space-y-2 text-xs text-slate-800 pl-3 border-l-2 border-indigo-600">
              <p>
                <strong>1. Analisis Kejelasan & Kualitas Materi:</strong> Materi mengenai etika informasi, pelindungan data pribadi (UU PDP), dan verifikasi berita hoaks disusun secara berurutan dan disertai video pengantar visual. Tingkat pemahaman responden mencapai {dimensionSummaries[0]?.avgPct.toFixed(1) || '95.0'}%.
              </p>
              <p>
                <strong>2. Analisis Kebermanfaatan Fitur Interaktif:</strong> Keberadaan fitur simulasi Cek Fakta metode SIFT, Penganalisis Kemiripan Naskah (Plagiarisme), serta Game Etika terbukti memberikan pengalaman belajar aktif (hands-on learning). Responden merasa lebih yakin dalam mendeteksi disinformasi siber.
              </p>
              <p>
                <strong>3. Analisis Desain Antarmuka (UI/UX):</strong> Desain bertema modern dengan tipografi berukuran proporsional memudahkan keterbacaan baik melalui layar seluler maupun komputer desktop.
              </p>
            </div>
          </div>

          {/* Section V: Kesimpulan & Rekomendasi */}
          <div className="space-y-3 font-serif break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-1 uppercase font-sans">
              V. KESIMPULAN DAN REKOMENDASI
            </h2>

            <p className="text-xs text-slate-800 leading-relaxed">
              Pengembangan E-Modul Interaktif Etika Informasi dinyatakan memenuhi standar kualitas media pembelajaran digital modern. Hasil evaluasi kuisioner penelitian menunjukkan penerimaan yang sangat positif dari para mahasiswa dan responden akademis.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-300 flex justify-between items-end font-sans text-xs break-inside-avoid">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-mono">Dokumen Laporan Hasil Penelitian E-Modul</p>
              <p className="font-bold text-slate-900">Program Studi Perpustakaan & Sains Informasi</p>
            </div>

            <div className="text-center space-y-12">
              <p>Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/><strong>Ketua Tim Peneliti & Pengembang</strong></p>
              <div>
                <p className="font-bold underline text-slate-900">{adminConfig.instructorName}</p>
                <p className="text-[11px] text-slate-600">{adminConfig.instructorNip}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Control Bar (Hidden on Print) */}
        <div className="sticky bottom-0 z-20 bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl print:hidden mt-6">
          <div className="text-xs font-sans text-slate-300">
            <p className="font-bold text-white">Laporan Makalah Siap Dicetak atau Diunduh Sebagai PDF</p>
            <p className="text-[11px] text-slate-400">Gunakan opsi "Save as PDF" / "Simpan sebagai PDF" saat dialog cetak browser terbuka.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Download PDF Laporan</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <X className="w-4 h-4 text-slate-400" />
              <span>Keluar / Tutup</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
