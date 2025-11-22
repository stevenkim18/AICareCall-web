import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
}

export function OnboardingLayout({ children, currentStep = 1 }: OnboardingLayoutProps) {
  // Step별 배경색 및 테마 설정 (v2 스타일 - 진한 좌측 패널)
  const stepConfig = {
    1: {
      bgGradient: 'from-violet-100/60 via-purple-100/60 to-fuchsia-100/60',
      leftPanelGradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      chapterTitle: 'Step 1 • 프로필 정보',
      chapterDescription: '안녕하세요!\n저는 소리예요',
      chapterSubtext: '제가 소중한 분을 케어할 수 있도록\n보호자님을 알려주세요',
      nextStep: 'Step 2 • 건강 정보',
    },
    2: {
      bgGradient: 'from-emerald-100/60 via-teal-100/60 to-cyan-100/60',
      leftPanelGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      chapterTitle: 'Step 2 • 건강 정보',
      chapterDescription: '어르신의 건강을\n함께 지켜요',
      chapterSubtext: '더 나은 케어를 위해\n건강 정보를 알려주세요',
      nextStep: 'Step 3 • 통화 설정',
    },
    3: {
      bgGradient: 'from-blue-100/60 via-sky-100/60 to-indigo-100/60',
      leftPanelGradient: 'from-blue-600 via-sky-600 to-indigo-600',
      chapterTitle: 'Step 3 • 통화 설정',
      chapterDescription: '통화 일정을\n설정해주세요',
      chapterSubtext: '소리가 전화할 시간을\n정해주세요',
      nextStep: 'Step 4 • 통화 내용',
    },
    4: {
      bgGradient: 'from-amber-50/60 via-orange-50/60 to-yellow-50/60',
      leftPanelGradient: 'from-amber-500 via-orange-500 to-yellow-500',
      chapterTitle: 'Step 4 • 통화 내용',
      chapterDescription: '어떤 이야기를\n나눌까요?',
      chapterSubtext: '소리가 물어볼 내용을\n알려주세요',
      nextStep: 'Step 5 • 확인',
    },
    5: {
      bgGradient: 'from-slate-100/60 via-gray-100/60 to-zinc-100/60',
      leftPanelGradient: 'from-slate-600 via-gray-600 to-zinc-600',
      chapterTitle: 'Step 5 • 확인',
      chapterDescription: '거의 다 왔어요!',
      chapterSubtext: '마지막으로\n정보를 확인해주세요',
      nextStep: '완료',
    },
  };

  const config = stepConfig[currentStep as 1 | 2 | 3 | 4 | 5] || stepConfig[1];

  return (
    <div className={`min-h-screen flex transition-all duration-700 ease-in-out`}>
      {/* 좌측 브랜딩 영역 - v2 스타일 (진한 그라데이션) */}
      <div className={`hidden lg:flex lg:w-[500px] border-r-2 border-white/20 bg-gradient-to-br ${config.leftPanelGradient} flex-col items-center justify-between p-12 transition-all duration-700 ease-in-out shadow-2xl`}>
        <div className="w-full">
          {/* Chapter 표시 - 이미지 스타일 (둥근 배지) */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/40 shadow-lg mb-10`}>
            <div className={`w-2 h-2 bg-white rounded-full`}></div>
            <span className="text-sm font-bold text-white tracking-tight">{config.chapterTitle}</span>
          </div>

          {/* 프로그레스 바 - 텍스트 없는 바 5개 */}
          <div className="mb-12">
            <div className="flex justify-between gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex-1">
                  <div className={`h-1.5 rounded-full ${currentStep >= num
                    ? 'bg-white shadow-md'
                    : 'bg-white/30'
                    } transition-all duration-500 ease-in-out`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 중앙 캐릭터 - 글래스모피즘 외곽 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Sori 캐릭터 + 글래스모피즘 링 */}
          <div className="mb-8 relative">
            {/* 글래스모피즘 외곽선 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 rounded-[60px] bg-white/10 backdrop-blur-sm border-4 border-white/30 shadow-2xl"></div>
            </div>
            {/* Sori 캐릭터 */}
            <div className="relative z-10 flex items-center justify-center w-52 h-52 transform hover:scale-105 transition-transform duration-300">
              <SoriCharacter size={140} animated />
            </div>
          </div>

          <div className="text-center space-y-4 max-w-sm">
            <p className="text-2xl font-black text-white leading-tight whitespace-pre-line tracking-tight drop-shadow-lg">
              {config.chapterDescription}
            </p>
            <p className="text-sm font-semibold text-white/90 whitespace-pre-line leading-relaxed drop-shadow-md">
              {config.chapterSubtext}
            </p>
          </div>
        </div>

        {/* 하단 정보 - 다음 단계 (Solid White Box) */}
        <div className="w-full p-5 rounded-xl bg-white border-2 border-white/40 hover:bg-white/95 hover:border-white/60 transition-all duration-300 shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${config.leftPanelGradient} flex items-center justify-center shadow-sm`}>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="text-sm font-black text-slate-800">다음 단계</span>
          </div>
          <p className="text-xs font-bold text-slate-600 leading-relaxed ml-7">
            {config.nextStep}
          </p>
        </div>
      </div>

      {/* 오른쪽 폼 영역 - 연한 배경색 적용 */}
      <div className={`flex-1 flex flex-col h-screen overflow-y-auto bg-gradient-to-br ${config.bgGradient} transition-all duration-700`}>
        {/* 모바일 로고 - v2 스타일 */}
        <div className="lg:hidden p-6 border-b border-slate-200/50 sticky top-0 bg-white/90 backdrop-blur-xl z-10 shadow-sm">
          <div className="flex items-center gap-2.5">
            <SoriCharacter size={36} />
            <span className="text-lg font-black text-slate-900">Sori AI</span>
          </div>
        </div>

        {/* 폼 컨텐츠 */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
