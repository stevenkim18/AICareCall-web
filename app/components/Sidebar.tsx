'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SoriLogo } from './SoriLogo';
import { SoriCharacter } from './custom/SoriCharacter';
import {
    LayoutDashboard,
    Phone,
    MessageSquare,
    FileText,
    Settings,
    LogOut
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        {
            id: 'dashboard',
            label: '대시보드',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            id: 'calls',
            label: '전체 통화 기록',
            icon: Phone,
            path: '/call-history',
        },
        {
            id: 'chat',
            label: '실시간 대화',
            icon: MessageSquare,
            path: '/chat',
            soon: true,
        },
        {
            id: 'report',
            label: '온기 리포트',
            icon: FileText,
            path: '/report',
            soon: true,
        },
        {
            id: 'settings',
            label: '소리 맞춤 설정',
            icon: Settings,
            path: '/settings',
        },
    ];

    return (
        <div className={cn("pb-12 w-64 border-r bg-background h-screen sticky top-0 flex flex-col", className)}>
            <div className="space-y-4 py-4">
                <div className="px-6 py-2">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-3 group"
                    >
                        <SoriLogo size={36} />
                        <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                            Sori AI
                        </span>
                    </button>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                            return (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-between items-center px-4 py-3 h-auto rounded-md transition-all duration-200",
                                        isActive
                                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md hover:from-violet-700 hover:to-purple-700 hover:text-white"
                                            : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    )}
                                    onClick={() => router.push(item.path)}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-current")} />
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </div>
                                    {item.soon && (
                                        <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-black uppercase">
                                            준비중
                                        </span>
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-auto px-6 py-6 border-t bg-white">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50/50 border border-violet-100">
                    <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm overflow-hidden">
                            <SoriCharacter size={28} />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-slate-900 truncate">김보호 님</div>
                        <div className="text-xs font-bold text-slate-500 truncate">보호자</div>
                    </div>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
