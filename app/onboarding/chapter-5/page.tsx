'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriLogo } from '@/app/components/custom/SoriLogo';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';

export default function OnboardingChapter5() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [elderConsent, setElderConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    {
      id: 'profile',
      title: '프로필 정보',
      icon: '👤',
      items: [
        { label: '보호자', value: '김보호 (아들)' },
        { label: '소중한 분', value: '박순자 (여성, 82세)' },
        { label: '연락처', value: '010-9876-5432' }
      ]
    },
    {
      id: 'health',
      title: '건강 정보',
      icon: '💊',
      items: [
        { label: '주요 질환', value: '고혈압, 당뇨' },
        { label: '복용 약', value: '혈압약 오전 1알, 당뇨약 2회' },
        { label: '긴급 연락처', value: '김자녀 (010-1234-5678)' }
      ]
    },
    {
      id: 'schedule',
      title: '통화 설정',
      icon: '📅',
      items: [
        { label: '통화 요일', value: '월, 수, 금' },
        { label: '통화 시간', value: '오전 10:00' },
        { label: '대화 톤', value: '다정하게' },
        { label: '알림', value: '켜짐' }
      ]
    },
    {
      id: 'interests',
      title: '맞춤 대화 정보',
      icon: '💬',
      items: [
        { label: '관심사', value: '드라마, 트로트, 뉴스' },
        { label: '활동', value: '산책, 친구 만나기' },
        { label: '특이사항', value: '큰 목소리로 또박또박 말씀해주세요' }
      ]
    }
  ];

  const handleSubmit = async () => {
    if (!elderConsent || !privacyConsent) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/onboarding/complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/20 flex flex-col">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SoriLogo size={32} />
              <span className="text-xl font-black text-slate-900">Sori</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-bold text-slate-500">Chapter 5 • 최종 확인</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex">
        <aside className="hidden lg:flex lg:w-[380px] bg-gradient-to-br from-green-50/50 to-blue-50/30 border-r-2 border-slate-100 flex-col p-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-2 border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-700">Chapter 5 • 최종 확인</span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full h-2 rounded-full bg-green-600"></div>
                  <span className="text-xs font-bold text-green-600">
                    Step {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full animate-pulse"></div>
              <SoriCharacter size={80} animated />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-slate-900 leading-snug">
                거의 다 왔어요!<br/>마지막으로 확인해주세요
              </h2>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                입력하신 정보를 검토하고<br/>동의하시면 시작할 수 있어요
              </p>
            </div>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-8 py-12">
            <div className="space-y-8">
              <div className="mb-8">
                <h1 className="text-4xl font-black text-slate-900 mb-3">
                  정보 요약
                </h1>
                <p className="text-lg font-semibold text-slate-600">
                  입력하신 정보가 맞는지 확인해주세요.
                </p>
              </div>

              <div className="space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full px-6 py-5 flex items-center justify-between transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{section.icon}</span>
                        <span className="text-lg font-black text-slate-900">{section.title}</span>
                      </div>
                      <svg
                        className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                          expandedSection === section.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedSection === section.id && (
                      <div className="px-6 pb-5 space-y-3 animate-fade-in">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start py-2 border-t border-slate-100">
                            <span className="text-sm font-bold text-slate-600">{item.label}</span>
                            <span className="text-sm font-semibold text-slate-900 text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-6 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h2 className="text-2xl font-black text-slate-900 mb-6">동의 사항</h2>
                
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={elderConsent}
                    onChange={(e) => setElderConsent(e.target.checked)}
                    className="w-6 h-6 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      어르신 본인 동의 (필수)
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      소중한 분께 AI 전화 서비스 이용에 대한 동의를 받으셨나요?
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="w-6 h-6 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      개인정보 수집 및 이용 동의 (필수)
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      입력하신 정보는 AI 대화 서비스 제공 목적으로만 사용됩니다.
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => router.push('/onboarding/chapter-4')}
                  className="h-14 px-8 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all"
                >
                  잠깐만요
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!elderConsent || !privacyConsent || isSubmitting}
                  className="flex-1 h-14 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 text-sm font-bold text-white shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      처리 중...
                    </>
                  ) : (
                    '동의하고 시작하기'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

