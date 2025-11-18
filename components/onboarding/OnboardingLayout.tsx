import React from 'react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* 왼쪽 온보딩 영역 - 데스크탑만 표시 */}
      <div className="hidden lg:flex lg:w-2/5 relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        {/* 배경 이미지 오버레이 - 나중에 이미지 추가 가능 */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 컨텐츠 */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          {/* 상단 로고 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl">📞</span>
            </div>
            <span className="text-xl font-semibold">ai케어콜</span>
          </div>

          {/* 중앙 메시지 */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              하루 한 번,
              <br />
              부모님의 안부를
              <br />
              AI가 먼저 묻습니다.
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-md">
              보호자를 대신해 AI가 정해진 시간에 부모님께 안부 전화를 드리고,
              통화 내용을 요약해서 알려드립니다.
            </p>
          </div>

          {/* 하단 여백 */}
          <div />
        </div>
      </div>

      {/* 오른쪽 폼 영역 */}
      <div className="flex-1 flex flex-col bg-background h-screen overflow-y-auto">
        {/* 모바일 로고 - 태블릿 이하에서만 표시 */}
        <div className="lg:hidden p-6 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">📞</span>
            </div>
            <span className="text-lg font-semibold">ai케어콜</span>
          </div>
        </div>

        {/* 폼 컨텐츠 */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
