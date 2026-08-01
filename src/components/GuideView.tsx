import React from 'react';
import { Compass, BookOpen, ShieldCheck, FileText, Gamepad2, Award, CheckCircle2, Play, Video } from 'lucide-react';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { VideoSource } from '../types';

interface GuideViewProps {
  onNavigate: (tab: any) => void;
}

export const GuideView: React.FC<GuideViewProps> = ({ onNavigate }) => {
  const guideVideo: VideoSource = {
    type: 'gdrive',
    url: 'https://drive.google.com/file/d/1i9XfFMP9rYmV59UkuvDvaaYI9Pl58ZQ3/view?usp=sharing',
    title: 'Petunjuk Penggunaan & Navigasi E-Modul Interaktif',
    duration: '05:20'
  };

  const steps = [
    {
      num: '1',
      title: 'Isi Identitas Peserta di Cover Interaktif',
      desc: 'Pastikan Nama Lengkap, Jenis Kelamin, dan Pekerjaan Anda telah terisi dengan benar di halaman Sampul agar dapat mengakses seluruh unit modul & mencetak Sertifikat.',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />
    },
    {
      num: '2',
      title: 'Pelajari 5 Unit Materi & Tonton Video Universal',
      desc: 'Setiap unit berisi Poin Ringkasan Materi, Video Pengantar (dukungan YouTube, Google Drive, OneDrive, MP4), Kuis Latihan, Catatan Refleksi, dan Lembar Kerja.',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />
    },
    {
      num: '3',
      title: 'Praktik di Lab SIFT & Cek Plagiarisme',
      desc: 'Latih kecakapan Cek Fakta berita hoaks menggunakan metode SIFT dan uji kemiripan karya tulis akademis Anda di fitur Cek Plagiarisme.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
    },
    {
      num: '4',
      title: 'Ikuti Game Etika Informasi & Kuis Akhir',
      desc: 'Selesaikan Survei Dilema Etika Digital, kemudian kerjakan Kuis Evaluasi Akhir (minimal passing grade 75) untuk meraih Sertifikat Kelulusan.',
      icon: <Award className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/15 backdrop-blur-2xl text-white space-y-3 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
          <Compass className="w-4 h-4 text-blue-400" />
          <span>Panduan Penggunaan Modul</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Petunjuk Pembelajaran & Media Video Universal
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Pahami alur modul interaktif ini untuk mengoptimalkan pengalaman belajar Anda. Pemutar video modul telah mendukung integrasi berbagai tautan media seperti YouTube, Google Drive, OneDrive, maupun file MP4 lokal.
        </p>
      </div>

      {/* Video Tutorial Universal Player */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <Video className="w-5 h-5 text-blue-400" />
          <h3>Video Panduan Orientasi Modul</h3>
        </div>
        <UniversalVideoPlayer video={guideVideo} allowEdit={true} />
      </div>

      {/* Step by Step Guide Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Alur Langkah Pembelajaran</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl flex items-start gap-4 hover:bg-slate-800/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white shrink-0 shadow-inner">
                {s.num}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{s.title}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Module Navigation Buttons */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/15 backdrop-blur-2xl shadow-xl space-y-4">
        <h3 className="font-bold text-white text-base">Pintas Navigasi Fitur Pembelajaran</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('unit-1')}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-blue-600 hover:border-blue-500 border border-white/15 text-slate-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md backdrop-blur-md"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Mulai Unit 1</span>
          </button>
          <button
            onClick={() => onNavigate('sift-lab')}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-emerald-600 hover:border-emerald-500 border border-white/15 text-slate-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Lab SIFT</span>
          </button>
          <button
            onClick={() => onNavigate('plagiarism')}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-indigo-600 hover:border-indigo-500 border border-white/15 text-slate-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md backdrop-blur-md"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Cek Plagiarisme</span>
          </button>
          <button
            onClick={() => onNavigate('final-quiz')}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-amber-600 hover:border-amber-500 border border-white/15 text-slate-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md backdrop-blur-md"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Kuis Akhir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
