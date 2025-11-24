'use client';

import React, { useState } from 'react';

interface TossInputProps {
  type?: 'text' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  autoFocus?: boolean;
  className?: string;
}

/**
 * 토스 스타일 입력 필드
 * - 포커스 시 스케일 애니메이션
 * - Spring easing으로 부드러운 전환
 * - 실시간 피드백
 */
export function TossInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  helperText,
  autoFocus = false,
  className = '',
}: TossInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-base font-extrabold text-slate-800">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            h-20 w-full rounded-2xl border-2 bg-slate-50 px-7
            text-2xl font-bold text-foreground
            placeholder:text-slate-400 placeholder:font-medium
            transition-all duration-200 ease-spring-basic
            focus:bg-white focus:outline-none focus:ring-4
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
            }
            ${isFocused ? 'scale-[1.01]' : 'scale-100'}
          `}
        />
        
        {/* 포커스 시 글로우 효과 */}
        {isFocused && (
          <div 
            className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 blur-xl transition-opacity duration-300"
            style={{
              background: error 
                ? 'linear-gradient(135deg, #ef4444, #f87171)' 
                : 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)',
            }}
          />
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-sm font-semibold text-red-500 scale-entrance">
          {error}
        </p>
      )}

      {/* 도움말 텍스트 */}
      {helperText && !error && (
        <p className="text-sm font-medium text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

