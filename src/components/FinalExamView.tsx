import React, { useState, useEffect } from 'react';
import { defaultFinalQuestions } from '../data/defaultData';
import { ProgressState, StudentProfile } from '../types';
import { Award, Timer, CheckCircle2, AlertTriangle, RefreshCw, Bookmark, FileCheck } from 'lucide-react';

interface FinalExamViewProps {
  progress: ProgressState;
  onSaveProgress: (updated: ProgressState) => void;
  profile: StudentProfile;
  minPassingScore?: number;
  onOpenCertificate: () => void;
}

export const FinalExamView: React.FC<FinalExamViewProps> = ({
  progress,
  onSaveProgress,
  profile,
  minPassingScore = 75,
  onOpenCertificate
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(progress.finalExamScore !== null);
  const [score, setScore] = useState<number | null>(progress.finalExamScore);
  const [passed, setPassed] = useState<boolean>(progress.finalExamPassed);

  // Timer: 20 minutes (1200 seconds)
  const [timeLeft, setTimeLeft] = useState(1200);

  // Sync state when student progress changes
  useEffect(() => {
    const currentScore = progress.finalExamScore;
    setScore(currentScore);
    setPassed(progress.finalExamPassed);
    setSubmitted(currentScore !== null);

    if (currentScore === null) {
      setAnswers({});
      setBookmarks([]);
      setCurrentIdx(0);
      setTimeLeft(1200);
    }
  }, [progress]);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleBookmark = (idx: number) => {
    setBookmarks(
      bookmarks.includes(idx) ? bookmarks.filter((i) => i !== idx) : [...bookmarks, idx]
    );
  };

  const handleSubmitExam = () => {
    let correct = 0;
    defaultFinalQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const finalScorePercentage = Math.round((correct / defaultFinalQuestions.length) * 100);
    const isPassed = finalScorePercentage >= minPassingScore;

    setScore(finalScorePercentage);
    setPassed(isPassed);
    setSubmitted(true);

    const issueDate = isPassed ? new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

    onSaveProgress({
      ...progress,
      finalExamScore: finalScorePercentage,
      finalExamPassed: isPassed,
      certificateIssuedDate: issueDate || progress.certificateIssuedDate
    });
  };

  const currentQ = defaultFinalQuestions[currentIdx];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-3 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold backdrop-blur-md">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Kuis Akhir & Evaluasi Pembelajaran</span>
          </div>

          {!submitted && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-white/15 text-amber-300 text-xs font-mono font-bold backdrop-blur-md">
              <Timer className="w-4 h-4 animate-pulse text-amber-400" />
              <span>Sisa Waktu: {formatTimer(timeLeft)}</span>
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ujian Evaluasi Kelulusan Modul
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Kerjakan 15 soal pilihan ganda berikut. Batas kelulusan minimal (Passing Grade) adalah <strong className="text-amber-400">{minPassingScore}%</strong> untuk mendapatkan Sertifikat Kelulusan Resmi.
        </p>

        {submitted && (
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/15 flex items-center gap-4 backdrop-blur-md">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Skor Evaluasi Akhir</span>
                <span className={`text-3xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {score} / 100
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {passed ? 'LULUS (PASSED)' : 'BELUM LULUS'}
              </span>
            </div>

            {passed && (
              <button
                onClick={onOpenCertificate}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 border border-emerald-400/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>Buka Sertifikat Kelulusan</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Exam Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Question Board */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-white text-sm">
              Soal No. {currentIdx + 1} dari {defaultFinalQuestions.length}
            </span>

            <button
              onClick={() => handleToggleBookmark(currentIdx)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all backdrop-blur-md ${
                bookmarks.includes(currentIdx)
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{bookmarks.includes(currentIdx) ? 'Tandai Ragu' : 'Ragu-ragu'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-white text-base sm:text-lg leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentIdx] === optIdx;
                const isCorrect = currentQ.correctAnswerIndex === optIdx;

                let optClass = 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10';
                if (submitted) {
                  if (isCorrect) optClass = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold';
                  else if (isSelected) optClass = 'bg-rose-500/20 border-rose-400 text-rose-200';
                } else if (isSelected) {
                  optClass = 'bg-blue-600/30 border-blue-400 text-white font-semibold shadow-sm';
                }

                return (
                  <label
                    key={optIdx}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all backdrop-blur-md ${optClass}`}
                  >
                    <input
                      type="radio"
                      name={`exam-q-${currentIdx}`}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [currentIdx]: optIdx })}
                      className="mt-0.5 text-blue-500 focus:ring-blue-400"
                    />
                    <span className="leading-relaxed">{opt}</span>
                  </label>
                );
              })}
            </div>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-xs text-blue-200 space-y-1 backdrop-blur-md">
                <strong className="font-bold text-blue-300 block">Penjelasan Jawaban:</strong>
                <p>{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold rounded-xl disabled:opacity-40 transition-all backdrop-blur-md"
            >
              Sebelumnya
            </button>

            {currentIdx < defaultFinalQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-500/20 border border-blue-400/30 transition-all"
              >
                Selanjutnya
              </button>
            ) : !submitted ? (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/25 border border-emerald-400/30 transition-all"
              >
                Kirim Lembar Ujian
              </button>
            ) : null}
          </div>
        </div>

        {/* Right Side: Question Navigation Matrix */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
          <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2">
            Matriks Lembar Jawab
          </h4>

          <div className="grid grid-cols-5 gap-2">
            {defaultFinalQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isBookmarked = bookmarks.includes(idx);
              const isCurrent = currentIdx === idx;

              let btnBg = 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10';
              if (isCurrent) btnBg = 'bg-blue-600 text-white font-bold border-blue-400 ring-2 ring-blue-500/50 shadow-md';
              else if (isBookmarked) btnBg = 'bg-amber-500/20 text-amber-300 border-amber-400/40 font-bold';
              else if (isAnswered) btnBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-semibold';

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`p-2.5 rounded-xl border text-xs text-center transition-all backdrop-blur-md ${btnBg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-2 text-[11px] text-slate-400 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-400/40" />
              <span>Sudah Dijawab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-400/40" />
              <span>Ragu-ragu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600 border border-blue-400" />
              <span>Soal Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
