'use client';

import { useEffect, useState } from 'react';

// 소리 에이전트 아이콘 - 캐릭터성 강화
export function SoriAgent({ size = 28, animated = true }: { size?: number; animated?: boolean }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsActive((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [animated]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* 외곽 링 - 음파 펄스 */}
      <div
        className={`absolute inset-0 rounded-full border-2 border-primary/30 transition-all duration-500 ${
          isActive ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      />
      
      {/* 메인 원 */}
      <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
        {/* 음성 아이콘 */}
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-white transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
        >
          {/* 마이크/음파 조합 */}
          <path
            d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
            fill="currentColor"
          />
          <path
            d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10H3V12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12V10H19Z"
            fill="currentColor"
          />
          <path d="M11 22H13V24H11V22Z" fill="currentColor" />
        </svg>
      </div>

      {/* 하단 음파 */}
      <div className="absolute -bottom-1 left-1/2 h-1 w-full -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

