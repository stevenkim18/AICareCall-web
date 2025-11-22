'use client';

import { useRouter, usePathname } from 'next/navigation';
import { SoriLogo } from './SoriLogo';
import { SoriCharacter } from './SoriCharacter';

export function LNB() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard',
      soon: false
    },
    {
      id: 'call-history',
      label: '전체 통화 기록',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/call-history',
      soon: false
    },
    {
      id: 'settings',
      label: '소리 맞춤 설정',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/settings',
      soon: false
    },
    {
      id: 'chat',
      label: '실시간 대화',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      path: '/chat',
      soon: true
    },
    {
      id: 'report',
      label: '온기 리포트',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/report',
      soon: true
    }
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-slate-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-3 group"
        >
          <SoriLogo size={36} />
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Sori</span>
            <span className="text-sm font-black text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded">AI</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => !item.soon && router.push(item.path)}
              disabled={item.soon}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : item.soon
                  ? 'text-slate-400 cursor-not-allowed opacity-60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                }`}
            >
              {item.icon}
              <span className="text-sm font-bold flex-1 text-left">{item.label}</span>
              {item.soon && (
                <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-md">
                  SOON
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
          <SoriCharacter size={40} animated />
          <div className="flex-1">
            <div className="text-sm font-bold text-slate-900">김보호 님</div>
            <div className="text-xs font-medium text-slate-600">보호자</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
