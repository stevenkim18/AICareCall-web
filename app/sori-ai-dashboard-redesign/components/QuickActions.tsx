'use client';

import { useRouter } from 'next/navigation';

interface QuickActionsProps {
  showSubtitle?: boolean;
}

export function QuickActions({ showSubtitle = false }: QuickActionsProps) {
  const router = useRouter();

  return (
    <div>
      {showSubtitle && (
        <p className="text-xs text-slate-500 mb-4">
          <span className="font-bold text-blue-600">소리</span>가 준비 중이에요
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
      {/* 긴급 알림 */}
      <button
        onClick={() => {
          // TODO: 구현 예정
        }}
        className="group relative p-5 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider">
            Soon
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="w-14 h-14 rounded-lg bg-white border-2 border-red-300 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-red-600">긴급 알림</p>
        </div>
      </button>

      {/* 주간 리포트 */}
      <button
        onClick={() => {
          router.push('/report');
        }}
        className="group relative p-5 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 hover:border-violet-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider">
            Soon
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="w-14 h-14 rounded-lg bg-white border-2 border-violet-300 flex items-center justify-center">
            <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-violet-600">주간 리포트</p>
        </div>
      </button>
      </div>
    </div>
  );
}
