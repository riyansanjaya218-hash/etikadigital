import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { ActiveTab, AdminConfig, LearningUnit, ProgressState, StudentProfile } from './types';
import { 
  getStoredProfile, 
  saveStoredProfile, 
  getStoredProgress, 
  saveStoredProgress, 
  getStoredAdminConfig, 
  saveStoredAdminConfig,
  getStudentKey,
  defaultProfile,
  emptyProfile,
  defaultProgress,
  resetAllData
} from './utils/storage';
import { defaultAdminConfig, defaultSiftCases, defaultUnits } from './data/defaultData';

// Component Imports
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CoverProfileModal } from './components/CoverProfileModal';
import { GuideView } from './components/GuideView';
import { UnitView } from './components/UnitView';
import { SiftLabView } from './components/SiftLabView';
import { PlagiarismChecker } from './components/PlagiarismChecker';
import { EthicsGameView } from './components/EthicsGameView';
import { FinalExamView } from './components/FinalExamView';
import { CertificateModal } from './components/CertificateModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ModuleEvaluationModal } from './components/ModuleEvaluationModal';
import { PdfLuringModal } from './components/PdfLuringModal';
import { Footer } from './components/Footer';

// Modal & Drawer Imports
import { KataPengantarModal } from './components/KataPengantarModal';
import { PetaKonsepModal } from './components/PetaKonsepModal';
import { SearchModal } from './components/SearchModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cover');
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [progress, setProgress] = useState<ProgressState>(getStoredProgress());
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(getStoredAdminConfig());
  const [units, setUnits] = useState<LearningUnit[]>(defaultUnits);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Modals & Drawers States
  const [showKataPengantar, setShowKataPengantar] = useState(false);
  const [showPetaKonsep, setShowPetaKonsep] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showPdfLuringModal, setShowPdfLuringModal] = useState(false);

  // View Preference States
  const [fontScale, setFontScale] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  // Handle Protected Tab Change
  const handleTabChange = (tab: ActiveTab) => {
    if (!profile.isRegistered && tab !== 'cover' && tab !== 'admin' && tab !== 'guide') {
      alert('🔒 FITUR E-MODUL TERKUNCI!\n\nSilakan isi dan simpan Form Identitas Peserta di Halaman Sampul terlebih dahulu untuk membuka seluruh materi & fitur e-modul.');
      setActiveTab('cover');
      return;
    }
    setActiveTab(tab);
  };

  // Sync Profile
  const handleSaveProfile = (updatedProfile: StudentProfile) => {
    const oldKey = getStudentKey(profile);
    const newKey = getStudentKey(updatedProfile);

    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);

    // If profile switched or registered as a new student, load or initialize that student's progress
    if (oldKey !== newKey || !profile.isRegistered) {
      const studentProgress = getStoredProgress(updatedProfile);
      setProgress(studentProgress);
      saveStoredProgress(studentProgress, updatedProfile);
    }
  };

  // Sync Progress
  const handleSaveProgress = (updatedProgress: ProgressState) => {
    setProgress(updatedProgress);
    saveStoredProgress(updatedProgress, profile);
  };

  // Switch / Clear for New Student
  const handleSwitchNewStudent = () => {
    const freshProfile = { ...emptyProfile };
    setProfile(freshProfile);
    saveStoredProfile(freshProfile);
    setProgress(defaultProgress);
    saveStoredProgress(defaultProgress, freshProfile);
    setActiveTab('cover');
  };

  // Sync Admin Config
  const handleSaveAdminConfig = (updatedConfig: AdminConfig) => {
    setAdminConfig(updatedConfig);
    saveStoredAdminConfig(updatedConfig);
  };

  // Sync Units
  const handleSaveUnits = (updatedUnits: LearningUnit[]) => {
    setUnits(updatedUnits);
  };

  // Reset Progress
  const handleResetProgress = () => {
    resetAllData();
    setProfile(defaultProfile);
    setProgress(defaultProgress);
    setAdminConfig(defaultAdminConfig);
    setUnits(defaultUnits);
  };

  // Certificate Open Handler (Gated by Evaluation Form)
  const handleOpenCertificate = () => {
    if (!progress.evaluationSubmitted) {
      alert('📋 MOHON ISI FORM EVALUASI E-MODUL!\n\nSebelum dapat melihat / mengunduh Sertifikat Kelulusan, Anda diwajibkan mengisi Form Evaluasi E-Modul terlebih dahulu.');
      setShowEvaluationModal(true);
      return;
    }
    setShowCertificate(true);
  };

  const handleEvaluationSubmitted = () => {
    const updated = { ...progress, evaluationSubmitted: true };
    handleSaveProgress(updated);
    setShowEvaluationModal(false);
    setShowCertificate(true);
  };

  // Auto Exit Handler after certificate download / logout
  const handleAutoExit = () => {
    const unreg = { ...emptyProfile };
    setProfile(unreg);
    saveStoredProfile(unreg);
    setProgress(defaultProgress);
    setShowCertificate(false);
    setShowPdfLuringModal(false);
    setActiveTab('cover');
    alert('Sesi Peserta Telah Selesai!\n\nTerima kasih telah menyelesaikan E-Modul. Aplikasi telah diset ulang otomatis untuk peserta berikutnya.');
  };

  return (
    <div 
      className={`min-h-screen font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950 transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#eef2f5] text-slate-900'
      }`}
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        profile={profile}
        progress={progress}
        onOpenProfile={() => setActiveTab('cover')}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenSearch={() => setShowSearch(true)}
        onOpenAi={() => setShowAiAssistant(true)}
        onOpenPdfLuring={() => setShowPdfLuringModal(true)}
        fontScale={fontScale}
        setFontScale={setFontScale}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container Layout: Left Sidebar + Right Content Canvas */}
      <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row flex-1 min-h-[calc(100vh-4rem)]">
        {/* Left Navigation Menu Sidebar (hidden in Admin mode) */}
        {activeTab !== 'admin' && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            profile={profile}
            progress={progress}
            onOpenKataPengantar={() => setShowKataPengantar(true)}
            onOpenPetaKonsep={() => setShowPetaKonsep(true)}
            onOpenEvaluationModal={() => setShowEvaluationModal(true)}
            darkMode={darkMode}
          />
        )}

        {/* Right Main Content Canvas */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 ${
          darkMode ? 'bg-slate-950' : 'bg-[#eef2f5]'
        }`}>
          {activeTab === 'cover' && (
            <CoverProfileModal
              profile={profile}
              onSaveProfile={handleSaveProfile}
              progress={progress}
              onStartLearning={() => handleTabChange('unit-1')}
              onSwitchNewStudent={handleSwitchNewStudent}
            />
          )}

          {activeTab === 'guide' && (
            <GuideView onNavigate={(tab) => handleTabChange(tab)} />
          )}

          {activeTab === 'unit-1' && (
            <UnitView
              unit={units[0]}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onNextUnit={() => handleTabChange('unit-2')}
            />
          )}

          {activeTab === 'unit-2' && (
            <UnitView
              unit={units[1]}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onPrevUnit={() => handleTabChange('unit-1')}
              onNextUnit={() => handleTabChange('unit-3')}
            />
          )}

          {activeTab === 'unit-3' && (
            <UnitView
              unit={units[2]}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onPrevUnit={() => handleTabChange('unit-2')}
              onNextUnit={() => handleTabChange('unit-4')}
            />
          )}

          {activeTab === 'unit-4' && (
            <UnitView
              unit={units[3]}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onPrevUnit={() => handleTabChange('unit-3')}
              onNextUnit={() => handleTabChange('unit-5')}
            />
          )}

          {activeTab === 'unit-5' && (
            <UnitView
              unit={units[4]}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onPrevUnit={() => handleTabChange('unit-4')}
              onNextUnit={() => handleTabChange('sift-lab')}
            />
          )}

          {activeTab === 'sift-lab' && (
            <SiftLabView
              cases={defaultSiftCases}
              progress={progress}
              onSaveProgress={handleSaveProgress}
            />
          )}

          {activeTab === 'plagiarism' && (
            <div className="p-8 rounded-3xl bg-slate-900 text-white max-w-xl mx-auto my-12 text-center space-y-4 shadow-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">Fitur Khusus Dashboard Admin</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fitur Cek Plagiarisme Naskah hanya dapat diakses melalui Dashboard Admin Manajemen dengan login resmi.
              </p>
              <button
                onClick={() => {
                  setIsAdmin(true);
                  setActiveTab('admin');
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md uppercase tracking-wider"
              >
                Buka Dashboard Admin
              </button>
            </div>
          )}

          {activeTab === 'ethics-game' && (
            <EthicsGameView
              progress={progress}
              onSaveProgress={handleSaveProgress}
            />
          )}

          {activeTab === 'final-quiz' && (
            <FinalExamView
              progress={progress}
              onSaveProgress={handleSaveProgress}
              profile={profile}
              minPassingScore={adminConfig.minPassingScore}
              onOpenCertificate={handleOpenCertificate}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              adminConfig={adminConfig}
              onSaveAdminConfig={handleSaveAdminConfig}
              units={units}
              onSaveUnits={handleSaveUnits}
              studentProfile={profile}
              progress={progress}
              onResetStudentProgress={handleResetProgress}
              onOpenCertificateModal={handleOpenCertificate}
              onViewStudentModule={() => setActiveTab('unit-1')}
              onLogoutAdmin={() => {
                setIsAdmin(false);
                setActiveTab('cover');
              }}
            />
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      {showKataPengantar && (
        <KataPengantarModal onClose={() => setShowKataPengantar(false)} />
      )}

      {showPetaKonsep && (
        <PetaKonsepModal 
          onClose={() => setShowPetaKonsep(false)} 
          onNavigateUnit={(tab) => handleTabChange(tab as ActiveTab)}
        />
      )}

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onNavigateTab={(tab) => handleTabChange(tab)}
        />
      )}

      {showAiAssistant && (
        <AiAssistantDrawer onClose={() => setShowAiAssistant(false)} />
      )}

      {/* Evaluation Survey Modal */}
      {showEvaluationModal && (
        <ModuleEvaluationModal
          profile={profile}
          onClose={() => setShowEvaluationModal(false)}
          onSuccessSubmitted={handleEvaluationSubmitted}
        />
      )}

      {/* PDF Luring Offline Modal */}
      {showPdfLuringModal && (
        <PdfLuringModal
          profile={profile}
          adminConfig={adminConfig}
          units={units}
          progress={progress}
          onClose={() => setShowPdfLuringModal(false)}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          profile={profile}
          adminConfig={adminConfig}
          progress={progress}
          onClose={() => setShowCertificate(false)}
          onAutoExit={handleAutoExit}
        />
      )}

      {/* Footer */}
      <Footer adminConfig={adminConfig} darkMode={darkMode} />
    </div>
  );
}
