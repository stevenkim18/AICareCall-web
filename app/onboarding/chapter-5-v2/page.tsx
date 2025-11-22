'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingV2Chapter5() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/onboarding/complete');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-bold text-slate-600">완료 페이지로 이동 중...</p>
      </div>
    </div>
  );
}

