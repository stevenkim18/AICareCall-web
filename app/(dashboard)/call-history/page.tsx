'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { SidebarInset } from '@/components/ui/sidebar';

// Mock call data
const callList = Array.from({ length: 25 }, (_, i) => {
  const isMissed = i % 4 === 0;
  const emotionIndex = i % 3;
  const emotions = ['좋음', '보통', '나쁨'] as const;

  return {
    id: i + 1,
    date: `2025.01.${25 - i}`,
    time: '10:30',
    duration: isMissed ? 0 : 10,
    status: isMissed ? 'missed' : 'success',
    statusText: isMissed ? '부재중' : '통화 성공',
    summary: isMissed ? '전화를 받지 않으셨습니다.' : '손주가 다시 오면 정말, 소식에 다시가기를 알려 주셨어요.',
    tags: isMissed ? ['부재중'] : ['가족방문', '기쁨', '가족대화'],
    emotion: isMissed ? null : emotions[emotionIndex],
  };
}) as any[];

export const dynamic = 'force-dynamic';

// 3D Emoji Component
function Emotion3D({ emotion }: { emotion: string | null }) {
  // 부재중 (Missed) - 회색 대시 아이콘
  if (!emotion) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
        <div className="w-3 h-1 bg-slate-400 rounded-full" />
      </div>
    );
  }

  const config: Record<string, { bg: string; border: string }> = {
    '좋음': { bg: 'bg-emerald-100', border: 'border-emerald-200' },
    '보통': { bg: 'bg-blue-100', border: 'border-blue-200' },
    '나쁨': { bg: 'bg-red-100', border: 'border-red-200' },
  };

  const { bg, border } = config[emotion] || { bg: 'bg-slate-100', border: 'border-slate-200' };

  return (
    <div className={`w-12 h-12 rounded-2xl ${bg} border ${border} flex items-center justify-center shadow-sm`}>
      <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center relative">
        <div className="absolute top-2.5 left-1.5 w-1 h-1 rounded-full bg-slate-800" />
        <div className="absolute top-2.5 right-1.5 w-1 h-1 rounded-full bg-slate-800" />
        {emotion === '좋음' && <svg className="absolute bottom-1.5 w-4 h-2" viewBox="0 0 16 8"><path d="M2 2C4 6 12 6 14 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" /></svg>}
        {emotion === '보통' && <div className="absolute bottom-2.5 w-4 h-0.5 bg-slate-800 rounded-full" />}
        {emotion === '나쁨' && <svg className="absolute bottom-1.5 w-4 h-2" viewBox="0 0 16 8"><path d="M2 6C4 2 12 2 14 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" /></svg>}
      </div>
    </div>
  );
}

function CallHistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(callList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCalls = callList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => router.push(`/call-history?page=${page}`);
  const handleCallClick = (call: any) => router.push(`/call-history/${call.id}`);

  return (
    <>
      <LNB />
      <SidebarInset className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">전체 통화 기록</h1>
                <p className="text-sm text-slate-600 mt-1 font-medium">소리와 어르신의 모든 대화 기록</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 w-full mx-auto">
          {/* Component Box without Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Feed List */}
            <div className="p-8 bg-slate-50/30">
              <div className="space-y-5">
                {paginatedCalls.map((call) => (
                  <div key={call.id} className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-base font-black text-slate-900">{call.date}</span>
                          <span className="text-sm font-medium text-slate-500">{call.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${call.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{call.statusText}</span>
                          {call.duration > 0 && <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">{call.duration}분 통화</span>}
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">{call.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {call.tags.map((tag: string, index: number) => <span key={index} className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-md">#{tag}</span>)}
                        </div>
                        <button onClick={() => handleCallClick(call)} className="w-full bg-blue-50 hover:bg-blue-100 rounded-lg py-3 text-center transition-colors cursor-pointer group">
                          <span className="text-blue-600 group-hover:text-blue-700 text-sm font-bold inline-flex items-center gap-1">
                            <span>통화 상세 리포트</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </span>
                        </button>
                      </div>
                      <Emotion3D emotion={call.emotion} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer'}`}>이전</button>
                  {[...Array(totalPages)].map((_, i) => <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 text-sm font-bold rounded-lg cursor-pointer ${i + 1 === currentPage ? 'bg-violet-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'}`}>{i + 1}</button>)}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 text-sm font-bold rounded-lg ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer'}`}>다음</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense fallback={<><LNB /><SidebarInset className="flex-1 overflow-y-auto flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"><div className="text-slate-600 text-lg font-semibold">로딩 중...</div></SidebarInset></>}>
      <CallHistoryContent />
    </Suspense>
  );
}