'use client';

import { useEffect, useState } from 'react';
import { SoriCharacter } from './SoriCharacter';

interface PageTransitionProps {
  isActive: boolean;
  message?: string;
  onComplete?: () => void;
}

export function PageTransition({ isActive, message = '준비 중...', onComplete }: PageTransitionProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isActive) return;

    // 진행률 애니메이션
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (onComplete) {
            setTimeout(onComplete, 300);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // 점 애니메이션
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 text-center">
        {/* 소리 캐릭터 */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative">
            <SoriCharacter size={120} animated />
          </div>
        </div>

        {/* 메시지 */}
        <h2 className="text-3xl font-black text-slate-900 mb-3">
          {message}
          <span className="inline-block w-12 text-left text-violet-600">{dots}</span>
        </h2>
        <p className="text-sm font-medium text-slate-600 mb-8">
          잠시만 기다려주세요
        </p>

        {/* 프로그레스 바 */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs font-bold text-slate-500 mt-2">{progress}%</p>
        </div>

        {/* 애니메이션 원 */}
        <div className="mt-8 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

