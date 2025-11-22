'use client';

import { SoriCharacter } from '@/app/components/SoriCharacter';

interface SummaryBannerProps {
  elderName: string;
}

export function SummaryBanner({ elderName }: SummaryBannerProps) {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-md shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <SoriCharacter size={28} animated />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-black text-white">오늘의 소리 요약</h3>
            <span className="text-xs font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded">방금 전</span>
          </div>
          <p className="text-sm font-medium text-white/90 leading-relaxed">
            오늘 오후 2시 통화에서 <span className="font-black text-white">{elderName} 님</span>은
            평소보다 <span className="font-black text-white">밝은 목소리</span>로 손주 이야기를 많이 하셨어요.
            무릎 통증은 여전하지만 컨디션은 좋아 보입니다.
            다음 통화 때 <span className="px-2 py-1 bg-yellow-300 text-yellow-900 rounded font-black text-xs">약 복용 여부</span>를 확인해드릴게요.
          </p>
        </div>
      </div>
    </div>
  );
}
