'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { Activity, ArrowLeft, Calendar, CheckCircle2, Clock, Download, Heart, MessageCircle, Play, Share2, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallReportV1() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <VersionSwitcher />
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard-v2">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-black text-slate-900">통화 상세 리포트 (V1: 분석 중심)</h1>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                        분석 완료
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="font-bold text-slate-600">
                        <Download className="w-4 h-4 mr-2" />
                        PDF 다운로드
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="w-4 h-4 text-slate-600" />
                    </Button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">

                {/* Hero Summary Card */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-50" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-violet-50 rounded-2xl flex items-center justify-center border border-violet-100">
                                <SoriCharacter size={50} animated />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-bold text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> 2023년 11월 22일
                                </span>
                                <span className="text-sm font-bold text-slate-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> 오후 2:00 (12분 통화)
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
                                "손주 방문 소식에 매우 들떠 계셨으며,<br />
                                전반적인 컨디션이 <span className="text-violet-600">최상</span>입니다."
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                <InsightBadge icon={<Heart className="w-4 h-4" />} label="기분: 매우 좋음" color="rose" />
                                <InsightBadge icon={<Activity className="w-4 h-4" />} label="활력: 높음" color="emerald" />
                                <InsightBadge icon={<MessageCircle className="w-4 h-4" />} label="대화 참여도: 적극적" color="blue" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Analysis */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Key Topics */}
                        <section>
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-violet-500" /> 주요 대화 주제
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TopicCard
                                    title="손주 방문"
                                    desc="주말에 손주가 온다는 소식을 전하며 매우 기뻐하셨습니다. 용돈을 준비해야겠다고 하셨습니다."
                                    sentiment="positive"
                                />
                                <TopicCard
                                    title="무릎 통증 호전"
                                    desc="지난주보다 무릎이 덜 아프다고 하셨습니다. 병원에서 처방받은 약을 잘 드시고 계십니다."
                                    sentiment="neutral"
                                />
                                <TopicCard
                                    title="저녁 메뉴"
                                    desc="오늘 저녁은 김치찌개를 드실 예정이라고 하셨습니다."
                                    sentiment="neutral"
                                />
                            </div>
                        </section>

                        {/* Action Items */}
                        <section>
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 확인 및 조치 필요
                            </h3>
                            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                                <ul className="space-y-4">
                                    <ActionItem
                                        text="다음 방문 시 파스 챙겨드리기 (무릎 통증 관련)"
                                        checked={false}
                                    />
                                    <ActionItem
                                        text="손주 용돈 봉투 미리 준비해드리기"
                                        checked={true}
                                    />
                                </ul>
                            </div>
                        </section>

                        {/* Transcript Snippet */}
                        <section>
                            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-slate-500" /> 대화 내용 일부
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                                <ChatBubble
                                    speaker="Sori"
                                    text="어르신, 오늘 목소리가 정말 밝으시네요! 좋은 일 있으세요?"
                                />
                                <ChatBubble
                                    speaker="User"
                                    text="응, 이번 주말에 우리 손주가 온다고 하네. 벌써부터 설레서 잠이 안 와."
                                    isUser
                                />
                                <ChatBubble
                                    speaker="Sori"
                                    text="정말 좋으시겠어요! 손주분이 오시면 맛있는 것도 많이 해주실 건가요?"
                                />
                                <ChatBubble
                                    speaker="User"
                                    text="그럼! 갈비찜이라도 해줘야지. 근데 무릎이 좀 나아서 다행이야."
                                    isUser
                                />

                                <Button variant="outline" className="w-full mt-4 font-bold text-slate-600 border-slate-200">
                                    전체 대화 보기
                                </Button>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Stats & Audio */}
                    <div className="space-y-6">

                        {/* Audio Player Card */}
                        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Play className="w-4 h-4 fill-current" /> 통화 다시 듣기
                            </h3>
                            <div className="w-full bg-slate-800 h-12 rounded-xl flex items-center justify-center mb-2 cursor-pointer hover:bg-slate-700 transition-colors">
                                <Play className="w-6 h-6 fill-white" />
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>00:00</span>
                                <span>12:30</span>
                            </div>
                        </div>

                        {/* Health Signals */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-black text-slate-900 mb-4">건강 신호 분석</h3>
                            <div className="space-y-4">
                                <HealthMetric label="인지 능력" score={95} status="정상" />
                                <HealthMetric label="정서 안정" score={98} status="매우 좋음" />
                                <HealthMetric label="발화 속도" score={85} status="정상" />
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-violet-50 rounded-2xl border border-violet-100 p-6 text-center">
                            <h3 className="font-bold text-violet-900 mb-2">리포트가 도움이 되었나요?</h3>
                            <p className="text-xs text-violet-600 mb-4">더 정확한 분석을 위해 피드백을 남겨주세요.</p>
                            <div className="flex justify-center gap-2">
                                <Button size="sm" variant="outline" className="bg-white border-violet-200 hover:bg-violet-100 text-violet-700">
                                    <ThumbsUp className="w-4 h-4 mr-1" /> 좋아요
                                </Button>
                                <Button size="sm" variant="outline" className="bg-white border-violet-200 hover:bg-violet-100 text-violet-700">
                                    아쉬워요
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function InsightBadge({ icon, label, color }: any) {
    const colors = {
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${(colors as any)[color]}`}>
            {icon}
            {label}
        </span>
    );
}

function TopicCard({ title, desc, sentiment }: any) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-violet-300 transition-colors shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900">{title}</h4>
                {sentiment === 'positive' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
        </div>
    );
}

function ActionItem({ text, checked }: any) {
    return (
        <li className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-300 bg-white'
                }`}>
                {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className={`text-sm font-bold ${checked ? 'text-emerald-700 line-through opacity-70' : 'text-emerald-900'}`}>
                {text}
            </span>
        </li>
    );
}

function ChatBubble({ speaker, text, isUser }: any) {
    return (
        <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-slate-200' : 'bg-violet-100'
                }`}>
                {isUser ? <User className="w-5 h-5 text-slate-500" /> : <span className="font-black text-violet-600">S</span>}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${isUser ? 'bg-slate-100 text-slate-800 rounded-tr-none' : 'bg-violet-50 text-violet-900 rounded-tl-none'
                }`}>
                {text}
            </div>
        </div>
    );
}

function HealthMetric({ label, score, status }: any) {
    return (
        <div>
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                <span>{label}</span>
                <span className="text-emerald-600">{status}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full"
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}
