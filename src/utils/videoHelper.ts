export function parseVideoUrl(url: string): { embedUrl: string; type: 'youtube' | 'gdrive' | 'onedrive' | 'direct' | 'upload' | 'unknown' } {
  if (!url) return { embedUrl: '', type: 'unknown' };

  const trimmed = url.trim();

  // YouTube
  // Matches: youtube.com/watch?v=xxx, youtube.com/embed/xxx, youtu.be/xxx
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
      type: 'youtube'
    };
  }

  // Google Drive / Google Docs Videos
  // Matches: drive.google.com/file/d/xxx/view, drive.google.com/open?id=xxx, docs.google.com/videos/d/xxx/play
  const gdriveMatch = trimmed.match(/(?:drive\.google\.com\/(?:file\/d\/([^\/\?]+)|open\?id=([^\&]+))|docs\.google\.com\/videos\/d\/([^\/\?]+))/i);
  if (gdriveMatch) {
    const fileId = gdriveMatch[1] || gdriveMatch[2] || gdriveMatch[3];
    return {
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      type: 'gdrive'
    };
  }

  // OneDrive
  // Matches 1drv.ms or onedrive.live.com embed/download
  if (trimmed.includes('onedrive.live.com') || trimmed.includes('1drv.ms')) {
    let embedUrl = trimmed;
    if (trimmed.includes('embed')) {
      embedUrl = trimmed;
    } else {
      embedUrl = trimmed.replace('/view.aspx', '/embed.aspx');
    }
    return {
      embedUrl,
      type: 'onedrive'
    };
  }

  // Direct MP4 or Blob
  if (trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.startsWith('blob:') || trimmed.startsWith('data:video/')) {
    return {
      embedUrl: trimmed,
      type: 'direct'
    };
  }

  // Fallback as direct or unknown iframe
  return {
    embedUrl: trimmed,
    type: 'unknown'
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
