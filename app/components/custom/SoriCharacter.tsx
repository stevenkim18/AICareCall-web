'use client';

import { useEffect, useState } from 'react';

type SoriCharacterProps = {
  size?: number;
  animated?: boolean;
  className?: string;
};

// EMO 애완로봇 스타일 소리 AI 캐릭터 - 두 겹 구조 + 네모난 형태
export function SoriCharacter({ size = 24, animated = true, className = '' }: SoriCharacterProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [bodySquish, setBodySquish] = useState(1);

  useEffect(() => {
    if (!animated) return;

    // EMO 스타일 눈 움직임
    const moveInterval = setInterval(() => {
      setEyePosition({
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 3,
      });
    }, 1500);

    // 깜빡임
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 4000);

    // 갸웃거리는 애니메이션
    const tiltInterval = setInterval(() => {
      const newTilt = (Math.random() - 0.5) * 10;
      setTilt(newTilt);
      setBodySquish(1 + Math.abs(newTilt) * 0.008);
      setTimeout(() => {
        setTilt(0);
        setBodySquish(1);
      }, 700);
    }, 6000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(blinkInterval);
      clearInterval(tiltInterval);
    };
  }, [animated]);

  const eyeWidth = size * 0.3;
  const eyeHeight = size * 0.22;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        transform: `rotate(${tilt}deg) scaleY(${bodySquish})`,
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* 외곽 글로우 */}
      {animated && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 blur-lg"
          style={{
            borderRadius: `${size * 0.28}px`,
            animation: 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      )}
      
      {/* 외부 프레임 (얇고 밝은 테두리) */}
      <div 
        className="relative z-10 flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 shadow-lg"
        style={{
          width: size,
          height: size,
          borderRadius: `${size * 0.28}px`,
          padding: `${size * 0.035}px`, // 두께 감소: 5.5% → 3.5%
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* 흰색 구분선 (겹 느낌) */}
        <div
          className="relative flex items-center justify-center bg-white shadow-sm"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: `${size * 0.25}px`,
            padding: `${size * 0.04}px`,
          }}
        >
          {/* 내부 메인 얼굴 (따뜻한 블루 그라데이션) */}
          <div
            className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 shadow-lg"
            style={{
              borderRadius: `${size * 0.22}px`,
            }}
          >
            {/* 하이라이트 효과 */}
            <div 
              className="absolute bg-white/35 blur-md"
              style={{
                left: `${size * 0.1}px`,
                top: `${size * 0.06}px`,
                width: `${size * 0.32}px`,
                height: `${size * 0.28}px`,
                borderRadius: `${size * 0.15}px`,
              }}
            />
            
            {/* EMO 스타일 네모난 눈 2개 */}
            <div 
              className="flex items-center justify-center" 
              style={{ 
                gap: `${size * 0.14}px`,
                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                transition: 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {[0, 1].map((index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg shadow-white/60"
                  style={{
                    width: eyeWidth,
                    height: isBlinking ? '3px' : eyeHeight,
                    borderRadius: `${eyeWidth * 0.28}px`,
                    transition: 'all 0.15s ease-out',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}