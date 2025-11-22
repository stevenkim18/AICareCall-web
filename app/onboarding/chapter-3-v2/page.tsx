'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingV5Chapter3() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/onboarding/chapter-1-v5');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-bold text-slate-600">리다이렉트 중...</p>
      </div>
    </div>
  );
}

