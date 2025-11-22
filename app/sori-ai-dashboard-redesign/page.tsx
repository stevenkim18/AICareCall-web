import Link from 'next/link';
import { ArrowRight, LayoutDashboard, MessageSquare } from 'lucide-react';

export default function DashboardRedesignIndex() {
    const dashboardVersions = [
        { id: 'layout-v2', name: '프로필 중심', desc: '프로필 정보를 상단에 크게 배치', path: '/sori-ai-dashboard-redesign/layout-v2' },
        { id: 'layout-v4', name: '타임라인 중심', desc: '통화 타임라인을 메인으로 강조', path: '/sori-ai-dashboard-redesign/layout-v4' },
        { id: 'layout-v5', name: '대시보드 + 팁', desc: '대시보드와 케어 팁을 균형있게', path: '/sori-ai-dashboard-redesign/layout-v5' },
        { id: 'layout-v8', name: '모바일 퍼스트', desc: '모바일 환경 최적화 레이아웃', path: '/sori-ai-dashboard-redesign/layout-v8' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">SORI 대시보드 시안</h1>
                    <p className="text-lg text-slate-600 font-medium">확인하실 버전을 선택해주세요</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">대시보드 레이아웃</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dashboardVersions.map((v) => (
                            <Link key={v.id} href={v.path} className="group block p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-violet-500 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                                        <LayoutDashboard className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.name}</h3>
                                <p className="text-slate-500 font-medium">{v.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-6">통화 상세 리포트</h2>
                    <Link href="/sori-ai-dashboard-redesign/calls" className="group block p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                <MessageSquare className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">타임라인 중심</h3>
                        <p className="text-slate-500 font-medium">통화 기록을 타임라인 형태로 확인</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
