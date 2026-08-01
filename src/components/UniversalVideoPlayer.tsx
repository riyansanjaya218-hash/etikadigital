import React, { useState, useRef } from 'react';
import { Play, CheckCircle2, Upload, Link as LinkIcon, FileVideo, Youtube, HardDrive, ExternalLink } from 'lucide-react';
import { parseVideoUrl } from '../utils/videoHelper';
import { VideoSource } from '../types';

interface UniversalVideoPlayerProps {
  video: VideoSource;
  isWatched?: boolean;
  onMarkWatched?: () => void;
  onUpdateVideo?: (newVideo: VideoSource) => void;
  allowEdit?: boolean;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  video,
  isWatched = false,
  onMarkWatched,
  onUpdateVideo,
  allowEdit = false
}) => {
  const [customUrl, setCustomUrl] = useState(video.url || '');
  const [isEditing, setIsEditing] = useState(false);
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeUrl = localFileUrl || video.url;
  const { embedUrl, type } = parseVideoUrl(activeUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalFileUrl(url);
      if (onUpdateVideo) {
        onUpdateVideo({
          type: 'upload',
          url,
          title: file.name,
          duration: 'Lokal MP4'
        });
      }
    }
  };

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) return;
    setLocalFileUrl(null);
    const parsed = parseVideoUrl(customUrl);
    if (onUpdateVideo) {
      onUpdateVideo({
        type: parsed.type === 'youtube' ? 'youtube' : parsed.type === 'gdrive' ? 'gdrive' : 'direct',
        url: customUrl,
        title: video.title || 'Video Pembelajaran Custom',
        duration: 'Universal'
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800">
      {/* Video Header / Info */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            {type === 'youtube' && <Youtube className="w-5 h-5 text-red-500" />}
            {type === 'gdrive' && <HardDrive className="w-5 h-5 text-green-400" />}
            {(type === 'direct' || type === 'upload') && <FileVideo className="w-5 h-5 text-blue-400" />}
            {type === 'unknown' && <LinkIcon className="w-5 h-5 text-purple-400" />}
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 text-sm md:text-base line-clamp-1">{video.title || 'Media Video Pembelajaran'}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">{type}</span>
              {video.duration && <span>• {video.duration}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {allowEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              {isEditing ? 'Tutup Edit' : 'Ganti Source Video'}
            </button>
          )}

          {onMarkWatched && (
            <button
              onClick={onMarkWatched}
              className={`text-xs px-3.5 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                isWatched
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isWatched ? 'Selesai Ditonton' : 'Tandai Selesai'}
            </button>
          )}
        </div>
      </div>

      {/* Edit Video Form / File Upload */}
      {isEditing && (
        <div className="p-4 bg-slate-900 border-b border-slate-800 text-slate-200 text-sm">
          <form onSubmit={handleSaveCustomUrl} className="space-y-3">
            <p className="text-xs text-slate-400">
              Mendukung Tautan: YouTube URL/Embed, Google Drive preview/file link, OneDrive, atau upload file MP4 lokal.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Tempel tautan YouTube / Google Drive / MP4 di sini..."
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Gunakan URL
              </button>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Atau Upload File Lokal</span>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/mp4,video/webm"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                Pilih File MP4 Lokal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Video Container */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        {type === 'direct' || type === 'upload' ? (
          <video
            src={embedUrl}
            controls
            className="w-full h-full object-contain"
            controlsList="nodownload"
          >
            Browser Anda tidak mendukung pemutaran video tag HTML5.
          </video>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title || 'Universal Video Player'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="text-center p-6 text-slate-500">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Tautan video belum dikonfigurasi.</p>
          </div>
        )}
      </div>

      {/* Video Footer Note */}
      <div className="p-3 bg-slate-950 text-xs text-slate-400 flex items-center justify-between">
        <span>Tonton video pengantar untuk memahami ringkasan unit materi secara komprehensif.</span>
        {activeUrl && (
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline flex items-center gap-1 text-xs"
          >
            Buka di Tab Baru <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
