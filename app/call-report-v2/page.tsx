'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { ArrowLeft, Calendar, Clock, Download, MessageSquare, MoreHorizontal, Phone, Play, Search, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallReportV2() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <VersionSwitcher />
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard-v2">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            김철수 어르신
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                                V2: 대화 흐름
                            </span>
                        </h1>
                        <p className="text-xs text-slate-500 font-medium">2023년 11월 22일 • 오후 2:00</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="font-bold text-slate-600">
                        <Search className="w-4 h-4 mr-2" />
                        대화 검색
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
                    {/* Audio Player Bar */}
                    <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 shadow-sm z-20">
                        <Button size="icon" className="rounded-full bg-violet-600 hover:bg-violet-700 h-10 w-10">
                            <Play className="w-5 h-5 text-white ml-1" />
                        </Button>
                        <div className="flex-1">
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-violet-500 rounded-full" />
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-slate-400 font-medium">
                                <span>04:12</span>
                                <span>12:30</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">1.0x</span>
                        </div>
                    </div>

                    {/* Chat Transcript */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div className="text-center">
                            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                                통화 시작: 오후 2:00
                            </span>
                        </div>

                        <ChatBubble
                            speaker="Sori"
                            time="00:05"
                            text="어르신, 안녕하세요! 식사는 맛있게 하셨나요?"
                            sentiment="neutral"
                        />
                        <ChatBubble
                            speaker="User"
                            time="00:12"
                            text="어 그래, 소리야. 점심에 김치찌개 먹었어. 아주 맛있더라."
                            isUser
                            sentiment="positive"
                        />
                        <ChatBubble
                            speaker="Sori"
                            time="00:20"
                            text="와, 김치찌개라니 정말 맛있었겠어요! 혹시 맵지는 않으셨나요?"
                            sentiment="neutral"
                        />
                        <ChatBubble
                            speaker="User"
                            time="00:35"
                            text="하나도 안 매웠어. 그나저나 이번 주말에 우리 손주가 온다고 하네. 벌써부터 설레서 잠이 안 와."
                            isUser
                            sentiment="very_positive"
                            highlight
                        />
                        <div className="flex justify-center my-4">
                            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 flex items-center gap-3 max-w-md">
                                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-violet-600" />
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold text-violet-900">주요 화제 감지: </span>
                                    <span className="text-violet-700">손주 방문, 기대감</span>
                                </div>
                            </div>
                        </div>
                        <ChatBubble
                            speaker="Sori"
                            time="00:45"
                            text="정말 좋으시겠어요! 손주분이 오시면 맛있는 것도 많이 해주실 건가요?"
                            sentiment="positive"
                        />
                        <ChatBubble
                            speaker="User"
                            time="00:55"
                            text="그럼! 갈비찜이라도 해줘야지. 근데 무릎이 좀 나아서 다행이야."
                            isUser
                            sentiment="positive"
                        />
                    </div>
                </main>

                {/* Right Sidebar: Insights */}
                <aside className="w-80 bg-white border-l border-slate-200 overflow-y-auto hidden lg:block">
                    <div className="p-6 space-y-8">

                        {/* Summary */}
                        <section>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">통화 요약</h3>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                    손주 방문 소식으로 인해 평소보다 <span className="text-emerald-600 font-bold">활력이 20% 증가</span>했습니다.
                                    무릎 통증이 호전되었다고 언급하셨으나, 무리하지 않도록 주의가 필요합니다.
                                </p>
                            </div>
                        </section>

                        {/* Emotion Graph */}
                        <section>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">감정 흐름</h3>
                            <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-end justify-between px-4 pb-4 pt-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-transparent" />
                                {/* Mock Graph Bars */}
                                {[40, 50, 60, 80, 90, 85, 70, 75, 80, 60].map((h, i) => (
                                    <div key={i} className="w-1.5 bg-emerald-400 rounded-t-full z-10" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-400 font-bold">
                                <span>시작</span>
                                <span>종료</span>
                            </div>
                        </section>

                        {/* Extracted Info */}
                        <section>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">추출 정보</h3>
                            <div className="space-y-3">
                                <InfoCard label="식사" value="점심: 김치찌개" icon="🍚" />
                                <InfoCard label="일정" value="주말 손주 방문" icon="📅" />
                                <InfoCard label="건강" value="무릎 통증 호전" icon="💊" />
                            </div>
                        </section>

                    </div>
                </aside>
            </div>
        </div>
    );
}

function ChatBubble({ speaker, time, text, isUser, sentiment, highlight }: any) {
    return (
        <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} group`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${isUser ? 'bg-slate-100' : 'bg-violet-100'
                }`}>
                {isUser ? <User className="w-5 h-5 text-slate-500" /> : <span className="font-black text-violet-600">S</span>}
            </div>
            <div className={`max-w-[70%] space-y-1`}>
                <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs font-bold text-slate-500">{speaker}</span>
                    <span className="text-[10px] font-medium text-slate-400">{time}</span>
                </div>
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm transition-all ${highlight ? 'ring-2 ring-violet-400 ring-offset-2' : ''
                    } ${isUser
                        ? 'bg-white text-slate-800 border border-slate-100 rounded-tr-none'
                        : 'bg-violet-50 text-violet-900 border border-violet-100 rounded-tl-none'
                    }`}>
                    {text}
                </div>
                {sentiment && (
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${isUser ? 'justify-end' : 'justify-start'}`}>
                        {sentiment === 'very_positive' && <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">매우 긍정적</span>}
                        {sentiment === 'positive' && <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">긍정적</span>}
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoCard({ label, value, icon }: any) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-lg">
                {icon}
            </div>
            <div>
                <div className="text-xs font-bold text-slate-400">{label}</div>
                <div className="text-sm font-bold text-slate-900">{value}</div>
            </div>
        </div>
    );
}
