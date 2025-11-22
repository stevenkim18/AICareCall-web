'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { DashboardHeader } from '../components/DashboardHeader';
import { ProfileCard } from '../components/ProfileCard';
import { CallListV3_Timeline } from '../components/CallListV3_Timeline';
import { QuickActions } from '../components/QuickActions';
import { SummaryBanner } from '../components/SummaryBanner';
import { StatsCards } from '../components/StatsCards';
import { VersionSelector } from '../components/VersionSelector';
import {
  registrationInfo,
  weeklyStats,
  summaryData,
  upcomingCalls,
  callList
} from '../shared/data';

// V2: 프로필 중심 - 프로필 정보를 상단에 크게 배치
export default function DashboardLayoutV2() {
  const router = useRouter();
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);
  const [showRegistrationInfo, setShowRegistrationInfo] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />
      
      <main className="flex-1 overflow-y-auto">
        <DashboardHeader
          elderName={summaryData.elderName}
          healthScore={summaryData.healthScore}
          showRegistrationInfo={showRegistrationInfo}
          onToggleRegistrationInfo={() => setShowRegistrationInfo(!showRegistrationInfo)}
          registrationInfo={registrationInfo}
        />

        <div className="p-8">
          {/* 프로필 정보 카드 (큰 카드) */}
          <div className="mb-6">
            <ProfileCard registrationInfo={registrationInfo} variant="full" />
          </div>

          {/* 오늘의 소리 요약 */}
          <div className="mb-6">
            <SummaryBanner elderName={summaryData.elderName} />
          </div>

          {/* 통계 카드 4개 */}
          <div className="mb-6">
            <StatsCards weeklyStats={weeklyStats} />
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* 최근 통화 기록 (타임라인) + 다음 통화 일정 */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-violet-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-slate-900">최근 통화 기록</h2>
                        <span className="px-2 py-0.5 rounded bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700">AI 분석</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        <span className="font-bold text-blue-600">소리</span>가 매일의 대화를 기록하고 있어요
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <CallListV3_Timeline
                    callList={callList.slice(0, 4)}
                    selectedCallId={selectedCallId}
                    onCallClick={(id) => setSelectedCallId(id === selectedCallId ? null : id)}
                  />
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
              {/* 다음 통화 일정 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-violet-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">다음 통화 예정</h3>
                    <p className="text-xs text-slate-600">
                      <span className="font-bold text-blue-600">소리</span>가 준비 중이에요
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-md p-5 mb-4">
                  <p className="text-xs text-white/80 font-bold mb-2 uppercase tracking-wider">{summaryData.nextCall.dayName}</p>
                  <p className="text-4xl font-black text-white mb-2 tracking-tight">{summaryData.nextCall.time}</p>
                  <p className="text-sm font-bold text-white/90">{summaryData.nextCall.date}</p>
                </div>
                <button
                  onClick={() => router.push('/settings')}
                  className="w-full py-2.5 rounded-md border border-blue-300 bg-white text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  일정 관리
                </button>
              </div>

              {/* 이번 주 통화 일정 - 좌측과 높이 맞추기 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
                <h3 className="text-sm font-black text-slate-900 mb-1">이번 주 통화 일정</h3>
                <p className="text-xs text-slate-600 mb-4">
                  <span className="font-bold text-blue-600">소리</span>가 매일 준비하고 있어요
                </p>
                <div className="space-y-4 flex-1">
                  {upcomingCalls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-4 rounded-md bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center">
                          <span className="text-sm font-black">{call.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{call.date}</p>
                          <p className="text-xs text-slate-600">{call.time}</p>
                        </div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - 하단에 배치 */}
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-black text-slate-900 mb-1">빠른 액션</h3>
            <QuickActions showSubtitle={true} />
          </div>
        </div>

        <VersionSelector />
      </main>
    </div>
  );
}
