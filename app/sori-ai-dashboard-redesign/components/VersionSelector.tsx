'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export function VersionSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const dashboardVersions = [
    { id: 'main', name: '메인 대시보드', path: '/dashboard' },
    { id: 'layout-v2', name: '프로필 중심', path: '/sori-ai-dashboard-redesign/layout-v2' },
    { id: 'layout-v4', name: '타임라인 중심', path: '/sori-ai-dashboard-redesign/layout-v4' },
    { id: 'layout-v5', name: '대시보드 + 팁', path: '/sori-ai-dashboard-redesign/layout-v5' },
    { id: 'layout-v8', name: '모바일 퍼스트', path: '/sori-ai-dashboard-redesign/layout-v8' },
  ];

  const callReportVersions = [
    { id: 'calls-main', name: '관계: 타임라인 중심', path: '/sori-ai-dashboard-redesign/calls' },
    { id: 'calls-v1', name: '콜 리포트 V1', path: '/sori-ai-dashboard-redesign/calls/v1' },
    { id: 'calls-v2', name: '콜 리포트 V2', path: '/sori-ai-dashboard-redesign/calls/v2' },
  ];

  const getCurrentSection = () => {
    if (pathname?.includes('/calls')) return 'call-report';
    if (pathname?.includes('/dashboard') || pathname?.includes('/layout')) return 'dashboard';
    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border-2 border-violet-200 p-5 w-64">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-900">버전 선택</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Dashboard Versions */}
          <div className="mb-4">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">대시보드 시안</h4>
            <div className="flex flex-col gap-1.5">
              {dashboardVersions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => router.push(version.path)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all text-left ${pathname === version.path || (version.id === 'main' && pathname === '/dashboard')
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-violet-700'
                    }`}
                >
                  {version.name}
                </button>
              ))}
            </div>
          </div>

          {/* Call Report Versions */}
          <div>
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">통화 리포트 시안</h4>
            <div className="flex flex-col gap-1.5">
              {callReportVersions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => router.push(version.path)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all text-left ${pathname?.includes(version.path)
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                >
                  {version.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        버전 변경
      </button>
    </div>
  );
}


