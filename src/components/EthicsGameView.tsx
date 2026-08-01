import React, { useState } from 'react';
import { defaultEthicsScenarios } from '../data/defaultData';
import { ProgressState } from '../types';
import { Gamepad2, Award, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, HelpCircle } from 'lucide-react';

interface EthicsGameViewProps {
  progress: ProgressState;
  onSaveProgress: (updated: ProgressState) => void;
}

export const EthicsGameView: React.FC<EthicsGameViewProps> = ({
  progress,
  onSaveProgress
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(progress.ethicsGameCompleted);
  const [totalScore, setTotalScore] = useState<number>(progress.ethicsScore || 0);

  // Sync state when student progress changes
  React.useEffect(() => {
    setSubmitted(progress.ethicsGameCompleted);
    setTotalScore(progress.ethicsScore || 0);
    if (!progress.ethicsGameCompleted) {
      setSelectedAnswers({});
      setCurrentScenarioIndex(0);
    }
  }, [progress]);

  const scenario = defaultEthicsScenarios[currentScenarioIndex];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentScenarioIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentScenarioIndex < defaultEthicsScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
    }
  };

  const handleCalculateFinal = () => {
    let sum = 0;
    defaultEthicsScenarios.forEach((sc, idx) => {
      const selectedOptIdx = selectedAnswers[idx];
      if (selectedOptIdx !== undefined) {
        sum += sc.options[selectedOptIdx].score;
      }
    });

    const averageScore = Math.round(sum / defaultEthicsScenarios.length);
    setTotalScore(averageScore);
    setSubmitted(true);

    onSaveProgress({
      ...progress,
      ethicsGameCompleted: true,
      ethicsScore: averageScore
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-3 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold w-fit backdrop-blur-md">
          <Gamepad2 className="w-4 h-4 text-emerald-400" />
          <span>Survei & Game Etika Informasi</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Simulasi Dilema Etika Digital
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Uji kepekaan etika digital Anda melalui skenario realistis kehidupan cyber sehari-hari. Raih skor Etika Informasi dan pelajari pertimbangan rasional di setiap tindakan.
        </p>

        {submitted && (
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 border border-emerald-300">
              Skor Etika Digital: {totalScore} / 100
            </span>
            <span className="text-xs text-emerald-300 font-semibold">
              {totalScore >= 80 ? 'Warga Digital Teladan ✨' : 'Cukup Baik, Terus Tingkatkan Pemahaman Etika'}
            </span>
          </div>
        )}
      </div>

      {/* Scenario Game Board */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs flex items-center justify-center">
              {currentScenarioIndex + 1}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Skenario {currentScenarioIndex + 1} dari {defaultEthicsScenarios.length}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold">
            Kategori: {scenario.category}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
            {scenario.situation}
          </h3>
          <p className="text-xs text-slate-400 italic">Pilih tindakan yang menurut Anda paling bijak dan etis:</p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {scenario.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentScenarioIndex] === optIdx;

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all space-y-2 backdrop-blur-md ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-white font-medium ring-1 ring-emerald-400 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name={`scen-${currentScenarioIndex}`}
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-0.5 text-emerald-500 focus:ring-emerald-400"
                  />
                  <span className="leading-relaxed">{opt.text}</span>
                </div>

                {submitted && isSelected && (
                  <div className="pt-2 border-t border-emerald-500/30 text-xs text-slate-200 space-y-1">
                    <span className="font-bold text-emerald-300 block">Poin Etika: {opt.score} / 100</span>
                    <p className="italic text-slate-300">{opt.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tip Box */}
        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200 flex items-start gap-2 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block text-amber-300">Tips Etika Informasi:</strong>
            <span>{scenario.learningTip}</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentScenarioIndex === 0}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold rounded-xl disabled:opacity-40 transition-all backdrop-blur-md"
          >
            Skenario Sebelumnya
          </button>

          {currentScenarioIndex < defaultEthicsScenarios.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-500/20 border border-emerald-400/30 transition-all"
            >
              Skenario Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleCalculateFinal}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/25 border border-emerald-400/30 transition-all"
            >
              Hitung Skor Etika
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
