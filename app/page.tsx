'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SoriLogo } from './components/custom/SoriLogo';
import { VoiceOrb } from './components/custom/VoiceOrb';
import { SoriCharacter } from './components/custom/SoriCharacter';

export default function LandingPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30">
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

      <div className="relative z-10 flex h-full min-h-screen flex-col">
        {/* 헤더 */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <div
            className="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => router.push('/')}
          >
            <SoriLogo size={36} />
            <h2 className="text-xl font-bold tracking-tight text-foreground">Sori AI</h2>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
          <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10">
            {/* 헤드라인 및 서브 카피 */}
            <div
              className={`flex flex-col items-center gap-7 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
              <h1
                className="text-balance text-[clamp(2.4rem,6.5vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.015em] text-foreground"
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
              >
                세상에서 가장{' '}
                <span className="relative inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  따뜻한 목소리로,
                  <span className="absolute inset-x-0 bottom-0 -z-10 h-2 rounded-full bg-blue-500/20 blur-xl" />
                </span>{' '}
                매일을 채웁니다.
              </h1>

              <div
                className={`text-balance max-w-4xl text-[clamp(1.05rem,2vw,1.35rem)] font-semibold leading-relaxed transition-all delay-300 duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{
                  color: '#7c3aed',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                }}
              >
                소중한 분의 마음까지 듣는 AI 안부전화 서비스,{' '}
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 align-middle" style={{ backgroundColor: 'rgba(224, 242, 254, 0.9)', border: '1px solid rgba(186, 230, 253, 0.5)' }}>
                  <SoriCharacter size={20} animated />
                  <span className="font-bold" style={{ color: '#2563eb', fontSize: '0.95em' }}>소리</span>
                </span>{' '}
                가 깊은 공감으로 연결합니다.
              </div>
            </div>

            {/* 3D 오브젝트 - 중앙 고정 */}
            <div
              className={`relative -mt-8 flex items-center justify-center transition-all delay-500 duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
              {/* 3D 오브젝트만 transform 적용 */}
              <div
                className="relative h-[300px] w-[300px] md:h-[360px] md:w-[360px]"
                style={{
                  transform: `perspective(1200px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
                }}
              >
                <VoiceOrb />
              </div>

              {/* 만화 말풍선 - transform 영향 받지 않음 (데스크톱) */}
              <div className="absolute right-[-180px] top-[20px] hidden md:block">
                <div className="relative flex items-center gap-2.5 rounded-2xl border border-blue-200/70 bg-white px-5 py-3 shadow-lg shadow-blue-500/15 whitespace-nowrap">
                  {/* 말풍선 꼬리 - 좌하단에서 3D 오브젝트 방향 */}
                  <div className="absolute left-[8px] bottom-[-10px] h-0 w-0 border-r-[14px] border-l-[0px] border-t-[14px] border-r-transparent border-l-transparent border-t-white"></div>
                  <MicIcon />
                  <span
                    className="text-[0.88rem] font-semibold leading-tight"
                    style={{
                      color: '#0f172a',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                      letterSpacing: '-0.01em',
                    }}>
                    AI가 따뜻한 마음으로 매일 안부를 물어요
                  </span>
                </div>
              </div>

              {/* 모바일 말풍선 - transform 영향 받지 않음 */}
              <div className="absolute left-1/2 top-[-60px] -translate-x-1/2 md:hidden">
                <div className="flex items-center gap-2 rounded-2xl border border-blue-200/70 bg-white px-4 py-2.5 shadow-lg shadow-blue-500/15 whitespace-nowrap">
                  <MicIcon />
                  <span
                    className="text-[0.8rem] font-semibold leading-tight"
                    style={{
                      color: '#0f172a',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                      letterSpacing: '-0.01em',
                    }}>
                    AI가 따뜻한 마음으로 매일 안부를 물어요
                  </span>
                </div>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div
              className={`flex flex-col items-center gap-6 transition-all delay-700 duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
            >
              <button
                onClick={() => router.push('/onboarding/guide')}
                className="group relative flex h-16 min-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 px-10 shadow-2xl shadow-blue-500/40 transition-all duration-150 hover:scale-[1.03] hover:shadow-blue-500/50 active:scale-[0.98]"
              >
                {/* 배경 파동 애니메이션 - 좌우로 흐르는 그라데이션 */}
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.4) 25%, rgba(139,92,246,0.3) 50%, rgba(147,197,253,0.4) 75%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'gradient-shift 3s ease infinite',
                    }}
                  />
                </span>

                {/* 텍스트 전환 영역 */}
                <div className="relative z-10 flex h-full w-full items-center justify-center">
                  {/* 기본 텍스트 - 위로 슬라이드 (빠르게 사라지고 천천히 복귀) */}
                  <div className="absolute flex items-center gap-2 text-lg font-bold tracking-wide text-white transition-all duration-400 ease-out group-hover:-translate-y-full group-hover:opacity-0 group-hover:delay-0 delay-300">
                    소리, 지금 전달하기
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>

                  {/* 호버 텍스트 - 아래에서 올라옴 (딜레이 후 나타나고 즉시 사라짐) */}
                  <div className="absolute flex items-center gap-2 translate-y-full text-lg font-bold tracking-wide text-white opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300 delay-0">
                    <SoriCharacter size={20} animated />
                    , 지금 전달하기
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-4 px-5 py-6 text-center">
          <div className="text-sm font-medium text-muted-foreground">
            © 2025 Sori AI. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" />
      <path d="M12 19v4" strokeLinecap="round" />
    </svg>
  );
}