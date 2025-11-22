'use client';

import { SoriCharacter } from '@/app/components/SoriCharacter';

interface StatsCardsProps {
  weeklyStats: {
    totalCalls: number;
    successfulCalls: number;
    successRate: number;
    avgDuration: number;
    daysWithSori: number;
  };
}

export function StatsCards({ weeklyStats }: StatsCardsProps) {
  const getSuccessRateStyle = (rate: number) => {
    if (rate >= 90) return { border: 'border-emerald-200', color: 'text-emerald-600' };
    if (rate >= 70) return { border: 'border-blue-200', color: 'text-blue-600' };
    return { border: 'border-red-200', color: 'text-red-600' };
  };

  const successRateStyle = getSuccessRateStyle(weeklyStats.successRate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 주간 통화 횟수 */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-violet-300 hover:bg-violet-50/30 transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-md bg-violet-500 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-600 mb-1">주간 통화 횟수</p>
        <p className="text-3xl font-black text-slate-900 mb-1">{weeklyStats.totalCalls}회</p>
        <p className="text-xs text-slate-500">이번 주</p>
      </div>

      {/* 주간 통화 성공 */}
      <div className={`bg-white rounded-md shadow-sm border ${successRateStyle.border} p-5 hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group cursor-pointer`}>
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-md ${
            weeklyStats.successRate >= 90 ? 'bg-emerald-500 group-hover:bg-emerald-600' :
            weeklyStats.successRate >= 70 ? 'bg-blue-500 group-hover:bg-blue-600' :
            'bg-red-500 group-hover:bg-red-600'
          } flex items-center justify-center transition-colors`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {weeklyStats.successRate < 80 && (
            <div className="px-2 py-1 rounded bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-700">시간 조정 권장</span>
            </div>
          )}
        </div>
        <p className="text-xs font-bold text-slate-600 mb-1">주간 통화 성공</p>
        <p className={`text-3xl font-black mb-1 ${successRateStyle.color}`}>{weeklyStats.successfulCalls}회</p>
        <p className="text-xs text-slate-500">성공 {weeklyStats.successfulCalls}회 / 총 {weeklyStats.totalCalls}회</p>
      </div>

      {/* 주간 통화 평균 시간 */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-md bg-emerald-500 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-600 mb-1">주간 통화 평균 시간</p>
        <p className="text-3xl font-black text-slate-900 mb-1">{weeklyStats.avgDuration}분</p>
        <p className="text-xs text-slate-500">이번 주 평균</p>
      </div>

      {/* 소리와 함께한 날 */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-violet-300 hover:bg-violet-50/30 transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-md bg-violet-500 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
            <SoriCharacter size={20} animated />
          </div>
        </div>
        <p className="text-xs font-bold text-slate-600 mb-1">소리와 함께한 날</p>
        <p className="text-3xl font-black text-slate-900 mb-1">{weeklyStats.daysWithSori}일</p>
        <p className="text-xs text-slate-500">서비스 시작일로부터</p>
      </div>
    </div>
  );
}
