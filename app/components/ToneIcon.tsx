'use client';

interface ToneIconProps {
  type: 'warm' | 'bright' | 'calm';
  size?: number;
  active?: boolean;
}

export function ToneIcon({ type, size = 32, active = false }: ToneIconProps) {
  const baseColor = active ? '#fff' : '#64748b';
  
  if (type === 'warm') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: active ? '#fef3c7' : '#f59e0b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: active ? '#fde68a' : '#ea580c', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* 따뜻한 하트 */}
        <path
          d="M24 42C24 42 8 32 8 20C8 14 12 10 17 10C20 10 22.5 11.5 24 13.5C25.5 11.5 28 10 31 10C36 10 40 14 40 20C40 32 24 42 24 42Z"
          fill="url(#warmGrad)"
          stroke={active ? '#fbbf24' : '#f59e0b'}
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        {/* 내부 하이라이트 */}
        <path
          d="M24 38C24 38 12 30 12 20C12 16 14.5 13.5 17.5 13.5C19.5 13.5 21.5 14.5 23 16.5"
          stroke={active ? '#fff' : '#fde68a'}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }
  
  if (type === 'bright') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="brightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: active ? '#fef9c3' : '#fbbf24', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: active ? '#fde047' : '#f59e0b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* 태양 중심 */}
        <circle
          cx="24"
          cy="24"
          r="10"
          fill="url(#brightGrad)"
          stroke={active ? '#fbbf24' : '#f59e0b'}
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        {/* 햇살 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={24 + Math.cos((angle * Math.PI) / 180) * 14}
            y1={24 + Math.sin((angle * Math.PI) / 180) * 14}
            x2={24 + Math.cos((angle * Math.PI) / 180) * 20}
            y2={24 + Math.sin((angle * Math.PI) / 180) * 20}
            stroke={active ? '#fef3c7' : '#fbbf24'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }
  
  if (type === 'calm') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="calmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: active ? '#dbeafe' : '#3b82f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: active ? '#bfdbfe' : '#1d4ed8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* 물결 */}
        <path
          d="M8 24C8 24 12 18 18 18C24 18 24 24 30 24C36 24 40 18 40 18"
          stroke="url(#calmGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="drop-shadow-lg"
        />
        <path
          d="M8 32C8 32 12 26 18 26C24 26 24 32 30 32C36 32 40 26 40 26"
          stroke="url(#calmGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* 상단 하이라이트 */}
        <path
          d="M8 16C8 16 12 10 18 10C24 10 24 16 30 16C36 16 40 10 40 10"
          stroke={active ? '#fff' : '#93c5fd'}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
    );
  }
  
  return null;
}

