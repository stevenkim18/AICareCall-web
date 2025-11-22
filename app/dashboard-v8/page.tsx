'use client';

import React from 'react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { VersionSwitcher } from '@/components/custom/VersionSwitcher';
import { Activity, BarChart3, Calendar, Clock, LayoutDashboard, MessageSquare, Phone, PieChart, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LayoutV8() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            <VersionSwitcher />
            <div className="flex h-screen overflow-hidden">

                {/* Dark Sidebar */}
                <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                    <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                            <span className="font-black text-white">S</span>
                        </div>
                        <span className="font-black text-lg hidden lg:block">Sori Pro</span>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <DarkNavItem icon={<LayoutDashboard />} label="Overview" active />
                        <DarkNavItem icon={<Phone />} label="Calls" />
                        <DarkNavItem icon={<Activity />} label="Health" />
                        <DarkNavItem icon={<MessageSquare />} label="Topics" />
                        <DarkNavItem icon={<Calendar />} label="Schedule" />
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <DarkNavItem icon={<Settings />} label="Settings" />
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                            <p className="text-slate-400 text-sm">Last updated: Just now</p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                                Export Report
                            </Button>
                            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                                New Call
                            </Button>
                        </div>
                    </header>

                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <DarkStatCard
                            title="Total Calls"
                            value="24"
                            sub="+4 this week"
                            icon={<Phone className="text-violet-400" />}
                        />
                        <DarkStatCard
                            title="Avg Duration"
                            value="14m"
                            sub="+2m vs last week"
                            icon={<Clock className="text-emerald-400" />}
                        />
                        <DarkStatCard
                            title="Sentiment"
                            value="Positive"
                            sub="85% score"
                            icon={<Activity className="text-rose-400" />}
                        />
                        <DarkStatCard
                            title="Next Call"
                            value="09:00 AM"
                            sub="Tomorrow"
                            icon={<Calendar className="text-blue-400" />}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Main Chart Area (Placeholder) */}
                        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white">Weekly Engagement</h3>
                                <div className="flex gap-2">
                                    <span className="w-3 h-3 rounded-full bg-violet-500"></span>
                                    <span className="text-xs text-slate-400">Calls</span>
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 ml-2"></span>
                                    <span className="text-xs text-slate-400">Mood</span>
                                </div>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2 px-4">
                                {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
                                    <div key={i} className="w-full bg-slate-800 rounded-t-lg relative group">
                                        <div
                                            className="absolute bottom-0 w-full bg-violet-600/80 rounded-t-lg transition-all group-hover:bg-violet-500"
                                            style={{ height: `${h}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-slate-500 font-mono">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                        {/* AI Summary Panel */}
                        <div className="bg-gradient-to-b from-violet-900/20 to-slate-900 rounded-2xl border border-violet-500/30 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <SoriCharacter size={100} />
                            </div>
                            <h3 className="font-bold text-violet-300 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> AI Summary
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        "The subject showed increased interest in family topics. Health complaints have decreased by 15% compared to last week."
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Mood Stability</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full">
                                        <div className="bg-emerald-500 h-full w-[92%] rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Response Rate</span>
                                        <span>88%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full">
                                        <div className="bg-blue-500 h-full w-[88%] rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Logs Table */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-800">
                            <h3 className="font-bold text-white">Recent Activity Log</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-950/50">
                                    <tr>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Time</th>
                                        <th className="px-6 py-3">Duration</th>
                                        <th className="px-6 py-3">Topics</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {[1, 2, 3, 4].map((i) => (
                                        <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-slate-400" /> Voice Call
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                                    Completed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">Today, 14:00</td>
                                            <td className="px-6 py-4 text-slate-400">12m 30s</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">Family</span>
                                                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">Health</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

function DarkNavItem({ icon, label, active }: any) {
    return (
        <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active
                ? 'bg-violet-600 text-white font-bold'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}>
            {React.cloneElement(icon, { size: 20 })}
            <span className="text-sm font-medium hidden lg:block">{label}</span>
        </button>
    );
}

function DarkStatCard({ title, value, sub, icon }: any) {
    return (
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-sm font-medium">{title}</span>
                {icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500">{sub}</div>
        </div>
    );
}
