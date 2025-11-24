'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function VersionSwitcher() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const dashboardVersions = [
        { name: '프로필 중심', path: '/sori-ai-dashboard-redesign/layout-v2' },
        { name: '타임라인 중심', path: '/sori-ai-dashboard-redesign/layout-v4' },
        { name: '대시보드 + 팁', path: '/sori-ai-dashboard-redesign/layout-v5' },
        { name: '모바일 퍼스트', path: '/sori-ai-dashboard-redesign/layout-v8' },
    ];

    const reportVersions = [
        { name: '관계: 타임라인 중심', path: '/sori-ai-dashboard-redesign/calls' },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-56">
                    <div className="mb-4">
                        <h3 className="text-sm font-black text-slate-900 mb-3">버전 선택</h3>

                        <div className="space-y-1">
                            {dashboardVersions.map((v, i) => (
                                <Link key={i} href={v.path} className="block">
                                    <div className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${pathname.includes(v.path.split('/').pop() || '')
                                            ? 'bg-violet-600 text-white'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                        }`}>
                                        {v.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        {reportVersions.map((v, i) => (
                            <Link key={i} href={v.path} className="block">
                                <div className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${pathname.includes('/calls')
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}>
                                    {v.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                <span>모바일 퍼스트</span>
            </button>
        </div>
    );
}
