'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { useOnboarding } from '@/app/contexts/OnboardingContext';

export default function OnboardingChapter4() {
  const router = useRouter();
  const { data } = useOnboarding();
  const [agreed, setAgreed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleComplete = () => {
    if (!agreed) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push('/onboarding/complete');
    }, 800);
  };

  const handleEdit = (chapter: number) => {
    router.push(`/onboarding/chapter-${chapter}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* 좌측 브랜딩 영역 */}
      <div className="hidden lg:flex lg:w-[420px] border-r-2 border-slate-200 bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-violet-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Chapter 4 • 최종 확인</span>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between gap-3 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-1">
                  <div className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg transition-all duration-500"></div>
                  <p className="text-xs font-bold text-center mt-2 text-violet-600">
                    {num === 1 ? '프로필' : num === 2 ? '건강' : num === 3 ? 'AI설정' : '확인'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-6">
            <SoriCharacter size={120} animated />
          </div>
          <div className="text-center space-y-3 max-w-xs">
            <p className="text-lg font-bold text-slate-800 leading-relaxed">
              마지막 확인만<br/>
              남았어요
            </p>
            <p className="text-sm font-medium text-slate-600">
              입력하신 정보를<br/>확인해주세요
            </p>
          </div>
        </div>

        <div className="w-full p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-violet-200 hover:bg-white/80 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            <p className="text-xs font-bold text-violet-700">다음 단계</p>
          </div>
          <p className="text-sm font-semibold text-slate-700">온보딩 완료</p>
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-violet-200 mb-4">
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">Chapter 4 • 최종 확인</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="h-1.5 flex-1 rounded-full bg-violet-600"></div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-white/50">
            {/* 헤더 */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">입력 정보 확인</h2>
              <p className="text-sm font-medium text-slate-600">
                <span className="font-bold text-violet-700">소리</span>가 이 정보로 서비스를 제공합니다
              </p>
            </div>

            {/* 정보 요약 */}
            <div className="space-y-4 mb-8">
              {/* 프로필 */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-violet-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-slate-900">프로필 정보</h3>
                  <button 
                    onClick={() => handleEdit(1)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:border-violet-300 text-xs font-bold text-slate-600 hover:text-violet-700 transition-all"
                  >
                    수정
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-bold text-slate-500 mb-1">보호자</p>
                    <p className="text-sm font-black text-slate-900">{data.guardian.name || '-'}</p>
                    <p className="text-xs text-slate-600">{data.guardian.phone || '-'}</p>
                    <p className="text-xs text-slate-500 mt-1">{data.guardian.relation || '-'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-bold text-slate-500 mb-1">소중한 분</p>
                    <p className="text-sm font-black text-slate-900">{data.elder.name || '-'}</p>
                    <p className="text-xs text-slate-600">{data.elder.phone || '-'}</p>
                  </div>
                </div>
              </div>

              {/* 건강 */}
              {(data.health.conditions.length > 0 || data.health.medications.length > 0 || data.health.emergencyContact) && (
                <div className="p-5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-black text-slate-900">건강 정보</h3>
                    <button 
                      onClick={() => handleEdit(2)}
                      className="px-3 py-1 rounded-lg border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-all"
                    >
                      수정
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.health.conditions.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-2">주요 질환</p>
                        <div className="flex flex-wrap gap-1.5">
                          {data.health.conditions.map((c, i) => (
                            <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.health.medications.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-2">복용 약물</p>
                        <div className="flex flex-wrap gap-1.5">
                          {data.health.medications.map((m, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.health.emergencyContact && (
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs font-bold text-red-600 mb-1">긴급 연락처</p>
                        <p className="text-xs font-black text-slate-900">
                          {data.health.emergencyContact} • {data.health.emergencyPhone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AI 맞춤 설정 */}
              <div className="p-5 rounded-xl border border-slate-200 hover:border-amber-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-slate-900">AI 맞춤 설정</h3>
                  <button 
                    onClick={() => handleEdit(3)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:border-amber-300 text-xs font-bold text-slate-600 hover:text-amber-700 transition-all"
                  >
                    수정
                  </button>
                </div>
                <div className="space-y-4">
                  {/* 통화 일정 */}
                  {data.callSchedules.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-2">통화 일정</p>
                      <div className="space-y-2">
                        {data.callSchedules.map((s, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                            <span className="text-xs text-slate-600">
                              {s.days.join(', ')}
                            </span>
                            <span className="text-sm font-black text-amber-600">{s.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 관심사/대화 주제 */}
                  {(data.aiSettings.conversationTopics.selectedTopics.length > 0 || data.aiSettings.conversationTopics.customTopics.length > 0) && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-2">관심사 · 대화 주제</p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.aiSettings.conversationTopics.selectedTopics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-bold">
                            {topic}
                          </span>
                        ))}
                        {data.aiSettings.conversationTopics.customTopics.map((topic, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 특이사항 */}
                  {data.aiSettings.conversationTopics.specialNotes && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-bold text-blue-700 mb-1">특이사항</p>
                      <p className="text-xs text-slate-700">{data.aiSettings.conversationTopics.specialNotes}</p>
                    </div>
                  )}

                  {/* 대화 스타일 */}
                  <div>
                    <p className="text-xs text-slate-600">
                      대화 스타일: <span className="font-bold text-slate-900">
                        {data.aiSettings.tone === 'warm' ? '따뜻하게' : data.aiSettings.tone === 'bright' ? '밝게' : '차분하게'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 동의 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-slate-300 checked:bg-violet-600 checked:border-violet-600 cursor-pointer transition-all"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-1">개인정보 수집 및 이용 동의</p>
                  <p className="text-xs font-medium text-slate-600">
                    소리가 입력하신 정보를 안전하게 보관하고, 더 나은 서비스 제공을 위해서만 사용합니다.
                  </p>
                </div>
              </label>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/onboarding/chapter-3')}
                className="h-11 px-6 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                ← 이전
              </button>
              <button
                onClick={handleComplete}
                disabled={!agreed}
                className={`flex-1 h-11 rounded-xl font-bold text-sm transition-all ${
                  agreed
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {agreed ? '동의하고 완료하기 →' : '동의 후 진행할 수 있어요'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 전환 오버레이 */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <SoriCharacter size={80} animated />
            <p className="text-base font-bold text-slate-900 mt-4">정보를 저장하고 있어요...</p>
          </div>
        </div>
      )}
    </div>
  );
}
