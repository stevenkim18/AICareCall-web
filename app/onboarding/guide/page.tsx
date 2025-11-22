'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SoriLogo } from '@/app/components/custom/SoriLogo';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';

const GUIDE_SLIDES = [
  {
    id: 1,
    title: '소리에 오신 것을',
    titleHighlight: '환영합니다.',
    subtitle: "저는 당신의 소중한 분께 따뜻한 말벗이 되어드릴 '소리'입니다.",
    ctaText: '좋아요!',
    ctaSubtext: '소리와 함께 시작해볼까요?',
  },
  {
    id: 2,
    title: '3분의 약속,',
    titleHighlight: '놀라운 변화',
    subtitle: '정말 간단한 약속만으로, 소리가 매일 따뜻한 안부를 전합니다!',
    ctaText: '좋아요!',
    ctaSubtext: '어떤 변화가 있을지 궁금해요',
  },
  {
    id: 3,
    title: '가장 소중한 약속,',
    titleHighlight: "'안심'이에요.",
    subtitle: "모든 대화와 정보는 소중한 분과의 교감을 위해서만, '안전하게' 사용돼요!",
    ctaText: '소리와 함께할게요',
    ctaSubtext: '이제 시작해보세요',
  },
];

export default function OnboardingGuide() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // 타이핑 애니메이션 - 더 자연스럽게
  useEffect(() => {
    const subtitle = GUIDE_SLIDES[currentSlide].subtitle;
    setDisplayedText('');
    setIsTyping(true);

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < subtitle.length) {
        setDisplayedText(subtitle.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < GUIDE_SLIDES.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsAnimating(false);
      }, 500);
    } else {
      // 전환 UX 시작
      setIsTransitioning(true);
      setTimeout(() => {
        router.push('/onboarding');
      }, 1800);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const progressPercentage = ((currentSlide + 1) / GUIDE_SLIDES.length) * 100;

  const renderSubtitle = (text: string, slideId: number) => {
    // 각 슬라이드별 하이라이트 키워드
    const highlightMap: { [key: number]: string[] } = {
      1: ['따뜻한 말벗', '소리'],
      2: ['매일', '따뜻한 안부', '소리'],
      3: ['교감', '안전하게', '소리'],
    };

    const keywords = highlightMap[slideId] || [];
    const regex = new RegExp(`(${keywords.join('|')})`, 'g');
    const tokens = text.split(regex);

    return tokens.map((part, idx) => {
      // 소리 컴포넌트 (세밀하게 네모난 쉐입)
      if (part === '소리') {
        return (
          <span
            key={`sori-${idx}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-blue-200/70 px-3 py-1 text-blue-600 font-bold text-[0.95em] shadow-sm align-middle mx-1"
          >
            <SoriCharacter size={16} animated />
            <span>소리</span>
          </span>
        );
      }

      // 따뜻한 말벗 / 따뜻한 안부 (따뜻함 강조)
      if (part === '따뜻한 말벗' || part === '따뜻한 안부') {
        return (
          <span
            key={`warm-${idx}`}
            className="relative inline-block font-bold text-blue-700 mx-0.5"
          >
            {part}
            <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60" />
          </span>
        );
      }

      // 매일 (일상성 강조)
      if (part === '매일') {
        return (
          <span
            key={`daily-${idx}`}
            className="relative inline-block font-bold text-purple-700 mx-0.5"
          >
            {part}
            <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-60" />
          </span>
        );
      }

      // 교감 (감정 강조)
      if (part === '교감') {
        return (
          <span
            key={`empathy-${idx}`}
            className="relative inline-block font-bold text-rose-700 mx-0.5"
          >
            {part}
            <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-60" />
          </span>
        );
      }

      // 안전하게 (보안 강조)
      if (part === '안전하게') {
        return (
          <span
            key={`safe-${idx}`}
            className="relative inline-block font-bold text-emerald-700 mx-0.5"
          >
            {part}
            <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60" />
          </span>
        );
      }

      return (
        <span key={`text-${idx}`}>
          {part}
        </span>
      );
    });
  };

  // 헤드라인 애니메이션 - 부드럽고 자연스럽게
  const getHeadlineAnimation = () => {
    if (isInitialLoad) return '-translate-x-12 opacity-0';
    if (!isAnimating) return 'translate-x-0 opacity-100';

    // 현재 슬라이드 기준으로 방향 결정
    if (currentSlide === 0) return 'translate-x-12 opacity-0';
    if (currentSlide === 1) return '-translate-x-12 opacity-0';
    if (currentSlide === 2) return 'translate-x-12 opacity-0';
    return 'translate-x-0 opacity-100';
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
        {/* 음파 배경 패턴 */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/20"
              style={{
                width: `${i * 25}%`,
                height: `${i * 25}%`,
                animation: `ping ${3 + i}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          <div className="absolute left-[20%] top-[20%] h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12">
          {/* 헤더 */}
          <header className="flex items-center justify-start py-8">
            <div
              className="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => router.push('/')}
            >
              <SoriLogo size={36} />
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Sori AI</h2>
            </div>
          </header>

          {/* 메인 콘텐츠 */}
          <main className="flex flex-grow items-center justify-start py-12">
            <div className="flex w-full flex-col items-start justify-center gap-12">
              {/* 시작 가이드 인디케이터 */}
              <div
                className={`inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-gradient-to-r from-primary/8 to-cyan/8 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-1000 ease-out ${isInitialLoad ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                  }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <p className="text-sm font-bold text-primary/90">
                  시작 가이드 {currentSlide + 1}/{GUIDE_SLIDES.length}
                </p>
              </div>

              {/* 헤드라인 - 약간 축소 */}
              <div className="flex flex-col gap-10">
                <h1
                  className={`text-[clamp(2.2rem,7vw,5rem)] font-black leading-[1.1] tracking-[-0.02em] text-foreground transition-all duration-700 ease-out ${getHeadlineAnimation()}`}
                >
                  <span className="block">{GUIDE_SLIDES[currentSlide].title}</span>
                  <span className="relative mt-2 inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {GUIDE_SLIDES[currentSlide].titleHighlight}
                    <span className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-2xl"
                      style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  </span>
                </h1>

                {/* 서브타이틀 - 심플하고 여유있게 */}
                <div className="flex flex-col gap-10">
                  <p
                    className={`text-[clamp(1.05rem,2.2vw,1.65rem)] font-medium leading-[1.7] text-slate-700 transition-all delay-200 duration-700 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                      } ${isInitialLoad ? 'translate-y-8 opacity-0' : ''}`}
                    style={{
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {renderSubtitle(displayedText, GUIDE_SLIDES[currentSlide].id)}
                    {isTyping && <span className="inline-block h-6 w-0.5 ml-1 animate-pulse bg-blue-500 align-middle" />}
                  </p>

                  {/* 소리 아이덴티티 */}
                  <div
                    className={`inline-flex items-center gap-3 self-start transition-all delay-500 duration-700 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                      } ${isInitialLoad ? 'translate-y-8 opacity-0' : ''}`}
                  >
                    <SoriCharacter size={32} animated />
                    <div className="flex flex-col items-start gap-0.5">
                      <p className="text-lg font-bold text-muted-foreground">
                        <span className="relative inline-block text-primary">
                          소리
                          <span className="absolute -bottom-0.5 left-0 h-1 w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-70"
                            style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                        </span>
                        가 함께합니다
                      </p>
                      <span className="text-xs font-medium text-primary/60">당신의 AI 말벗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="flex flex-col gap-8 py-10">
            {/* 프로그레스 바 */}
            <div className="w-full">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/50 backdrop-blur-sm">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500 shadow-lg shadow-blue-500/20 transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                {currentSlide > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex h-14 items-center justify-center rounded-xl bg-slate-100/80 px-8 text-base font-bold text-slate-700 backdrop-blur-sm transition-all duration-150 hover:scale-[1.02] hover:bg-slate-200 active:scale-95"
                  >
                    잠깐만요
                  </button>
                )}
              </div>

              {/* 페이지 인디케이터 */}
              <div className="flex flex-1 items-center justify-center gap-2.5">
                {GUIDE_SLIDES.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2.5 rounded-full transition-all duration-500 ${index === currentSlide
                      ? 'w-10 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-md shadow-blue-500/30'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400 cursor-pointer'
                      }`}
                    onClick={() => {
                      if (index !== currentSlide) {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentSlide(index);
                          setIsAnimating(false);
                        }, 500);
                      }
                    }}
                  />
                ))}
              </div>

              {/* 다음/시작하기 버튼 */}
              <div className="flex flex-1 items-center justify-end">
                <div className="relative group">
                  <button
                    onClick={handleNext}
                    className="relative flex h-12 min-w-[160px] items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 px-8 text-base font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-150 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/50 active:scale-95 overflow-hidden"
                  >
                    {/* 호버 시 내부 그라데이션 오버레이 */}
                    <span
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(90deg, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.4) 50%, rgba(236,72,153,0.4) 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'gradient-shift 3s ease infinite',
                      }}
                    />
                    <span className="relative truncate">{GUIDE_SLIDES[currentSlide].ctaText}</span>
                  </button>

                  {/* UX 카피라이팅 툴팁 */}
                  <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                    <div className="relative rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-2 shadow-xl">
                      <p className="text-sm font-semibold text-white">
                        {GUIDE_SLIDES[currentSlide].ctaSubtext}
                      </p>
                      <div className="absolute -bottom-1.5 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* 전환 UX - 밝고 트렌디한 토스 스타일 */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative flex flex-col items-center gap-10 text-center">
            {/* 소리 캐릭터 - 생동감있게 */}
            <div className="relative">
              {/* 밝은 글로우 */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 to-cyan-400/40 blur-3xl scale-150"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/30 to-pink-400/30 blur-2xl scale-125"
                style={{ animation: 'pulse 2.5s ease-in-out infinite', animationDelay: '0.5s' }}
              />

              {/* 캐릭터 */}
              <div className="relative">
                <SoriCharacter size={120} animated />
              </div>
            </div>

            {/* 메시지 - 밝고 명확하게 */}
            <div className="flex flex-col gap-3">
              <p
                className="text-3xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                소리가 당신을 기다리고 있어요
              </p>
              <p className="text-base font-semibold text-slate-600">
                따뜻한 여정이 시작됩니다
              </p>
            </div>

            {/* 트렌디한 로딩 인디케이터 */}
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                  style={{
                    animation: `pulse 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}