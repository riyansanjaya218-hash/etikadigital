import React from 'react';
import { X, Map, CheckCircle2, ArrowRight, ShieldCheck, FileText, Gamepad2, Award } from 'lucide-react';

interface PetaKonsepModalProps {
  onClose: () => void;
  onNavigateUnit: (unitTab: string) => void;
}

export const PetaKonsepModal: React.FC<PetaKonsepModalProps> = ({ onClose, onNavigateUnit }) => {
  const steps = [
    {
      unit: '01',
      title: 'Mengenal Etika Informasi',
      subtitle: 'Konsep Dasar, Hak Asasi Informasi & Gen-Z',
      desc: 'Memahami batasan etika dalam mencari, menyimpan, dan menyebarkan informasi di era AI.',
      tab: 'unit-1',
      color: 'border-blue-500 bg-blue-50 text-blue-900',
    },
    {
      unit: '02',
      title: 'Menjadi Detektif Informasi',
      subtitle: 'Metode SIFT & Penangkalan Hoaks',
      desc: 'Praktik Stop, Investigate, Find Coverage, dan Trace Claim untuk verifikasi kabar bohong.',
      tab: 'unit-2',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    },
    {
      unit: '03',
      title: 'Menjaga Privasi & Keamanan',
      subtitle: 'Perlindungan Data Pribadi (UU PDP)',
      desc: 'Melindungijejak digital, kerahasiaan data pribadi, dan keamanan akun di ruang siber.',
      tab: 'unit-3',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
    },
    {
      unit: '04',
      title: 'Menghargai Karya Orang Lain',
      subtitle: 'Hak Cipta, Sitasi APA 7th & Plagiarisme',
      desc: 'Etika atribusi karya akademis, teknik paraphrase, dan pencegahan kecurangan akademis.',
      tab: 'unit-4',
      color: 'border-indigo-500 bg-indigo-50 text-indigo-900',
    },
    {
      unit: '05',
      title: 'Bijak Bersosial Media',
      subtitle: 'Netiquette & Anti Cyberbullying',
      desc: 'Komunikasi santun di ruang digital, etika berkomentar, dan kesadaran emosi cyber.',
      tab: 'unit-5',
      color: 'border-purple-500 bg-purple-50 text-purple-900',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-serif">Peta Konsep & Alur Pembelajaran</h3>
              <p className="text-xs text-slate-500">Peta Navigasi 5 Unit & Modul Evaluasi Interaktif</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Flow */}
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Target Capaian Pembelajaran (CP)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Tahun 2026</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahasiswa Mampu menganalisis, memverifikasi, dan menerapkan norma etika dalam penelusuran informasi, penggunaan kecerdasan buatan (AI), hak cipta, perlindungan data pribadi, serta komunikasi digital secara bijak.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div
                key={step.unit}
                onClick={() => {
                  onNavigateUnit(step.tab);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md space-y-2 relative overflow-hidden ${step.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black">{step.unit}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </div>
                <h4 className="font-bold text-sm leading-snug">{step.title}</h4>
                <p className="text-[11px] font-medium opacity-80">{step.subtitle}</p>
                <p className="text-[11px] opacity-75 pt-1 border-t border-black/10 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}

            {/* Evaluation Step Card */}
            <div
              onClick={() => {
                onNavigateUnit('final-quiz');
                onClose();
              }}
              className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-900 text-white cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-amber-300 tracking-wider">Tahap Akhir</span>
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="font-bold text-sm text-white">Evaluasi & Sertifikasi Digital</h4>
              <p className="text-[11px] text-emerald-200">
                Pengerjaan Kuis Evaluasi Akhir 10 Soal & Penerbitan Sertifikat Kelulusan Resmi.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Tutup Peta Konsep
          </button>
        </div>
      </div>
    </div>
  );
};
