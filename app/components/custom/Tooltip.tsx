'use client';

import { useState } from 'react';

interface TooltipProps {
  text: string;
  type?: 'info' | 'help' | 'warning' | 'success';
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ text, type = 'help', position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);

  const getIconColor = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-600 hover:bg-blue-200';
      case 'help':
        return 'bg-violet-100 text-violet-600 hover:bg-violet-200';
      case 'warning':
        return 'bg-orange-100 text-orange-600 hover:bg-orange-200';
      case 'success':
        return 'bg-green-100 text-green-600 hover:bg-green-200';
      default:
        return 'bg-violet-100 text-violet-600 hover:bg-violet-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'info':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        );
      case 'success':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      default:
        return <span className="text-xs font-bold">?</span>;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'left-1/2 -translate-x-1/2 bottom-full mb-2';
      case 'bottom':
        return 'left-1/2 -translate-x-1/2 top-full mt-2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      default:
        return 'left-1/2 -translate-x-1/2 bottom-full mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'left-1/2 -translate-x-1/2 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900';
      case 'bottom':
        return 'left-1/2 -translate-x-1/2 bottom-full border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-900';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-900';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-slate-900';
      default:
        return 'left-1/2 -translate-x-1/2 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900';
    }
  };

  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${getIconColor()}`}
        aria-label="도움말"
      >
        {getIcon()}
      </button>

      {show && (
        <div className={`absolute ${getPositionClasses()} px-4 py-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl z-50 animate-slideInDown max-w-xs`}>
          <p className="leading-relaxed font-medium">{text}</p>
          <div className={`absolute w-0 h-0 ${getArrowClasses()}`}></div>
        </div>
      )}
    </div>
  );
}

