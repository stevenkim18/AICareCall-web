'use client';

interface ProfileCardProps {
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
  variant?: 'compact' | 'full' | 'inline';
}

export function ProfileCard({ registrationInfo, variant = 'full' }: ProfileCardProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-4 p-3 bg-white rounded-md border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-violet-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">{registrationInfo.elder.name}</p>
            <p className="text-xs text-slate-600">{registrationInfo.elder.age}세 / {registrationInfo.elder.gender}</p>
          </div>
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <div>
          <p className="text-sm font-black text-slate-900">{registrationInfo.guardian.name}</p>
          <p className="text-xs text-slate-600">{registrationInfo.guardian.relationship}</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-md border border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-md bg-violet-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">프로필 정보</h3>
            <p className="text-xs text-slate-600">등록된 정보를 확인하세요</p>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">나이/성별</span>
            <span className="font-black text-slate-900">{registrationInfo.elder.age}세 / {registrationInfo.elder.gender}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">관계</span>
            <span className="font-black text-slate-900">{registrationInfo.guardian.relationship}</span>
          </div>
        </div>
      </div>
    );
  }

  // full variant
  return (
    <div className="bg-white rounded-md border border-slate-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 어르신 정보 */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-md p-5 border border-violet-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-base font-black text-slate-900">어르신 정보</h3>
          </div>
          <div className="space-y-2.5">
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
          </div>
        </div>

        {/* 보호자 정보 */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-md p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-black text-slate-900">보호자 정보</h3>
          </div>
          <div className="space-y-2.5">
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
  );
}
