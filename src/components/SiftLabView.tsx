import React, { useState } from 'react';
import { SIFTCase, ProgressState } from '../types';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, HelpCircle, ExternalLink, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface SiftLabViewProps {
  cases: SIFTCase[];
  progress: ProgressState;
  onSaveProgress: (updated: ProgressState) => void;
}

export const SiftLabView: React.FC<SiftLabViewProps> = ({
  cases,
  progress,
  onSaveProgress
}) => {
  const [selectedCase, setSelectedCase] = useState<SIFTCase>(cases[0]);
  const [activeStepTab, setActiveStepTab] = useState<'stop' | 'investigate' | 'findCoverage' | 'trace'>('stop');

  // Custom Verification Form
  const [customTitle, setCustomTitle] = useState('');
  const [customSource, setCustomSource] = useState('');
  const [customText, setCustomText] = useState('');
  const [analyzingCustom, setAnalyzingCustom] = useState(false);
  const [customResult, setCustomResult] = useState<any>(null);

  const handleCompleteCase = (caseId: string) => {
    if (!progress.siftsCompleted.includes(caseId)) {
      const updatedSifts = [...progress.siftsCompleted, caseId];
      onSaveProgress({ ...progress, siftsCompleted: updatedSifts });
    }
  };

  const handleRunAiFactCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText || customText.trim().length < 5) return;

    setAnalyzingCustom(true);
    setCustomResult(null);

    try {
      const res = await fetch('/api/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle,
          source: customSource,
          text: customText
        })
      });
      const data = await res.json();
      setCustomResult(data);
    } catch (err) {
      setCustomResult({
        verdict: 'Perlu Konteks Tambahan',
        confidence: 80,
        siftSteps: {
          stop: 'Lakukan jeda. Periksa apakah teks menggunakan diksi provokatif.',
          investigate: 'Cari kepemilikan domain dan rekam jejak situs.',
          findCoverage: 'Bandingkan laporan dengan media arus utama terpercaya.',
          trace: 'Lacak gambar atau dokumen pendukung ke sumber pertamanya.'
        },
        explanation: 'Gagal menghubungkan ke server AI. Gunakan panduan 4 langkah SIFT di atas untuk verifikasi mandiri.'
      });
    } finally {
      setAnalyzingCustom(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-3 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold w-fit backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Lab Interaktif Cek Fakta</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Verifikasi Hoaks & Metode SIFT
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Gunakan kerangka SIFT (Stop, Investigate the source, Find better coverage, Trace claims) untuk membedakan berita asli, hoaks, dan misinformasi.
        </p>

        {/* 4 SIFT Pillar Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs font-semibold">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-rose-300 backdrop-blur-md">
            <strong>S - STOP</strong>
            <span className="block text-[10px] text-slate-400 font-normal">Tahan emosi & tidak langsung share</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-amber-300 backdrop-blur-md">
            <strong>I - INVESTIGATE</strong>
            <span className="block text-[10px] text-slate-400 font-normal">Periksa rekam jejak sumber</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-blue-300 backdrop-blur-md">
            <strong>F - FIND COVERAGE</strong>
            <span className="block text-[10px] text-slate-400 font-normal">Cari pembanding media terpercaya</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-emerald-300 backdrop-blur-md">
            <strong>T - TRACE CLAIMS</strong>
            <span className="block text-[10px] text-slate-400 font-normal">Lacak ke konteks & gambar asli</span>
          </div>
        </div>
      </div>

      {/* Preset Case Studies Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Studi Kasus Verifikasi Berita Popular</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Kasus Diselesaikan: {progress.siftsCompleted.length}/{cases.length}
          </span>
        </div>

        {/* Case Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cases.map((c) => {
            const isSelected = selectedCase.id === c.id;
            const isDone = progress.siftsCompleted.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-4 rounded-2xl border text-left transition-all backdrop-blur-xl ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px] font-bold border border-white/10">
                    {c.category}
                  </span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <h4 className="font-bold text-xs line-clamp-2 leading-snug">{c.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Selected Case Analysis Interactive Board */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                Kategori: {selectedCase.category}
              </span>
              <span className="text-xs text-slate-400">• Sumber: {selectedCase.source}</span>
            </div>
            <h4 className="font-bold text-white text-base sm:text-lg">{selectedCase.title}</h4>
            <div className="p-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-slate-200 text-xs italic backdrop-blur-md">
              "{selectedCase.text}"
            </div>
          </div>

          {/* SIFT Interactive Step Navigator */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveStepTab('stop')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStepTab === 'stop' ? 'bg-rose-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                1. STOP
              </button>
              <button
                onClick={() => setActiveStepTab('investigate')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStepTab === 'investigate' ? 'bg-amber-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                2. INVESTIGATE
              </button>
              <button
                onClick={() => setActiveStepTab('findCoverage')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStepTab === 'findCoverage' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                3. FIND COVERAGE
              </button>
              <button
                onClick={() => setActiveStepTab('trace')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStepTab === 'trace' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                4. TRACE CLAIMS
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-slate-200 text-xs leading-relaxed backdrop-blur-md">
              {activeStepTab === 'stop' && (
                <div>
                  <strong className="block text-rose-400 font-bold mb-1">Langkah 1: STOP (Jeda Emosi)</strong>
                  <p>{selectedCase.steps.stop}</p>
                </div>
              )}
              {activeStepTab === 'investigate' && (
                <div>
                  <strong className="block text-amber-400 font-bold mb-1">Langkah 2: INVESTIGATE (Periksa Sumber)</strong>
                  <p>{selectedCase.steps.investigate}</p>
                </div>
              )}
              {activeStepTab === 'findCoverage' && (
                <div>
                  <strong className="block text-blue-400 font-bold mb-1">Langkah 3: FIND COVERAGE (Cari Pembanding)</strong>
                  <p>{selectedCase.steps.findCoverage}</p>
                </div>
              )}
              {activeStepTab === 'trace' && (
                <div>
                  <strong className="block text-emerald-400 font-bold mb-1">Langkah 4: TRACE CLAIMS (Lacak Konteks Asli)</strong>
                  <p>{selectedCase.steps.trace}</p>
                </div>
              )}
            </div>
          </div>

          {/* Verdict Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/15 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Hasil Kesimpulan Verifikasi:</span>
              <span className={`text-lg font-black ${
                selectedCase.verdict === 'Hoaks' ? 'text-rose-400' :
                selectedCase.verdict === 'Fakta' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {selectedCase.verdict.toUpperCase()}
              </span>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{selectedCase.explanation}</p>
            </div>

            <button
              onClick={() => handleCompleteCase(selectedCase.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md ${
                progress.siftsCompleted.includes(selectedCase.id)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg border border-blue-400/30'
              }`}
            >
              {progress.siftsCompleted.includes(selectedCase.id) ? '✓ Selesai Dipelajari' : 'Tandai Kasus Selesai'}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Fact-Checking Tool with AI */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white text-base sm:text-lg">Alat Verifikasi Klaim Mandiri (AI SIFT Assistant)</h3>
        </div>

        <form onSubmit={handleRunAiFactCheck} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Judul / Subjek Berita</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Contoh: Klaim Bantuan Bansos Rp 5 Juta"
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 backdrop-blur-md"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sumber Pesan / Link</label>
              <input
                type="text"
                value={customSource}
                onChange={(e) => setCustomSource(e.target.value)}
                placeholder="Contoh: Pesan Broadcast WhatsApp / Facebook"
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 backdrop-blur-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Teks Kutipan / Berita Yang Ingin Diperiksa *</label>
            <textarea
              rows={3}
              required
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Tempelkan paragraf berita atau pesan klaim yang mencurigakan di sini..."
              className="w-full p-3.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 backdrop-blur-md"
            />
          </div>

          <button
            type="submit"
            disabled={analyzingCustom || !customText}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 border border-purple-400/30 transition-all disabled:opacity-50"
          >
            {analyzingCustom ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{analyzingCustom ? 'Sedang Memeriksa Metode SIFT...' : 'Uji Klaim Dengan AI SIFT'}</span>
          </button>
        </form>

        {/* AI Result Card */}
        {customResult && (
          <div className="p-5 rounded-xl bg-purple-500/15 border border-purple-400/30 space-y-4 text-xs text-purple-200 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-purple-400/30 pb-3">
              <span className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Hasil Analisis SIFT</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-900/90 border border-purple-400/40 text-white font-black text-xs">
                {customResult.verdict} ({customResult.confidence}% Keyakinan)
              </span>
            </div>

            {customResult.siftSteps && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10">
                  <strong className="text-rose-400 block mb-0.5">S - Stop:</strong>
                  <p>{customResult.siftSteps.stop}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10">
                  <strong className="text-amber-400 block mb-0.5">I - Investigate:</strong>
                  <p>{customResult.siftSteps.investigate}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10">
                  <strong className="text-blue-400 block mb-0.5">F - Find Coverage:</strong>
                  <p>{customResult.siftSteps.findCoverage}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10">
                  <strong className="text-emerald-400 block mb-0.5">T - Trace Claims:</strong>
                  <p>{customResult.siftSteps.trace}</p>
                </div>
              </div>
            )}

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-white/10 text-slate-200 leading-relaxed">
              <strong className="block text-purple-300 mb-1 font-bold">Rekomendasi Penjelasan:</strong>
              <p className="whitespace-pre-line">{customResult.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
