'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { PageTransition } from '@/app/components/custom/PageTransition';

export default function OnboardingComplete() {
  const router = useRouter();
  const [inviteCode] = useState(() => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  });
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fullText = "이제 소리가 소중한 분과 함께합니다";

  // 단계별 등장 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 5) setStep(step + 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [step]);

  // 타이핑 애니메이션
  useEffect(() => {
    if (step < 2) return;
    
    setDisplayedText('');
    setIsTyping(true);
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [step]);

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartDashboard = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <PageTransition 
        isActive={isTransitioning} 
        message="대시보드 준비 중"
        onComplete={handleTransitionComplete}
      />
      
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-violet-50/30 via-white to-purple-50/20">
        {/* 음파 배경 패턴 - 시작 가이드와 동일 */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 100 Q 50 80, 100 100 T 200 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-600"
                />
                <path
                  d="M 0 120 Q 50 100, 100 120 T 200 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-purple-600"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* 동적 배경 블러 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl">
            {/* 완료 아이콘 */}
            <div className={`flex justify-center mb-8 transition-all duration-700 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 헤드라인 */}
            <div className={`text-center mb-12 transition-all duration-700 delay-200 ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h1 className="text-5xl font-black text-slate-900 mb-4 leading-tight">
                준비 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">완료</span>!
              </h1>
              <p className="text-lg font-medium text-slate-600 leading-relaxed min-h-[1.75rem]">
                {displayedText}
                {isTyping && <span className="inline-block w-0.5 h-5 bg-violet-600 ml-1 animate-pulse"></span>}
              </p>
            </div>

            {/* 초대 코드 카드 */}
            <div className={`mb-10 transition-all duration-700 delay-400 ${
              step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <SoriCharacter size={24} animated />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">어르신께 전달할 초대 코드</h3>
                    <p className="text-xs text-slate-600">앱에서 이 코드를 입력하시면 됩니다</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 mb-4 border-2 border-violet-200/50">
                  <p className="text-center text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 tracking-wider mb-2 font-mono">
                    {inviteCode}
                  </p>
                  <p className="text-center text-xs font-bold text-slate-500">6자리 초대 코드</p>
                </div>

                <button
                  onClick={copyCode}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      복사 완료!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      코드 복사하기
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 앱 설치 가이드 */}
            <div className={`mb-10 transition-all duration-700 delay-600 ${
              step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h3 className="text-xl font-black text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                어르신 앱 설치 안내
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    num: 1, 
                    title: '앱 다운로드', 
                    desc: '앱스토어에서 "소리 AI" 검색 후 설치하세요', 
                    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
                    color: 'from-blue-600 to-cyan-600'
                  },
                  { 
                    num: 2, 
                    title: '초대 코드 입력', 
                    desc: '앱 실행 후 위의 6자리 코드를 입력하세요', 
                    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
                    color: 'from-violet-600 to-purple-600'
                  },
                  { 
                    num: 3, 
                    title: '첫 통화 시작', 
                    desc: '설정한 시간에 소리가 따뜻하게 전화 드려요', 
                    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                    color: 'from-emerald-600 to-teal-600'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon}/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        Step {item.num}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 대시보드 이동 버튼 */}
            <div className={`transition-all duration-700 delay-800 ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <button
                onClick={handleStartDashboard}
                className="w-full h-16 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">소리와 함께 시작하기</span>
                <svg className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
              
              <p className="text-center text-sm font-medium text-slate-500 mt-4">
                대시보드에서 모든 설정을 관리하고 통화 기록을 확인할 수 있어요
              </p>
            </div>

            {/* 소리 캐릭터 */}
            <div className={`flex justify-center mt-8 transition-all duration-700 delay-1000 ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <SoriCharacter size={80} animated />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
