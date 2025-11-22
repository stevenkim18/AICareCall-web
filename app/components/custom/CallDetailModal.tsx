'use client';

import { useState } from 'react';
import { SoriCharacter } from './SoriCharacter';

interface CallDetailModalProps {
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

export function CallDetailModal({ isOpen, onClose, call }: CallDetailModalProps) {
    if (!isOpen) return null;

    const getEmotionColor = (emotion: string) => {
        switch (emotion) {
            case '좋음': return 'text-emerald-600 bg-emerald-50';
            case '보통': return 'text-blue-600 bg-blue-50';
            case '나쁨': return 'text-amber-600 bg-amber-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const getTagColor = (index: number) => {
        const colors = [
            'bg-blue-50 text-blue-700 border-blue-200',
            'bg-violet-50 text-violet-700 border-violet-200',
            'bg-emerald-50 text-emerald-700 border-emerald-200',
            'bg-amber-50 text-amber-700 border-amber-200',
            'bg-pink-50 text-pink-700 border-pink-200',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <SoriCharacter size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900">통화 내용 상세 정보</h2>
                            <p className="text-xs text-slate-400 mt-0.5">{call.date} {call.time}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">

                    {/* Call Basic Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 mb-1">통화 시간</p>
                            <p className="text-lg font-black text-slate-900">{call.time}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 mb-1">통화 길이</p>
                            <p className="text-lg font-black text-slate-900">{call.duration}분</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 mb-1">통화 상태</p>
                            <p className="text-lg font-black text-emerald-600">성공</p>
                        </div>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-6 border border-violet-100">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                                <SoriCharacter size={22} />
                            </div>
                            <h3 className="text-base font-black text-slate-900">AI 요약</h3>
                            <span className="text-[10px] font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-md">AI 분석</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                            {call.summary}
                        </p>

                        {/* Health Insights - with premium emotion icons */}
                        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-violet-200">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-emerald-600">식사</span>
                                <span className="text-xs text-slate-500">확인됨</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-emerald-600">복약</span>
                                <span className="text-xs text-slate-500">확인됨</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-bold text-blue-600">기분</span>
                                <span className="text-xs text-slate-500">양호</span>
                            </div>
                        </div>
                    </div>

                    {/* Emotion & Keywords */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                            <p className="text-sm font-bold text-slate-600 mb-3">키워드</p>
                            <div className="flex gap-2 flex-wrap">
                                {call.tags.map((tag, i) => (
                                    <span key={i} className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getTagColor(i)}`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                            <p className="text-sm font-bold text-slate-600 mb-3">감정 상태</p>
                            <div className="flex items-center gap-2">
                                {call.emotion === '좋음' && (
                                    <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-3 6a5 5 0 01-4.546-2.916 1 1 0 011.886-.668A3 3 0 0010 12a3 3 0 002.66-1.584 1 1 0 111.886.668A5 5 0 0111 14z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {call.emotion === '보통' && (
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {call.emotion === '나쁨' && (
                                    <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span className={`text-sm font-black px-3 py-1.5 rounded-lg inline-block ${getEmotionColor(call.emotion)}`}>
                                    {call.emotion}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Conversation Transcript - Chat Style with Extended Content */}
                    <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 bg-white border-b border-slate-200">
                            <h3 className="text-base font-black text-slate-900">대화 내용</h3>
                            <p className="text-xs text-slate-500 mt-1">전체 대화를 스크롤하여 확인하세요</p>
                        </div>
                        <div className="p-6 h-[500px] overflow-y-auto space-y-4 scroll-smooth">
                            {/* Sori message - left */}
                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <SoriCharacter size={20} />
                                </div>
                                <div className="flex-1 max-w-[70%]">
                                    <p className="text-xs font-bold text-slate-500 mb-1">소리</p>
                                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                        <p className="text-sm text-slate-700">안녕하세요, 할머니! 오늘 하루 어떻게 보내셨어요?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Elder message - right */}
                            <div className="flex gap-3 items-start justify-end">
                                <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                    <p className="text-xs font-bold text-slate-500 mb-1">어르신</p>
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                        <p className="text-sm text-white">어, 소리야! 오늘은 날씨가 좋아서 밖에 산책을 다녀왔어.</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Sori message */}
                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <SoriCharacter size={20} />
                                </div>
                                <div className="flex-1 max-w-[70%]">
                                    <p className="text-xs font-bold text-slate-500 mb-1">소리</p>
                                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                        <p className="text-sm text-slate-700">와, 정말 좋으시겠어요! 어디로 산책 가셨나요?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Elder message */}
                            <div className="flex gap-3 items-start justify-end">
                                <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                    <p className="text-xs font-bold text-slate-500 mb-1">어르신</p>
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                        <p className="text-sm text-white">동네 공원에 다녀왔지. 나무도 보고 벤치에서 좀 쉬었어.</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* More messages */}
                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <SoriCharacter size={20} />
                                </div>
                                <div className="flex-1 max-w-[70%]">
                                    <p className="text-xs font-bold text-slate-500 mb-1">소리</p>
                                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                        <p className="text-sm text-slate-700">좋네요! 혹시 점심은 무엇 드셨어요?</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start justify-end">
                                <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                    <p className="text-xs font-bold text-slate-500 mb-1">어르신</p>
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                        <p className="text-sm text-white">된장찌개랑 밥 먹었어. 맛있었어!</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <SoriCharacter size={20} />
                                </div>
                                <div className="flex-1 max-w-[70%]">
                                    <p className="text-xs font-bold text-slate-500 mb-1">소리</p>
                                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                        <p className="text-sm text-slate-700">좋으시네요! 혹시 오늘 약은 드셨나요?</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start justify-end">
                                <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                    <p className="text-xs font-bold text-slate-500 mb-1">어르신</p>
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                        <p className="text-sm text-white">아침에 먹었지. 걱정 마!</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <SoriCharacter size={20} />
                                </div>
                                <div className="flex-1 max-w-[70%]">
                                    <p className="text-xs font-bold text-slate-500 mb-1">소리</p>
                                    <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                        <p className="text-sm text-slate-700">잘하셨어요! 오늘도 건강하게 보내세요.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start justify-end">
                                <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                    <p className="text-xs font-bold text-slate-500 mb-1">어르신</p>
                                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                        <p className="text-sm text-white">고마워 소리야! 너도 잘 있어라.</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
