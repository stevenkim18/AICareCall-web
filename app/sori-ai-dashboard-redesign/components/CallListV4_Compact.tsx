'use client';

import { useRouter } from 'next/navigation';

interface CallRecord {
  id: number;
  success: boolean;
  duration: number;
  date: string;
  time: string;
  summary: string;
  tags: string[];
  hasAlert?: boolean;
  alertMessage?: string;
}

interface CallListV4Props {
  callList: CallRecord[];
  selectedCallId: number | null;
  onCallClick: (id: number) => void;
}

export function CallListV4_Compact({ callList, selectedCallId, onCallClick }: CallListV4Props) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}`;
  };

  return (
    <div className="space-y-0">
      {callList.map((call, idx) => {
        const isSelected = selectedCallId === call.id;
        return (
          <div
            key={call.id}
            onClick={() => onCallClick(isSelected ? 0 : call.id)}
            className={`group border-b border-slate-200 last:border-b-0 py-4 px-4 hover:bg-slate-50 cursor-pointer transition-colors ${
              isSelected ? 'bg-violet-50 border-l-4 border-l-violet-500' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* 좌측: 메인 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-black text-slate-400">#{call.id}</span>
                  {call.success ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-bold text-emerald-700">성공</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 border border-red-200">
                      <svg className="w-2.5 h-2.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-bold text-red-700">실패</span>
                    </span>
                  )}
                  <span className="text-sm font-black text-slate-900">{formatDate(call.date)}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-600">{call.time}</span>
                  {call.success && (
                    <>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-bold text-slate-600">{call.duration}분</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-slate-700 font-medium mb-2 line-clamp-1">
                  {call.summary}
                </p>
                {call.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {call.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-1.5 py-0.5 rounded bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 우측: 알림 아이콘 */}
              <div className="flex-shrink-0">
                {call.hasAlert && (
                  <div className="px-2 py-1 rounded bg-red-50 border border-red-200 flex items-center gap-1">
                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-red-700">주의</span>
                  </div>
                )}
              </div>
            </div>

            {/* 상세 정보 (펼침) */}
            {isSelected && call.success && (
              <div className="mt-4 pt-4 border-t border-slate-200 animate-slideDown">
                {call.hasAlert && call.alertMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-xs font-black text-red-700 uppercase">주의 필요</span>
                    </div>
                    <p className="text-sm font-bold text-red-900">{call.alertMessage}</p>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/report?callId=${call.id}`);
                  }}
                  className="w-full py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>이 통화 상세 리포트 보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

