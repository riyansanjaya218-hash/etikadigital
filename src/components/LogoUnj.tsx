import React from 'react';

interface LogoUnjProps {
  className?: string;
  size?: number;
}

export const LogoUnj: React.FC<LogoUnjProps> = ({ className = 'w-16 h-16', size = 120 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="topTextPath"
          d="M 28,100 A 72,72 0 1,1 172,100"
          fill="none"
        />
        <path
          id="bottomTextPath"
          d="M 172,100 A 72,72 0 0,1 28,100"
          fill="none"
        />
      </defs>

      {/* Outer Ring */}
      <circle cx="100" cy="100" r="96" fill="#015a51" stroke="#eab308" strokeWidth="4" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#fef08a" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="68" fill="#ffffff" stroke="#eab308" strokeWidth="3" />
      <circle cx="100" cy="100" r="64" fill="#fffdf0" />

      {/* Top Text: PERPUSTAKAAN & SAINS INFORMASI */}
      <text fill="#ffffff" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.8 font-sans">
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          PERPUSTAKAAN &amp; SAINS INFORMASI
        </textPath>
      </text>

      {/* Bottom Text: UNIVERSITAS NEGERI JAKARTA */}
      <text fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1 font-sans">
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          UNIVERSITAS NEGERI JAKARTA
        </textPath>
      </text>

      {/* Side Ornaments (Small Globes) */}
      <g fill="none" stroke="#fef08a" strokeWidth="1">
        <circle cx="34" cy="100" r="5" />
        <line x1="29" y1="100" x2="39" y2="100" />
        <ellipse cx="34" cy="100" rx="2.5" ry="5" />
        
        <circle cx="166" cy="100" r="5" />
        <line x1="161" y1="100" x2="171" y2="100" />
        <ellipse cx="166" cy="100" rx="2.5" ry="5" />
      </g>

      {/* Center Graphic: UNJ Tugu & Flame & Book */}
      {/* Tugu Pillar Base & Structure */}
      <g fill="#ca8a04" stroke="#854d0e" strokeWidth="1">
        {/* Flame */}
        <path d="M100,48 C103,53 107,57 104,63 C101,67 96,65 96,60 C96,55 98,52 100,48 Z" fill="#dc2626" stroke="#991b1b" />
        <path d="M100,51 C101.5,54 103,56 101.5,60 C100,62 98,61 98,58 Z" fill="#f97316" stroke="none" />

        {/* Torch / Flame Base */}
        <polygon points="95,64 105,64 103,68 97,68" fill="#eab308" />

        {/* Tugu Column Top */}
        <rect x="96" y="68" width="8" height="28" fill="#eab308" rx="1" />
        
        {/* Tugu Center Wings / Light */}
        <path d="M82,88 Q100,75 118,88 L114,96 Q100,84 86,96 Z" fill="#eab308" />

        {/* Open Book in Center */}
        <g transform="translate(0, 10)">
          {/* Left Page */}
          <path d="M100,88 Q85,82 72,86 L72,112 Q85,108 100,114 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
          {/* Right Page */}
          <path d="M100,88 Q115,82 128,86 L128,112 Q115,108 100,114 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
          {/* Book Spine */}
          <line x1="100" y1="88" x2="100" y2="114" stroke="#1e293b" strokeWidth="2" />
          {/* Left Lines */}
          <line x1="77" y1="92" x2="95" y2="90" stroke="#64748b" strokeWidth="1" />
          <line x1="77" y1="97" x2="95" y2="95" stroke="#64748b" strokeWidth="1" />
          <line x1="77" y1="102" x2="95" y2="100" stroke="#64748b" strokeWidth="1" />
          <line x1="77" y1="107" x2="95" y2="105" stroke="#64748b" strokeWidth="1" />
          {/* Right Lines */}
          <line x1="105" y1="90" x2="123" y2="92" stroke="#64748b" strokeWidth="1" />
          <line x1="105" y1="95" x2="123" y2="97" stroke="#64748b" strokeWidth="1" />
          <line x1="105" y1="100" x2="123" y2="102" stroke="#64748b" strokeWidth="1" />
          <line x1="105" y1="105" x2="123" y2="107" stroke="#64748b" strokeWidth="1" />
        </g>

        {/* Tugu Lower Pedestal */}
        <polygon points="90,126 110,126 114,136 86,136" fill="#ca8a04" />
        <polygon points="84,136 116,136 118,142 82,142" fill="#a16207" />
      </g>
    </svg>
  );
};
