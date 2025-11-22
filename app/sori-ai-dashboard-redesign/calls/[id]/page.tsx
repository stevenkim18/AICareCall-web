'use client';

import { useRouter, useParams } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/SoriCharacter';
import { VersionSelector } from '../../components/VersionSelector';
import { callList } from '../../shared/data';

// 통화 상세 정보 페이지 - 여러 버전 지원
export default function CallDetailPage() {
  const router = useRouter();
  const params = useParams();
  const callId = parseInt(params.id as string);
  const call = callList.find(c => c.id === callId);

  if (!call) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <LNB />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 text-center">
            <p className="text-slate-600">통화 정보를 찾을 수 없습니다.</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 rounded-md bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all"
            >
              돌아가기
            </button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 키워드 태그 색상 매핑 (CallListV2_Card와 동일)
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

  // 더미 데이터 - 실제로는 API에서 가져와야 함
  const callDetail = {
    transcript: `소리: 안녕하세요, 박순자 님! 오늘 하루 어떠셨어요?
어르신: 아, 소리구나! 오늘은 정말 좋은 일이 있었어.
소리: 정말요? 무슨 좋은 일이셨나요?
어르신: 손주가 다음 주에 온다고 전화가 왔어. 정말 기대돼.
소리: 정말 기쁜 소식이네요! 손주분을 만나면 뭐 하실 계획이세요?
어르신: 같이 맛있는 거 먹으러 가기로 했어. 요즘 손주가 좋아하는 음식이 뭔지 물어봤더니 떡볶이라고 하더라.
소리: 떡볶이 좋아하시는군요! 그럼 다음 주가 기대되시겠어요.
어르신: 응, 정말 기대돼. 요즘 무릎이 좀 아프긴 한데, 손주 만나면 다 잊을 것 같아.
소리: 무릎이 아프시군요. 따뜻한 찜질을 해보시는 건 어떠세요?
어르신: 그래, 그렇게 해볼게. 고마워 소리야.
소리: 천만에요. 오늘 점심은 잘 드셨나요?
어르신: 응, 된장찌개를 맛있게 먹었어.
소리: 좋아요! 약은 제때 드셨나요?
어르신: 아, 맞다! 지금 먹어야겠다. 알려줘서 고마워.`,
    aiSummary: {
      brief: '손주가 다음 주에 온다는 소식에 목소리가 매우 밝으셨어요.',
      detailed: '어르신께서 오늘 기분이 참 좋으셨습니다. 특히 손주 이야기를 하실 때 목소리가 한 톤 높아지셨고, 웃음 소리도 자주 들렸습니다. 식사는 잘 챙겨 드셨는지 여쭤보았을 때, 된장찌개를 맛있게 드셨다고 하셨습니다.',
      meal: true,
      medication: true,
      mood: true,
      summary: true
    },
    emotion: '좋음',
    emotionScore: 85
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />

      <main className="flex-1 overflow-y-auto">
        {/* 헤더 */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/95 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-md hover:bg-slate-100 transition-all"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">통화 내용 상세 정보</h1>
                  <p className="text-sm text-slate-600">통화 ID: #{call.id} • {formatDate(call.date)} {call.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* 통화 기본 정보 */}
            <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4">통화 기본 정보</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-1">통화 시간</p>
                  <p className="text-sm font-black text-slate-900">{formatDate(call.date)} {call.time}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-1">통화 성공 여부</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-emerald-700">성공</span>
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-1">통화 길이</p>
                  <p className="text-sm font-black text-slate-900">{call.duration}분</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-1">상태</p>
                  <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${callDetail.emotion === '좋음' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' :
                    callDetail.emotion === '보통' ? 'bg-blue-50 border border-blue-200 text-blue-700' :
                      'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {callDetail.emotion}
                  </span>
                </div>
              </div>
            </div>

            {/* AI 요약 - 트렌디하고 밝은 스타일 */}
            <div className="bg-gradient-to-br from-white via-violet-50/30 to-purple-50/30 rounded-md shadow-sm border border-violet-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <SoriCharacter size={28} animated />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">AI 요약</h2>
                  <p className="text-xs font-bold text-violet-600">소리가 분석한 통화 내용입니다</p>
                </div>
              </div>

              {/* 간단 요약 */}
              <div className="mb-4 p-5 rounded-lg bg-gradient-to-br from-violet-100/50 to-purple-100/50 border border-violet-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  <p className="text-xs font-black text-violet-700 uppercase tracking-wider">한 줄 요약</p>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">{callDetail.aiSummary.brief}</p>
              </div>

              {/* 상세 요약 */}
              <div className="mb-4 p-5 rounded-lg bg-gradient-to-br from-white via-white to-slate-50/30 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wider">상세 요약</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">{callDetail.aiSummary.detailed}</p>
              </div>

              {/* 체크 항목 - 트렌디한 스타일 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className={`p-4 rounded-lg border transition-all hover:shadow-md ${callDetail.aiSummary.meal
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/70 shadow-sm'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    {callDetail.aiSummary.meal ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-xs font-black ${callDetail.aiSummary.meal ? 'text-emerald-700' : 'text-slate-500'}`}>식사</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border transition-all hover:shadow-md ${callDetail.aiSummary.medication
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/70 shadow-sm'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    {callDetail.aiSummary.medication ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-xs font-black ${callDetail.aiSummary.medication ? 'text-emerald-700' : 'text-slate-500'}`}>복약</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border transition-all hover:shadow-md ${callDetail.aiSummary.mood
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/70 shadow-sm'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    {callDetail.aiSummary.mood ? (
                      <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9.5c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 10.5 7 10.5zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5 4.67 11 5.5 11 7 10.33 7 9.5zm7.5 1.5c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zM12 16.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-xs font-black ${callDetail.aiSummary.mood ? 'text-emerald-700' : 'text-slate-500'}`}>기분/컨디션</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border transition-all hover:shadow-md ${callDetail.aiSummary.summary
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/70 shadow-sm'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50'
                  }`}>
                  <div className="flex items-center gap-2.5">
                    {callDetail.aiSummary.summary ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-xs font-black ${callDetail.aiSummary.summary ? 'text-emerald-700' : 'text-slate-500'}`}>하루 요약</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 키워드 태그 */}
            {call.tags.length > 0 && (
              <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-black text-slate-900 mb-4">키워드 태그</h2>
                <div className="flex flex-wrap gap-2">
                  {call.tags.map((tag, idx) => {
                    const tagColor = getTagColor(tag);
                    return (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-md border text-sm font-bold flex items-center gap-1.5 ${tagColor.bg} ${tagColor.border} ${tagColor.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${tagColor.dot}`}></span>
                        #{tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 통화 대화 내용 - 실시간 채팅 스타일 */}
            <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4">통화 대화 내용</h2>
              <div className="bg-gradient-to-br from-violet-50/30 via-purple-50/20 to-pink-50/20 rounded-lg border border-violet-100/50 p-5 h-[600px] overflow-y-auto chat-scrollbar relative">
                {/* 배경 패턴 */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                <div className="space-y-4 relative z-10">
                  {callDetail.transcript.split('\n').map((line, idx) => {
                    if (!line.trim()) return null;
                    const isSori = line.startsWith('소리:');
                    const message = line.replace(/^(소리:|어르신:)\s*/, '');
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 ${isSori ? 'flex-row-reverse' : ''} animate-fade-in`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isSori ? 'bg-gradient-to-br from-violet-500 to-purple-600 ring-2 ring-violet-200' : 'bg-gradient-to-br from-slate-400 to-slate-500 ring-2 ring-slate-200'
                          }`}>
                          {isSori ? (
                            <SoriCharacter size={24} animated />
                          ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <div className={`flex flex-col gap-1.5 max-w-[75%] ${isSori ? 'items-end' : 'items-start'}`}>
                          <div className={`px-4 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg ${isSori
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-br-md'
                            : 'bg-white border border-slate-200 text-slate-900 rounded-bl-md'
                            }`}>
                            <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isSori ? 'text-white' : 'text-slate-700'
                              }`}>
                              {message}
                            </p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 ${isSori ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                            {isSori ? '소리' : '어르신'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <VersionSelector />
      </main>
    </div>
  );
}

