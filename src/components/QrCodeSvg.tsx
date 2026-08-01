import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QrCodeSvgProps {
  value: string;
  size?: number;
  className?: string;
}

export const QrCodeSvg: React.FC<QrCodeSvgProps> = ({ value, size = 120, className = '' }) => {
  const [svgDataUrl, setSvgDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toString(value || 'https://unj.ac.id', {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((svgString) => {
        if (isMounted) {
          const encoded = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
          setSvgDataUrl(encoded);
        }
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [value]);

  if (!svgDataUrl) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-slate-100 flex items-center justify-center rounded-lg border border-slate-300 text-[10px] font-mono text-slate-500 ${className}`}
      >
        QR Code...
      </div>
    );
  }

  return (
    <img 
      src={svgDataUrl} 
      alt="QR Code" 
      style={{ width: size, height: size }} 
      className={`object-contain rounded-lg border border-slate-300 shadow-sm ${className}`}
    />
  );
};
