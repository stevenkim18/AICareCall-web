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

interface CallListV2Props {
  callList: CallRecord[];
  selectedCallId: number | null;
  onCallClick: (id: number) => void;
}

// 토스 스타일 태그 색상 매핑
const getTagColor = (tag: string) => {
  const tagLower = tag.toLowerCase();
  
  // 건강 관련
  if (tagLower.includes('건강') || tagLower.includes('약') || tagLower.includes('복용')) {
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    };
  }
  
  // 가족 관련
  if (tagLower.includes('가족') || tagLower.includes('손주') || tagLower.includes('자녀')) {
    return {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-700',
      dot: 'bg-pink-500'
    };
  }
  
  // 기분 관련
  if (tagLower.includes('기분') || tagLower.includes('좋음') || tagLower.includes('기쁨')) {
    return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500'
    };
  }
  
  // 식사 관련
  if (tagLower.includes('식사') || tagLower.includes('밥') || tagLower.includes('음식')) {
    return {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      dot: 'bg-orange-500'
    };
  }
  
  // 일상 관련
  if (tagLower.includes('일상') || tagLower.includes('날씨') || tagLower.includes('산책')) {
    return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      dot: 'bg-green-500'
    };
  }
  
  // 통증/건강 문제
  if (tagLower.includes('통증') || tagLower.includes('아픔') || tagLower.includes('불편')) {
    return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      dot: 'bg-red-500'
    };
  }
  
  // 기본값 (보라색)
  return {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    dot: 'bg-violet-500'
  };
};

export function CallListV2_Card({ callList, selectedCallId, onCallClick }: CallListV2Props) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="space-y-3 min-h-[400px]">
      {callList.map((call, idx) => (
        <div
          key={call.id}
          className={`group border rounded-md overflow-hidden hover:shadow-md transition-all cursor-pointer ${
            idx === 0
              ? 'border-violet-200 bg-violet-50/30'
              : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50'
          }`}
          onClick={() => onCallClick(selectedCallId === call.id ? 0 : call.id)}
        >
          {/* 통화 헤더 - 이미지 2번 스타일 (더 컴팩트) */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              {/* 좌측: 통화 아이콘 및 기본 정보 */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* 통화 아이콘 */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                  call.success 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {call.success ? (
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                  )}
                </div>

                {/* 통화 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-sm font-black text-slate-900">{formatDate(call.date)}</span>
                    <span className="text-sm font-bold text-slate-600">{call.time}</span>
                    {!call.success && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">부재중</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{call.summary}</p>
                </div>
              </div>

              {/* 우측: 시간 + 펼치기 */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {call.success && (
                  <span className="text-xs text-slate-500">
                    {call.duration}분
                  </span>
                )}
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    selectedCallId === call.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 상세 정보 (펼침) - 이미지 1번 스타일 */}
          {selectedCallId === call.id && call.success && (
            <div className="px-5 pt-5 pb-5 bg-slate-50 border-t border-slate-200 animate-slideDown">
              {/* 상세 내용 텍스트 박스 */}
              <div className="mb-4 p-4 rounded-md bg-slate-100 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed">
                  어르신께서 오늘 기분이 참 좋으셨습니다. 특히 손주 이야기를 하실 때 목소리가 한 톤 높아지셨고, 웃음 소리도 자주 들렸습니다. 식사는 잘 챙겨 드셨는지 여쭤보았을 때, 된장찌개를 맛있게 드셨다고 하셨습니다.
                </p>
              </div>

                      {/* 감정 분석 및 태그 */}
                      <div className="mb-4 flex items-center gap-2 flex-wrap">
                        <div className="px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700">감정 분석:</span>
                          <span className="text-xs font-black text-emerald-900">✨ 좋음</span>
                        </div>
                        {call.tags.length > 0 && (
                          <>
                            {call.tags.map((tag, tagIdx) => {
                              const tagColor = getTagColor(tag);
                              return (
                                <span
                                  key={tagIdx}
                                  className={`px-2.5 py-1 rounded-md border text-xs font-bold flex items-center gap-1.5 ${tagColor.bg} ${tagColor.border} ${tagColor.text}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${tagColor.dot}`}></span>
                                  #{tag}
                                </span>
                              );
                            })}
                          </>
                        )}
                      </div>


              {/* 상세 리포트 버튼 - 하단에 배치 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/calls/${call.id}`);
                }}
                className="w-full py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <span>통화 내용 상세 정보 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
