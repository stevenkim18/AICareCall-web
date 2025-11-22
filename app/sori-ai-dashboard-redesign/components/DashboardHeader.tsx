'use client';

import { SoriCharacter } from '@/app/components/SoriCharacter';
import { NotificationCenter } from '@/app/components/NotificationCenter';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  elderName: string;
  healthScore: number;
  showRegistrationInfo: boolean;
  onToggleRegistrationInfo: () => void;
  registrationInfo: {
    elder: {
      name: string;
      age: number;
      gender: string;
      phone: string;
      healthConditions: string[];
    };
    guardian: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
}

export function DashboardHeader({
  elderName,
  healthScore,
  showRegistrationInfo,
  onToggleRegistrationInfo,
  registrationInfo
}: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/95 shadow-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 좌측: 소리 + 사용자 정보 */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-14 h-14 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                <SoriCharacter size={32} animated />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {elderName}
                </h1>
                <span className="text-lg font-bold text-slate-500">님의 오늘</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  소리가 함께 케어 중
                </span>
              </div>
            </div>
          </div>

          {/* 우측: 알림 센터만 */}
          <div className="flex items-center gap-3">
            {/* 알림 센터 */}
            <NotificationCenter />
          </div>
        </div>

        {/* 등록 정보 펼침 영역 */}
        {showRegistrationInfo && (
          <div className="mt-4 pt-4 border-t border-slate-200 animate-slideDown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 어르신 정보 */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-5 border border-violet-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-black text-slate-900">어르신 정보</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">성함</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.elder.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">나이/성별</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.elder.age}세 / {registrationInfo.elder.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">연락처</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.elder.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">건강/주의</span>
                    <div className="flex flex-wrap gap-1.5">
                      {registrationInfo.elder.healthConditions.map((condition, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-white/80 border border-violet-200 text-xs font-bold text-violet-700">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 보호자 정보 */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-black text-slate-900">보호자 정보</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">성함</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.guardian.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">관계</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.guardian.relationship}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">연락처</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.guardian.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 w-20">이메일</span>
                    <span className="text-sm font-black text-slate-900">{registrationInfo.guardian.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

