'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LNB } from '@/app/components/LNB';


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
        {emotion === '좋음' && (
          <div className="absolute bottom-2 w-4 h-2 border-b-2 border-slate-800 rounded-full" />
        )}
        {emotion === '보통' && (
          <div className="absolute bottom-2.5 w-3 h-0.5 bg-slate-800 rounded-full" />
        )}
        {emotion === '나쁨' && (
          <div className="absolute bottom-1.5 w-3 h-1 bg-slate-800 rounded-full rotate-12" />
        )}
      </div>
    </div>
  );
}

function CallHistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  const handleCallClick = (call: any) => {
    router.push(`/call-history/${call.id}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50">
          {/* Header */}
          <div className="bg-white/80 border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm">
            <div className="px-8 py-5 flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">전체 통화 기록</h1>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                  최신순
                </button>
                <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                  필터
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pb-20 max-w-5xl mx-auto space-y-4">
            {callList.map((call, index) => (
              <div
                key={call.id}
                onClick={() => handleCallClick(call)}
                className={`group rounded-xl border p-5 transition-all cursor-pointer relative overflow-hidden ${index === 0
                  ? 'bg-blue-50/50 border-blue-400 shadow-md'
                  : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md'
                  }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${index === 0 ? 'bg-blue-500' : 'bg-transparent group-hover:bg-violet-500'
                  }`} />

                <div className="flex items-center gap-6">
                  {/* Date & Time */}
                  <div className="w-24 flex-shrink-0 text-center">
                    <p className="text-sm font-bold text-slate-500 mb-1">{call.date}</p>
                    <p className="text-lg font-black text-slate-900">{call.time}</p>
                  </div>

                  {/* Emotion Icon */}
                  <div className="flex-shrink-0">
                    <Emotion3D emotion={call.emotion} />
                  </div>

                  {/* Summary & Tags */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${call.status === 'missed'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-emerald-50 text-emerald-600'
                        }`}>
                        {call.statusText}
                      </span>
                      {call.duration > 0 && (
                        <span className="text-xs font-bold text-slate-400">
                          {call.duration}분 통화
                        </span>
                      )}
                    </div>
                    <p className={`text-base font-bold mb-2 truncate ${call.status === 'missed' ? 'text-slate-400' : 'text-slate-900'
                      }`}>
                      {call.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {call.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link or Arrow */}
                  <div className="flex-shrink-0">
                    {index === 0 ? (
                      <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                        통화 상세 리포트
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallHistoryContent />
    </Suspense>
  );
}
