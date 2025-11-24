'use client';

import { useEffect, useRef } from 'react';

export function VoiceOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const resize = () => {
      const size = Math.min(window.innerWidth * 0.4, 400);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    // 음파 파티클 시스템
    const particles: Array<{
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
    }> = [];

    // 파티클 생성 - 밀도 증가
    for (let i = 0; i < 150; i++) {
      particles.push({
        angle: (Math.PI * 2 * i) / 150,
        radius: 40 + Math.random() * 110,
        speed: 0.001 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.5,
      });
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      time += 0.008;

      // 중앙 그라데이션 구체 - 더 자연스럽게
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        120
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
      gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.6)');
      gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120 + Math.sin(time) * 8, 0, Math.PI * 2);
      ctx.fill();
      
      // 추가 레이어 - 더 부드러운 중심부
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
      innerGradient.addColorStop(0, 'rgba(167, 139, 250, 0.7)');
      innerGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
      innerGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70 + Math.sin(time * 1.2) * 6, 0, Math.PI * 2);
      ctx.fill();

      // 파티클 그리기 및 업데이트 - 더 부드럽게
      particles.forEach((particle) => {
        particle.angle += particle.speed;
        const wave = Math.sin(time * 1.5 + particle.angle * 2) * 12;
        const x = centerX + Math.cos(particle.angle) * (particle.radius + wave);
        const y = centerY + Math.sin(particle.angle) * (particle.radius + wave);

        ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 m-auto"
      style={{ filter: 'blur(1px)' }}
    />
  );
}

