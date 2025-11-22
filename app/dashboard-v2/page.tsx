'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { Bell, Calendar, ChevronRight, Clock, Home, LayoutDashboard, LogOut, Menu, MoreHorizontal, Phone, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LayoutV2() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <VersionSwitcher />
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-200">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight">Sori AI</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Menu</div>
                    <NavItem icon={<Home className="w-5 h-5" />} label="대시보드" active />
                    <NavItem icon={<Phone className="w-5 h-5" />} label="통화 기록" />
                    <NavItem icon={<Calendar className="w-5 h-5" />} label="일정 관리" />
                    <NavItem icon={<User className="w-5 h-5" />} label="어르신 프로필" />

                    <div className="px-4 py-2 mt-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Settings</div>
                    <NavItem icon={<Settings className="w-5 h-5" />} label="서비스 설정" />
                    <NavItem icon={<Bell className="w-5 h-5" />} label="알림 센터" />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900">
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold text-sm">로그아웃</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="w-6 h-6 text-slate-600" />
                        </Button>
                        <span className="text-lg font-black text-slate-900">Sori AI</span>
                    </div>

                    <div className="hidden lg:block">
                        <h1 className="text-xl font-bold text-slate-900">안녕하세요, 김철수님 👋</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="hidden md:flex rounded-full border-slate-200 font-bold text-slate-600">
                            <Phone className="w-4 h-4 mr-2 text-violet-500" />
                            긴급 통화
                        </Button>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                            {/* User Avatar Placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                        </div>
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-inner">
                                    <SoriCharacter size={60} animated />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-xs font-bold mb-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    최근 통화 요약
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                    "오늘 기분이 정말 좋아 보이셨어요!"
                                </h2>
                                <p className="text-white/80 font-medium leading-relaxed max-w-2xl">
                                    오후 2시 통화에서 손주 방문 소식을 전하며 매우 들뜬 목소리셨습니다.
                                    다음 통화 때는 <span className="bg-white/90 text-violet-700 px-1.5 py-0.5 rounded font-bold">약 복용 여부</span>를 잊지 않고 챙겨드릴게요.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<Phone className="w-6 h-6 text-blue-500" />}
                            label="이번 주 통화"
                            value="5회"
                            trend="+1회 증가"
                            trendUp
                            color="blue"
                        />
                        <StatCard
                            icon={<Clock className="w-6 h-6 text-emerald-500" />}
                            label="평균 통화 시간"
                            value="12분"
                            trend="+2분 증가"
                            trendUp
                            color="emerald"
                        />
                        <StatCard
                            icon={<LayoutDashboard className="w-6 h-6 text-amber-500" />}
                            label="감정 상태"
                            value="매우 좋음"
                            trend="긍정적 변화"
                            trendUp
                            color="amber"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Timeline */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-slate-900">최근 활동</h3>
                                <Button variant="ghost" size="sm" className="text-slate-500 font-bold">전체보기</Button>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <TimelineItem
                                    time="오늘, 오후 2:00"
                                    title="정기 안부 통화"
                                    desc="손주 방문 이야기로 즐겁게 대화하셨습니다."
                                    status="completed"
                                />
                                <TimelineItem
                                    time="어제, 오전 9:00"
                                    title="아침 인사"
                                    desc="식사는 하셨는지 여쭤보았습니다."
                                    status="completed"
                                />
                                <TimelineItem
                                    time="11월 20일, 오후 6:00"
                                    title="저녁 안부"
                                    desc="약 복용을 깜빡하셔서 챙겨드렸습니다."
                                    status="alert"
                                />
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-4">다음 통화 예정</h3>
                                <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Calendar className="w-5 h-5 text-violet-600" />
                                        <span className="font-bold text-violet-900">내일 오전 9:00</span>
                                    </div>
                                    <p className="text-sm text-violet-700 font-medium mb-4">
                                        아침 식사 여부와 컨디션을 확인할 예정입니다.
                                    </p>
                                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg">
                                        일정 변경하기
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                                <h3 className="text-lg font-black text-emerald-900 mb-2">건강 리포트</h3>
                                <p className="text-sm text-emerald-700 font-medium mb-4">
                                    이번 주 건강 상태가 전반적으로 양호합니다.
                                </p>
                                <div className="flex items-center justify-between text-sm font-bold text-emerald-800 bg-white/50 rounded-lg p-3">
                                    <span>수면 품질</span>
                                    <span className="text-emerald-600">좋음</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active
                ? 'bg-violet-50 text-violet-700 font-black shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
            }`}>
            {icon}
            <span>{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600" />}
        </button>
    );
}

function StatCard({ icon, label, value, trend, trendUp, color }: any) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${(colors as any)[color]}`}>
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1">{label}</p>
            <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        </div>
    );
}

function TimelineItem({ time, title, desc, status }: any) {
    return (
        <div className="p-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex gap-4">
                <div className="flex-col items-center hidden sm:flex">
                    <div className={`w-2 h-2 rounded-full mt-2 ${status === 'alert' ? 'bg-red-500' : 'bg-violet-500'}`} />
                    <div className="w-0.5 h-full bg-slate-100 my-1 group-last:hidden" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500">{time}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    );
}
