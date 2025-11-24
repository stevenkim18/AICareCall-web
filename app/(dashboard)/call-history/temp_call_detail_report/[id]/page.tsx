'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { Emotion3D } from '@/app/components/custom/Emotion3D';

// Mock data
const callData = {
    id: '1',
    date: '2023년 10월 27일',
    time: '10:30 AM',
    duration: '5분 32초',
    status: '완료',
    elderName: '김조차 님',
    elderAge: 82,
    relationship: '어머니',
    aiSummary: '오늘 어르신께서는 기분이 매우 좋으셨으며, 아침과 점심 식사 및 복약 일정 모두 꼼꼼히 잘 챙기셨습니다. 다만 며칠 전부터 시작된 허리 통증이 여전히 지속되고 있어, 병원 방문을 권유드리는 등 보호자님의 각별한 주의가 필요해 보입니다.',
    mealCheck: '오전/점심 식사완료',
    medicationCheck: '복약 완료',
    moodCheck: '좋음 상태',
    emotionLevel: '좋음', // 좋음, 보통, 나쁨
    tags: ['#식사2끼', '#기쁨', '#가족관심'],
    conversation: [
        { speaker: 'ai', text: '안녕하세요, 김조차 어르신! AI 케어콜입니다. 오늘 하루 어떻게 보내셨어요?' },
        { speaker: 'elder', text: '네, 잘 지냈어. 아침도 먹고 점심도 먹고 날이 좋아서 기분도 좋네.' },
        { speaker: 'ai', text: '다행이네요! 식사 잘 하시고 기분도 좋으시다니 저도 기쁩니다. 혹시 불편하신 곳 없으셨어요?' },
        { speaker: 'elder', text: '허리가 계속 쑤셔. 아마 그것 때문에 어제도 그렇고 오늘도 그렇고.' },
        { speaker: 'ai', text: '아이고, 허리 통증이 계속되시면 많이 힘드시겠어요. 혹 가족분들한테는 말씀 드리셨어요?' },
        { speaker: 'elder', text: '아들한테는 얘기했어. 근데 바쁜 애라 신경 쓸 겨를이 없더라고.' },
        { speaker: 'ai', text: '그러시군요. 통증이 계속되면 병원 가셔서 한 번 보시는 것도 좋을 것 같아요.' },
        { speaker: 'elder', text: '파스는 붙였는데 별로 효과가 없어. 내일 한번 가볼까 생각중이야.' },
        { speaker: 'ai', text: '네, 좋으신 생각이세요. 오늘 대화 잘하셨습니다. 건강하세요!' },
    ]
};

export default function CallDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    return (
        <div className="h-screen overflow-hidden bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-xl font-black text-slate-900">통화 상세 리포트</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden p-6">
                <div className="h-full grid grid-cols-[550px_1fr] gap-6">
                    {/* Left Panel */}
                    <div className="overflow-y-auto pr-2 space-y-4">
                        {/* 통화 기본 정보 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">통화 기본 정보</h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 일시</p>
                                    <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{callData.date}</p>
                                    <p className="text-xs font-bold text-slate-700 mt-0.5">{callData.time}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 시간</p>
                                    <p className="text-sm font-bold text-slate-900">{callData.duration}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">대상</p>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">{callData.elderName} ({callData.elderAge}세, {callData.relationship})</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 상태</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <p className="text-sm font-bold text-emerald-700">{callData.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 상태 분석 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">상태 분석</h2>
                            <div className="grid grid-cols-3 gap-3">
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotionLevel === '좋음'
                                    ? 'bg-yellow-50 border-yellow-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="좋음" size="lg" />
                                        <p className="text-xs font-black text-slate-900">좋음</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotionLevel === '보통'
                                    ? 'bg-blue-50 border-blue-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="보통" size="lg" />
                                        <p className="text-xs font-black text-slate-900">보통</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotionLevel === '나쁨'
                                    ? 'bg-red-50 border-red-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="나쁨" size="lg" />
                                        <p className="text-xs font-black text-slate-900">나쁨</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주요 확인 사항 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">주요 확인 사항</h2>
                            <div className="space-y-3">
                                {/* 1. 식사 여부 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">식사 여부</p>
                                        <p className="text-sm font-black text-slate-900">{callData.mealCheck}</p>
                                    </div>
                                </div>
                                {/* 2. 건강/복약 여부 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">건강/복약 여부</p>
                                        <p className="text-sm font-black text-slate-900">{callData.medicationCheck}</p>
                                    </div>
                                </div>
                                {/* 3. 기분 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">기분</p>
                                        <p className="text-sm font-black text-slate-900">{callData.moodCheck}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 키워드 태그 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-3">키워드 태그</h2>
                            <div className="flex flex-wrap gap-2">
                                {callData.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${i === 0 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                            i === 1 ? 'bg-pink-50 text-pink-700 border border-pink-200' :
                                                'bg-violet-50 text-violet-700 border border-violet-200'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="flex flex-col gap-4 overflow-hidden">
                        {/* AI 요약 - 통화 기본 정보와 높이 일치 */}
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 shadow-md flex-shrink-0" style={{ minHeight: '185px', padding: '20px' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <SoriCharacter size={20} />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-slate-900">AI 요약</h2>
                                    <p className="text-xs font-bold text-violet-600">인공지능 분석 리포트</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-5 border border-violet-100 shadow-sm flex items-center justify-center" style={{ minHeight: '80px' }}>
                                <p className="text-base text-slate-800 leading-relaxed font-medium" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {callData.aiSummary}
                                </p>
                            </div>
                        </div>

                        {/* 대화 전체 로그 */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                            {/* 헤더 */}
                            <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
                                <h2 className="text-sm font-black text-slate-900">대화 전체 로그</h2>
                            </div>
                            {/* 채팅창 박스 - 스크롤 가능 */}
                            <div className="flex-1 overflow-hidden p-4 bg-slate-50">
                                <div className="h-full overflow-y-auto px-3 py-2 bg-gradient-to-br from-slate-100 via-white to-slate-50 rounded-lg border border-slate-200 shadow-inner space-y-4">
                                    {callData.conversation.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                            {msg.speaker === 'ai' ? (
                                                <div className="flex items-start gap-3 max-w-[75%]">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <SoriCharacter size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-600 mb-1.5">소리</p>
                                                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200 shadow-sm">
                                                            <p className="text-sm font-medium text-slate-800 leading-relaxed">{msg.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-start gap-3 max-w-[75%]">
                                                    <div>
                                                        <p className="text-sm font-bold text-violet-600 mb-1.5 text-right">어르신</p>
                                                        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-lg">
                                                            <p className="text-sm font-medium text-white leading-relaxed">{msg.text}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
