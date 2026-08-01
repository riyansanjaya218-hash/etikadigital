import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, ClipboardCheck, Award } from 'lucide-react';
import { ModuleEvaluation, StudentProfile } from '../types';
import { defaultLikertQuestions } from '../data/defaultData';
import { saveStoredEvaluation } from '../utils/storage';

interface ModuleEvaluationModalProps {
  profile: StudentProfile;
  onClose: () => void;
  onSuccessSubmitted?: () => void;
}

export const ModuleEvaluationModal: React.FC<ModuleEvaluationModalProps> = ({ profile, onClose, onSuccessSubmitted }) => {
  // Respondent Demographics state
  const [nama, setNama] = useState(profile.nama || '');
  const [nim, setNim] = useState(profile.nim || '');
  const [jenisKelamin, setJenisKelamin] = useState(profile.jenisKelamin || 'Pria');
  const [pekerjaan, setPekerjaan] = useState(profile.pekerjaan || '');
  const [instansi, setInstansi] = useState(profile.instansi || '');

  // Likert scale state: start empty so respondent fills out from scratch
  const [likertAnswers, setLikertAnswers] = useState<Record<string, number>>({});

  const [feedbackFitur, setFeedbackFitur] = useState('');
  const [feedbackSistem, setFeedbackSistem] = useState('');
  const [feedbackMateri, setFeedbackMateri] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleLikertChange = (qId: string, val: number) => {
    setLikertAnswers(prev => ({ ...prev, [qId]: val }));
    if (validationError) setValidationError(null);
  };

  const handleResetForm = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan seluruh jawaban kuisioner ini?')) {
      setLikertAnswers({});
      setFeedbackFitur('');
      setFeedbackSistem('');
      setFeedbackMateri('');
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const totalQuestions = defaultLikertQuestions.length;
    const answeredCount = Object.keys(likertAnswers).length;

    if (answeredCount < totalQuestions) {
      setValidationError(`Mohon lengkapi seluruh ${totalQuestions} pernyataan kuisioner sebelum mengirimkan data. (Saat ini terisi: ${answeredCount}/${totalQuestions})`);
      return;
    }

    // Calculate sub-ratings based on Likert answers
    const materiQs = defaultLikertQuestions.filter(q => q.dimension === 'Materi').map(q => likertAnswers[q.id] || 0);
    const desainQs = defaultLikertQuestions.filter(q => q.dimension === 'Desain').map(q => likertAnswers[q.id] || 0);
    const fiturQs = defaultLikertQuestions.filter(q => q.dimension === 'Fitur').map(q => likertAnswers[q.id] || 0);

    const avgMateri = Math.round((materiQs.reduce((a, b) => a + b, 0) / (materiQs.length || 1)) * 10) / 10;
    const avgSistem = Math.round((desainQs.reduce((a, b) => a + b, 0) / (desainQs.length || 1)) * 10) / 10;
    const avgFitur = Math.round((fiturQs.reduce((a, b) => a + b, 0) / (fiturQs.length || 1)) * 10) / 10;

    const evaluationData: ModuleEvaluation = {
      id: 'eval-' + Date.now(),
      studentName: nama.trim() || 'Peserta Literasi',
      studentNim: nim.trim() || '-',
      jenisKelamin,
      pekerjaan: pekerjaan.trim() || 'Peserta',
      instansi: instansi.trim() || '-',
      ratingFitur: avgFitur,
      ratingSistem: avgSistem,
      ratingMateri: avgMateri,
      likertAnswers,
      feedbackFitur: feedbackFitur.trim() || '-',
      feedbackSistem: feedbackSistem.trim() || '-',
      feedbackMateri: feedbackMateri.trim() || '-',
      submittedAt: new Date().toISOString()
    };

    saveStoredEvaluation(evaluationData);
    if (onSuccessSubmitted) {
      onSuccessSubmitted();
    }
    setSubmitted(true);
  };

  // Group questions by dimension
  const dimensions: { name: 'Materi' | 'Desain' | 'Fitur' | 'Dampak'; label: string; desc: string }[] = [
    { name: 'Materi', label: 'Dimensi A: Kejelasan & Kualitas Materi Pembelajaran', desc: 'Penilaian aspek struktur, substansi, dan kejelasan konsep etika informasi.' },
    { name: 'Desain', label: 'Dimensi B: Desain Antarmuka & Kemudahan Navigasi (UI/UX)', desc: 'Penilaian kenyamanan tampilan, tata letak, dan keterbacaan di media digital.' },
    { name: 'Fitur', label: 'Dimensi C: Kebermanfaatan Fitur Interaktif', desc: 'Penilaian fitur Cek Fakta SIFT, Penganalisis Plagiarisme, dan Game Etika.' },
    { name: 'Dampak', label: 'Dimensi D: Dampak Pemahaman & Perubahan Sikap Digital', desc: 'Penilaian terhadap peningkatan kesadaran UU PDP dan etika siber.' }
  ];

  const optionsScale = [
    { value: 1, label: 'STS', fullName: 'Sangat Tidak Setuju' },
    { value: 2, label: 'TS', fullName: 'Tidak Setuju' },
    { value: 3, label: 'CS', fullName: 'Cukup Setuju / Ragu' },
    { value: 4, label: 'S', fullName: 'Setuju' },
    { value: 5, label: 'SS', fullName: 'Sangat Setuju' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-5 sm:p-8 space-y-6 relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl font-serif text-slate-900 dark:text-white">
                Kuisioner Evaluasi Responden Penelitian
              </h3>
              <p className="text-xs text-slate-500">
                Instrumen Evaluasi Penggunaan E-Modul Interaktif Etika Informasi (Skala Likert 1-5)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">
                Data Responden Penelitian Berhasil Terekam!
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Terima kasih atas partisipasi Anda. Jawaban kuisioner Skala Likert Anda telah terekam secara sistematis di <strong>Dashboard Admin Penelitian</strong> dan akan diolah ke dalam grafik laporan analisis.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-all shadow-lg"
            >
              Selesai & Tutup Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-xs">
            {/* Identity section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">1</span>
                <span>Data Identitas Responden / Peserta</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap Responden *
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Pria">Laki-laki (Pria)</option>
                    <option value="Wanita">Perempuan (Wanita)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pekerjaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={pekerjaan}
                    onChange={(e) => setPekerjaan(e.target.value)}
                    placeholder="misal: Mahasiswa / Dosen / Guru / Umum"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Instansi / Perguruan Tinggi / Sekolah
                  </label>
                  <input
                    type="text"
                    value={instansi}
                    onChange={(e) => setInstansi(e.target.value)}
                    placeholder="Kosongkan jika tidak ada / misal: Universitas Negeri Jakarta"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Likert Scale Questions */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white font-serif flex items-center gap-2">
                    <span>2. Pertanyaan Kuisioner Penelitian (Skala Likert)</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      Object.keys(likertAnswers).length === defaultLikertQuestions.length
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}>
                      Terisi {Object.keys(likertAnswers).length} / {defaultLikertQuestions.length} Pernyataan
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pilih salah satu skala dari 1 (Sangat Tidak Setuju) sampai 5 (Sangat Setuju) untuk setiap pernyataan berikut.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl self-start sm:self-auto">
                  <span className="text-rose-500">1: STS</span> • 
                  <span className="text-orange-500">2: TS</span> • 
                  <span className="text-amber-500">3: CS</span> • 
                  <span className="text-blue-500">4: S</span> • 
                  <span className="text-emerald-500">5: SS</span>
                </div>
              </div>

              {validationError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 animate-pulse">
                  <span>⚠️ {validationError}</span>
                </div>
              )}

              {dimensions.map((dim, dimIdx) => {
                const dimQuestions = defaultLikertQuestions.filter(q => q.dimension === dim.name);
                return (
                  <div key={dimIdx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h5 className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {dim.label}
                      </h5>
                      <p className="text-[11px] text-slate-500">{dim.desc}</p>
                    </div>

                    <div className="space-y-4">
                      {dimQuestions.map((q, qIdx) => {
                        const isAnswered = likertAnswers[q.id] !== undefined;
                        return (
                          <div key={q.id} className={`p-3.5 rounded-xl bg-white dark:bg-slate-900 border transition-all space-y-3 ${
                            isAnswered
                              ? 'border-slate-200 dark:border-slate-800'
                              : 'border-amber-400/50 dark:border-amber-500/30 shadow-xs'
                          }`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                                <span className="font-bold text-indigo-500 mr-1.5">{qIdx + 1}.</span>
                                {q.statement}
                              </p>
                              {isAnswered ? (
                                <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] uppercase">
                                  ✓ Terisi ({likertAnswers[q.id]})
                                </span>
                              ) : (
                                <span className="shrink-0 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[9px] uppercase">
                                  Belum Diisi
                                </span>
                              )}
                            </div>

                            {/* 5-point Likert buttons */}
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                              {optionsScale.map((opt) => {
                                const isSelected = likertAnswers[q.id] === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleLikertChange(q.id, opt.value)}
                                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                      isSelected
                                        ? opt.value === 5
                                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20 font-extrabold scale-102'
                                          : opt.value === 4
                                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20 font-extrabold scale-102'
                                          : opt.value === 3
                                          ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/20 font-extrabold scale-102'
                                          : opt.value === 2
                                          ? 'bg-orange-600 text-white border-orange-500 shadow-md font-extrabold scale-102'
                                          : 'bg-rose-600 text-white border-rose-500 shadow-md font-extrabold scale-102'
                                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:border-indigo-300'
                                    }`}
                                  >
                                    <span className="text-xs font-black">{opt.value}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-tight truncate max-w-full">
                                      {opt.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Qualitative Feedbacks */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white font-serif border-b border-slate-200 dark:border-slate-800 pb-2">
                3. Saran & Masukan Kualitatif Responden (Opsional)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Saran & Catatan Terkait Fitur Interaktif (SIFT, Plagiarisme, Game)
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackFitur}
                    onChange={(e) => setFeedbackFitur(e.target.value)}
                    placeholder="Berikan saran kualitatif mengenai fitur e-modul..."
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Saran & Catatan Terkait Tampilan Antarmuka & Sistem (UI/UX)
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackSistem}
                    onChange={(e) => setFeedbackSistem(e.target.value)}
                    placeholder="Berikan saran kualitatif mengenai sistem & tampilan..."
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Saran & Catatan Terkait Materi Pembelajaran & Studi Kasus
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackMateri}
                    onChange={(e) => setFeedbackMateri(e.target.value)}
                    placeholder="Berikan saran kualitatif mengenai isi materi etika informasi..."
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold rounded-xl text-xs hover:bg-rose-100 transition-colors border border-rose-200 dark:border-rose-900/50 cursor-pointer"
              >
                Kosongkan Form
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan & Kirim Kuisioner Research</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
