import React, { useState } from 'react';
import { X, Search, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface SearchModalProps {
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onNavigateTab }) => {
  const [query, setQuery] = useState('');

  const searchableItems = [
    { title: 'Pengantar Etika Informasi & Gen-Z', category: 'Unit 1', tab: 'unit-1' as ActiveTab, keywords: 'etika informasi moralitas hak asasi digital gen z kecerdasan buatan' },
    { title: 'Metode SIFT Fact Checking', category: 'Unit 2', tab: 'unit-2' as ActiveTab, keywords: 'sift stop investigate find coverage trace hoaks verifikasi fakta' },
    { title: 'Perlindungan Data Pribadi (UU PDP)', category: 'Unit 3', tab: 'unit-3' as ActiveTab, keywords: 'uu pdp privasi data kejahatan siber rekayasa sosial password keamanan' },
    { title: 'Hak Cipta, Plagiarisme & Sitasi APA 7th', category: 'Unit 4', tab: 'unit-4' as ActiveTab, keywords: 'hak cipta plagiarisme sitasi apa 7th paraphrase daftar pustaka karya ilmiah' },
    { title: 'Netiquette & Anti-Cyberbullying', category: 'Unit 5', tab: 'unit-5' as ActiveTab, keywords: 'netiquette etika berkomentar cyberbullying emosi digital jejak digital' },
    { title: 'Lab SIFT & Fact Checking Hoaks', category: 'Lab Interaktif', tab: 'sift-lab' as ActiveTab, keywords: 'lab sift cek fakta kasus berita hoaks kesehatan sains' },
    { title: 'Sistem Cek Plagiarisme Naskah', category: 'Alat Bantu', tab: 'plagiarism' as ActiveTab, keywords: 'cek plagiarisme uji kemiripan makalah naskah jurnal' },
    { title: 'Game Dilema Etika Digital', category: 'Game & Simulasi', tab: 'ethics-game' as ActiveTab, keywords: 'game etika simulasi kuis kasus cyber' },
    { title: 'Kuis & Evaluasi Akhir', category: 'Ujian & Sertifikat', tab: 'final-quiz' as ActiveTab, keywords: 'kuis evaluasi akhir sertifikat nilai lulus' },
  ];

  const filteredItems = searchableItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.keywords.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-4 relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">Pencarian Modul & Materi</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik kata kunci (misal: SIFT, APA 7th, Plagiarisme, Netiquette)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1 text-xs">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onNavigateTab(item.tab);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 cursor-pointer flex items-center justify-between transition-all group"
              >
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider inline-block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 space-y-1">
              <p className="font-medium">Materi tidak ditemukan.</p>
              <p className="text-[11px]">Coba ketik kata kunci lain seperti "SIFT", "Hak Cipta", atau "Kuis".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
