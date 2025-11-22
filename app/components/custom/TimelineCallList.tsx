'use client';

import { useState } from 'react';

interface CallRecord {
    id: number;
    date: string;
    time: string;
    duration: number;
    status: 'success' | 'missed' | 'rejected';
    summary: string;
    tags: string[];
    emotion: string;
    emotionScore: number;
}

interface TimelineCallListProps {
    calls: CallRecord[];
    onCallClick?: (call: CallRecord) => void;
}

export function TimelineCallList({ calls, onCallClick }: TimelineCallListProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-emerald-500 border-emerald-200 text-white';
            case 'missed': return 'bg-amber-500 border-amber-200 text-white';
            case 'rejected': return 'bg-red-500 border-red-200 text-white';
            default: return 'bg-slate-300 border-slate-200 text-white';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'missed':
                return (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'rejected':
                return (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            default: return null;
        }
    };

    // Colorful tag colors
    const getTagColor = (tag: string, index: number) => {
        const colors = [
            'bg-blue-50 text-blue-700 border-blue-200',
            'bg-violet-50 text-violet-700 border-violet-200',
            'bg-emerald-50 text-emerald-700 border-emerald-200',
            'bg-amber-50 text-amber-700 border-amber-200',
            'bg-pink-50 text-pink-700 border-pink-200',
            'bg-cyan-50 text-cyan-700 border-cyan-200',
        ];
        return colors[index % colors.length];
    };

    // Get emotion color
    const getEmotionStyle = (emotion: string) => {
        switch (emotion) {
            case '좋음':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case '보통':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case '나쁨':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    // Get emotion icon - Smaller size to match tags
    const getEmotionIcon = (emotion: string) => {
        switch (emotion) {
            case '좋음':
                return (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case '보통':
                return (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                    </div>
                );
            case '나쁨':
                return (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

            <div className="space-y-6">
                {calls.map((call, callIndex) => (
                    <div key={call.id} className="relative pl-14 group">
                        {/* Timeline Icon */}
                        <div className={`absolute left-2 top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${getStatusColor(call.status)} shadow-sm`}>
                            {getStatusIcon(call.status)}
                        </div>

                        {/* Content Card */}
                        <div
                            className={`relative bg-white rounded-lg border transition-all duration-300 cursor-pointer overflow-hidden
                ${expandedId === call.id
                                    ? 'border-violet-300 shadow-md ring-1 ring-violet-100'
                                    : callIndex === 0
                                        ? 'border-slate-300 hover:border-violet-300 hover:bg-slate-50/50'
                                        : 'border-slate-200 hover:border-violet-200 hover:bg-slate-50/50'
                                }`}
                            onClick={() => setExpandedId(expandedId === call.id ? null : call.id)}
                        >
                            <div className="p-5">
                                {/* Normal State (Collapsed) */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-bold text-slate-900">{call.date}</span>
                                            <span className="text-xs font-medium text-slate-400">{call.time}</span>
                                            {call.status !== 'success' && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${call.status === 'missed' ? 'bg-amber-500' : 'bg-red-500'}`}>
                                                    {call.status === 'missed' ? '부재중' : '거절됨'}
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-base font-bold text-slate-700 leading-relaxed mb-3 ${expandedId === call.id ? '' : 'line-clamp-1'}`}>
                                            {call.summary}
                                        </p>

                                        {/* Tags shown in collapsed state - Only if NOT expanded */}
                                        {expandedId !== call.id && (
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {call.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getTagColor(tag, i)}`}>
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {call.emotion && (
                                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${getEmotionStyle(call.emotion)}`}>
                                                        {getEmotionIcon(call.emotion)}
                                                        <span>감정: {call.emotion}</span>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5">
                                        <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">{call.duration}분</span>
                                        <svg
                                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedId === call.id ? 'rotate-180' : ''}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <div className={`grid transition-all duration-500 ease-in-out ${expandedId === call.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed mb-4">
                                            어르신께서 오늘 기분이 참 좋으셨습니다. 특히 손주 이야기를 하실 때 목소리가 한 톤 높아지셨고, 웃음 소리도 자주 들렸습니다. 식사는 잘 챙겨 드셨는지 여쭤보았을 때, 된장찌개를 맛있게 드셨다고 하셨습니다.
                                        </div>

                                        {/* Tags & Emotion in Expanded View */}
                                        <div className="flex items-center gap-2 flex-wrap mb-5">
                                            {call.tags.map((tag, i) => (
                                                <span key={i} className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getTagColor(tag, i)}`}>
                                                    #{tag}
                                                </span>
                                            ))}
                                            {call.emotion && (
                                                <span className={`ml-auto text-sm font-black px-4 py-2 rounded-lg flex items-center gap-2 ${getEmotionStyle(call.emotion)}`}>
                                                    {getEmotionIcon(call.emotion)}
                                                    <span>감정: {call.emotion}</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCallClick?.(call);
                                            }}
                                            className="w-full py-3.5 rounded-lg bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                                        >
                                            통화 내용 상세 정보
                                            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
