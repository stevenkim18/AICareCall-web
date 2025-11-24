'use client';

import React from 'react';

interface TossSelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  variant?: 'blue' | 'purple';
}

/**
 * 토스 스타일 선택 버튼 (성별, 관계 등)
 * - 선택 시 체크 아이콘 Pop 애니메이션
 * - Spring easing으로 자연스러운 선택 피드백
 * - 호버 시 그라데이션 배경
 */
export function TossSelectButton({
  children,
  selected,
  onClick,
  variant = 'blue',
}: TossSelectButtonProps) {
  const variantStyles = {
    blue: {
      selected: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/40 scale-105',
      unselected: 'border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50',
      checkColor: 'text-blue-500',
    },
    purple: {
      selected: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/40 scale-105',
      unselected: 'border-2 border-slate-200 bg-white text-slate-700 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50',
      checkColor: 'text-purple-500',
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex h-20 items-center justify-center rounded-2xl
        text-xl font-extrabold
        transition-all duration-200 ease-spring-basic
        hover:scale-102 hover:shadow-lg
        touch-feedback
        ${selected ? variantStyles[variant].selected : variantStyles[variant].unselected}
      `}
    >
      {children}
      
      {/* 선택 시 체크 아이콘 - Pop 애니메이션 */}
      {selected && (
        <svg 
          className={`absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white shadow-xl success-pop ${variantStyles[variant].checkColor}`}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )}
    </button>
  );
}

