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

interface CallListV3Props {
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

export function CallListV3_Timeline({ callList, selectedCallId, onCallClick }: CallListV3Props) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getEmotionTag = (tags: string[]) => {
    if (tags.some(t => t.toLowerCase().includes('기분좋음') || t.toLowerCase().includes('좋음'))) return '좋음';
    if (tags.some(t => t.toLowerCase().includes('부재중'))) return '부재중';
    return '보통';
  };

  const getSentimentText = (tags: string[]) => {
    if (tags.some(t => t.toLowerCase().includes('기분좋음') || t.toLowerCase().includes('좋음'))) return '좋음';
    if (tags.some(t => t.toLowerCase().includes('부재중'))) return '부재중';
    return '보통';
  };

  const getSentimentStyle = (sentiment: string) => {
    if (sentiment === '좋음') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (sentiment === '부재중') return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="relative min-h-[400px]">
      {/* 타임라인 선 */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>

      <div className="space-y-4">
        {callList.map((call, idx) => {
          const isSelected = selectedCallId === call.id;
          const sentiment = getSentimentText(call.tags);
          const sentimentStyle = getSentimentStyle(sentiment);

          return (
            <div
              key={call.id}
              className="relative flex items-start gap-4 group cursor-pointer"
              onClick={() => onCallClick(isSelected ? 0 : call.id)}
            >
              {/* 타임라인 포인트 - 감정 표현 아이콘 */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center bg-white border border-slate-200 group-hover:scale-110 transition-transform">
                {call.success ? (
                  <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9.5c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 10.5 7 10.5zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5 4.67 11 5.5 11 7 10.33 7 9.5zm7.5 1.5c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zM12 16.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                  </svg>
                )}
              </div>

              {/* 콘텐츠 카드 */}
              <div className={`flex-1 bg-white rounded-md border p-4 shadow-sm hover:shadow-md transition-all ${isSelected
                ? 'border-violet-400 bg-violet-50/30'
                : 'border-slate-200 hover:border-violet-200'
                }`}>
                {/* 날짜/시간 헤더 - 이미지 1번 스타일 */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-black text-slate-900">{formatDate(call.date)}</span>
                    <span className="text-sm font-bold text-slate-600">{call.time}</span>
                    {!call.success && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">부재중</span>
                    )}
                  </div>
                </div>

                {/* 요약 */}
                <p className="text-sm text-slate-700 font-medium mb-3 leading-relaxed">
                  {call.summary}
                </p>

                {/* 태그 및 감정 - 이미지 1번 스타일 */}
                <div className="flex items-center justify-between mb-3">
                  {call.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {call.tags.map((tag, tagIdx) => {
                        const tagColor = getTagColor(tag);
                        return (
                          <span
                            key={tagIdx}
                            className={`px-2 py-0.5 rounded-md border text-xs font-bold flex items-center gap-1 ${tagColor.bg} ${tagColor.border} ${tagColor.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${tagColor.dot}`}></span>
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 ${sentimentStyle}`}>
                      {getEmotionTag(call.tags) === '좋음' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9.5c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 10.5 7 10.5zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                      )}
                      {getEmotionTag(call.tags) === '부재중' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                      )}
                      {getEmotionTag(call.tags) !== '좋음' && getEmotionTag(call.tags) !== '부재중' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5 4.67 11 5.5 11 7 10.33 7 9.5zm7.5 1.5c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zM12 14c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78 3.5-5.11 3.5z" />
                        </svg>
                      )}
                      감정: {getEmotionTag(call.tags)}
                    </span>
                    {call.success && (
                      <span className="text-xs text-slate-500">{call.duration}분</span>
                    )}
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSelected ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* 상세 정보 (펼침) - 이미지 1번 스타일 */}
                {isSelected && call.success && (
                  <div className="mt-4 pt-4 border-t border-slate-200 animate-slideDown">
                    {/* 상세 내용 텍스트 박스 */}
                    <div className="mb-4 p-4 rounded-md bg-slate-100 border border-slate-200">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        어르신께서 오늘 기분이 참 좋으셨습니다. 특히 손주 이야기를 하실 때 목소리가 한 톤 높아지셨고, 웃음 소리도 자주 들렸습니다. 식사는 잘 챙겨 드셨는지 여쭤보았을 때, 된장찌개를 맛있게 드셨다고 하셨습니다.
                      </p>
                    </div>

                    {/* 감정 분석 - 태그는 이미 위에 표시되므로 중복 제거 */}
                    <div className="mb-4">
                      <div className="px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 inline-flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700">감정 분석:</span>
                        <span className="text-xs font-black text-emerald-900">{getEmotionTag(call.tags)}</span>
                      </div>
                    </div>


                    {/* 상세 리포트 버튼 - 하단에 배치 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/sori-ai-dashboard-redesign/calls/${call.id}`);
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
