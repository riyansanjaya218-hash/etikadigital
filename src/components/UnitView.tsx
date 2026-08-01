import React, { useState, useEffect } from 'react';
import { LearningUnit, ProgressState, CaseDiscussion } from '../types';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { 
  BookOpen, CheckCircle2, HelpCircle, MessageSquare, ListCheck, Sparkles, 
  AlertCircle, ArrowRight, ArrowLeft, BookText, Lightbulb, PlayCircle, 
  Gamepad2, Check, X, ShieldAlert, FileText, Volume2, Pause, Play, 
  Square, Layers, LayoutList, Lock, ChevronDown, Award, Table, ZoomIn, Eye, Image as ImageIcon
} from 'lucide-react';

interface UnitViewProps {
  unit: LearningUnit;
  progress: ProgressState;
  onSaveProgress: (updatedProgress: ProgressState) => void;
  onNextUnit?: () => void;
  onPrevUnit?: () => void;
  darkMode?: boolean;
}

export const UnitView: React.FC<UnitViewProps> = ({
  unit,
  progress,
  onSaveProgress,
  onNextUnit,
  onPrevUnit,
  darkMode
}) => {
  const [viewMode, setViewMode] = useState<'single-page' | 'tabs'>('single-page');
  const [activeTab, setActiveTab] = useState<'video' | 'ringkasan' | 'materi' | 'simulasi' | 'kuis' | 'refleksi' | 'checklist'>('video');
  
  // Interactive Diagram State
  const [activeDiagramStep, setActiveDiagramStep] = useState<Record<string, number>>({});
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string; title?: string } | null>(null);
  const [openScenarioAnswers, setOpenScenarioAnswers] = useState<Record<string, boolean>>({});
  const [activeConceptModal, setActiveConceptModal] = useState<{
    title: string;
    subtitle?: string;
    badge?: string;
    description: string;
    letterOrNumber?: string;
    color?: string;
  } | null>(null);
  
  // Sub-bab Materi Completed State
  const [completedSubBabs, setCompletedSubBabs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`completed_subbabs_${unit.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Text to Speech Narrator State (Khusus Sub-Bab Materi)
  const [activeSpeakingSecId, setActiveSpeakingSecId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);

  // Stop speech when unit changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeakingSecId(null);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [unit.id]);

  const handleStartSubBabSpeech = (secId: string, textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung fitur Baca Suara (Text-to-Speech).');
      return;
    }

    window.speechSynthesis.cancel();
    setActiveSpeakingSecId(secId);

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeakingSecId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeakingSecId(null);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseResumeSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStopSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveSpeakingSecId(null);
  };

  const handleChangeRate = (newRate: number, secId?: string, textToRead?: string) => {
    setSpeechRate(newRate);
    if (isSpeaking && secId && textToRead) {
      handleStopSpeech();
      setTimeout(() => {
        handleStartSubBabSpeech(secId, textToRead);
      }, 100);
    }
  };

  const handleToggleSubBabCompleted = (secId: string) => {
    const updated = completedSubBabs.includes(secId)
      ? completedSubBabs.filter(id => id !== secId)
      : [...completedSubBabs, secId];
    setCompletedSubBabs(updated);
    try {
      localStorage.setItem(`completed_subbabs_${unit.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Case Discussion Interactive State (Sub-Bab Materi - Opsional)
  const [caseDiscussionAnswers, setCaseDiscussionAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(`case_discussion_ans_${unit.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [caseDiscussionEvaluations, setCaseDiscussionEvaluations] = useState<Record<string, {
    score: number;
    feedback: string;
    matchedKeyPoints: string[];
    showRubric: boolean;
  }>>(() => {
    try {
      const saved = localStorage.getItem(`case_discussion_eval_${unit.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleEvaluateCaseDiscussion = (secId: string, cd: CaseDiscussion) => {
    const ans = caseDiscussionAnswers[secId] || '';
    if (!ans.trim()) return;

    const keyPoints = cd.keyPoints || [];
    const lowerAns = ans.toLowerCase();
    
    const matched = keyPoints.filter(kp => {
      const words = kp.toLowerCase().split(' ').filter(w => w.length > 3);
      return words.some(w => lowerAns.includes(w));
    });

    const ratio = keyPoints.length > 0 ? matched.length / keyPoints.length : 1;
    const rawScore = Math.min(100, Math.max(60, Math.round(55 + ratio * 45)));

    let feedbackMsg = '';
    if (rawScore >= 85) {
      feedbackMsg = 'Luar biasa! Analisis jawaban diskusimu sangat komprehensif, kritis, dan mencakup prinsip etika informasi yang tepat.';
    } else if (rawScore >= 70) {
      feedbackMsg = 'Bagus! Jawabanmu sudah cukup baik dan menunjukkan kesadaran etika informasi yang sesuai.';
    } else {
      feedbackMsg = 'Jawaban diskusimu telah diterima. Silakan cermati kunci jawaban & rubrik acuan ideal di bawah untuk melengkapi sudut pandang analisismu.';
    }

    const evalObj = {
      score: rawScore,
      feedback: feedbackMsg,
      matchedKeyPoints: matched.length > 0 ? matched : (keyPoints.length > 0 ? [keyPoints[0]] : ['Perspektif mandiri peserta']),
      showRubric: true
    };

    setCaseDiscussionEvaluations(prev => {
      const updated = { ...prev, [secId]: evalObj };
      try {
        localStorage.setItem(`case_discussion_eval_${unit.id}`, JSON.stringify(updated));
        localStorage.setItem(`case_discussion_ans_${unit.id}`, JSON.stringify(caseDiscussionAnswers));
      } catch (e) {}
      return updated;
    });
  };
  
  // Interactive Case Simulation State
  const [selectedSimCaseIndex, setSelectedSimCaseIndex] = useState<number>(0);
  const [selectedSimOptions, setSelectedSimOptions] = useState<Record<string, string>>({});

  // Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(progress.unitQuizScores[unit.id] ?? null);

  // Reflection State
  const [reflectionText, setReflectionText] = useState<string>(progress.reflections[unit.id] || '');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Worksheet Checklist State
  const [checkedItems, setCheckedItems] = useState<string[]>(progress.worksheets[unit.id] || []);

  // Sync state when unit or student progress changes
  useEffect(() => {
    const existingScore = progress.unitQuizScores[unit.id] ?? null;
    setQuizScore(existingScore);
    if (existingScore === null) {
      setUserAnswers({});
      setQuizSubmitted(false);
    } else {
      setQuizSubmitted(true);
    }
    setReflectionText(progress.reflections[unit.id] || '');
    setCheckedItems(progress.worksheets[unit.id] || []);
  }, [unit.id, progress]);

  // Lock Warning Modal State
  const [showLockModal, setShowLockModal] = useState(false);

  const isVideoWatched = !!progress.videoWatched[unit.id];

  // Unit Completion Requirements
  const isVideoDone = isVideoWatched;
  const isMateriDone = (unit.sections || []).length === 0 || (unit.sections || []).every(sec => completedSubBabs.includes(sec.id));
  const isSimulasiDone = (unit.simulationCases || []).length === 0 || Object.keys(selectedSimOptions).length >= (unit.simulationCases || []).length;
  const isKuisDone = quizSubmitted || quizScore !== null;
  const isRefleksiDone = reflectionText.trim().length >= 10;
  const isChecklistDone = checkedItems.length >= 1;

  const isUnitFullyCompleted = isVideoDone && isMateriDone && isSimulasiDone && isKuisDone && isRefleksiDone && isChecklistDone;

  const handleToggleChecklist = (item: string) => {
    const updated = checkedItems.includes(item)
      ? checkedItems.filter(i => i !== item)
      : [...checkedItems, item];
    setCheckedItems(updated);

    const updatedWorksheets = { ...progress.worksheets, [unit.id]: updated };
    onSaveProgress({ ...progress, worksheets: updatedWorksheets });
  };

  const handleMarkVideoWatched = () => {
    const updatedVideo = { ...progress.videoWatched, [unit.id]: true };
    const isCompleted = isUnitFullyCompleted;
    const updatedCompleted = isCompleted ? [...new Set([...progress.completedUnits, unit.id])] : progress.completedUnits;
    
    onSaveProgress({
      ...progress,
      videoWatched: updatedVideo,
      completedUnits: updatedCompleted
    });
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    unit.practiceQuiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / unit.practiceQuiz.length) * 100);
    setQuizScore(scorePercentage);
    setQuizSubmitted(true);

    const updatedQuizScores = { ...progress.unitQuizScores, [unit.id]: scorePercentage };
    
    onSaveProgress({
      ...progress,
      unitQuizScores: updatedQuizScores
    });
  };

  const handleSaveReflection = () => {
    const updatedReflections = { ...progress.reflections, [unit.id]: reflectionText };
    onSaveProgress({ ...progress, reflections: updatedReflections });
  };

  const handleRequestAiFeedback = async () => {
    if (!reflectionText || reflectionText.trim().length < 5) return;
    setLoadingAi(true);
    setAiFeedback(null);

    try {
      const res = await fetch('/api/reflection-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: unit.unitNumber,
          unitTitle: unit.title,
          reflectionText
        })
      });
      const data = await res.json();
      if (data.feedback) {
        setAiFeedback(data.feedback);
      } else {
        setAiFeedback('Terima kasih atas refleksi mendalam Anda. Refleksi ini menunjukkan pemahaman yang baik tentang etika informasi.');
      }
    } catch {
      setAiFeedback('Refleksi Anda tercatat dengan baik! Terus kembangkan pola pikir kritis dalam mengonsumsi informasi digital.');
    } finally {
      setLoadingAi(false);
    }
  };

  const scrollToSection = (targetId: string, tabName?: 'video' | 'ringkasan' | 'materi' | 'simulasi' | 'kuis' | 'refleksi' | 'checklist') => {
    if (viewMode === 'tabs' && tabName) {
      setActiveTab(tabName);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAttemptNextUnit = () => {
    if (isUnitFullyCompleted) {
      // Add unit to completed if not already present
      const updatedCompleted = [...new Set([...progress.completedUnits, unit.id])];
      onSaveProgress({ ...progress, completedUnits: updatedCompleted });
      if (onNextUnit) onNextUnit();
    } else {
      setShowLockModal(true);
    }
  };

  const currentSimCase = unit.simulationCases && unit.simulationCases[selectedSimCaseIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Unit Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-4 relative overflow-hidden shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              Unit Pembelajaran {unit.unitNumber}
            </span>
            {isUnitFullyCompleted ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seluruh Bagian Unit Selesai</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 backdrop-blur-md">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Lengkapi Seluruh Bagian Unit</span>
              </span>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('single-page')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'single-page'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Satu Halaman Penuh</span>
            </button>
            <button
              onClick={() => setViewMode('tabs')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'tabs'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mode Tab</span>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            {unit.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed mt-1">
            {unit.subtitle}
          </p>
        </div>

        {/* Tujuan Pembelajaran Unit Header */}
        {unit.learningObjectives && unit.learningObjectives.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-400/30 text-blue-100 text-xs space-y-2 backdrop-blur-md">
            <span className="font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              🎯 Tujuan Pembelajaran Unit {unit.unitNumber}:
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] sm:text-xs">
              {unit.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                  <span className="text-slate-200 leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab Navigation Bar (Shown when viewMode === 'tabs') */}
        {viewMode === 'tabs' && (
          <div className="pt-3 flex items-center gap-2 overflow-x-auto border-t border-white/10 no-scrollbar">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>1. Video Pengantar {isVideoDone && '✓'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ringkasan')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'ringkasan'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>2. Ringkasan Poin</span>
            </button>

            <button
              onClick={() => setActiveTab('materi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'materi'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <BookText className="w-3.5 h-3.5 text-indigo-400" />
              <span>3. Materi Lengkap ({completedSubBabs.length}/{unit.sections?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('simulasi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'simulasi'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-teal-400" />
              <span>4. Simulasi Kasus {isSimulasiDone && '✓'}</span>
            </button>

            <button
              onClick={() => setActiveTab('kuis')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'kuis'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>5. Kuis Unit ({quizScore !== null ? `${quizScore}%` : unit.practiceQuiz.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('refleksi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'refleksi'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>6. Refleksi {isRefleksiDone && '✓'}</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'checklist'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10 backdrop-blur-md'
              }`}
            >
              <ListCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>7. Lembar Kerja ({checkedItems.length}/{unit.checklistItems.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* SECTION 1: VIDEO PENGANTAR (PERTAMA!) */}
      {(viewMode === 'single-page' || activeTab === 'video') && (
        <div id="sec-video" className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h3 className="font-bold text-white text-xl">1. Video Pengantar Instruktur</h3>
                <p className="text-xs text-slate-400">Tonton video pengantar resmi dari instruktur sebelum mempelajari ringkasan dan uraian materi.</p>
              </div>
            </div>
            {isVideoWatched && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> Video Telah Ditonton
              </span>
            )}
          </div>

          <UniversalVideoPlayer
            video={unit.video}
            isWatched={isVideoWatched}
            onMarkWatched={handleMarkVideoWatched}
            allowEdit={true}
          />

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                handleMarkVideoWatched();
                scrollToSection('sec-ringkasan', 'ringkasan');
              }}
              className={`px-5 py-2.5 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md border ${
                isVideoDone
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400/30'
              }`}
            >
              <span>{isVideoDone ? '✓ Selesai Nonton Video — Lanjut ke Ringkasan' : 'Selesai Nonton Video — Lanjut ke Ringkasan Poin Utama'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: RINGKASAN POIN UTAMA (KEDUA!) */}
      {(viewMode === 'single-page' || activeTab === 'ringkasan') && (
        <div id="sec-ringkasan" className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="font-bold text-white text-xl">2. Ringkasan Poin Utama Pembelajaran</h3>
              <p className="text-xs text-slate-400">Poin-poin kunci yang wajib dikuasai pada Unit {unit.unitNumber}.</p>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.summaryPoints.map((pt, idx) => (
              <li key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex items-start gap-3 backdrop-blur-md text-slate-200 text-xs sm:text-sm leading-relaxed">
                <span className="w-7 h-7 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-400/30 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => scrollToSection('sec-materi', 'materi')}
              className="px-5 py-2.5 bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md border border-indigo-400/30"
            >
              <span>Selesai Baca Ringkasan — Lanjut ke Uraian Materi Lengkap</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: URAIAN MATERI PEMBELAJARAN LENGKAP (DENGAN BACA SUARA KHUSUS PER SUB-BAB) */}
      {(viewMode === 'single-page' || activeTab === 'materi') && (
        <div id="sec-materi" className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300">
                  <BookText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">3. Uraian Materi Pembelajaran Lengkap</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    Modul baca interaktif dengan fitur <strong>Baca Suara (Text-to-Speech)</strong> dan penanda selesai per sub-bab.
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 font-black bg-indigo-100 dark:bg-indigo-900/80 px-4 py-1.5 rounded-full border-2 border-indigo-300 dark:border-indigo-500 shadow-sm">
                Sub-Bab Selesai: {completedSubBabs.length} / {unit.sections?.length || 0}
              </span>
            </div>
          </div>

          {unit.sections && unit.sections.length > 0 ? (
            unit.sections.map((sec, secIdx) => {
              const isSubBabDone = completedSubBabs.includes(sec.id);
              const isCurrentSpeaking = activeSpeakingSecId === sec.id && isSpeaking;

              // Text content for speech synthesis (direct paragraphs + takeaway without subtitle)
              const subBabSpeechText = `${sec.paragraphs.join(' ')}. ${sec.keyTakeaway ? `Kesimpulan utama: ${sec.keyTakeaway}` : ''}`;

              return (
                <div 
                  key={sec.id} 
                  className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 space-y-5 shadow-xl relative ${
                    isCurrentSpeaking
                      ? 'bg-amber-100 dark:bg-amber-950/90 border-amber-500 ring-4 ring-amber-400 shadow-2xl shadow-amber-500/20'
                      : isSubBabDone
                        ? 'bg-white dark:bg-slate-900 border-emerald-500/80'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Sub-Bab Header & Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-2xl font-black text-sm flex items-center justify-center shadow-md ${
                        isSubBabDone ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-600 text-white'
                      }`}>
                        {secIdx + 1}
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {sec.subTitle}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Text To Speech Engine Button for this Sub-Bab */}
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-2 rounded-2xl border-2 border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 shadow-sm">
                        {/* Speed selector */}
                        <div className="flex items-center gap-1 border-r-2 border-slate-300 dark:border-slate-800 pr-2">
                          <span className="text-[10px] text-slate-700 dark:text-slate-300 font-extrabold uppercase">Kecepatan:</span>
                          {[1, 1.5, 2].map(r => (
                            <button
                              key={r}
                              onClick={() => handleChangeRate(r, sec.id, subBabSpeechText)}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                                speechRate === r ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                              }`}
                            >
                              {r}x
                            </button>
                          ))}
                        </div>

                        {!isCurrentSpeaking ? (
                          <button
                            onClick={() => handleStartSubBabSpeech(sec.id, subBabSpeechText)}
                            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl transition-all text-xs flex items-center gap-1.5 shadow-md border-2 border-amber-500"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Baca Suara</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={handlePauseResumeSpeech}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm"
                            >
                              {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
                              <span>{isPaused ? 'Lanjut' : 'Jeda'}</span>
                            </button>
                            <button
                              onClick={handleStopSpeech}
                              className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm"
                            >
                              <Square className="w-3.5 h-3.5 fill-white" />
                              <span>Stop</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Sub-Bab Completion Toggle */}
                      <button
                        onClick={() => handleToggleSubBabCompleted(sec.id)}
                        className={`px-3.5 py-2 rounded-2xl font-black text-xs flex items-center gap-2 transition-all shadow-sm ${
                          isSubBabDone
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-300 border-2 border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isSubBabDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                        <span>{isSubBabDone ? 'Selesai Dibaca ✓' : 'Tandai Selesai'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Speech Playing Indicator Bar */}
                  {isCurrentSpeaking && (
                    <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-between border-2 border-amber-600 shadow-lg animate-pulse">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-slate-950 animate-bounce" />
                        <span className="text-sm">🔊 Suara Narator Aktif — Membaca Paragraf Berwarna Kuning Terang di Bawah:</span>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-950 text-amber-300 px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wider">
                        MEMBACA...
                      </span>
                    </div>
                  )}

                  {/* Sub-Bab Paragraph Content */}
                  <div className="space-y-5 text-base sm:text-lg leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => {
                      const isCurrentSpeaking = activeSpeakingSecId === sec.id && isSpeaking;

                      // Check if paragraph contains bulleted or numbered list items
                      const lines = p.split('\n');
                      const isListParagraph = lines.length > 1 && lines.some(l => /^(?:[0-9]+\.|\u2022|\-|\*)/.test(l.trim()));

                      return (
                        <div 
                          key={pIdx} 
                          className={`p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 whitespace-pre-line relative overflow-hidden shadow-sm ${
                            isCurrentSpeaking
                              ? 'bg-amber-300 text-slate-950 dark:bg-amber-400 dark:text-slate-950 font-black border-4 border-amber-600 shadow-2xl ring-4 ring-amber-400 scale-[1.01]'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium'
                          }`}
                        >
                          {isCurrentSpeaking && (
                            <div className="mb-3 flex items-center justify-between text-xs sm:text-sm font-mono font-black text-slate-950 border-b-2 border-slate-950/20 pb-2">
                              <span className="flex items-center gap-2 uppercase tracking-wider">
                                <Volume2 className="w-5 h-5 text-slate-950 animate-bounce" />
                                Sedang Dibaca Bersuara (Paragraf {pIdx + 1})...
                              </span>
                              <div className="w-32 h-2.5 bg-slate-950/30 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-950 animate-pulse w-full" />
                              </div>
                            </div>
                          )}

                          {isListParagraph && !isCurrentSpeaking ? (
                            <div className="space-y-3">
                              {lines.map((line, lIdx) => {
                                const trimmed = line.trim();
                                if (!trimmed) return null;

                                const isScenarioCase = trimmed.includes('->');
                                const isBulletItem = /^(?:[0-9]+\.|\u2022|\-|\*)/.test(trimmed);
                                const cleanText = trimmed.replace(/^(?:[0-9]+\.|\u2022|\-|\*)\s*/, '').trim();
                                const isHeaderLine = !isScenarioCase && (
                                  cleanText.endsWith(':') || 
                                  (!isBulletItem && /^(Ciri|Tantangan|Peluang|Alat|Jenis|Panduan|Langkah|Skenario|Penggunaan|Bentuk|Game|Kasus)/i.test(cleanText))
                                );

                                if (isHeaderLine) {
                                  return (
                                    <div key={lIdx} className="pt-3 pb-2 border-b-2 border-indigo-200 dark:border-indigo-800/80 mb-3 mt-1">
                                      <h5 className="font-black text-base sm:text-lg text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                                        <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                                        <span>{cleanText.endsWith(':') ? cleanText : `${cleanText}:`}</span>
                                      </h5>
                                    </div>
                                  );
                                }

                                // Interactive Scenario Cases & Game Items Renderer (Kasus, Skenario, Game)
                                if (isScenarioCase) {
                                  const parts = trimmed.split('->');
                                  const questionText = parts[0].replace(/^(?:[0-9]+\.|\u2022|\-|\*)\s*/, '').replace(/:$/, '').trim();
                                  const answerText = parts.slice(1).join('->').replace(/:$/, '').trim();
                                  const scenarioKey = `${sec.id}-p${pIdx}-l${lIdx}`;
                                  const isOpen = !!openScenarioAnswers[scenarioKey];

                                  const upperAns = answerText.toUpperCase();
                                  const isFilter = upperAns.includes('FILTER');
                                  const isShare = upperAns.includes('SHARE');
                                  const isNegative = isFilter || /YA|HOAKS|BERBAHAYA|PELANGGARAN|DISINFORMASI|MISINFORMASI|SALAH/.test(upperAns);

                                  let statusBadgeText = '✅ STATUS: ETIS / VALID / AMAN';
                                  let statusBadgeBg = 'bg-emerald-600 text-white';
                                  let answerBoxStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100';

                                  if (isFilter) {
                                    statusBadgeText = '🛡️ KEPUTUSAN: FILTER (TAHAN)';
                                    statusBadgeBg = 'bg-amber-600 text-white';
                                    answerBoxStyle = 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100';
                                  } else if (isShare) {
                                    statusBadgeText = '🚀 KEPUTUSAN: SHARE (BAGIKAN)';
                                    statusBadgeBg = 'bg-indigo-600 text-white';
                                    answerBoxStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-100';
                                  } else if (isNegative) {
                                    statusBadgeText = '🚨 STATUS: PELANGGARAN / HOAKS / RISIKO';
                                    statusBadgeBg = 'bg-rose-600 text-white';
                                    answerBoxStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100';
                                  }

                                  return (
                                    <div key={lIdx} className="my-2.5 p-4 sm:p-5 rounded-2xl border-2 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-950 border-indigo-200 dark:border-indigo-800/60 shadow-sm space-y-3">
                                      <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 shadow-xs">
                                          <HelpCircle className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                            <span>Skenario Game / Studi Kasus Interaktif</span>
                                          </span>
                                          <p className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug">
                                            {questionText}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Interactive Answer Button */}
                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => setOpenScenarioAnswers(prev => ({ ...prev, [scenarioKey]: !prev[scenarioKey] }))}
                                          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-between transition-all cursor-pointer shadow-xs ${
                                            isOpen 
                                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:scale-[1.005]'
                                          }`}
                                        >
                                          <span className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-amber-300" />
                                            <span>{isOpen ? 'Tutup Jawaban Keputusan' : '🔍 Ketuk untuk Lihat Keputusan Game / Skenario'}</span>
                                          </span>
                                          <span className="text-xs font-mono">{isOpen ? '▲' : '➔'}</span>
                                        </button>

                                        {/* Answer Box */}
                                        {isOpen && (
                                          <div className={`mt-3 p-4 rounded-xl border-2 animate-fadeIn space-y-2 ${answerBoxStyle}`}>
                                            <div className="flex items-center gap-2">
                                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusBadgeBg}`}>
                                                {statusBadgeText}
                                              </span>
                                              <span className="font-mono text-[11px] font-bold opacity-80">
                                                Analisis Edukatif
                                              </span>
                                            </div>
                                            <p className="font-extrabold text-sm sm:text-base leading-relaxed">
                                              {answerText}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }

                                const matchNumber = trimmed.match(/^([0-9]+)\./);
                                const num = matchNumber ? matchNumber[1] : null;

                                return (
                                  <div key={lIdx} className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-3 border-indigo-500/40 dark:border-indigo-400/40 my-2">
                                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium flex items-start gap-3 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                                      {num ? (
                                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                          {num}
                                        </span>
                                      ) : (
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2" />
                                      )}
                                      <p className="leading-relaxed">{cleanText}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className={isCurrentSpeaking ? 'text-slate-950 text-base sm:text-lg leading-relaxed font-black' : 'text-slate-900 dark:text-slate-100 text-base sm:text-lg font-medium leading-relaxed'}>
                              {p}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Render Visual Concept Cards ("Kotak-Kotak Framework / Konsep") */}
                  {sec.conceptCards && sec.conceptCards.length > 0 && (
                    <div className="space-y-4 my-6">
                      <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200">
                        <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <h5 className="font-black text-base sm:text-lg tracking-tight uppercase">
                          💡 Kerangka & Konsep Penting (Kotak Panduan Interaktif)
                        </h5>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {sec.conceptCards.map((card, cIdx) => {
                          const themeColor = card.color || 'indigo';
                          const themeStyles = {
                            indigo: 'bg-indigo-50/90 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-100',
                            emerald: 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100',
                            amber: 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100',
                            rose: 'bg-rose-50/90 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-100',
                            purple: 'bg-purple-50/90 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-100',
                            blue: 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-300 dark:border-blue-700 text-blue-950 dark:text-blue-100',
                            teal: 'bg-teal-50/90 dark:bg-teal-950/80 border-teal-300 dark:border-teal-700 text-teal-950 dark:text-teal-100'
                          }[themeColor];

                          const badgeBg = {
                            indigo: 'bg-indigo-600 text-white',
                            emerald: 'bg-emerald-600 text-white',
                            amber: 'bg-amber-500 text-slate-950 font-black',
                            rose: 'bg-rose-600 text-white',
                            purple: 'bg-purple-600 text-white',
                            blue: 'bg-blue-600 text-white',
                            teal: 'bg-teal-600 text-white'
                          }[themeColor];

                          return (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={() => setActiveConceptModal({
                                title: card.title,
                                subtitle: card.subtitle,
                                badge: card.badge,
                                description: card.description,
                                letterOrNumber: card.letterOrNumber,
                                color: card.color
                              })}
                              className={`p-5 sm:p-6 rounded-2xl border-2 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all space-y-3 relative overflow-hidden text-left cursor-pointer group ${themeStyles}`}
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2.5">
                                <div className="flex items-center gap-3">
                                  {card.letterOrNumber && (
                                    <span className={`w-9 h-9 rounded-xl ${badgeBg} font-black text-sm sm:text-base flex items-center justify-center shadow-sm shrink-0`}>
                                      {card.letterOrNumber}
                                    </span>
                                  )}
                                  <div>
                                    <h6 className="font-black text-base sm:text-lg tracking-tight leading-snug group-hover:underline">
                                      {card.title}
                                    </h6>
                                    {card.subtitle && (
                                      <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                                        {card.subtitle}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {card.badge && (
                                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${badgeBg} shadow-xs`}>
                                    {card.badge}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs sm:text-sm font-semibold leading-relaxed opacity-95">
                                {card.description}
                              </p>

                              <div className="pt-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider opacity-80 border-t border-black/5 dark:border-white/5">
                                <span className="flex items-center gap-1.5 text-indigo-700 dark:text-amber-300">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Ketuk untuk Penjelasan Lengkap</span>
                                </span>
                                <span>Detail ➔</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Render Visual Interactive Diagram & Infographic ("Panduan Gambar & Diagram Interaktif") */}
                  {sec.interactiveDiagram && (
                    <div className="my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 text-slate-100 border-2 border-indigo-500/40 shadow-2xl space-y-6 relative overflow-hidden">
                      {/* Background Gradient Effect */}
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Panduan Visual & Diagram Interaktif</span>
                          </div>
                          <h5 className="font-black text-xl sm:text-2xl text-white tracking-tight">
                            {sec.interactiveDiagram.title}
                          </h5>
                          {sec.interactiveDiagram.subtitle && (
                            <p className="text-xs sm:text-sm text-slate-300 font-medium">
                              {sec.interactiveDiagram.subtitle}
                            </p>
                          )}
                        </div>

                        {sec.interactiveDiagram.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightboxImage({
                              url: sec.interactiveDiagram!.imageUrl!,
                              caption: sec.interactiveDiagram!.imageCaption,
                              title: sec.interactiveDiagram!.title
                            })}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer"
                          >
                            <ZoomIn className="w-4 h-4" />
                            <span>Perbesar Gambar Infografis</span>
                          </button>
                        )}
                      </div>

                      {/* Visual Banner Image (If URL exists) */}
                      {sec.interactiveDiagram.imageUrl && (
                        <div 
                          onClick={() => setLightboxImage({
                            url: sec.interactiveDiagram!.imageUrl!,
                            caption: sec.interactiveDiagram!.imageCaption,
                            title: sec.interactiveDiagram!.title
                          })}
                          className="group relative rounded-2xl overflow-hidden border-2 border-white/15 cursor-pointer shadow-xl max-h-80 bg-slate-950"
                        >
                          <img 
                            src={sec.interactiveDiagram.imageUrl} 
                            alt={sec.interactiveDiagram.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4 sm:p-6 transition-all">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs sm:text-sm font-black text-white flex items-center gap-2 drop-shadow-md">
                                <Eye className="w-4 h-4 text-amber-400" />
                                {sec.interactiveDiagram.imageCaption || 'Klik untuk melihat gambar panduan ukuran penuh'}
                              </span>
                              <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                                Zoom HD 🔍
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Interactive Step Navigator */}
                      {sec.interactiveDiagram.steps && sec.interactiveDiagram.steps.length > 0 && (
                        <div className="space-y-6 relative z-10">
                          <h6 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>Pilih Langkah Diagram untuk Membuka Tindakan Detail:</span>
                          </h6>

                          {/* Steps Selector Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {sec.interactiveDiagram.steps.map((st, stIdx) => {
                              const diagramKey = sec.interactiveDiagram!.id;
                              const currentSelectedIdx = activeDiagramStep[diagramKey] ?? 0;
                              const isSelected = currentSelectedIdx === stIdx;

                              return (
                                <button
                                  key={stIdx}
                                  type="button"
                                  onClick={() => setActiveDiagramStep(prev => ({ ...prev, [diagramKey]: stIdx }))}
                                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                                    isSelected 
                                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 border-white text-slate-950 font-black shadow-xl ring-4 ring-amber-400/40 scale-105' 
                                      : 'bg-slate-950/80 hover:bg-slate-800/90 border-white/10 text-slate-200 font-semibold'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center ${
                                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-slate-300'
                                    }`}>
                                      {st.stepNumber}
                                    </span>
                                    {st.badge && (
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                        isSelected ? 'bg-slate-950/80 text-white' : 'bg-indigo-500/30 text-indigo-300'
                                      }`}>
                                        {st.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs sm:text-sm font-black leading-snug">
                                    {st.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Selected Step Detail Panel */}
                          {(() => {
                            const diagramKey = sec.interactiveDiagram.id;
                            const currentSelectedIdx = activeDiagramStep[diagramKey] ?? 0;
                            const activeStepObj = sec.interactiveDiagram.steps[currentSelectedIdx] || sec.interactiveDiagram.steps[0];

                            return (
                              <div className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-400/60 shadow-2xl space-y-4 animate-fadeIn">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center shadow-md">
                                      {activeStepObj.stepNumber}
                                    </span>
                                    <div>
                                      <h6 className="font-black text-lg text-white">
                                        {activeStepObj.title}
                                      </h6>
                                      <p className="text-xs text-amber-300 font-bold">
                                        {activeStepObj.description}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                                    Tahapan Aktif ✓
                                  </span>
                                </div>

                                {activeStepObj.details && activeStepObj.details.length > 0 && (
                                  <div className="space-y-2.5 pt-1">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                                      Panduan Tindakan Konkrit:
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      {activeStepObj.details.map((dt, dIdx) => (
                                        <div key={dIdx} className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed flex items-start gap-2.5 shadow-sm">
                                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                          <span>{dt}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Render Table Data if present */}
                  {sec.tableData && (
                    <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                      {sec.tableData.title && (
                        <div className="flex items-center gap-2 text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                          <Table className="w-4 h-4 text-indigo-500" />
                          <span>{sec.tableData.title}</span>
                        </div>
                      )}
                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-extrabold uppercase tracking-wider">
                              {sec.tableData.headers.map((head, hIdx) => (
                                <th key={hIdx} className="p-3 border-b border-indigo-800 whitespace-nowrap">
                                  {head}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                            {sec.tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-100/60 dark:bg-slate-950/60'}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3 leading-relaxed">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {sec.keyTakeaway && (
                    <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-400 dark:border-amber-600 flex items-start gap-3.5 shadow-sm text-amber-950 dark:text-amber-100">
                      <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <strong className="text-amber-900 dark:text-amber-200 block mb-1 font-black text-sm">Poin Kunci & Kesimpulan Sub-Materi:</strong>
                        <span className="font-semibold leading-relaxed">{sec.keyTakeaway}</span>
                      </div>
                    </div>
                  )}

                  {sec.exampleOrCase && (
                    <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border-2 border-indigo-300 dark:border-indigo-600 space-y-2 shadow-sm text-indigo-950 dark:text-indigo-100">
                      <span className="px-3 py-1 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-950 dark:text-indigo-200 text-xs font-black border border-indigo-400 inline-block">
                        {sec.exampleOrCase.title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed whitespace-pre-line">
                        {sec.exampleOrCase.description}
                      </p>
                      <p className="text-xs text-indigo-900 dark:text-indigo-200 font-bold italic border-t border-indigo-300 dark:border-indigo-700/50 pt-2">
                        💡 Catatan Pembelajaran: {sec.exampleOrCase.takeaway}
                      </p>
                    </div>
                  )}

                  {/* Render Interactive Case Discussion Box if present */}
                  {sec.caseDiscussion && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-300 dark:border-indigo-700/80 space-y-4 shadow-md text-slate-900 dark:text-slate-100">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200 dark:border-indigo-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <h5 className="font-black text-sm sm:text-base text-indigo-950 dark:text-indigo-100">
                            💬 Pertanyaan Diskusi Kasus Sub-Bab
                          </h5>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 text-[11px] font-extrabold border border-indigo-300 dark:border-indigo-700">
                          📌 Opsional (Tidak Wajib)
                        </span>
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                          {sec.caseDiscussion.question}
                        </p>

                        <div className="space-y-2 pt-1">
                          <label className="block text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                            Jawaban Diskusi Peserta (Tuliskan analisis atau solusimu di bawah):
                          </label>
                          <textarea
                            rows={3}
                            value={caseDiscussionAnswers[sec.id] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCaseDiscussionAnswers(prev => {
                                const updated = { ...prev, [sec.id]: val };
                                try {
                                  localStorage.setItem(`case_discussion_ans_${unit.id}`, JSON.stringify(updated));
                                } catch (err) {}
                                return updated;
                              });
                            }}
                            placeholder="Ketik analisis jawaban diskusimu di sini (opsional, tidak wajib jawab)..."
                            className="w-full p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                          />

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 italic">
                              *Ketik jawaban analisis di atas lalu klik Koreksi Otomatis untuk mengecek kata kunci etika.
                            </span>
                            <button
                              type="button"
                              onClick={() => handleEvaluateCaseDiscussion(sec.id, sec.caseDiscussion!)}
                              disabled={!caseDiscussionAnswers[sec.id]?.trim()}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                            >
                              <Sparkles className="w-4 h-4 text-amber-300" />
                              <span>Kirim & Koreksi Otomatis</span>
                            </button>
                          </div>
                        </div>

                        {caseDiscussionEvaluations[sec.id] && (
                          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-600 space-y-3 shadow-lg mt-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                              <span className="font-black text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                                🎯 Hasil Koreksi Otomatis Jawaban Diskusi:
                              </span>
                              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs border border-emerald-400">
                                Skor Analisis: {caseDiscussionEvaluations[sec.id].score}/100
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                              {caseDiscussionEvaluations[sec.id].feedback}
                            </p>

                            {caseDiscussionEvaluations[sec.id].matchedKeyPoints.length > 0 && (
                              <div className="space-y-1 bg-indigo-50 dark:bg-indigo-950/60 p-3 rounded-lg text-xs">
                                <strong className="block font-black text-indigo-900 dark:text-indigo-200 uppercase text-[11px]">
                                  ✓ Poin Kunci Etika yang Telah Terakup dalam Jawabanmu:
                                </strong>
                                <ul className="list-disc list-inside space-y-0.5 text-indigo-950 dark:text-indigo-100 font-medium">
                                  {caseDiscussionEvaluations[sec.id].matchedKeyPoints.map((kp, kIdx) => (
                                    <li key={kIdx}>{kp}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {sec.caseDiscussion.sampleAnswer && (
                              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                                <strong className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                                  💡 Kunci Jawaban & Rubrik Acuan Ideal:
                                </strong>
                                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-300 dark:border-amber-800">
                                  {sec.caseDiscussion.sampleAnswer}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-sm italic">Uraian materi lengkap tersedia di ringkasan dan bab terkait.</p>
          )}

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-700 text-center space-y-3 shadow-xl">
            <h4 className="text-base font-black text-slate-900 dark:text-indigo-200">Sudah Selesai Membaca Semua Sub-Bab Materi?</h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {!isMateriDone && (
                <button
                  onClick={() => {
                    const allIds = (unit.sections || []).map(s => s.id);
                    setCompletedSubBabs(allIds);
                    try {
                      localStorage.setItem(`completed_subbabs_${unit.id}`, JSON.stringify(allIds));
                    } catch (e) {}
                  }}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-950 dark:text-indigo-300 font-black text-xs rounded-xl border-2 border-indigo-300 dark:border-indigo-500 transition-all shadow-sm"
                >
                  Tandai Semua Sub-Bab Selesai Dibaca ✓
                </button>
              )}
              <button
                onClick={() => {
                  const allIds = (unit.sections || []).map(s => s.id);
                  setCompletedSubBabs(allIds);
                  try {
                    localStorage.setItem(`completed_subbabs_${unit.id}`, JSON.stringify(allIds));
                  } catch (e) {}
                  scrollToSection('sec-simulasi', 'simulasi');
                }}
                className={`px-6 py-2.5 font-black text-xs rounded-xl transition-all shadow-lg border-2 flex items-center gap-2 ${
                  isMateriDone
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                    : 'bg-teal-600 hover:bg-teal-500 text-white border-teal-400'
                }`}
              >
                <span>{isMateriDone ? '✓ Selesai Baca Semua Materi — Lanjut ke Simulasi' : 'Selesai Baca Semua Materi — Lanjut ke Simulasi Kasus'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SIMULASI KASUS INTERAKTIF (KEEMPAT!) */}
      {(viewMode === 'single-page' || activeTab === 'simulasi') && (
        <div id="sec-simulasi" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-100 dark:bg-teal-950 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">4. Simulasi Kasus Interaktif</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">Pilih skenario kasus di bawah, klik opsi tindakan, dan analisis umpan balik serta rekomendasi etika.</p>
              </div>
            </div>
            {isSimulasiDone && (
              <span className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-300 font-black flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/80 px-4 py-1.5 rounded-full border-2 border-emerald-500 shadow-sm">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" /> Simulasi Selesai
              </span>
            )}
          </div>

          {unit.simulationCases && unit.simulationCases.length > 0 ? (
            <div className="space-y-6">
              {/* Case Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {unit.simulationCases.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedSimCaseIndex(idx)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-2 shadow-sm ${
                      selectedSimCaseIndex === idx
                        ? 'bg-teal-700 text-white shadow-lg border-2 border-teal-500 ring-2 ring-teal-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>Kasus {idx + 1}: {sc.title}</span>
                    {selectedSimOptions[sc.id] && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                ))}
              </div>

              {/* Active Case Details */}
              {currentSimCase && (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 space-y-6 text-slate-900 dark:text-slate-100 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-teal-200 dark:bg-teal-900 text-teal-950 dark:text-teal-100 text-xs font-black border-2 border-teal-400 dark:border-teal-600 inline-block shadow-sm">
                        Skenario Kasus {selectedSimCaseIndex + 1}
                      </span>
                      {currentSimCase.contextBadge && (
                        <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 text-xs font-extrabold border border-indigo-300 dark:border-indigo-700 inline-block shadow-sm">
                          📌 {currentSimCase.contextBadge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {currentSimCase.title}
                    </h4>

                    {/* Scenario Description */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                        Deskripsi Skenario Kasus:
                      </span>
                      <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm whitespace-pre-line">
                        {currentSimCase.scenarioDescription || (currentSimCase as any).scenario || 'Deskripsi skenario kasus belum tersedia.'}
                      </div>
                    </div>

                    {/* Evidence Items / Indikator Kasus */}
                    {currentSimCase.evidenceItems && currentSimCase.evidenceItems.length > 0 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700/60 space-y-2 shadow-sm">
                        <strong className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase tracking-wider">
                          🔍 Indikator & Bukti Analisis Kasus:
                        </strong>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-semibold">
                          {currentSimCase.evidenceItems.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Pilihan Tindakan (Klik salah satu opsi jawaban di bawah):
                    </label>
                    <div className="space-y-3">
                      {currentSimCase.options.map((opt) => {
                        const isSelected = selectedSimOptions[currentSimCase.id] === opt.id;
                        const optionText = opt.actionText || (opt as any).text || '';
                        const feedbackTitle = opt.feedbackTitle || (opt.isCorrect ? '✅ Tindakan Tepat (Sesuai Etika):' : '⚠️ Perlu Evaluasi (Kurang Tepat):');
                        const feedbackDesc = opt.feedbackDescription || (opt as any).feedback || '';

                        return (
                          <div key={opt.id} className="space-y-2">
                            <button
                              onClick={() => {
                                setSelectedSimOptions(prev => ({ ...prev, [currentSimCase.id]: opt.id }));
                              }}
                              className={`w-full text-left p-5 rounded-2xl border-2 text-xs sm:text-sm font-extrabold transition-all flex items-start justify-between gap-4 shadow-sm ${
                                isSelected
                                  ? opt.isCorrect
                                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 shadow-md'
                                    : 'bg-rose-100 dark:bg-rose-950 border-rose-600 dark:border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500 shadow-md'
                                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-teal-50 dark:hover:bg-slate-800 hover:border-teal-500'
                              }`}
                            >
                              <span className="leading-relaxed text-slate-900 dark:text-slate-100 font-bold">{optionText}</span>
                              {isSelected && (
                                <span className="shrink-0 mt-0.5">
                                  {opt.isCorrect ? (
                                    <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                  ) : (
                                    <X className="w-5 h-5 text-rose-700 dark:text-rose-400" />
                                  )}
                                </span>
                              )}
                            </button>

                            {/* Option Feedback */}
                            {isSelected && (
                              <div className={`p-5 rounded-2xl text-xs sm:text-sm space-y-3 border-2 shadow-md ${
                                opt.isCorrect 
                                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100' 
                                  : 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100'
                              }`}>
                                <strong className="block font-black text-sm sm:text-base">
                                  {feedbackTitle}
                                </strong>
                                <p className="leading-relaxed font-bold text-slate-900 dark:text-slate-100">{feedbackDesc}</p>

                                {opt.recommendedSteps && opt.recommendedSteps.length > 0 && (
                                  <div className="border-t border-slate-300 dark:border-slate-700/60 pt-3 mt-2 space-y-1.5">
                                    <strong className="text-xs font-black uppercase tracking-wider block">
                                      💡 Rekomendasi Langkah Etis:
                                    </strong>
                                    <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-900 dark:text-slate-100">
                                      {opt.recommendedSteps.map((step, sIdx) => (
                                        <li key={sIdx}>{step}</li>
                                      ))}
                                    </ol>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-sm italic">Tidak ada kasus simulasi khusus untuk unit ini.</p>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => scrollToSection('sec-kuis', 'kuis')}
              className={`px-5 py-2.5 font-black text-xs rounded-xl transition-all flex items-center gap-2 shadow-md border ${
                isSimulasiDone
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                  : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400/30'
              }`}
            >
              <span>{isSimulasiDone ? '✓ Selesai Simulasi — Lanjut ke Kuis' : 'Selesai Simulasi — Lanjut ke Kuis Latihan Unit'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: KUIS LATIHAN INTERAKTIF (KELIMA!) */}
      {(viewMode === 'single-page' || activeTab === 'kuis') && (
        <div id="sec-kuis" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">5. Kuis Latihan Unit {unit.unitNumber}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Jawab seluruh pertanyaan di bawah untuk mengukur pemahaman konsep Anda.</p>
            </div>
            {quizScore !== null && (
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-black tracking-wider">Nilai Terakhir</span>
                <span className={`font-black text-2xl ${quizScore >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {quizScore}%
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleQuizSubmit} className="space-y-6">
            {unit.practiceQuiz.map((q, qIdx) => (
              <div key={q.id} className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <p className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-relaxed">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isChecked = userAnswers[qIdx] === optIdx;
                    return (
                      <label
                        key={optIdx}
                        className={`p-4 rounded-xl border-2 text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-indigo-100 dark:bg-indigo-950/80 border-indigo-600 dark:border-indigo-500 text-indigo-950 dark:text-indigo-100 font-extrabold shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz_q_${qIdx}`}
                          checked={isChecked}
                          onChange={() => setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="leading-relaxed">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Explanation after submission */}
                {quizSubmitted && (
                  <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-1 border-2 shadow-sm ${
                    userAnswers[qIdx] === q.correctAnswerIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                      : 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-950 dark:text-rose-100'
                  }`}>
                    <strong className="block font-black text-sm">
                      {userAnswers[qIdx] === q.correctAnswerIndex ? '✓ Jawaban Anda Benar!' : '✕ Jawaban Kurang Tepat.'}
                    </strong>
                    <p className="font-semibold">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
              >
                Submit Jawaban Kuis
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('sec-refleksi', 'refleksi')}
                className={`px-5 py-2.5 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md border-2 ${
                  isKuisDone
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400'
                }`}
              >
                <span>{isKuisDone ? '✓ Selesai Kuis — Lanjut ke Lembar Refleksi' : 'Selesai Kuis — Lanjut ke Lembar Refleksi'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 6: CATATAN REFLEKSI PESERTA (KEENAM!) */}
      {(viewMode === 'single-page' || activeTab === 'refleksi') && (
        <div id="sec-refleksi" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-slate-900 dark:text-slate-100">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 dark:text-white text-xl">6. Lembar Refleksi Pembelajaran</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Tuliskan pemikiran pribadi Anda mengenai relevansi etika informasi dalam kehidupan digital sehari-hari.</p>
          </div>

          <textarea
            rows={4}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            onBlur={handleSaveReflection}
            placeholder="Tuliskan refleksi Anda di sini (minimal 10 karakter)..."
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRequestAiFeedback}
              disabled={loadingAi || reflectionText.trim().length < 5}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>{loadingAi ? 'Menganalisis Refleksi...' : 'Dapatkan Umpan Balik AI'}</span>
            </button>

            <button
              onClick={() => {
                handleSaveReflection();
                scrollToSection('sec-checklist', 'checklist');
              }}
              className={`px-5 py-2.5 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md border-2 ${
                isRefleksiDone
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                  : 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400'
              }`}
            >
              <span>{isRefleksiDone ? '✓ Selesai Refleksi — Lanjut ke Lembar Kerja' : 'Selesai Refleksi — Lanjut ke Lembar Kerja & Checklist'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {aiFeedback && (
            <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/80 border-2 border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-100 text-xs sm:text-sm space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-black text-purple-900 dark:text-purple-200">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Umpan Balik Instruktur AI:</span>
              </div>
              <p className="whitespace-pre-line font-medium leading-relaxed">{aiFeedback}</p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 7: LEMBAR KERJA / CHECKLIST INTERAKTIF (KETUJUH!) */}
      {(viewMode === 'single-page' || activeTab === 'checklist') && (
        <div id="sec-checklist" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-slate-900 dark:text-slate-100">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 dark:text-white text-xl">7. Lembar Kerja & Checklist Pemahaman</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Tandai setiap poin yang telah berhasil Anda terapkan dalam kebiasaan digital Anda.</p>
          </div>

          <div className="space-y-2.5">
            {unit.checklistItems.map((item, idx) => {
              const isChecked = checkedItems.includes(item);
              return (
                <label
                  key={idx}
                  onClick={() => handleToggleChecklist(item)}
                  className={`p-4 rounded-xl border-2 text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="leading-relaxed">{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Unit Navigation & Progression Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl text-slate-900 dark:text-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">Status Kelengkapan Unit Pembelajaran {unit.unitNumber}</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              {isUnitFullyCompleted 
                ? '🎉 Selamat! Seluruh bagian pada Unit ini telah berhasil Anda selesaikan.' 
                : '⚠️ Anda harus menyelesaikan seluruh bagian di atas sebelum dapat melanjutkan ke Unit berikutnya.'}
            </p>
          </div>

          {/* Checklist Badge summary */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-extrabold">
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isVideoDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Video {isVideoDone ? '✓' : '✕'}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isMateriDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Materi {isMateriDone ? '✓' : '✕'}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isSimulasiDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Simulasi {isSimulasiDone ? '✓' : '✕'}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isKuisDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Kuis {isKuisDone ? '✓' : '✕'}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isRefleksiDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Refleksi {isRefleksiDone ? '✓' : '✕'}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border-2 ${isChecklistDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'}`}>
              Checklist {isChecklistDone ? '✓' : '✕'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {onPrevUnit ? (
            <button
              onClick={onPrevUnit}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-black flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Unit Sebelumnya</span>
            </button>
          ) : <div />}

          {onNextUnit ? (
            <button
              onClick={handleAttemptNextUnit}
              className={`px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-xl uppercase tracking-wider ${
                isUnitFullyCompleted
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 border-2 border-blue-400 transform hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {!isUnitFullyCompleted && <Lock className="w-4 h-4 text-amber-400" />}
              <span>Unit Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </div>
      </div>

      {/* Lock Warning Modal */}
      {showLockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-extrabold text-xl font-serif text-amber-300">
                Unit Belum Selesai Sepenuhnya
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anda wajib menyelesaikan seluruh aktivitas berikut sebelum dapat berpindah ke Unit Pembelajaran selanjutnya:
              </p>
            </div>

            <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span>1. Video Pengantar Instruktur</span>
                <span className={isVideoDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isVideoDone ? '✓ Selesai' : '✕ Belum Ditonton'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>2. Uraian Materi ({completedSubBabs.length}/{unit.sections?.length || 0} Sub-bab)</span>
                <span className={isMateriDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isMateriDone ? '✓ Selesai' : '✕ Belum Dibaca Semua'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>3. Simulasi Kasus Interaktif</span>
                <span className={isSimulasiDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isSimulasiDone ? '✓ Selesai' : '✕ Belum Dijawab'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>4. Kuis Latihan Unit</span>
                <span className={isKuisDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isKuisDone ? '✓ Selesai' : '✕ Belum Dikerjakan'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>5. Lembar Refleksi Pembelajaran</span>
                <span className={isRefleksiDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isRefleksiDone ? '✓ Selesai' : '✕ Belum Diisi'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>6. Lembar Kerja & Checklist</span>
                <span className={isChecklistDone ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {isChecklistDone ? '✓ Selesai' : '✕ Belum Dicentang'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  setShowLockModal(false);
                  if (!isVideoDone) scrollToSection('sec-video', 'video');
                  else if (!isMateriDone) scrollToSection('sec-materi', 'materi');
                  else if (!isSimulasiDone) scrollToSection('sec-simulasi', 'simulasi');
                  else if (!isKuisDone) scrollToSection('sec-kuis', 'kuis');
                  else if (!isRefleksiDone) scrollToSection('sec-refleksi', 'refleksi');
                  else if (!isChecklistDone) scrollToSection('sec-checklist', 'checklist');
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg uppercase tracking-wider"
              >
                Lanjutkan Mengerjakan Unit Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for HD Diagram Image Preview */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative max-w-5xl w-full bg-slate-900 border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950/80">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm sm:text-base">
                <ImageIcon className="w-5 h-5" />
                <span>{lightboxImage.title || 'Panduan Visual HD'}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Container */}
            <div className="p-4 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-slate-950">
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.title || 'Visual Guide'}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain rounded-xl border border-white/10 shadow-2xl"
              />
            </div>

            {/* Modal Footer Caption */}
            {lightboxImage.caption && (
              <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lightboxImage.caption}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shrink-0 transition-all cursor-pointer"
                >
                  Tutup Tampilan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Modal for Concept Cards Detail */}
      {activeConceptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-slate-900 border-2 border-indigo-500/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                {activeConceptModal.letterOrNumber && (
                  <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-md shrink-0">
                    {activeConceptModal.letterOrNumber}
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-black text-xl sm:text-2xl text-white">
                      {activeConceptModal.title}
                    </h5>
                    {activeConceptModal.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                        {activeConceptModal.badge}
                      </span>
                    )}
                  </div>
                  {activeConceptModal.subtitle && (
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-0.5">
                      {activeConceptModal.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveConceptModal(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-400 block flex items-center gap-1.5">
                  <BookText className="w-4 h-4" />
                  <span>Penjelasan & Karakteristik Utama:</span>
                </span>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-200">
                  {activeConceptModal.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 space-y-2">
                <span className="font-extrabold flex items-center gap-1.5 text-amber-300 uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rekomendasi Tindakan Etis:</span>
                </span>
                <p className="leading-relaxed">
                  Pahami konsep ini sebagai landasan sikap kritis saat berinteraksi di ruang digital. Terapkan prinsip verifikasi, integritas akademik, dan perlindungan privasi diri.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveConceptModal(null)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all cursor-pointer shadow-lg"
              >
                Paham & Tutup Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
