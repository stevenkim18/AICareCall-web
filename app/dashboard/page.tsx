'use client';

import { useRouter } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { NotificationCenter } from '@/app/components/custom/NotificationCenter';
import { TimelineCallList } from '@/app/components/custom/TimelineCallList';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Dashboard() {
  const router = useRouter();

  // 실제 데이터 구조 (Mock)
  const summaryData = {
    elderName: '김순자',
    healthScore: 92,
    totalCalls: 42,
    avgDuration: 14,
    daysWithSori: 128,
    nextCall: { date: '2025-01-20', time: '10:00', dayName: '월요일', remaining: '2시간 30분' },
    careLevel: 'good'
  };

  const recentCalls = [
    {
      id: 1,
      date: '2025.01.19',
      time: '10:30',
      duration: 15,
      status: 'success' as const,
      summary: '손주가 다음 주에 온다는 소식에 목소리가 매우 밝으셨어요.',
      tags: ['기분좋음', '가족', '기대감'],
      emotion: '좋음',
      emotionScore: 92
    },
    {
      id: 2,
      date: '2025.01.18',
      time: '14:20',
      duration: 12,
      status: 'success' as const,
      summary: '점심으로 된장찌개를 드셨고, 혈압약도 잊지 않고 챙겨 드셨습니다.',
      tags: ['건강', '식사', '약복용'],
      emotion: '보통',
      emotionScore: 85
    },
    {
      id: 3,
      date: '2025.01.17',
      time: '10:00',
      duration: 0,
      status: 'missed' as const,
      summary: '전화를 받지 않으셨습니다. (부재중)',
      tags: ['부재중'],
      emotion: '',
      emotionScore: 0
    },
    {
      id: 4,
      date: '2025.01.16',
      time: '10:15',
      duration: 18,
      status: 'success' as const,
      summary: '무릎이 조금 쑤신다고 하셨지만, 산책은 다녀오셨다고 합니다.',
      tags: ['건강', '운동', '통증'],
      emotion: '보통',
      emotionScore: 78
    },
    {
      id: 5,
      date: '2025.01.15',
      time: '10:05',
      duration: 20,
      status: 'success' as const,
      summary: '친구분들과 경로당에서 즐거운 시간을 보내셨다고 자랑하셨어요.',
      tags: ['사회활동', '즐거움'],
      emotion: '좋음',
      emotionScore: 95
    }
  ];

  // Mock Weekly Schedule Data (3 items)
  const weeklySchedule = [
    { day: '월요일', date: '1월 20일', time: '14:00', isToday: true },
    { day: '화요일', date: '1월 21일', time: '14:00', isToday: false },
    { day: '수요일', date: '1월 22일', time: '14:00', isToday: false },
  ];

  return (
    <>
      <LNB />

      <SidebarInset className="flex-1 overflow-y-auto bg-slate-50/50">
        {/* Header */}
        <div className="bg-white/80 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shadow-sm border border-violet-200 transition-transform group-hover:scale-105">
                  <SoriCharacter size={28} animated />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {summaryData.elderName}
                  </h1>
                  <span className="text-lg font-bold text-slate-500">님의 오늘</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    소리가 함께 케어 중
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 w-full space-y-8 pb-20">

          {/* 1. Sori's Summary with Keyword Highlight */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6 shadow-lg text-white flex items-center justify-between group hover:shadow-violet-500/20 transition-shadow">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 p-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/10">
                <SoriCharacter size={40} animated />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-black text-white">소리의 요약</h3>
                  <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-bold text-white/90 border border-white/30">방금 전</span>
                </div>
                <p className="text-base text-white/95 font-semibold leading-relaxed">
                  오늘 오후 2시 통화에서 손주 방문 소식을 전하며 매우 들뜬 목소리셨습니다. 다음 통화 때는 <span className="inline-block align-text-bottom px-2 py-0.5 text-xs font-black bg-amber-400 text-slate-900 rounded-md -translate-y-0.5">약 복용 여부</span>를 잊지 않고 챙겨드릴게요.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Key Metrics with Context-specific UX Writing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1 - Communication Activity */}
            <div className="relative bg-violet-50/50 p-6 rounded-lg border border-violet-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-violet-50 hover:to-violet-100 hover:border-violet-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-violet-200/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-500 flex items-center justify-center text-white group-hover:bg-violet-600 transition-colors shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">+12%</span>
                </div>
                <p className="text-sm font-bold text-violet-700 mb-1">이번 주 통화 시도</p>
                <p className="text-3xl font-black text-violet-900 tracking-tight mb-2">42회</p>
                <p className="text-xs text-violet-600 font-medium">지난주 대비 5회 증가</p>
              </div>
            </div>

            {/* Metric 2 - Success Rate */}
            <div className="relative bg-emerald-50/50 p-6 rounded-lg border border-emerald-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">90%</span>
                </div>
                <p className="text-sm font-bold text-emerald-700 mb-1">주간 통화 성공률</p>
                <p className="text-3xl font-black text-emerald-900 tracking-tight mb-2">38회</p>
                <p className="text-xs text-emerald-600 font-medium">안정적인 케어 연결 유지 중</p>
              </div>
            </div>

            {/* Metric 3 - Engagement Quality */}
            <div className="relative bg-blue-50/50 p-6 rounded-lg border border-blue-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">+2분</span>
                </div>
                <p className="text-sm font-bold text-blue-700 mb-1">평균 대화 시간</p>
                <p className="text-3xl font-black text-blue-900 tracking-tight mb-2">14분</p>
                <p className="text-xs text-blue-600 font-medium">더 깊은 교감이 이루어지고 있어요</p>
              </div>
            </div>

            {/* Metric 4 - Journey Together */}
            <div className="relative bg-amber-50/50 p-6 rounded-lg border border-amber-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 hover:border-amber-300 transition-all duration-300 group overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-400 flex items-center justify-center border border-amber-500 group-hover:bg-amber-500 transition-colors shadow-md overflow-hidden pt-1">
                    <SoriCharacter size={32} />
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">D+{summaryData.daysWithSori}</span>
                </div>
                <p className="text-sm font-bold text-amber-700 mb-1">소리와 함께</p>
                <p className="text-3xl font-black text-amber-900 tracking-tight mb-2">{summaryData.daysWithSori}일</p>
                <p className="text-xs text-amber-600 font-medium">매일의 따뜻한 안부를 나누고 있어요</p>
              </div>
            </div>
          </div>

          {/* 3. Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Timeline */}
            <div className="lg:col-span-8 space-y-6">

              {/* Timeline with AI Agent Personality */}
              <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-8 overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-violet-50 rounded-full blur-3xl opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        최근 통화 기록
                        <span className="px-2 py-0.5 rounded-md bg-violet-50 text-[10px] font-bold text-violet-600 border border-violet-200">
                          AI 분석
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-200"></span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">AI가 매 통화를 분석하고 케어 인사이트를 제공해요</p>
                    </div>
                    <button
                      onClick={() => router.push('/call-history')}
                      className="text-sm font-bold text-violet-600 hover:text-white hover:bg-violet-600 transition-all flex items-center gap-1 px-4 py-2 rounded-lg border border-violet-200 hover:border-violet-600 shadow-sm hover:shadow-md"
                    >
                      전체 기록 보기
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-6">
                    <TimelineCallList calls={recentCalls} onCallClick={(call) => router.push(`/call-history/${call.id}`)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Side Panel */}
            <div className="lg:col-span-4 space-y-6">

              {/* Next Call */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 pt-6 pb-4">
                  <h3 className="text-base font-black text-slate-900 mb-1">다음 통화 일정</h3>
                  <p className="text-xs text-slate-400">소리가 자동으로 통화를 시작할 예정이에요</p>
                </div>

                {/* Purple Gradient Call Box */}
                <div className="mx-6 mb-4 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white/90 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">예정됨</span>
                    <span className="text-sm font-bold text-white/90">월요일</span>
                  </div>
                  <div className="text-center py-1">
                    <div className="text-5xl font-black mb-2 font-mono tracking-tight">
                      10:00
                    </div>
                    <p className="text-base font-bold text-white/95">2025년 1월 20일</p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full py-3 rounded-lg bg-white text-violet-600 text-sm font-bold hover:bg-violet-50 transition-all border-2 border-violet-200 hover:border-violet-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    일정 관리
                  </button>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-6 overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="relative">
                  <h3 className="text-base font-black text-slate-900 mb-1">이번 주 통화 일정</h3>
                  <p className="text-xs text-slate-400 mb-5">매일 정해진 시간에 소리가 찾아뵐게요</p>

                  <div className="space-y-3">
                    {weeklySchedule.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${item.isToday
                          ? 'bg-violet-50 border-violet-200 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-left">
                            <p className={`text-xs font-bold ${item.isToday ? 'text-violet-600' : 'text-slate-500'}`}>
                              {item.day}
                            </p>
                            <p className={`text-sm font-black ${item.isToday ? 'text-slate-900' : 'text-slate-700'}`}>
                              {item.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black ${item.isToday ? 'text-violet-600' : 'text-slate-700'}`}>
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-6 overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
                <div className="relative">
                  <h3 className="text-base font-black text-slate-900 mb-1">빠른 액션</h3>
                  <p className="text-xs text-slate-400 mb-5">소리가 준비 중이에요</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="relative py-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 flex flex-col items-center justify-center gap-2 hover:from-red-100 hover:to-red-200 transition-all group overflow-hidden">
                      <div className="absolute top-1 right-1">
                        <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-md shadow-sm">SOON</span>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-white text-red-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-red-700">긴급 알림</span>
                    </button>

                    <button className="relative py-4 rounded-lg bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 flex flex-col items-center justify-center gap-2 hover:from-violet-100 hover:to-violet-200 transition-all group overflow-hidden">
                      <div className="absolute top-1 right-1">
                        <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-md shadow-sm">SOON</span>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-white text-violet-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-violet-700">주간 리포트</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </SidebarInset>
    </>
  );
}