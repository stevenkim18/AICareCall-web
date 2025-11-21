'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LNB } from '@/app/components/custom/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { NotificationCenter } from '@/app/components/custom/NotificationCenter';

export default function Dashboard() {
  const router = useRouter();
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);
  const [showAllInsights, setShowAllInsights] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState<Set<number>>(new Set([1])); // 첫 항목은 펼쳐진 상태

  // 실제 데이터 구조
  const summaryData = {
    elderName: '김순자',
    healthScore: 92,
    totalCalls: 42,
    avgDuration: 14,
    nextCall: { date: '2025-01-20', time: '10:00', dayName: '월요일' },
    lastCallStatus: 'completed', // completed, scheduled, in-progress
    careLevel: 'good' // excellent, good, warning, alert
  };

  const upcomingCalls = [
    { id: 1, date: '01/20', day: '월', time: '10:00', status: 'scheduled' },
    { id: 2, date: '01/22', day: '수', time: '10:00', status: 'scheduled' },
    { id: 3, date: '01/24', day: '금', time: '10:00', status: 'scheduled' }
  ];

  const recentCalls = [
    {
      id: 1,
      date: '2025-01-19',
      time: '10:30',
      duration: 15,
      emotion: '밝음',
      emotionScore: 92,
      emotionColor: 'green',
      summary: '평소보다 밝은 목소리로 손주 이야기를 많이 하셨어요',
      detailedSummary: '오늘은 날씨가 좋아서 기분이 좋으시다고 하셨습니다. 손주가 다음 주에 방문한다는 소식에 매우 기뻐하셨어요. 다만 무릎 통증이 아직 남아있어 걱정이라고 말씀하셨습니다.',
      keywords: ['무릎 통증', '손주 방문', '날씨', '기분 좋음'],
      hasAlert: true,
      alertMessage: '무릎 통증 3일 연속 언급',
      alertType: 'warning',
      topics: [
        { category: '가족', content: '손주가 다음 주 방문 예정' },
        { category: '건강', content: '무릎 통증 지속 (3일째)' },
        { category: '일상', content: '날씨가 좋아 기분 좋음' }
      ],
      voiceAnalysis: {
        energy: 85,
        clarity: 90,
        pace: 'normal'
      }
    },
    {
      id: 2,
      date: '2025-01-18',
      time: '14:20',
      duration: 12,
      emotion: '차분함',
      emotionScore: 85,
      emotionColor: 'blue',
      summary: '점심 식사를 잘 하셨고, 약도 제때 드셨다고 하셨어요',
      detailedSummary: '오늘 점심은 된장찌개와 밥을 드셨다고 하셨습니다. 혈압약과 당뇨약을 제때 복용하셨고, 오후에는 TV 시청 예정이라고 하셨어요.',
      keywords: ['식사', '약 복용', 'TV 시청', '혈압약'],
      hasAlert: false,
      topics: [
        { category: '일상', content: '된장찌개 식사' },
        { category: '건강', content: '약 정시 복용 (혈압약, 당뇨약)' },
        { category: '여가', content: 'TV 시청 예정' }
      ],
      voiceAnalysis: {
        energy: 70,
        clarity: 88,
        pace: 'slow'
      }
    },
    {
      id: 3,
      date: '2025-01-17',
      time: '10:15',
      duration: 18,
      emotion: '기쁨',
      emotionScore: 95,
      emotionColor: 'yellow',
      summary: '친구분과 즐거운 시간을 보내셨어요',
      detailedSummary: '오랜 친구와 만나 이야기를 나누셨습니다. 함께 산책도 하셨고, 건강에 대한 이야기도 많이 나누셨다고 하셨어요.',
      keywords: ['친구 만남', '산책', '건강 대화'],
      hasAlert: false,
      topics: [
        { category: '사회', content: '친구와 만남' },
        { category: '활동', content: '산책 (30분)' },
        { category: '건강', content: '건강 정보 교환' }
      ],
      voiceAnalysis: {
        energy: 92,
        clarity: 95,
        pace: 'normal'
      }
    }
  ];

  const insights = [
    {
      id: 1,
      type: '건강',
      title: '무릎 통증 반복 언급',
      desc: '최근 3일간 5회 언급되었습니다',
      detail: '지속적인 무릎 통증 호소가 감지되었습니다. 정형외과 방문을 권장합니다.',
      priority: 'high',
      action: '병원 예약 추천',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      timestamp: '2시간 전',
      // 4단계 구조
      situation: '최근 3일간 통화에서 무릎 통증을 5회 언급하셨습니다. 특히 계단 오르내릴 때 불편함을 호소하셨어요.',
      analysis: '지속적인 무릎 통증은 관절염이나 연골 손상의 신호일 수 있습니다. 조기 진단과 치료가 중요합니다.',
      guardianAction: '정형외과 진료 예약을 권장합니다. 가까운 병원 정보를 확인하시고, 동행이 필요하시면 일정을 조율해주세요.',
      aiPlan: '다음 통화 때 무릎 상태를 다시 확인하고, 병원 방문 여부를 물어볼 예정입니다. 통증이 심해지면 즉시 알려드리겠습니다.'
    },
    {
      id: 2,
      type: '감정',
      title: '전반적으로 안정적인 상태',
      desc: '주간 평균 감정 점수 89점 (양호)',
      detail: '최근 일주일간 감정 상태가 안정적으로 유지되고 있습니다.',
      priority: 'normal',
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      timestamp: '1시간 전',
      situation: '최근 일주일간 통화에서 평균 감정 점수 89점을 기록했습니다. 밝은 목소리와 긍정적인 대화가 이어지고 있어요.',
      analysis: '안정적인 감정 상태는 전반적인 건강과 삶의 질이 좋다는 신호입니다. 현재 상태를 잘 유지하고 계십니다.',
      guardianAction: '현재 상태가 매우 좋으니, 꾸준히 관심을 가져주시고 정기적으로 연락해주세요.',
      aiPlan: '긍정적인 대화를 이어가며, 감정 상태를 지속적으로 모니터링하겠습니다.'
    },
    {
      id: 3,
      type: '사회',
      title: '사회 활동 증가',
      desc: '친구 만남 횟수 전주 대비 2배 증가',
      detail: '긍정적인 사회 활동이 증가하고 있습니다. 이는 정신 건강에 매우 좋은 신호입니다.',
      priority: 'low',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      timestamp: '3시간 전',
      situation: '이번 주 친구 만남이 2회 있었습니다. 전주 대비 2배 증가했으며, 만남 후 기분이 매우 좋아지셨어요.',
      analysis: '사회적 교류는 외로움을 줄이고 정신 건강을 향상시킵니다. 매우 긍정적인 변화입니다.',
      guardianAction: '사회 활동을 격려해주세요. 정기적인 모임이나 활동을 제안하시면 좋습니다.',
      aiPlan: '친구 만남에 대해 자주 이야기를 나누며, 다음 만남 일정도 물어보겠습니다.'
    },
    {
      id: 4,
      type: '약물',
      title: '약 복용 일정 완벽 준수',
      desc: '최근 7일간 100% 복용률',
      detail: '처방된 모든 약물을 정시에 복용하고 계십니다.',
      priority: 'low',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      timestamp: '1일 전',
      situation: '최근 7일간 모든 약을 정시에 복용하셨습니다. 혈압약과 당뇨약을 빠짐없이 드셨어요.',
      analysis: '규칙적인 약 복용은 건강 관리의 핵심입니다. 완벽하게 지키고 계십니다.',
      guardianAction: '계속 격려해주시고, 약이 떨어지기 전에 미리 재처방받을 수 있도록 도와주세요.',
      aiPlan: '매일 약 복용 여부를 확인하고, 잊으셨을 경우 상기시켜 드리겠습니다.'
    }
  ];

  const weeklyTrend = [
    { day: '월', emotion: 85, health: 90 },
    { day: '화', emotion: 82, health: 88 },
    { day: '수', emotion: 88, health: 92 },
    { day: '목', emotion: 90, health: 91 },
    { day: '금', emotion: 92, health: 93 },
    { day: '토', emotion: 95, health: 92 },
    { day: '일', emotion: 89, health: 90 }
  ];

  const getCareLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'from-green-600 to-emerald-600';
      case 'good': return 'from-blue-600 to-cyan-600';
      case 'warning': return 'from-yellow-600 to-orange-600';
      case 'alert': return 'from-red-600 to-pink-600';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getCareLevelText = (level: string) => {
    switch (level) {
      case 'excellent': return '매우 좋음';
      case 'good': return '양호';
      case 'warning': return '주의 필요';
      case 'alert': return '긴급 대응 필요';
      default: return '확인 중';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      case 'normal': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'low': return 'bg-slate-50 border-slate-200 text-slate-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case '밝음':
      case '기쁨':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '차분함':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />

      <main className="flex-1 overflow-y-auto">
        {/* 프로페셔널 헤더 - 완전 재설계 */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/95 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* 좌측: 소리 + 사용자 정보 */}
              <div className="flex items-center gap-4">
                {/* 소리 캐릭터 - 브랜딩 강화 */}
                <div className="relative group">
                  <div className="w-14 h-14 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                    <SoriCharacter size={32} animated />
                  </div>
                  {/* 실시간 표시 - 생동감 있게 */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                  </div>
                </div>

                <div>
                  {/* 제목 - UX 카피라이팅 개선 */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                      {summaryData.elderName}
                    </h1>
                    <span className="text-lg font-bold text-slate-500">님의 오늘</span>
                  </div>
                  {/* 상태 - 더 구체적으로 */}
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      소리가 함께 케어 중
                    </span>
                    <span className="text-xs text-slate-500">• 마지막 통화 2시간 전</span>
                  </div>
                </div>
              </div>

              {/* 우측: 케어 점수 + 액션 버튼 */}
              <div className="flex items-center gap-3">
                {/* 케어 점수 - 시각적 피드백 강화 */}
                <div className="relative group cursor-pointer">
                  <div className={`relative px-5 py-3 rounded-md bg-gradient-to-r ${getCareLevelColor(summaryData.careLevel)} shadow-md hover:shadow-lg transition-all`}>
                    {/* 스코어 + 레벨 */}
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white leading-none mb-0.5">
                          {summaryData.healthScore}
                        </div>
                        <div className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                          SCORE
                        </div>
                      </div>
                      <div className="h-8 w-px bg-white/30"></div>
                      <div>
                        <div className="text-xs font-bold text-white/90 mb-0.5">케어 상태</div>
                        <div className="text-sm font-black text-white">
                          {getCareLevelText(summaryData.careLevel)}
                        </div>
                      </div>
                    </div>

                    {/* 호버 시 툴팁 */}
                    <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      <div className="font-bold mb-1">케어 점수 산정 기준</div>
                      <div className="text-slate-300 leading-relaxed">
                        감정(30%) + 건강(30%) + 사회(20%) + 활동(20%)을 종합하여 산정됩니다.
                      </div>
                      {/* 삼각형 화살표 */}
                      <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* 알림 센터 */}
                <NotificationCenter />

                {/* 빠른 액션 - 우선순위 명확화 */}
                {/* Primary: 긴급 연락 */}
                <button
                  onClick={() => router.push('/chat')}
                  className="group relative px-4 py-2.5 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg overflow-hidden"
                >
                  {/* 배경 애니메이션 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative z-10">긴급 연락</span>
                </button>

                {/* Secondary: 리포트 */}
                <button
                  onClick={() => router.push('/report')}
                  className="px-4 py-2.5 rounded-md border border-slate-300 bg-white text-slate-700 text-sm font-bold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  리포트
                </button>

                {/* Tertiary: 실시간 대화 (아이콘만) */}
                <button
                  onClick={() => router.push('/chat')}
                  className="w-10 h-10 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center shadow-sm"
                  title="실시간 대화 보기"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* AI 일일 요약 배너 */}
          <div className="mb-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-md shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <SoriCharacter size={28} animated />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-black text-white">오늘의 소리 요약</h3>
                  <span className="text-xs font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-md">방금 전</span>
                </div>
                <p className="text-sm font-medium text-white/90 leading-relaxed mb-3">
                  오늘 오후 2시 통화에서 <span className="font-black text-white">{summaryData.elderName} 님</span>은
                  평소보다 <span className="font-black text-white">밝은 목소리</span>로 손주 이야기를 많이 하셨어요.
                  무릎 통증은 여전하지만 컨디션은 좋아 보입니다.
                  다음 통화 때 <span className="px-2.5 py-1 bg-yellow-400 text-yellow-900 rounded-md font-black text-xs">약 복용 여부</span>를 확인해드릴게요.
                </p>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-white hover:text-white/80 transition-colors flex items-center gap-1">
                    <span>전체 통화 보기</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 통계 카드 - 플랫폼 컨셉 색상 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* 총 통화 횟수 */}
            <div className="relative bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
              {/* 배경 그라데이션 */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>+12%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1">총 통화 횟수</p>
                  <p className="text-3xl font-black text-slate-900 mb-1">{summaryData.totalCalls}회</p>
                  <p className="text-xs text-slate-500">지난주 대비 5회 증가</p>
                </div>
              </div>
            </div>

            {/* 평균 통화 시간 */}
            <div className="relative bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>+8%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1">평균 통화 시간</p>
                  <p className="text-3xl font-black text-slate-900 mb-1">{summaryData.avgDuration}분</p>
                  <p className="text-xs text-slate-500">지난주 대비 1분 증가</p>
                </div>
              </div>
            </div>

            {/* 감정 점수 */}
            <div className="relative bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-amber-600/10 to-orange-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>+3%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1">평균 감정 점수</p>
                  <p className="text-3xl font-black text-slate-900 mb-1">89점</p>
                  <p className="text-xs text-slate-500">매우 안정적인 상태</p>
                </div>
              </div>
            </div>

            {/* 케어 일수 */}
            <div className="relative bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <SoriCharacter size={24} animated />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-violet-600 bg-violet-50/80 px-2.5 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>연속</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1">소리와 함께한 날</p>
                  <p className="text-3xl font-black text-slate-900 mb-1">128일</p>
                  <p className="text-xs text-slate-500">2024년 9월 13일부터</p>
                </div>
              </div>
            </div>
          </div>

          {/* 온기 요약 카드 - 전문성 강화 */}
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">주간 케어 요약</h2>
                  <p className="text-xs text-slate-600">01/13 ~ 01/19 (7일간)</p>
                </div>
              </div>

              <button className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-1">
                <span>상세 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 감정 하이라이트 */}
              <div className="group p-5 rounded-md border-2 border-amber-100 bg-gradient-to-br from-amber-50/50 to-orange-50/30 hover:border-amber-200 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 000 2h4a1 1 0 100-2H8zm-1 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black text-amber-900 uppercase tracking-wide">Best Moment</h3>
                </div>
                <p className="text-sm font-bold text-slate-800 leading-relaxed mb-2">
                  손주 방문 소식을 들었을 때
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">금요일 오후 2시</span>
                  <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md">95점</span>
                </div>
              </div>

              {/* 주요 대화 주제 */}
              <div className="group p-5 rounded-md border-2 border-violet-100 bg-gradient-to-br from-violet-50/50 to-purple-50/30 hover:border-violet-200 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black text-violet-900 uppercase tracking-wide">Top Topics</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-1 rounded-md bg-white/80 border border-violet-200 text-xs font-bold text-violet-700">
                    #가족 12
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/80 border border-violet-200 text-xs font-bold text-violet-700">
                    #건강 8
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/80 border border-violet-200 text-xs font-bold text-violet-700">
                    #날씨 6
                  </span>
                </div>
                <p className="text-xs text-slate-600">총 26회 언급</p>
              </div>

              {/* 주간 건강 지수 */}
              <div className="group p-5 rounded-md border-2 border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 hover:border-emerald-200 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wide">Health Index</h3>
                </div>
                <p className="text-sm font-bold text-slate-800 leading-relaxed mb-2">
                  양호 (무릎 통증 관찰)
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-black text-emerald-600">85</span>
                </div>
              </div>
            </div>
          </div>

          {/* 메인 그리드 */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* 좌측: AI 케어 인사이트 */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* AI 인사이트 카드 - UX 개선 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center">
                      <SoriCharacter size={20} animated />
                      {/* AI 분석 중 표시 */}
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-600 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        소리의 케어 인사이트
                        <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                          AI 분석
                        </span>
                      </h2>
                      <p className="text-xs text-slate-600">방금 전 업데이트됨</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAllInsights(!showAllInsights)}
                    className="group flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-violet-300 transition-all"
                  >
                    <span>{showAllInsights ? '간단히 보기' : `전체 보기 (${insights.length})`}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${showAllInsights ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {(showAllInsights ? insights : insights.slice(0, 2)).map((insight, idx) => (
                    <div
                      key={insight.id}
                      className={`rounded-md border-2 ${insight.priority === 'high' ? 'border-red-300 bg-red-50/30' :
                          insight.priority === 'normal' ? 'border-blue-300 bg-blue-50/30' :
                            'border-slate-300 bg-white'
                        } transition-all shadow-sm hover:shadow-md`}
                    >
                      {/* 헤더 - 클릭 가능 */}
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedInsights);
                          if (newExpanded.has(insight.id)) {
                            newExpanded.delete(insight.id);
                          } else {
                            newExpanded.add(insight.id);
                          }
                          setExpandedInsights(newExpanded);
                        }}
                        className="w-full p-5 text-left hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${insight.priority === 'high' ? 'bg-red-100 text-red-600' :
                              insight.priority === 'normal' ? 'bg-blue-100 text-blue-600' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={insight.icon} />
                            </svg>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${insight.type === '건강' ? 'bg-red-100 text-red-700' :
                                  insight.type === '감정' ? 'bg-blue-100 text-blue-700' :
                                    insight.type === '사회' ? 'bg-purple-100 text-purple-700' :
                                      'bg-emerald-100 text-emerald-700'
                                }`}>
                                {insight.type}
                              </span>
                              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                {insight.timestamp}
                              </span>
                            </div>
                            <h3 className="text-base font-black text-slate-900 mb-1">{insight.title}</h3>
                            <p className="text-sm font-medium text-slate-600">{insight.desc}</p>
                          </div>

                          {/* 펼침 아이콘 */}
                          <svg
                            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${expandedInsights.has(insight.id) ? 'rotate-180' : ''
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* 4단계 구조 - 펼쳐진 경우에만 표시 */}
                      {expandedInsights.has(insight.id) && (
                        <div className="px-5 pb-5">
                          <div className="space-y-3 pt-4 border-t border-slate-200">
                            {/* 1. 상황 (What) */}
                            <div className="p-4 rounded-md bg-blue-50/50 border border-blue-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
                                  <span className="text-sm font-black text-white">1</span>
                                </div>
                                <h4 className="text-sm font-black text-blue-900">상황 (What)</h4>
                              </div>
                              <p className="text-sm font-medium text-slate-700 leading-relaxed">{insight.situation}</p>
                            </div>

                            {/* 2. 분석 (Why) */}
                            <div className="p-4 rounded-md bg-violet-50/50 border border-violet-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-md bg-violet-500 flex items-center justify-center">
                                  <span className="text-sm font-black text-white">2</span>
                                </div>
                                <h4 className="text-sm font-black text-violet-900">분석 (Why)</h4>
                              </div>
                              <p className="text-sm font-medium text-slate-700 leading-relaxed">{insight.analysis}</p>
                            </div>

                            {/* 3. 보호자 제안 (Action) */}
                            <div className="p-4 rounded-md bg-amber-50/50 border border-amber-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
                                  <span className="text-sm font-black text-white">3</span>
                                </div>
                                <h4 className="text-sm font-black text-amber-900">보호자 제안</h4>
                              </div>
                              <p className="text-sm font-bold text-slate-800 leading-relaxed">{insight.guardianAction}</p>
                            </div>

                            {/* 4. 소리의 계획 (AI's Plan) */}
                            <div className="p-4 rounded-md bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <h4 className="text-sm font-black text-emerald-900">소리의 계획</h4>
                              </div>
                              <p className="text-sm font-bold text-emerald-900 leading-relaxed">{insight.aiPlan}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 최근 통화 기록 - 고도화 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">최근 통화 기록</h2>
                      <p className="text-xs text-slate-600">최근 7일 • 총 {recentCalls.length}건</p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/chat')}
                    className="flex items-center gap-1 px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition-all"
                  >
                    <span>전체 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {recentCalls.map((call, idx) => (
                    <div key={call.id} className={`group border-2 rounded-md overflow-hidden hover:shadow-md transition-all ${idx === 0
                        ? 'border-violet-300 bg-violet-50/20'
                        : 'border-slate-300 bg-white hover:border-violet-200'
                      }`}>
                      {/* 통화 헤더 */}
                      <button
                        onClick={() => setSelectedCallId(selectedCallId === call.id ? null : call.id)}
                        className="w-full p-4 text-left hover:bg-slate-50/50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {/* 감정 아이콘 - 개선 */}
                            <div className={`w-9 h-9 rounded-md flex items-center justify-center transition-transform group-hover:scale-105 ${call.emotionColor === 'green' ? 'bg-emerald-50 text-emerald-600' :
                                call.emotionColor === 'blue' ? 'bg-blue-50 text-blue-600' :
                                  call.emotionColor === 'yellow' ? 'bg-amber-50 text-amber-600' :
                                    'bg-slate-50 text-slate-600'
                              }`}>
                              {getEmotionIcon(call.emotion)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-sm font-black text-slate-900">{call.date}</span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs font-bold text-slate-600">{call.time}</span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs font-bold text-slate-600">{call.duration}분</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${call.emotionColor === 'green' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                    call.emotionColor === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                      call.emotionColor === 'yellow' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                        'bg-slate-50 text-slate-700 border border-slate-200'
                                  }`}>
                                  {call.emotion} {call.emotionScore}
                                </span>
                              </div>
                              <p className="text-sm text-slate-700 font-medium truncate">{call.summary}</p>
                            </div>
                          </div>

                          {/* 알림 + 펼치기 */}
                          <div className="flex items-center gap-2 ml-4">
                            {call.hasAlert && (
                              <div className="px-2 py-1 rounded-md bg-red-50 border border-red-200 flex items-center gap-1">
                                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-bold text-red-700">주의</span>
                              </div>
                            )}
                            <svg
                              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${selectedCallId === call.id ? 'rotate-180' : ''
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* 통화 상세 */}
                      {selectedCallId === call.id && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200 animate-slideInDown">
                          {/* 알림 메시지 */}
                          {call.hasAlert && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 border-2 border-red-200">
                              <div className="flex items-center gap-2 mb-1">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="text-xs font-black text-red-700 uppercase">주의 필요</span>
                              </div>
                              <p className="text-sm font-bold text-red-900">{call.alertMessage}</p>
                            </div>
                          )}

                          {/* 상세 요약 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">통화 내용</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">{call.detailedSummary}</p>
                          </div>

                          {/* 주요 주제 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">주요 주제</h4>
                            <div className="space-y-2">
                              {call.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-1 rounded-md">
                                    {topic.category}
                                  </span>
                                  <span className="text-sm text-slate-700">{topic.content}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 키워드 태그 - 플랫폼 컨셉 스타일 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                              <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              주요 키워드
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {call.keywords.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="group relative px-3 py-1.5 rounded-md bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 text-xs font-bold text-violet-700 hover:from-violet-100 hover:to-purple-100 hover:border-violet-300 transition-all cursor-pointer"
                                >
                                  <span className="relative z-10">#{keyword}</span>
                                  {/* 호버 효과 */}
                                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-violet-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 음성 분석 */}
                          <div>
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">음성 분석</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">에너지</p>
                                <p className="text-lg font-black text-slate-900">{call.voiceAnalysis.energy}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">명료도</p>
                                <p className="text-lg font-black text-slate-900">{call.voiceAnalysis.clarity}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">말속도</p>
                                <p className="text-lg font-black text-slate-900 capitalize">{call.voiceAnalysis.pace}</p>
                              </div>
                            </div>
                          </div>

                          {/* 상세 리포트 버튼 */}
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <button
                              onClick={() => router.push(`/report?callId=${call.id}`)}
                              className="w-full py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group"
                            >
                              <span>이 통화 상세 리포트 보기</span>
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측: 예정 통화 + 주간 트렌드 */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* 다음 통화 - 전문성 강화 */}
              <div className="relative bg-white rounded-md shadow-sm border border-slate-200 p-6 overflow-hidden">
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-white opacity-60"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">다음 통화 예정</h3>
                      <p className="text-xs text-slate-600">소리가 준비하고 있어요</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-md p-5 mb-4 relative overflow-hidden">
                    {/* 반짝이는 효과 */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative">
                      <p className="text-xs text-white/80 font-bold mb-2 uppercase tracking-wider">{summaryData.nextCall.dayName}</p>
                      <p className="text-4xl font-black text-white mb-2 tracking-tight">{summaryData.nextCall.time}</p>
                      <p className="text-sm font-bold text-white/90">{summaryData.nextCall.date}</p>

                      {/* 카운트다운 표시 */}
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2 text-white/90">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span className="text-xs font-bold">3시간 12분 후</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full py-2.5 rounded-md border-2 border-violet-200 bg-white text-sm font-bold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    일정 관리
                  </button>
                </div>
              </div>

              {/* 예정 통화 목록 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-black text-slate-900 mb-4">이번 주 통화 일정</h3>
                <div className="space-y-2">
                  {upcomingCalls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                          <span className="text-xs font-black">{call.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{call.date}</p>
                          <p className="text-xs text-slate-600">{call.time}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주간 트렌드 - 고도화 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600/10 to-cyan-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">주간 케어 트렌드</h3>
                    <p className="text-sm font-bold text-slate-700">지난 7일 변화 추이</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* 감정 추이 */}
                  <div className="p-4 rounded-md bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-emerald-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 000 2h4a1 1 0 100-2H8zm-1 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-black text-slate-900">감정 점수</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-emerald-600">89</div>
                        <div className="text-sm font-bold text-slate-700">평균</div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-24 bg-white/50 rounded-md p-2">
                      {weeklyTrend.map((day, idx) => (
                        <div key={idx} className="group flex-1 flex flex-col items-center gap-1.5 cursor-pointer">
                          <div className="relative w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-sm transition-all hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg"
                            style={{ height: `${day.emotion}%` }}>
                            {/* 툴팁 */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {Math.round((day.emotion / 100) * 100)}점
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 건강 추이 */}
                  <div className="p-4 rounded-md bg-gradient-to-br from-blue-50/50 to-cyan-50/30 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-black text-slate-900">건강 점수</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-blue-600">91</div>
                        <div className="text-sm font-bold text-slate-700">평균</div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-24 bg-white/50 rounded-md p-2">
                      {weeklyTrend.map((day, idx) => (
                        <div key={idx} className="group flex-1 flex flex-col items-center gap-1.5 cursor-pointer">
                          <div className="relative w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-sm transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg"
                            style={{ height: `${day.health}%` }}>
                            {/* 툴팁 */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {Math.round((day.health / 100) * 100)}점
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 빠른 메모 - 소리와 함께 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-amber-600/10 to-orange-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">케어 노트</h3>
                    <p className="text-xs text-slate-600">소리가 함께 기억할게요</p>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    className="w-full h-28 p-3 rounded-md border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 resize-none text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all"
                    placeholder="오늘의 케어 노트를 작성하세요...&#10;예) 무릎 통증 지속, 손주 이야기 많이 하심"
                  />
                  {/* 소리 캐릭터 - 우측 하단 */}
                  <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none">
                    <SoriCharacter size={24} />
                  </div>
                </div>

                <button className="w-full mt-3 py-2.5 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
