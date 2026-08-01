import React from 'react';
import { X, BookOpen, Quote, Sparkles } from 'lucide-react';

interface KataPengantarModalProps {
  onClose: () => void;
}

export const KataPengantarModal: React.FC<KataPengantarModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-serif">Kata Pengantar</h3>
              <p className="text-xs text-slate-500">Tim Dosen Prodi Perpustakaan & Sains Informasi FIP UNJ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-h-[65vh] overflow-y-auto pr-2">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Quote className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="italic font-medium text-xs leading-relaxed">
              "Literasi digital bukan sekadar kemampuan mengoperasikan teknologi, melainkan kecakapan etis dan kritis dalam memilih, memverifikasi, serta membagikan informasi demi kebaikan bersama."
            </p>
          </div>

          <p>
            <strong>Puji dan syukur</strong> kami panjatkan ke hadirat Tuhan Yang Maha Esa, karena atas rahmat dan karunia-Nya, E-Modul Interaktif <em>"Etika Informasi Berbasis Literasi Digital"</em> ini dapat diselesaikan dan disajikan kepada para mahasiswa serta masyarakat luas.
          </p>

          <p>
            Di era ledakan informasi dan pesatnya perkembangan Kecerdasan Buatan (AI), tantangan yang dihadapi generasi muda tidak lagi terbatas pada kemudahan akses, melainkan pada <strong>kualitas, keabsahan, dan etika pemanfaatan informasi</strong>. Banyaknya hoaks, pelanggaran hak cipta, serta pudarnya netiket di media sosial menjadi latar belakang utama penyusunan e-modul interaktif ini.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Keunggulan E-Modul Ini:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-1">
              <li><strong>5 Unit Pembelajaran Terstruktur:</strong> Meliputi Konsep Dasar, Metode SIFT, Hak Cipta & APA 7th, Privasi Data, serta Netiquette.</li>
              <li><strong>Video Pengantar Interaktif:</strong> Disematkan langsung dari Google Drive & YouTube.</li>
              <li><strong>Simulasi & Lab Interaktif:</strong> Lab SIFT Fact-Checking, Uji Plagiarisme Naskah, dan Game Dilema Etika.</li>
              <li><strong>Sertifikasi Kelulusan Digital:</strong> Evaluasi pembelajaran terintegrasi dengan penerbitan sertifikat otomatis.</li>
            </ul>
          </div>

          <p>
            Kami mengucapkan terima kasih yang sebesar-besarnya kepada Program Studi Perpustakaan dan Sains Informasi FIP Universitas Negeri Jakarta (UNJ) serta seluruh pihak yang telah mendukung terwujudnya media pembelajaran digital ini.
          </p>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs gap-3">
            <div>
              <p className="font-extrabold text-slate-900 mb-1 uppercase tracking-wider text-[11px] text-amber-700">
                Disusun Oleh Tim Peneliti & Dosen:
              </p>
              <ul className="text-xs text-slate-800 font-medium space-y-0.5">
                <li>1. Riyan Sanjaya, M.Hum</li>
                <li>2. Laylatul Munawaroh, S.IP., MA.</li>
                <li>3. Dr. Ahmad Rifqy Ash-Shiddiqy, M.Pd.</li>
                <li>4. Maydi Aula Riski, S.IP., MA.</li>
                <li>5. Wisnu Putri Airmas Jati, S.IP., MA.</li>
              </ul>
              <p className="text-[11px] text-slate-500 mt-1">Prodi Perpustakaan dan Sains Informasi FIP UNJ</p>
            </div>
            <p className="text-slate-400 italic shrink-0">Jakarta, 2026</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Tutup Kata Pengantar
          </button>
        </div>
      </div>
    </div>
  );
};
