'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { Activity, Bell, Calendar, ChevronRight, Clock, Heart, Home, LayoutGrid, MessageCircle, Phone, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LayoutV4() {
    return (
        <div className="min-h-screen bg-slate-100 font-sans pb-20">
            <VersionSwitcher />
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 h-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <span className="text-xl font-black text-slate-900">Sori AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <NavButton active icon={<LayoutGrid className="w-4 h-4" />} label="Overview" />
                        <NavButton icon={<Phone className="w-4 h-4" />} label="Calls" />
                        <NavButton icon={<User className="w-4 h-4" />} label="Profile" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:block relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input className="pl-10 bg-slate-50 border-slate-200 rounded-xl" placeholder="검색..." />
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-0.5 cursor-pointer">
                        <div className="w-full h-full rounded-full bg-white border-2 border-transparent overflow-hidden">
                            {/* Avatar */}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-[1600px] mx-auto p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard</h1>
                        <p className="text-slate-500 font-medium">어르신의 하루를 한눈에 확인하세요</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl font-bold border-slate-300">
                            <Calendar className="w-4 h-4 mr-2" />
                            날짜 선택
                        </Button>
                        <Button className="rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800">
                            <Phone className="w-4 h-4 mr-2" />
                            지금 통화하기
                        </Button>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Main Hero Card - Large */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-violet-100 transition-colors" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold mb-4">
                                        오늘의 리포트
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                                        "손주가 다녀가서<br />너무 행복하다고 하셨어요"
                                    </h2>
                                    <p className="text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                                        오후 2시 통화에서 웃음이 끊이지 않으셨습니다.
                                        컨디션 점수는 <span className="text-emerald-600 font-black">98점</span>으로 이번 달 중 최고입니다.
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <SoriCharacter size={120} animated />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold text-sm">
                                        <Heart className="w-4 h-4 text-rose-500" /> 감정 상태
                                    </div>
                                    <div className="text-xl font-black text-slate-900">매우 긍정적</div>
                                </div>
                                <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold text-sm">
                                        <Activity className="w-4 h-4 text-emerald-500" /> 건강 신호
                                    </div>
                                    <div className="text-xl font-black text-slate-900">정상 수치</div>
                                </div>
                                <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold text-sm">
                                        <MessageCircle className="w-4 h-4 text-blue-500" /> 대화 주제
                                    </div>
                                    <div className="text-xl font-black text-slate-900">가족, 식사</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">다음 통화</h3>
                            <p className="text-slate-400 text-sm font-medium">내일 오전 9:00 예정</p>
                        </div>
                        <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-xl h-12">
                            일정 변경
                        </Button>
                    </div>

                    {/* Stat Card 1 */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500">주간 통화량</span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                        </div>
                        <div className="text-4xl font-black text-slate-900 mb-2">45분</div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-violet-500 h-full w-3/4 rounded-full" />
                        </div>
                    </div>

                    {/* Recent Calls List */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-3 row-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">최근 통화 기록</h3>
                            <Button variant="ghost" size="sm" className="text-slate-500">View All</Button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm">
                                        📞
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">정기 안부 통화</h4>
                                        <p className="text-xs text-slate-500 font-medium">오늘 오후 2:00 • 12분 통화</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Topics Cloud */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-black text-slate-900 mb-4">주요 대화 키워드</h3>
                        <div className="flex flex-wrap gap-2">
                            {['손주', '병원', '김치찌개', '산책', '무릎 통증', '날씨', '드라마'].map((tag, i) => (
                                <span key={i} className={`px-4 py-2 rounded-xl font-bold text-sm ${i % 3 === 0 ? 'bg-violet-50 text-violet-600' :
                                        i % 3 === 1 ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-amber-50 text-amber-600'
                                    }`}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black mb-2">보호자님을 위한 팁</h3>
                                <p className="text-white/90 text-sm font-medium leading-relaxed mb-4">
                                    어르신이 최근 무릎 통증을 자주 언급하십니다.
                                    다음 방문 때 파스를 챙겨가시면 좋을 것 같아요.
                                </p>
                                <Button size="sm" variant="secondary" className="bg-white text-emerald-700 font-bold rounded-lg border-0">
                                    자세히 보기
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function NavButton({ icon, label, active }: any) {
    return (
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}>
            {icon}
            <span>{label}</span>
        </button>
    );
}
