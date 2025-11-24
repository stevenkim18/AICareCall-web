'use client';

import { useState } from 'react';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Report() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedDate, setSelectedDate] = useState('2025-01-19');
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  const handleTabChange = (tab: 'daily' | 'weekly' | 'monthly') => {
    setIsLoadingTab(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoadingTab(false);
    }, 1500);
  };

  // 일일 리포트 데이터
  const dailyData = {
    date: '2025년 1월 19일',
    summary: ['평소보다 밝은 목소리로 대화하셨어요', '손주 이야기를 많이 하시며 즐거워하셨어요', '무릎 통증을 3번 언급하셨어요'],
    emotion: {
      primary: '기쁨',
      score: 92,
      distribution: [
        { name: '기쁨', value: 65, color: 'from-yellow-500 to-orange-500' },
        { name: '평온', value: 25, color: 'from-green-500 to-emerald-500' },
        { name: '걱정', value: 10, color: 'from-blue-500 to-cyan-500' }
      ]
    },
    topics: [
      { category: '가족', items: ['손주 방문 예정', '딸 전화 통화'], icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { category: '건강', items: ['무릎 통증 언급 (3회)', '약 제때 복용'], icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { category: '일상', items: ['날씨 좋음', '점심 잘 드심'], icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' }
    ],
    keywords: [
      { word: '손주', count: 5 },
      { word: '무릎', count: 3 },
      { word: '날씨', count: 2 },
      { word: '식사', count: 2 }
    ],
    transcript: [
      { speaker: 'sori', time: '10:30', text: '안녕하세요, 순자님! 오늘 아침은 어떠셨어요?' },
      { speaker: 'elder', time: '10:30', text: '아, 소리야! 오늘 날씨가 참 좋더라고. 기분이 좋네.' },
      { speaker: 'sori', time: '10:31', text: '날씨가 좋으시니 기분도 좋으시군요! 오늘 어떤 일이 있으셨어요?' },
      { speaker: 'elder', time: '10:31', text: '손주가 다음 주에 온다고 전화가 왔어. 너무 반가워서 벌써부터 설레네.' },
      { speaker: 'sori', time: '10:32', text: '와, 정말 좋은 소식이네요! 손주분이 오시면 무엇을 하고 싶으세요?' }
    ]
  };

  // 주간 리포트 데이터
  const weeklyData = {
    period: '1월 13일 ~ 1월 19일',
    summary: {
      totalCalls: 7,
      avgDuration: 14,
      avgEmotionScore: 89,
      trend: '+5%'
    },
    emotionTrend: [
      { day: '월', score: 85, status: 'good' },
      { day: '화', score: 82, status: 'good' },
      { day: '수', score: 90, status: 'excellent' },
      { day: '목', score: 88, status: 'good' },
      { day: '금', score: 92, status: 'excellent' },
      { day: '토', score: 87, status: 'good' },
      { day: '일', score: 91, status: 'excellent' }
    ],
    insights: [
      {
        type: 'positive',
        title: '사회 활동 증가',
        description: '친구 만남 횟수가 전주 대비 2배 증가했습니다. 긍정적인 변화입니다.',
        impact: 'high'
      },
      {
        type: 'attention',
        title: '무릎 통증 지속',
        description: '이번 주 총 12회 무릎 통증을 언급하셨습니다. 병원 방문을 권장합니다.',
        impact: 'high'
      },
      {
        type: 'neutral',
        title: '규칙적인 약 복용',
        description: '처방된 모든 약을 정시에 복용하고 계십니다.',
        impact: 'medium'
      }
    ],
    topKeywords: [
      { word: '무릎', count: 12, change: '+20%' },
      { word: '손주', count: 8, change: '+60%' },
      { word: '친구', count: 6, change: '+200%' },
      { word: '산책', count: 5, change: '0%' },
      { word: '약', count: 5, change: '-10%' }
    ]
  };

  // 월간 리포트 데이터
  const monthlyData = {
    period: '2025년 1월',
    summary: {
      totalCalls: 28,
      avgDuration: 15,
      avgEmotionScore: 87,
      completionRate: 96
    },
    highlights: [
      '가족과의 소통이 활발해졌습니다',
      '규칙적인 일상을 잘 유지하고 계십니다',
      '건강 관리에 대한 관심이 높아졌습니다'
    ],
    concerns: [
      '무릎 통증이 지속되고 있습니다',
      '가끔 외로움을 느끼신다고 말씀하셨습니다'
    ]
  };

  const downloadReport = () => {
    alert('리포트 다운로드 기능은 곧 제공됩니다!');
  };

  return (
    <>
      <LNB />
      <SidebarInset className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">케어 리포트</h1>
                  <p className="text-sm text-slate-600">AI가 분석한 통화 내용을 확인하세요</p>
                </div>
              </div>

              <button
                onClick={downloadReport}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                리포트 다운로드
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* 탭 네비게이션 */}
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 border border-slate-200 w-fit">
            {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                disabled={isLoadingTab}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === tab
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  } ${isLoadingTab ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tab === 'daily' ? '일일' : tab === 'weekly' ? '주간' : '월간'}
              </button>
            ))}
          </div>

          {/* 로딩 인터랙션 */}
          {isLoadingTab && (
            <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative w-20 h-20 mx-auto">
                    <SoriCharacter size={80} animated />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  한 주간의 마음 기록을 정리하고 있어요
                </h3>
                <p className="text-sm text-slate-600 mb-6">잠시만 기다려주세요...</p>
                <div className="flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-violet-600 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 일일 리포트 */}
          {activeTab === 'daily' && (
            <div className="space-y-6">
              {/* 기간 선택 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">날짜 선택</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full max-w-xs h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 font-bold"
                />
              </div>

              {/* 전체 요약 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md shadow-sm border-2 border-emerald-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-emerald-900">오늘의 전체 요약</h3>
                    <p className="text-xs font-bold text-emerald-700">{dailyData.date}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  오늘 <span className="font-bold">순자님</span>과의 통화에서는
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-sm font-bold mx-1">손주 방문 소식</span>으로
                  매우 기뻐하시는 모습이었습니다.
                  전반적으로 밝고 긍정적인 감정 상태를 보이셨으나,
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-sm font-bold mx-1">무릎 통증</span>을
                  여러 차례 언급하셔서 지속적인 관심이 필요해 보입니다.
                  식사와 약 복용은 잘 하고 계시며, 날씨가 좋아 기분도 좋다고 하셨습니다.
                </p>
              </div>

              {/* AI 핵심 인사이트 (3줄) */}
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-md shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <SoriCharacter size={26} animated />
                  </div>
                  <div>
                    <h2 className="text-lg font-black">핵심 인사이트</h2>
                    <p className="text-xs font-bold opacity-90">AI가 선별한 중요 포인트</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {dailyData.summary.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-black">{idx + 1}</span>
                      </div>
                      <p className="text-sm font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 감정 분석 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">감정 분석</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 감정 점수 */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="url(#emotionGradient)"
                          strokeWidth="8"
                          strokeDasharray={`${dailyData.emotion.score * 3.51} 351.86`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="emotionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <p className="text-3xl font-black text-slate-900">{dailyData.emotion.score}</p>
                          <p className="text-xs font-bold text-slate-600">점</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-black text-slate-900">{dailyData.emotion.primary}</p>
                    <p className="text-sm text-slate-600">주요 감정</p>
                  </div>

                  {/* 감정 분포 */}
                  <div className="space-y-3">
                    {dailyData.emotion.distribution.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-700">{item.name}</span>
                          <span className="text-sm font-black text-slate-900">{item.value}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 시간대별 감정 변화 그래프 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">시간대별 감정 추이</h3>
                    <p className="text-xs font-bold text-slate-600">통화 중 감정 변화</p>
                  </div>
                </div>
                <div className="relative h-48 flex items-end gap-2">
                  {[85, 90, 88, 92, 95, 93, 90, 87, 88, 91, 94, 92].map((score, idx) => (
                    <div key={idx} className="flex-1 group cursor-pointer">
                      <div
                        className="relative bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-sm hover:from-emerald-600 hover:to-teal-500 transition-all"
                        style={{ height: `${score}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                          {score}점
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-slate-600 text-center mt-2">{idx + 1}분</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주요 주제 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">주요 대화 주제</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dailyData.topics.map((topic, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={topic.icon} />
                          </svg>
                        </div>
                        <h4 className="text-sm font-black text-slate-900">{topic.category}</h4>
                      </div>
                      <ul className="space-y-2">
                        {topic.items.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-1.5 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주요 키워드 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">주요 키워드</h3>
                    <p className="text-xs font-bold text-slate-600">자주 언급된 단어</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {dailyData.keywords.map((kw, idx) => (
                    <div
                      key={idx}
                      className="group relative px-5 py-3 rounded-md bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 hover:from-violet-100 hover:to-purple-100 hover:border-violet-300 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-violet-700">#{kw.word}</span>
                        <span className="text-xs font-bold text-violet-600 bg-white/60 px-2 py-0.5 rounded-md">×{kw.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 대화록 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">전체 대화록</h3>
                <div className="space-y-4">
                  {dailyData.transcript.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.speaker === 'sori' ? '' : 'flex-row-reverse'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.speaker === 'sori'
                        ? 'bg-gradient-to-br from-violet-600 to-purple-600'
                        : 'bg-slate-200'
                        }`}>
                        {msg.speaker === 'sori' ? (
                          <SoriCharacter size={24} animated={false} />
                        ) : (
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <div className={`flex-1 max-w-2xl ${msg.speaker === 'sori' ? '' : 'text-right'}`}>
                        <div className={`inline-block p-4 rounded-2xl ${msg.speaker === 'sori'
                          ? 'bg-violet-100 border border-violet-200'
                          : 'bg-slate-100 border border-slate-200'
                          }`}>
                          <p className="text-sm font-medium text-slate-900 leading-relaxed">{msg.text}</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 px-2">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 주간 리포트 */}
          {activeTab === 'weekly' && (
            <div className="space-y-6">
              {/* 기간 표시 - 월간 스타일 하이라이트 */}
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">{weeklyData.period}</h2>
                    <p className="text-base font-bold text-white/90">주간 케어 리포트</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-black text-white bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-white/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    전주 대비 {weeklyData.summary.trend}
                  </div>
                </div>
              </div>

              {/* 주요 지표 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <p className="text-sm font-bold text-slate-600 mb-2">총 통화</p>
                  <p className="text-3xl font-black text-slate-900">{weeklyData.summary.totalCalls}회</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <p className="text-sm font-bold text-slate-600 mb-2">평균 시간</p>
                  <p className="text-3xl font-black text-slate-900">{weeklyData.summary.avgDuration}분</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <p className="text-sm font-bold text-slate-600 mb-2">감정 점수</p>
                  <p className="text-3xl font-black text-slate-900">{weeklyData.summary.avgEmotionScore}점</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <p className="text-sm font-bold text-slate-600 mb-2">추세</p>
                  <p className="text-3xl font-black text-green-600">{weeklyData.summary.trend}</p>
                </div>
              </div>

              {/* 주간 전체 요약 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md shadow-sm border-2 border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-blue-900">주간 전체 요약</h3>
                    <p className="text-xs font-bold text-blue-700">{weeklyData.period}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  이번 주 <span className="font-bold">순자님</span>은 전반적으로 안정적이고 긍정적인 한 주를 보내셨습니다.
                  총 <span className="px-2 py-0.5 bg-violet-100 text-violet-800 rounded-sm font-bold mx-1">{weeklyData.summary.totalCalls}회</span>의 통화에서
                  평균 <span className="font-bold">{weeklyData.summary.avgDuration}분</span>간 대화하셨으며,
                  가족 관계에서 큰 행복을 느끼시는 것으로 나타났습니다.
                  다만 건강 관련 언급이 증가한 점은 지속적인 관심이 필요합니다.
                </p>
              </div>

              {/* 감정 변화 그래프 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">주간 감정 추이</h3>
                    <p className="text-xs font-bold text-slate-600">요일별 감정 점수</p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 h-64">
                  {weeklyData.emotionTrend.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-center mb-2">
                        <p className="text-xs font-black text-slate-900">{day.score}점</p>
                      </div>
                      <div
                        className={`w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${day.status === 'excellent'
                          ? 'bg-gradient-to-t from-green-600 to-emerald-500'
                          : 'bg-gradient-to-t from-blue-600 to-cyan-500'
                          }`}
                        style={{ height: `${day.score}%` }}
                      ></div>
                      <p className="text-sm font-bold text-slate-700 mt-2">{day.day}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI 인사이트 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">주간 인사이트</h3>
                <div className="space-y-4">
                  {weeklyData.insights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl border-2 ${insight.type === 'positive'
                        ? 'bg-green-50 border-green-200'
                        : insight.type === 'attention'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-blue-50 border-blue-200'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight.type === 'positive'
                          ? 'bg-green-100'
                          : insight.type === 'attention'
                            ? 'bg-red-100'
                            : 'bg-blue-100'
                          }`}>
                          <svg className={`w-5 h-5 ${insight.type === 'positive'
                            ? 'text-green-600'
                            : insight.type === 'attention'
                              ? 'text-red-600'
                              : 'text-blue-600'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {insight.type === 'positive' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                            {insight.type === 'attention' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            )}
                            {insight.type === 'neutral' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-black text-slate-900 mb-1">{insight.title}</h4>
                          <p className="text-sm text-slate-700">{insight.description}</p>
                        </div>
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${insight.impact === 'high'
                          ? 'bg-red-100 text-red-700'
                          : insight.impact === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-slate-100 text-slate-700'
                          }`}>
                          {insight.impact === 'high' ? '높음' : insight.impact === 'medium' ? '중간' : '낮음'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주간 하이라이트 */}
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-md shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <SoriCharacter size={26} animated />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">이번 주 하이라이트</h3>
                    <p className="text-xs font-bold opacity-90">소리가 발견한 특별한 순간들</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 border border-white/20">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold">가족과의 소통이 <span className="text-yellow-300">2배 증가</span>했어요</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 border border-white/20">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold">평균 감정 점수가 <span className="text-yellow-300">89점</span>으로 매우 안정적입니다</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주요 키워드 (전주 대비) */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-600/10 to-purple-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">주요 키워드</h3>
                    <p className="text-xs font-bold text-slate-600">전주 대비 변화</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {weeklyData.topKeywords.map((kw, idx) => (
                    <div key={idx} className="group text-center p-5 rounded-md bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
                      <p className="text-xl font-black text-slate-900 mb-2">#{kw.word}</p>
                      <p className="text-sm font-bold text-slate-700 mb-3">×{kw.count}회</p>
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-md ${kw.change.startsWith('+')
                        ? 'bg-red-100 text-red-700'
                        : kw.change === '0%'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {kw.change.startsWith('+') && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                        {kw.change.startsWith('-') && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                        {kw.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 월간 리포트 */}
          {activeTab === 'monthly' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-3xl font-black mb-2">{monthlyData.period}</h2>
                <p className="text-lg opacity-90">월간 종합 리포트</p>
              </div>

              {/* 월간 전체 요약 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md shadow-sm border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-purple-900">월간 전체 요약</h3>
                    <p className="text-xs font-bold text-purple-700">{monthlyData.period}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  이번 달 <span className="font-bold">순자님</span>은 매우 안정적이고 건강한 한 달을 보내셨습니다.
                  총 <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-sm font-bold mx-1">{monthlyData.summary.totalCalls}회</span>의 통화를 통해
                  평균 <span className="font-bold">{monthlyData.summary.avgDuration}분</span>간 대화하셨으며,
                  평균 감정 점수 <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-sm font-bold mx-1">{monthlyData.summary.avgEmotionScore}점</span>으로
                  매우 긍정적인 상태를 유지하고 계십니다.
                  가족과의 소통이 활발해지고 일상 활동도 증가하여 전반적으로 매우 좋은 흐름을 보이고 있습니다.
                </p>
              </div>

              {/* 월간 핵심 지표 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <p className="text-sm font-bold text-slate-600 mb-2">총 통화</p>
                  <p className="text-3xl font-black text-slate-900">{monthlyData.summary.totalCalls}회</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <p className="text-sm font-bold text-slate-600 mb-2">평균 시간</p>
                  <p className="text-3xl font-black text-slate-900">{monthlyData.summary.avgDuration}분</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <p className="text-sm font-bold text-slate-600 mb-2">감정 점수</p>
                  <p className="text-3xl font-black text-slate-900">{monthlyData.summary.avgEmotionScore}점</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <p className="text-sm font-bold text-slate-600 mb-2">완료율</p>
                  <p className="text-3xl font-black text-green-600">{monthlyData.summary.completionRate}%</p>
                </div>
              </div>

              {/* 하이라이트 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">이번 달 하이라이트</h3>
                    <p className="text-xs font-bold text-slate-600">긍정적인 변화</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {monthlyData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-md bg-emerald-50 border-2 border-emerald-200">
                      <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 월간 감정 추이 그래프 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-600/10 to-teal-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">월간 감정 추이</h3>
                    <p className="text-xs font-bold text-slate-600">주차별 감정 변화</p>
                  </div>
                </div>
                <div className="relative h-56 flex items-end gap-4">
                  {[{ week: '1주차', score: 85 }, { week: '2주차', score: 88 }, { week: '3주차', score: 87 }, { week: '4주차', score: 89 }].map((data, idx) => (
                    <div key={idx} className="flex-1 group cursor-pointer">
                      <div
                        className="relative bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md hover:from-emerald-600 hover:to-teal-500 transition-all"
                        style={{ height: `${data.score}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap">
                          {data.score}점
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-700 text-center mt-3">{data.week}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 관심 사항 */}
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600/10 to-orange-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">관심이 필요한 부분</h3>
                    <p className="text-xs font-bold text-slate-600">지속 관찰 필요</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {monthlyData.concerns.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-md bg-red-50 border-2 border-red-200">
                      <div className="w-7 h-7 rounded-md bg-red-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </>
  );
}