'use client';

import { SoriCharacter } from './SoriCharacter';

interface CallDetailModalCompactProps {
    isOpen: boolean;
    onClose: () => void;
    call: {
        id: number;
        date: string;
        time: string;
        duration: number;
        status: 'success' | 'missed' | 'rejected';
        summary: string;
        tags: string[];
        emotion: string;
    };
}

export function CallDetailModalCompact({ isOpen, onClose, call }: CallDetailModalCompactProps) {
    if (!isOpen) return null;

    const getEmotionIcon = (emotion: string) => {
        switch (emotion) {
            case '좋음':
                return (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case '보통':
                return (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                    </div>
                );
            case '나쁨':
                return (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <SoriCharacter size={20} />
                        </div>
                        <div className="text-white">
                            <h2 className="text-lg font-black">빠른 요약</h2>
                            <p className="text-xs text-white/80">{call.date} {call.time}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* AI Summary */}
                    <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded">AI 요약</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                            {call.summary}
                        </p>
                    </div>

                    {/* Emotion & Duration */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {getEmotionIcon(call.emotion)}
                            <div>
                                <p className="text-xs text-slate-500 font-medium">감정 상태</p>
                                <p className="text-lg font-black text-slate-900">{call.emotion}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 font-medium">통화 시간</p>
                            <p className="text-lg font-black text-slate-900">{call.duration}분</p>
                        </div>
                    </div>

                    {/* Top 3 Keywords */}
                    <div>
                        <p className="text-xs font-bold text-slate-500 mb-2">주요 키워드</p>
                        <div className="flex gap-2">
                            {call.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
