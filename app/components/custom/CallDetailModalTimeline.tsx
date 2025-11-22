'use client';

import { SoriCharacter } from './SoriCharacter';

interface CallDetailModalTimelineProps {
    isOpen: boolean;
    onClose: () => void;
    call: {
        id: number;
        date: string;
        time: string;
        duration: number;
        summary: string;
        emotion: string;
    };
}

export function CallDetailModalTimeline({ isOpen, onClose, call }: CallDetailModalTimelineProps) {
    if (!isOpen) return null;

    const timelineEvents = [
        { time: '00:00', title: '통화 시작', description: '소리가 인사를 건넴', type: 'start', emotion: '보통' },
        { time: '00:15', title: '오늘 기분 확인', description: '어르신의 컨디션을 확인', type: 'check', emotion: '좋음' },
        { time: '02:15', title: '식사 관련 대화', description: '점심으로 된장찌개를 드심', type: 'meal', emotion: '좋음' },
        { time: '04:30', title: '약 복용 확인', description: '아침에 약을 드셨다고 확인', type: 'medication', emotion: '좋음' },
        { time: '06:45', title: '손주 방문 소식', description: '다음 주 손주 방문 예정', type: 'highlight', emotion: '매우 좋음' },
        { time: '09:20', title: '마무리 인사', description: '건강 챙기라는 인사', type: 'end', emotion: '좋음' },
        { time: '10:00', title: '통화 종료', description: '총 10분간 통화', type: 'end', emotion: '좋음' },
    ];

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'start':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
            case 'meal':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
            case 'medication':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
            case 'highlight':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
            default:
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'start': return 'from-blue-500 to-cyan-500';
            case 'meal': return 'from-emerald-500 to-teal-500';
            case 'medication': return 'from-violet-500 to-purple-500';
            case 'highlight': return 'from-yellow-500 to-orange-500';
            case 'end': return 'from-slate-500 to-gray-500';
            default: return 'from-violet-500 to-purple-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 flex items-center justify-between rounded-t-lg z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <SoriCharacter size={28} />
                        </div>
                        <div className="text-white">
                            <h2 className="text-2xl font-black">통화 타임라인</h2>
                            <p className="text-sm text-white/80">{call.date} {call.time} · {call.duration}분</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Timeline */}
                <div className="p-8">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 to-purple-200"></div>

                        <div className="space-y-6">
                            {timelineEvents.map((event, idx) => (
                                <div key={idx} className="relative flex gap-6">
                                    {/* Timeline Dot */}
                                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${getEventColor(event.type)} flex items-center justify-center text-white shadow-lg`}>
                                        {getEventIcon(event.type)}
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1 bg-slate-50 rounded-lg p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-base font-black text-slate-900">{event.title}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                                            </div>
                                            <span className="text-xs font-bold text-violet-600 bg-violet-100 px-3 py-1 rounded-full whitespace-nowrap">
                                                {event.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="text-xs text-slate-500">감정:</span>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                {event.emotion}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-8 py-4 bg-white rounded-b-lg flex items-center justify-between">
                    <p className="text-sm text-slate-500">{timelineEvents.length}개의 주요 이벤트</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition-all"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
