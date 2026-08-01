import React, { useState, useEffect } from 'react';
import { AdminConfig, LearningUnit, ModuleEvaluation, ProgressState, StudentProfile } from '../types';
import { Settings, Users, BookOpen, Download, Save, Lock, Unlock, ShieldAlert, Key, Check, RefreshCw, Star, Award, MessageSquare, Eye, FileCheck2, User, FileText, BarChart3, PieChart, Printer, LogOut, Trash2 } from 'lucide-react';
import { getStoredEvaluations, getStoredStudents, resetAllData, deleteStoredStudent, clearAllStudents, deleteStoredEvaluation, clearAllEvaluations } from '../utils/storage';
import { defaultLikertQuestions } from '../data/defaultData';
import { PlagiarismChecker } from './PlagiarismChecker';
import { ResearchPaperReportModal } from './ResearchPaperReportModal';

interface AdminDashboardProps {
  adminConfig: AdminConfig;
  onSaveAdminConfig: (updated: AdminConfig) => void;
  units: LearningUnit[];
  onSaveUnits: (updatedUnits: LearningUnit[]) => void;
  studentProfile: StudentProfile;
  progress: ProgressState;
  onResetStudentProgress: () => void;
  onOpenCertificateModal?: () => void;
  onViewStudentModule?: () => void;
  onOpenPdfLuring?: () => void;
  onLogoutAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminConfig,
  onSaveAdminConfig,
  units,
  onSaveUnits,
  studentProfile,
  progress,
  onResetStudentProgress,
  onOpenCertificateModal,
  onViewStudentModule,
  onOpenPdfLuring,
  onLogoutAdmin
}) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'students' | 'evaluations' | 'plagiarism' | 'content' | 'settings'>('students');
  const [configForm, setConfigForm] = useState<AdminConfig>(adminConfig);
  const [unitsForm, setUnitsForm] = useState<LearningUnit[]>(units);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [registeredStudents, setRegisteredStudents] = useState<StudentProfile[]>([]);
  const [evaluationsList, setEvaluationsList] = useState<ModuleEvaluation[]>([]);
  const [showResearchPaperModal, setShowResearchPaperModal] = useState(false);

  const handleRefreshData = () => {
    setRegisteredStudents(getStoredStudents());
    setEvaluationsList(getStoredEvaluations());
  };

  const handleDeleteStudent = (st: StudentProfile) => {
    const key = st.nim || st.email || st.nama;
    if (confirm(`Apakah Anda yakin ingin menghapus data identitas peserta "${st.nama}"?`)) {
      const updated = deleteStoredStudent(key);
      setRegisteredStudents(updated);
    }
  };

  const handleClearAllStudents = () => {
    if (confirm('PERINGATAN KONFIRMASI:\n\nApakah Anda yakin ingin MENGHAPUS SEMUA data identitas peserta terdaftar? Action ini tidak dapat dibatalkan.')) {
      const updated = clearAllStudents();
      setRegisteredStudents(updated);
    }
  };

  const handleDeleteEvaluation = (evalId: string, studentName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data evaluasi dari "${studentName}"?`)) {
      const updated = deleteStoredEvaluation(evalId);
      setEvaluationsList(updated);
    }
  };

  const handleClearAllEvaluations = () => {
    if (confirm('PERINGATAN KONFIRMASI:\n\nApakah Anda yakin ingin MENGHAPUS SEMUA data hasil evaluasi kuesioner? Action ini tidak dapat dibatalkan.')) {
      const updated = clearAllEvaluations();
      setEvaluationsList(updated);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleRefreshData();
    }
  }, [isAuthenticated, activeTab]);

  const handleExportEvaluationsCsv = () => {
    const headers = [
      'ID Evaluation',
      'Nama Responden',
      'NIM / ID',
      'Jenis Kelamin',
      'Pekerjaan',
      'Instansi',
      'Tanggal Submit',
      'Rating Fitur (1-5)',
      'Rating Sistem (1-5)',
      'Rating Materi (1-5)',
      ...defaultLikertQuestions.map(q => `"[${q.dimension}] ${q.statement.replace(/"/g, '""')}"`),
      'Saran Fitur',
      'Saran Sistem',
      'Saran Materi'
    ];

    const rows = evaluationsList.map(ev => {
      const likertVals = defaultLikertQuestions.map(q => ev.likertAnswers?.[q.id] || (ev.ratingMateri || 5));
      return [
        `"${ev.id}"`,
        `"${ev.studentName}"`,
        `"${ev.studentNim || '-'}"`,
        `"${ev.jenisKelamin || '-'}"`,
        `"${ev.pekerjaan || '-'}"`,
        `"${ev.instansi || '-'}"`,
        `"${ev.submittedAt}"`,
        `"${ev.ratingFitur}"`,
        `"${ev.ratingSistem}"`,
        `"${ev.ratingMateri}"`,
        ...likertVals.map(v => `"${v}"`),
        `"${(ev.feedbackFitur || '').replace(/"/g, '""')}"`,
        `"${(ev.feedbackSistem || '').replace(/"/g, '""')}"`,
        `"${(ev.feedbackMateri || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Kuisioner_Research_Likert_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toUpperCase() === 'PERSIUNJ' && passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSaveConfig = () => {
    onSaveAdminConfig(configForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveAllUnits = () => {
    onSaveUnits(unitsForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportCsv = () => {
    const listToExport = registeredStudents.length > 0 ? registeredStudents : [studentProfile];
    const headers = ['Nama Peserta', 'NIM', 'Jenis Kelamin', 'Pekerjaan', 'Instansi', 'Email', 'Unit Selesai', 'Nilai Evaluasi Akhir', 'Status Lulus', 'Tanggal Sertifikat'];
    
    const csvRows = [
      headers,
      ...listToExport.map(st => [
        `"${st.nama || '-'}"`,
        `"${st.nim || '-'}"`,
        `"${st.jenisKelamin || '-'}"`,
        `"${st.pekerjaan || '-'}"`,
        `"${st.instansi || '-'}"`,
        `"${st.email || '-'}"`,
        `"${progress.completedUnits.length}/5"`,
        `"${progress.finalExamScore ?? 'Belum Ujian'}"`,
        `"${progress.finalExamPassed ? 'Lulus' : 'Belum Lulus'}"`,
        `"${progress.certificateIssuedDate || '-'}"`
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Peserta_LiterasiDigital_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900/80 border border-white/15 text-white space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto backdrop-blur-md">
          <Lock className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="font-bold text-xl text-white">Dashboard Admin Manajemen</h3>
          <p className="text-xs text-slate-300">Masukkan Username & Password Admin untuk mengakses dashboard.</p>
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Username Admin</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username Admin"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password Admin</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Kata Sandi Admin"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-md"
              />
            </div>
          </div>

          {authError && (
            <p className="text-rose-400 text-xs text-center font-semibold bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
              Username atau Password Admin tidak valid. Silakan periksa kembali!
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 border border-amber-400/30 flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Masuk Dashboard Admin</span>
          </button>

          {onViewStudentModule && (
            <button
              type="button"
              onClick={onViewStudentModule}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Kembali / Lihat Tampilan Modul</span>
            </button>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Admin Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-3 relative overflow-hidden shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Dashboard Admin Pembelajaran</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenPdfLuring && (
              <button
                onClick={onOpenPdfLuring}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg border border-amber-300/60 hover:scale-105 active:scale-95"
                title="Buka & Download Modul Cetak/Flipbook 3D (24 Halaman Presisi)"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>📖 Download E-Modul (Buku 24 Hlm)</span>
              </button>
            )}

            {onViewStudentModule && (
              <button
                onClick={onViewStudentModule}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md border border-indigo-400/30"
                title="Sembunyikan Dashboard & Lihat Tampilan Modul"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Lihat Tampilan Modul</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsAuthenticated(false);
                if (onLogoutAdmin) onLogoutAdmin();
              }}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md border border-rose-400/30"
              title="Keluar dari Dashboard Admin"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Admin</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Manajemen Konten & Rekap Peserta
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl">
          Kelola judul unit, URL video, bank soal kuis, passing grade evaluasi, dan rekapitulasi data progres belajar peserta.
        </p>

        {/* Admin Navigation Tabs */}
        <div className="pt-3 flex items-center gap-2 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md ${
              activeTab === 'students' ? 'bg-amber-600 text-white border border-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Identitas Peserta ({registeredStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluations')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md ${
              activeTab === 'evaluations' ? 'bg-amber-600 text-white border border-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hasil Evaluasi Modul ({evaluationsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plagiarism')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md ${
              activeTab === 'plagiarism' ? 'bg-amber-600 text-white border border-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-blue-400" />
            <span>Cek Plagiarisme Naskah</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md ${
              activeTab === 'content' ? 'bg-amber-600 text-white border border-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Editor 5 Unit & Video</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md ${
              activeTab === 'settings' ? 'bg-amber-600 text-white border border-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Modul</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 font-semibold text-xs flex items-center gap-2 backdrop-blur-md">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Perubahan konfigurasi admin berhasil disimpan!</span>
        </div>
      )}

      {/* Admin Feature Banner for Direct Book E-Modul Download */}
      {onOpenPdfLuring && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border-2 border-amber-300">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-slate-950 text-amber-300 rounded-2xl shrink-0 shadow-md">
              <Printer className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-base sm:text-lg font-serif flex flex-wrap items-center gap-2 text-slate-950">
                <span>Unduh E-Modul Lengkap Dalam Bentuk Buku (24 Halaman)</span>
                <span className="text-[10px] bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase">
                  VERSI CETAK & FLIPBOOK 3D
                </span>
              </h3>
              <p className="text-xs text-slate-900 font-medium max-w-2xl leading-relaxed">
                Akses tampilan buku resmi e-modul luring yang persis sama dengan peserta: Flipbook 3D interaktif dan dokumen A4 siap cetak / unduh PDF langsung (mencakup Cover, CPMK, Peta Konsep, 5 Unit Materi, Kuis & Jawaban, Post-Test, serta Lembar Evaluasi).
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPdfLuring}
            className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2.5 shrink-0 hover:scale-105 active:scale-95 border border-amber-400/50 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>📖 BUKA & DOWNLOAD BUKU MODUL</span>
          </button>
        </div>
      )}

      {/* Tab 1: Students List & Registration Identitas */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-white text-base font-serif uppercase tracking-wider">
                  Daftar Peserta Mengisi Identitas
                </h3>
                <p className="text-xs text-slate-300">
                  Peserta yang telah mendaftarkan identitas untuk membuka akses e-modul
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportCsv}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/25 border border-emerald-400/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor Rekap CSV</span>
                </button>

                {registeredStudents.length > 0 && (
                  <button
                    onClick={handleClearAllStudents}
                    className="px-3.5 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-rose-800/60 shadow-md"
                    title="Hapus semua data identitas peserta"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Hapus Semua Identitas</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-200 font-bold border-b border-white/10">
                    <th className="p-3">Nama Peserta</th>
                    <th className="p-3">Jenis Kelamin</th>
                    <th className="p-3">Pekerjaan</th>
                    <th className="p-3">Instansi / Sekolah</th>
                    <th className="p-3">Tanggal Daftar</th>
                    <th className="p-3">Status Sertifikat</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {registeredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 font-serif">
                        Belum ada data identitas peserta terdaftar.
                      </td>
                    </tr>
                  ) : (
                    registeredStudents.map((st, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white">{st.nama}</td>
                        <td className="p-3 text-slate-300">{st.jenisKelamin || '-'}</td>
                        <td className="p-3 text-amber-300 font-semibold">{st.pekerjaan || '-'}</td>
                        <td className="p-3 text-slate-300">{st.instansi || '-'}</td>
                        <td className="p-3 text-slate-400 text-[11px]">
                          {new Date(st.registeredAt || Date.now()).toLocaleDateString('id-ID')}
                        </td>
                        <td className="p-3">
                          {progress.finalExamPassed && st.nama === studentProfile.nama ? (
                            <button
                              onClick={onOpenCertificateModal}
                              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold text-[11px] flex items-center gap-1"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Lihat Sertifikat</span>
                            </button>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                              {st.isRegistered ? 'Akses Terbuka' : 'Terkunci'}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteStudent(st)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors border border-rose-500/30"
                            title={`Hapus data ${st.nama}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hasil Evaluasi E-Modul (Likert Questionnaire & Research Stats) */}
      {activeTab === 'evaluations' && (
        <div className="space-y-6">
          {/* Header Actions Toolbar */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-white text-base font-serif uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span>Hasil Statistik & Diagram Kuisioner Research ({evaluationsList.length} Responden)</span>
              </h3>
              <p className="text-xs text-slate-300">
                Rekapitulasi instrumen Skala Likert 1-5, diagram pencapaian per indikator, dan pembuat laporan makalah resmi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleRefreshData}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-slate-700"
                title="Segarkan Data Evaluasi Otomatis"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Segarkan Data</span>
              </button>

              <button
                onClick={handleExportEvaluationsCsv}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 border border-emerald-400/30"
              >
                <Download className="w-4 h-4" />
                <span>Ekspor CSV Research</span>
              </button>

              <button
                onClick={() => setShowResearchPaperModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25 border border-indigo-400/30"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Cetak Makalah Laporan (PDF)</span>
              </button>

              {evaluationsList.length > 0 && (
                <button
                  onClick={handleClearAllEvaluations}
                  className="px-3.5 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-rose-800/60 shadow-md"
                  title="Hapus semua data hasil evaluasi"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>Kosongkan Evaluasi</span>
                </button>
              )}
            </div>
          </div>

          {/* Average Rating Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">1. Evaluasi Fitur E-Modul</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-amber-400">
                  {(evaluationsList.reduce((acc, cur) => acc + cur.ratingFitur, 0) / (evaluationsList.length || 1)).toFixed(1)}
                </span>
                <div className="flex text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">SIFT, Plagiarisme, Game, & AI</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">2. Evaluasi Sistem & Tampilan</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-purple-400">
                  {(evaluationsList.reduce((acc, cur) => acc + cur.ratingSistem, 0) / (evaluationsList.length || 1)).toFixed(1)}
                </span>
                <div className="flex text-purple-400">
                  <Star className="w-5 h-5 fill-purple-400" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Kecepatan, Navigasi, & UI/UX</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">3. Evaluasi Materi Pembelajaran</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-emerald-400">
                  {(evaluationsList.reduce((acc, cur) => acc + cur.ratingMateri, 0) / (evaluationsList.length || 1)).toFixed(1)}
                </span>
                <div className="flex text-emerald-400">
                  <Star className="w-5 h-5 fill-emerald-400" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Kejelasan 5 Unit & Video Pembelajaran</p>
            </div>
          </div>

          {/* DIAGRAM BATANG VERTIKAL REKAPITULASI DIMENSI */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
              <div>
                <h3 className="font-extrabold text-white text-base font-serif uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span>Diagram Batang Vertikal Pencapaian 4 Dimensi (%)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Visualisasi grafik diagram batang tingkat kepuasan dan kelayakan e-modul
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 self-start sm:self-auto">
                Sangat Layak (Mean &gt; 4.20)
              </span>
            </div>

            {/* Vertical Bar Canvas */}
            <div className="pt-6 pb-2 px-4 sm:px-8">
              <div className="relative h-60 border-l-2 border-b-2 border-slate-600 flex items-end justify-around gap-2 sm:gap-6 pl-2 pr-2">
                {/* Y-Axis Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -ml-8 font-mono text-[10px] text-slate-400 font-bold">
                  <div className="flex items-center gap-1"><span className="w-6 text-right">100%</span><div className="w-full border-b border-dashed border-white/10"></div></div>
                  <div className="flex items-center gap-1"><span className="w-6 text-right">75%</span><div className="w-full border-b border-dashed border-white/10"></div></div>
                  <div className="flex items-center gap-1"><span className="w-6 text-right">50%</span><div className="w-full border-b border-dashed border-white/10"></div></div>
                  <div className="flex items-center gap-1"><span className="w-6 text-right">25%</span><div className="w-full border-b border-dashed border-white/10"></div></div>
                  <div className="flex items-center gap-1"><span className="w-6 text-right">0%</span><div className="w-full border-b border-white/20"></div></div>
                </div>

                {/* Calculate dimension scores for Admin Bar Chart */}
                {(() => {
                  const dims = [
                    { id: 'Materi', name: 'Kejelasan Materi', color: 'from-amber-500 to-amber-600', badge: 'bg-amber-500' },
                    { id: 'Desain', name: 'Tampilan UI/UX', color: 'from-indigo-500 to-indigo-600', badge: 'bg-indigo-500' },
                    { id: 'Fitur', name: 'Fitur Interaktif', color: 'from-purple-500 to-purple-600', badge: 'bg-purple-500' },
                    { id: 'Dampak', name: 'Dampak Pemahaman', color: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-500' },
                  ];

                  return dims.map((dim, idx) => {
                    const matchedQs = defaultLikertQuestions.filter(q => q.dimension === dim.id);
                    let sumPct = 0;
                    matchedQs.forEach(q => {
                      const total = evaluationsList.length || 1;
                      const scores = evaluationsList.map(e => e.likertAnswers?.[q.id] || (e.ratingMateri || 5));
                      const qSum = scores.reduce((a, b) => a + b, 0);
                      sumPct += (qSum / (total * 5)) * 100;
                    });
                    const avgPct = matchedQs.length ? (sumPct / matchedQs.length) : 95.0;

                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center flex-1 h-full justify-end">
                        <div className="mb-1.5 bg-slate-950 text-amber-300 font-mono font-extrabold text-xs px-2.5 py-1 rounded-lg border border-amber-400/30 shadow-lg">
                          {avgPct.toFixed(1)}%
                        </div>

                        <div 
                          style={{ height: `${Math.max(15, avgPct)}%` }}
                          className={`w-full max-w-[55px] sm:max-w-[75px] bg-gradient-to-t ${dim.color} border-t-2 border-x-2 border-white/20 rounded-t-xl transition-all duration-700 shadow-2xl flex items-start justify-center pt-2`}
                        >
                          <span className="text-[10px] font-mono font-black text-white">
                            {((avgPct / 100) * 5).toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-3 text-center space-y-0.5">
                          <span className="block font-black text-xs text-white uppercase">
                            Dimensi {dim.id === 'Materi' ? 'A' : dim.id === 'Desain' ? 'B' : dim.id === 'Fitur' ? 'C' : 'D'}
                          </span>
                          <span className="block text-[10px] font-medium text-slate-300 max-w-[85px] sm:max-w-[110px] truncate">
                            {dim.name}
                          </span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* DIAGRAM HASIL SKALA LIKERT PER DIMENSI */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-serif uppercase tracking-wider flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-400" />
                  <span>Diagram Grafik Persentase Skala Likert Per Pernyataan</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Visualisasi distribusi skor persentase pencapaian (SS, S, CS, TS, STS)
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> 81-100% (Sangat Layak)
              </div>
            </div>

            <div className="space-y-4">
              {defaultLikertQuestions.map((q, idx) => {
                const total = evaluationsList.length || 1;
                const scores = evaluationsList.map(e => e.likertAnswers?.[q.id] || (e.ratingMateri || 5));
                const sum = scores.reduce((a, b) => a + b, 0);
                const mean = sum / total;
                const pct = (sum / (total * 5)) * 100;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-extrabold text-white">
                        <span className="text-indigo-400 font-mono mr-1.5">[{q.dimension}]</span>
                        {idx + 1}. {q.statement}
                      </span>
                      <span className="font-mono font-bold text-amber-400 shrink-0">
                        Mean: {mean.toFixed(2)} / 5.00 ({pct.toFixed(1)}%)
                      </span>
                    </div>

                    {/* Progress Bar Grafik */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10 flex">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Qualitative Notes */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="font-bold text-white text-base border-b border-white/10 pb-3 font-serif uppercase tracking-wider">
              Ulasan & Catatan Evaluasi Peserta
            </h3>

            <div className="space-y-4">
              {evaluationsList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-serif text-xs bg-slate-950/40 rounded-xl border border-white/5">
                  Belum ada ulasan / hasil evaluasi e-modul yang masuk.
                </div>
              ) : (
                evaluationsList.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="font-extrabold text-white text-sm block">
                          {ev.studentName} {ev.studentNim && ev.studentNim !== '-' ? `(${ev.studentNim})` : ''}
                        </span>
                        <span className="text-slate-400 text-[11px]">{ev.instansi} • {ev.pekerjaan || 'Mahasiswa'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-mono text-[10px]">
                          {new Date(ev.submittedAt).toLocaleDateString('id-ID')}
                        </span>
                        <button
                          onClick={() => handleDeleteEvaluation(ev.id, ev.studentName)}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors border border-rose-500/30"
                          title={`Hapus data evaluasi dari ${ev.studentName}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <span className="font-bold text-amber-300 block text-[11px]">Fitur: {ev.ratingFitur}/5 ★</span>
                        <p className="text-slate-300 italic">"{ev.feedbackFitur}"</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <span className="font-bold text-purple-300 block text-[11px]">Sistem: {ev.ratingSistem}/5 ★</span>
                        <p className="text-slate-300 italic">"{ev.feedbackSistem}"</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <span className="font-bold text-emerald-300 block text-[11px]">Materi: {ev.ratingMateri}/5 ★</span>
                        <p className="text-slate-300 italic">"{ev.feedbackMateri}"</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Plagiarism Checker */}
      {activeTab === 'plagiarism' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-900/30 border border-blue-500/30 text-blue-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-blue-400" />
              <span className="font-bold">Modul Pemeriksa Plagiarisme Khusus Admin</span>
            </div>
            <span className="text-[11px] bg-blue-500/20 px-2 py-0.5 rounded font-mono font-bold border border-blue-400/30">
              INTERNAL ADMIN ONLY
            </span>
          </div>

          <PlagiarismChecker
            progress={progress}
            onSaveProgress={() => {}}
          />
        </div>
      )}

      {/* Tab 2: Content Editor */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Edit Judul & Media Video 5 Unit</h3>
            <button
              onClick={handleSaveAllUnits}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/25 border border-amber-400/30"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Unit</span>
            </button>
          </div>

          <div className="space-y-4">
            {unitsForm.map((u, idx) => (
              <div key={u.id} className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-3 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 font-bold text-slate-200">
                  Unit Pembelajaran {u.unitNumber}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Judul Unit</label>
                    <input
                      type="text"
                      value={u.title}
                      onChange={(e) => {
                        const copy = [...unitsForm];
                        copy[idx].title = e.target.value;
                        setUnitsForm(copy);
                      }}
                      className="w-full px-3 py-2 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">URL Video Universal (YouTube / Drive / MP4)</label>
                    <input
                      type="text"
                      value={u.video.url}
                      onChange={(e) => {
                        const copy = [...unitsForm];
                        copy[idx].video.url = e.target.value;
                        setUnitsForm(copy);
                      }}
                      className="w-full px-3 py-2 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400 backdrop-blur-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Settings & Reset */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-6 text-xs">
          <h3 className="font-bold text-white text-lg border-b border-white/10 pb-3">Konfigurasi Modul & Instruktur</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Judul Modul</label>
              <input
                type="text"
                value={configForm.moduleTitle}
                onChange={(e) => setConfigForm({ ...configForm, moduleTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Instruktur / Penanggung Jawab</label>
              <input
                type="text"
                value={configForm.instructorName}
                onChange={(e) => setConfigForm({ ...configForm, instructorName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">NIP Instruktur (Opsional)</label>
              <input
                type="text"
                value={configForm.instructorNip || ''}
                onChange={(e) => setConfigForm({ ...configForm, instructorNip: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Institusi / Lembaga</label>
              <input
                type="text"
                value={configForm.instituteName}
                onChange={(e) => setConfigForm({ ...configForm, instituteName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Batas Minimal Kelulusan (%)</label>
              <input
                type="number"
                value={configForm.minPassingScore}
                onChange={(e) => setConfigForm({ ...configForm, minPassingScore: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">PIN Admin Baru</label>
              <input
                type="text"
                value={configForm.pinCode}
                onChange={(e) => setConfigForm({ ...configForm, pinCode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-white/15 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>
          </div>

          <button
            onClick={handleSaveConfig}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 border border-amber-400/30"
          >
            Simpan Konfigurasi
          </button>

          <div className="pt-6 border-t border-white/10 space-y-2">
            <strong className="text-rose-400 font-bold block">Danger Zone: Reset Data Progres</strong>
            <p className="text-slate-400">
              Menghapus seluruh histori kuis, jawaban, dan progress belajar lokal peserta untuk pengujian baru.
            </p>
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mereset seluruh data progres belajar peserta?')) {
                  onResetStudentProgress();
                }
              }}
              className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition-all border border-rose-400/30 shadow-lg shadow-rose-500/20 backdrop-blur-md"
            >
              Reset Seluruh Data Progres
            </button>
          </div>
        </div>
      )}

      {/* Research Paper Report Modal */}
      {showResearchPaperModal && (
        <ResearchPaperReportModal
          evaluations={evaluationsList}
          adminConfig={adminConfig}
          onClose={() => setShowResearchPaperModal(false)}
        />
      )}
    </div>
  );
};
