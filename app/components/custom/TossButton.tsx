'use client';

import React from 'react';

interface TossButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

/**
 * 토스 스타일 버튼 컴포넌트
 * - 즉각적인 터치 피드백
 * - Spring easing으로 자연스러운 애니메이션
 * - 토스 디자인 시스템 준수
 */
export function TossButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: TossButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center font-bold
    touch-feedback
    transition-all duration-200 ease-spring-quick
    focus:outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    select-none
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600
      text-white shadow-2xl shadow-blue-500/50
      hover:shadow-3xl hover:shadow-purple-500/60
      focus:ring-blue-500/30
      active:scale-[0.97]
    `,
    secondary: `
      border-2 border-slate-200 bg-white text-slate-700
      hover:border-slate-300 hover:bg-slate-50 hover:shadow-md
      focus:ring-slate-500/20
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-slate-700
      hover:bg-slate-100
      focus:ring-slate-500/20
      active:scale-[0.98]
    `,
  };

  const sizeStyles = {
    sm: 'h-12 px-6 text-sm rounded-xl',
    md: 'h-16 px-10 text-base rounded-2xl',
    lg: 'h-18 px-12 text-xl rounded-2xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* 호버 시 그라데이션 오버레이 */}
      {variant === 'primary' && (
        <span 
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.3) 100%)',
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
}

