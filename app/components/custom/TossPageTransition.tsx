'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface TossPageTransitionProps {
  children: React.ReactNode;
}

/**
 * 토스 스타일 페이지 전환 애니메이션
 * - 슬라이드 인/아웃 효과
 * - Bezier expo easing으로 부드러운 전환
 * - 페이지 간 자연스러운 연결감
 */
export function TossPageTransition({ children }: TossPageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setIsTransitioning(true);
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 400); // 애니메이션 duration과 일치

      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`
          w-full
          transition-all duration-400 ease-bezier-expo
          ${isTransitioning ? 'slide-out-left' : 'slide-in-right'}
        `}
      >
        {displayChildren}
      </div>
    </div>
  );
}

/**
 * 스텝 전환 애니메이션 (온보딩용)
 */
export function TossStepTransition({ 
  children, 
  direction = 'forward' 
}: { 
  children: React.ReactNode; 
  direction?: 'forward' | 'backward';
}) {
  return (
    <div 
      className={`
        w-full
        ${direction === 'forward' ? 'slide-in-right' : 'slide-in-left'}
      `}
      style={{
        animation: direction === 'forward' 
          ? 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

/**
 * 완료 축하 애니메이션
 */
export function TossSuccessAnimation({ children }: { children: React.ReactNode }) {
  return (
    <div className="success-pop">
      {children}
    </div>
  );
}

