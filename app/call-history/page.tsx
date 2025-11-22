'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LNB } from '@/app/components/custom/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { NotificationCenter } from '@/app/components/custom/NotificationCenter';
import { TimelineCallList } from '@/app/components/custom/TimelineCallList';
import { CallDetailModal } from '@/app/components/custom/CallDetailModal';

export default function CallHistoryPage() {
    const router = useRouter();
    const [selectedCall, setSelectedCall] = useState<any>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'missed'>('all');

    // Mock data - 더 많은 통화 기록
    const allCalls = [
        {
            id: 1,
            date: '2025.01.19',
            time: '10:30',
            duration: 15,
            status: 'success' as const,
            summary: '손주가 다음 주에 온다는 소식에 목소리가 매우 밝으셨어요.',
            tags: ['기분좋음', '가족', '기대감'],
            emotion: '좋음',
            emotionScore: 92
        },
        {
            id: 2,
            date: '2025.01.18',
            time: '14:20',
            duration: 12,
            status: 'success' as const,
            summary: '점심으로 된장찌개를 드셨고, 혈압약도 잊지 않고 챙겨 드셨습니다.',
            tags: ['건강', '식사', '약복용'],
            emotion: '보통',
            emotionScore: 85
        },
        {
            id: 3,
            date: '2025.01.17',
            time: '10:00',
            duration: 0,
            status: 'missed' as const,
            summary: '전화를 받지 않으셨습니다. (부재중)',
            tags: ['부재중'],
            emotion: '',
            emotionScore: 0
        },
        {
            id: 4,
            date: '2025.01.16',
            time: '10:15',
            duration: 18,
            status: 'success' as const,
            summary: '무릎이 조금 쑤신다고 하셨지만, 산책은 다녀오셨다고 합니다.',
            tags: ['건강', '운동', '통증'],
            emotion: '보통',
            emotionScore: 78
        },
        {
            id: 5,
            date: '2025.01.15',
            time: '10:05',
            duration: 20,
            status: 'success' as const,
            summary: '친구분들과 경로당에서 즐거운 시간을 보내셨다고 자랑하셨어요.',
            tags: ['사회활동', '즐거움'],
            emotion: '좋음',
            emotionScore: 95
        },
        {
            id: 6,
            date: '2025.01.14',
            time: '10:30',
            duration: 16,
            status: 'success' as const,
            summary: '오늘 병원에 다녀오셨고, 의사 선생님께서 건강 상태가 좋다고 하셨답니다.',
            tags: ['병원', '건강', '긍정'],
            emotion: '좋음',
            emotionScore: 90
        }
    ];

    const filteredCalls = filterStatus === 'all'
        ? allCalls
        : allCalls.filter(call => call.status === filterStatus);

    const statsData = {
        total: allCalls.length,
        success: allCalls.filter(c => c.status === 'success').length,
        missed: allCalls.filter(c => c.status === 'missed').length,
        avgDuration: Math.round(allCalls.filter(c => c.duration > 0).reduce((acc, c) => acc + c.duration, 0) / allCalls.filter(c => c.duration > 0).length)
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <LNB />

            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white/80 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl shadow-sm">
                    <div className="px-8 py-4 flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    전체 통화 기록
                                    <span className="px-2 py-0.5 rounded-md bg-violet-50 text-[10px] font-bold text-violet-600 border border-violet-200">
                                        AI 분석
                                    </span>
                                </h1>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">김순자 님의 전체 통화 내역</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <NotificationCenter />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 w-full max-w-6xl mx-auto space-y-8 pb-20">

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-5 rounded-lg border border-violet-200 shadow-sm">
                            <p className="text-xs font-bold text-violet-600 mb-1">총 통화 시도</p>
                            <p className="text-3xl font-black text-violet-900">{statsData.total}회</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-lg border border-emerald-200 shadow-sm">
                            <p className="text-xs font-bold text-emerald-600 mb-1">통화 성공</p>
                            <p className="text-3xl font-black text-emerald-900">{statsData.success}회</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg border border-amber-200 shadow-sm">
                            <p className="text-xs font-bold text-amber-600 mb-1">부재중</p>
                            <p className="text-3xl font-black text-amber-900">{statsData.missed}회</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 shadow-sm">
                            <p className="text-xs font-bold text-blue-600 mb-1">평균 통화 시간</p>
                            <p className="text-3xl font-black text-blue-900">{statsData.avgDuration}분</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-600">필터:</span>
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === 'all'
                                    ? 'bg-violet-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                전체 ({statsData.total})
                            </button>
                            <button
                                onClick={() => setFilterStatus('success')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === 'success'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                성공 ({statsData.success})
                            </button>
                            <button
                                onClick={() => setFilterStatus('missed')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === 'missed'
                                    ? 'bg-amber-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                부재중 ({statsData.missed})
                            </button>
                        </div>
                    </div>

                    {/* Call History Timeline */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-black text-slate-900">통화 기록</h2>
                            <p className="text-xs text-slate-400 mt-1">소리가 준비 중이에요</p>
                        </div>

                        <TimelineCallList calls={filteredCalls} onCallClick={setSelectedCall} />
                    </div>

                </div>
            </main>

            {/* Call Detail Modal */}
            <CallDetailModal
                isOpen={selectedCall !== null}
                onClose={() => setSelectedCall(null)}
                call={selectedCall || allCalls[0]}
            />
        </div>
    );
}
