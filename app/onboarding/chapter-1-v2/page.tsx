'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';

// V4 특성: 좌/우 분할 레이아웃 - 좌측 입력, 우측 안내
export default function OnboardingV4Chapter1() {
  const router = useRouter();
  
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [elderName, setElderName] = useState('');
  const [elderPhone, setElderPhone] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [callDays, setCallDays] = useState<string[]>([]);
  const [callTime, setCallTime] = useState('10:00');

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const conditionOptions = ['고혈압', '당뇨', '관절염', '치매', '심장 질환', '해당 없음'];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const toggleDay = (day: string) => {
    setCallDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleCondition = (cond: string) => {
    if (cond === '해당 없음') {
      setConditions(['해당 없음']);
    } else {
      setConditions(prev =>
        prev.includes(cond)
          ? prev.filter(c => c !== cond && c !== '해당 없음')
          : [...prev.filter(c => c !== '해당 없음'), cond]
      );
    }
  };

  const handleComplete = () => {
    if (!guardianName || !guardianPhone || !elderName || !elderPhone) {
      alert('필수 정보를 모두 입력해주세요');
      return;
    }
    if (conditions.length === 0) {
      alert('건강 정보를 선택해주세요');
      return;
    }
    if (!emergencyContact || !emergencyPhone) {
      alert('긴급 연락처를 입력해주세요');
      return;
    }
    if (callDays.length === 0) {
      alert('통화 요일을 선택해주세요');
      return;
    }
    router.push('/onboarding/complete');
  };

  const isComplete = guardianName && guardianPhone && elderName && elderPhone && conditions.length > 0 && emergencyContact && emergencyPhone && callDays.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 좌측: 안내 영역 (30%) */}
      <div className="w-[30%] p-12 flex flex-col justify-center bg-gradient-to-br from-violet-600 to-purple-600 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-lg mx-auto w-full relative z-10">
          {/* 소리 캐릭터 */}
          <div className="mb-8 text-center">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl">
              <SoriCharacter size={120} animated />
            </div>
          </div>

          {/* 안내 텍스트 */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-4">
              안녕하세요!<br />저는 소리예요
            </h2>
            <p className="text-lg text-white/90 font-medium leading-relaxed">
              소중한 분의 일상을 AI가 따뜻하게<br />
              함께하며 보호자님께 전해드릴게요
            </p>
          </div>

          {/* 특징 카드 */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-black text-white mb-1">정기 통화</h4>
                  <p className="text-sm text-white/80 font-medium">원하시는 요일과 시간에 AI가 자동으로 통화를 시작합니다</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-black text-white mb-1">실시간 분석</h4>
                  <p className="text-sm text-white/80 font-medium">대화 중 건강과 감정 상태를 실시간으로 분석합니다</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-black text-white mb-1">일간/주간 리포트</h4>
                  <p className="text-sm text-white/80 font-medium">소중한 분의 상태를 자세한 리포트로 전달드립니다</p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 안내 */}
          <div className="mt-10 text-center">
            <p className="text-sm text-white/70 font-medium">
              모든 정보는 안전하게 암호화되어 보관됩니다
            </p>
          </div>
        </div>
      </div>

      {/* 우측: 입력 영역 (70%) */}
      <div className="w-[70%] p-12 flex flex-col justify-center bg-white">
        <div className="max-w-lg mx-auto w-full">
          {/* 헤더 */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-6">
              <span className="text-xs font-black text-violet-700">V4 • 분할 레이아웃</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-3">
              소리와 함께<br />시작하세요
            </h1>
            <p className="text-base text-slate-600 font-medium">
              AI가 소중한 분을 케어할 수 있도록<br />기본 정보를 알려주세요
            </p>
          </div>

          {/* 입력 폼 */}
          <div className="space-y-8">
            {/* 보호자 정보 */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
                  <span className="text-xs font-black text-white">1</span>
                </div>
                보호자 정보
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 건강 정보 */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
                  <span className="text-xs font-black text-white">2</span>
                </div>
                건강 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">주요 질환</label>
                  <div className="grid grid-cols-3 gap-2">
                    {conditionOptions.map((cond) => (
                      <button
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                          conditions.includes(cond)
                            ? 'bg-teal-600 text-white border-2 border-teal-600'
                            : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">긴급 연락처 이름</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">긴급 연락처</label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(formatPhone(e.target.value))}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 소중한 분 정보 */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
                  <span className="text-xs font-black text-white">3</span>
                </div>
                소중한 분
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                  <input
                    type="text"
                    value={elderName}
                    onChange={(e) => setElderName(e.target.value)}
                    placeholder="김순자"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={elderPhone}
                    onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 통화 설정 */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
                  <span className="text-xs font-black text-white">4</span>
                </div>
                통화 일정
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 요일</label>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                          callDays.includes(day)
                            ? 'bg-violet-600 text-white border-2 border-violet-600'
                            : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-violet-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 시간</label>
                  <input
                    type="time"
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 시작하기 버튼 */}
            <button
              onClick={handleComplete}
              disabled={!isComplete}
              className={`w-full py-4 rounded-lg font-black text-base transition-all ${
                isComplete
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
