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

interface CallListV1Props {
  callList: CallRecord[];
  selectedCallId: number | null;
  onCallClick: (id: number) => void;
}

export function CallListV1_MinimalTable({ callList, selectedCallId, onCallClick }: CallListV1Props) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">ID</th>
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">상태</th>
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">날짜/시간</th>
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">길이</th>
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">요약</th>
            <th className="text-left py-3 px-4 text-xs font-black text-slate-600 uppercase tracking-wider">태그</th>
          </tr>
        </thead>
        <tbody>
          {callList.map((call) => (
            <tr
              key={call.id}
              onClick={() => onCallClick(call.id)}
              className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                selectedCallId === call.id ? 'bg-violet-50' : ''
              }`}
            >
              <td className="py-4 px-4">
                <span className="text-xs font-black text-slate-400">#{call.id}</span>
              </td>
              <td className="py-4 px-4">
                {call.success ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-emerald-700">성공</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 border border-red-200">
                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-red-700">실패</span>
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900">{formatDate(call.date)}</span>
                  <span className="text-xs font-bold text-slate-500">{call.time}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                {call.success ? (
                  <span className="text-sm font-bold text-slate-700">{call.duration}분</span>
                ) : (
                  <span className="text-sm font-bold text-slate-400">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-slate-700 font-medium line-clamp-1 max-w-md">{call.summary}</p>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {call.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700"
                    >
                      #{tag}
                    </span>
                  ))}
                  {call.tags.length > 3 && (
                    <span className="text-xs font-bold text-slate-400">+{call.tags.length - 3}</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 선택된 항목 상세 정보 */}
      {selectedCallId && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-slideDown">
          {(() => {
            const call = callList.find(c => c.id === selectedCallId);
            if (!call) return null;
            return (
              <>
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
                {call.success && (
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
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

