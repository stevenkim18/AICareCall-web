'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { CallListV2_Card } from '../components/CallListV2_Card';
import { CallListV3_Timeline } from '../components/CallListV3_Timeline';
import { VersionSelector } from '../components/VersionSelector';
import { callList } from '../shared/data';

// 전체 통화 기록 페이지 - 여러 버전 지원
export default function CallsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewMode = searchParams.get('view') || 'card';
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />

      <main className="flex-1 overflow-y-auto">
        {/* 헤더 - DashboardHeader 스타일로 개선 */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/95 shadow-sm">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">전체 통화 기록</h1>
                  <p className="text-sm text-slate-600">소리와 어르신의 모든 대화 기록을 확인하세요</p>
                </div>
              </div>

              {/* 뷰 모드 전환 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/calls?view=card')}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'card'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  카드
                </button>
                <button
                  onClick={() => router.push('/calls?view=timeline')}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'timeline'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  타임라인
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-8">
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 min-h-[600px]">
            {viewMode === 'card' ? (
              <CallListV2_Card
                callList={callList}
                selectedCallId={selectedCallId}
                onCallClick={(id) => setSelectedCallId(id === selectedCallId ? null : id)}
              />
            ) : (
              <CallListV3_Timeline
                callList={callList}
                selectedCallId={selectedCallId}
                onCallClick={(id) => setSelectedCallId(id === selectedCallId ? null : id)}
              />
            )}
          </div>
        </div>

        <VersionSelector />
      </main>
    </div>
  );
}

