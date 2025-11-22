'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { ArrowUpRight, Bell, Calendar, ChevronRight, Clock, Filter, MoreHorizontal, Phone, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LayoutV5() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <VersionSwitcher />
            <div className="max-w-5xl mx-auto px-6 py-8">

                {/* Header - Minimal */}
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="font-black text-xl tracking-tight">Sori AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-slate-500 font-bold">피드백</Button>
                        <Button variant="ghost" className="text-slate-500 font-bold">도움말</Button>
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
                    </div>
                </header>

                {/* Main Title Area */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">
                        김철수님,<br />
                        <span className="text-slate-400">어르신의 오늘 하루는 어땠을까요?</span>
                    </h1>

                    {/* Key Insight Banner */}
                    <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                        <SoriCharacter size={60} animated />
                        <div className="flex-1">
                            <div className="text-sm font-bold text-violet-600 mb-1">AI Insight</div>
                            <p className="text-lg font-bold text-slate-900 leading-relaxed">
                                "오늘은 평소보다 목소리 톤이 <span className="text-emerald-600">20% 더 밝으셨어요.</span><br />
                                손주 이야기를 하실 때 가장 즐거워하셨습니다."
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full px-6 border-slate-300 font-bold">
                            리포트 보기
                        </Button>
                    </div>
                </div>

                {/* Filter & Controls */}
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/90 backdrop-blur-sm py-4 z-10 border-b border-slate-100">
                    <div className="flex gap-2">
                        <FilterButton label="전체" active />
                        <FilterButton label="통화 기록" />
                        <FilterButton label="건강 리포트" />
                        <FilterButton label="알림" />
                    </div>
                    <Button variant="ghost" size="icon">
                        <SlidersHorizontal className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>

                {/* Feed List */}
                <div className="space-y-8 pb-20">
                    {/* Today Section */}
                    <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Today</h3>
                        <div className="space-y-4">
                            <FeedItem
                                icon={<Phone className="w-5 h-5 text-white" />}
                                iconBg="bg-violet-500"
                                title="정기 안부 통화 완료"
                                time="오후 2:00"
                                desc="12분 동안 통화했습니다. 기분이 매우 좋아 보이셨습니다."
                                tags={['기분 좋음', '손주', '식사']}
                            />
                            <FeedItem
                                icon={<Clock className="w-5 h-5 text-white" />}
                                iconBg="bg-emerald-500"
                                title="약 복용 확인"
                                time="오전 9:00"
                                desc="혈압약 복용을 확인해드렸습니다."
                                tags={['건강', '투약']}
                            />
                        </div>
                    </section>

                    {/* Yesterday Section */}
                    <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Yesterday</h3>
                        <div className="space-y-4">
                            <FeedItem
                                icon={<Phone className="w-5 h-5 text-white" />}
                                iconBg="bg-slate-400"
                                title="통화 연결 실패"
                                time="오후 6:00"
                                desc="부재중으로 연결되지 않았습니다. 30분 뒤 다시 시도했습니다."
                                isError
                            />
                            <FeedItem
                                icon={<Calendar className="w-5 h-5 text-white" />}
                                iconBg="bg-amber-500"
                                title="병원 방문 일정 알림"
                                time="오전 10:00"
                                desc="내일 정형외과 예약이 있습니다."
                            />
                        </div>
                    </section>
                </div>

            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8">
                <button className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

function FilterButton({ label, active }: any) {
    return (
        <button className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${active
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>
            {label}
        </button>
    );
}

function FeedItem({ icon, iconBg, title, time, desc, tags, isError }: any) {
    return (
        <div className="group flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
            <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div className="h-full w-0.5 bg-slate-100 mx-auto mt-4 -mb-10 group-last:hidden" />
            </div>
            <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-lg font-bold ${isError ? 'text-red-500' : 'text-slate-900'}`}>{title}</h4>
                    <span className="text-xs font-bold text-slate-400">{time}</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-3">{desc}</p>
                {tags && (
                    <div className="flex gap-2">
                        {tags.map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-500">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
            </div>
        </div>
    );
}
