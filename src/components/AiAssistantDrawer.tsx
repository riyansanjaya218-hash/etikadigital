import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, BookOpen } from 'lucide-react';

interface AiAssistantDrawerProps {
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Pembelajaran Etika Informasi. Ada materi atau konsep seputar Metode SIFT, Citasi APA 7th, UU PDP, atau Etika AI yang ingin Anda tanyakan?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let reply = 'Metode SIFT terdiri dari 4 langkah utama: Stop (Berhenti sejenak), Investigate (Investigasi sumber), Find Better Coverage (Cari liputan lebih baik), dan Trace Claims (Lacak klaim awal).';
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('apa') || lower.includes('sitasi') || lower.includes('dapus')) {
        reply = 'Dalam standar APA 7th Edition, format penulisan buku adalah: Nama Belakang, Inisial. (Tahun). Judul Buku (Cetak Miring). Nama Penerbit.\nContoh: Sanjaya, R. (2026). Etika Informasi Digital. UNJ Press.';
      } else if (lower.includes('plagiarisme') || lower.includes('turnitin')) {
        reply = 'Untuk mencegah plagiarisme, lakukan paraphrase menggunakan kata-kata sendiri tanpa mengubah makna ilmiah, lalu berikan sitasi kutipan sumber secara eksplisit.';
      } else if (lower.includes('pdp') || lower.includes('privasi')) {
        reply = 'UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) mengatur hak setiap warga negara atas kerahasiaan data pribadi seperti NIK, data kesehatan, dan catatan finansial di ruang digital.';
      } else if (lower.includes('netiquette') || lower.includes('sopan')) {
        reply = 'Netiquette (Net Etiquette) menekankan etika berkomunikasi di internet: hindari kalimat provokatif/hate speech, hargai perbedaan pendapat, dan jangan menyebarkan informasi tanpa konfirmasi.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 text-white w-full max-w-md h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Asisten AI Etika Informasi</h3>
              <p className="text-[10px] text-amber-300 font-medium">Tutor Digital Interaktif 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>AI sedang berpikir...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan konsep etika, SIFT, atau APA 7th..."
            className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
