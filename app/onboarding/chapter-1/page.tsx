'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { useOnboarding } from '@/app/contexts/OnboardingContext';

export default function OnboardingChapter1() {
  const router = useRouter();
  const { data, updateGuardian, updateElder } = useOnboarding();
  const [step, setStep] = useState<'guardian' | 'elder'>('guardian');
  
  const [guardianName, setGuardianName] = useState(data.guardian.name);
  const [guardianPhone, setGuardianPhone] = useState(data.guardian.phone);
  const [guardianRelation, setGuardianRelation] = useState(data.guardian.relation);
  const [guardianGender, setGuardianGender] = useState(data.guardian.gender);
  
  const [elderName, setElderName] = useState(data.elder.name);
  const [elderPhone, setElderPhone] = useState(data.elder.phone);
  const [elderGender, setElderGender] = useState(data.elder.gender);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const errorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 전화번호 자동 포맷팅
  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const validateGuardian = () => {
    const newErrors: Record<string, string> = {};
    
    if (!guardianName.trim()) {
      newErrors.guardianName = '보호자 성함을 입력해주세요';
    } else if (!/^[가-힣a-zA-Z\s]+$/.test(guardianName)) {
      newErrors.guardianName = '성함은 한글 또는 영문만 입력 가능합니다';
    } else if (guardianName.trim().length < 2) {
      newErrors.guardianName = '성함은 최소 2글자 이상이어야 합니다';
    }
    
    if (!guardianPhone.trim()) {
      newErrors.guardianPhone = '연락처를 입력해주세요';
    } else if (guardianPhone.replace(/-/g, '').length !== 11) {
      newErrors.guardianPhone = '올바른 전화번호를 입력해주세요 (11자리)';
    }
    
    if (!guardianRelation) newErrors.guardianRelation = '관계를 선택해주세요';
    if (!guardianGender) newErrors.guardianGender = '성별을 선택해주세요';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      errorRefs.current[firstErrorKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const validateElder = () => {
    const newErrors: Record<string, string> = {};
    
    if (!elderName.trim()) {
      newErrors.elderName = '소중한 분의 성함을 입력해주세요';
    } else if (!/^[가-힣a-zA-Z\s]+$/.test(elderName)) {
      newErrors.elderName = '성함은 한글 또는 영문만 입력 가능합니다';
    } else if (elderName.trim().length < 2) {
      newErrors.elderName = '성함은 최소 2글자 이상이어야 합니다';
    }
    
    if (!elderPhone.trim()) {
      newErrors.elderPhone = '연락처를 입력해주세요';
    } else if (elderPhone.replace(/-/g, '').length !== 11) {
      newErrors.elderPhone = '올바른 전화번호를 입력해주세요 (11자리)';
    }
    
    if (!elderGender) newErrors.elderGender = '성별을 선택해주세요';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      errorRefs.current[firstErrorKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 'guardian') {
      if (validateGuardian()) {
        // Context에 저장
        updateGuardian({
          name: guardianName,
          phone: guardianPhone,
          relation: guardianRelation,
          gender: guardianGender
        });
        
        setIsTransitioning(true);
        setTimeout(() => {
          setStep('elder');
          setIsTransitioning(false);
        }, 300);
      }
    } else {
      if (validateElder()) {
        // Context에 저장
        updateElder({
          name: elderName,
          phone: elderPhone,
          gender: elderGender
        });
        
        setIsTransitioning(true);
        setTimeout(() => {
          router.push('/onboarding/chapter-2');
        }, 300);
      }
    }
  };

  const handleBack = () => {
    if (step === 'elder') {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep('guardian');
        setIsTransitioning(false);
      }, 300);
    } else {
      router.push('/start-guide');
    }
  };

  const isGuardianComplete = guardianName && guardianPhone && guardianRelation && guardianGender;
  const isElderComplete = elderName && elderPhone && elderGender;

  // Input 검증 상태
  const isGuardianNameValid = guardianName.length >= 2;
  const isGuardianPhoneValid = guardianPhone.replace(/-/g, '').length === 11;
  const isElderNameValid = elderName.length >= 2;
  const isElderPhoneValid = elderPhone.replace(/-/g, '').length === 11;

  // Tooltip 컴포넌트
  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <svg className="w-4 h-4 text-slate-400 hover:text-violet-600 cursor-help transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
        <p className="font-semibold mb-1">{text}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex">
      {/* 좌측 브랜딩 영역 */}
      <div className="hidden lg:flex lg:w-[420px] border-r-2 border-slate-200 bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-violet-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Chapter 1 • 프로필 정보</span>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between gap-3 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-1">
                  <div className={`h-2 rounded-full ${num === 1 ? 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg' : 'bg-slate-200'} transition-all duration-500`}></div>
                  <p className={`text-xs font-bold text-center mt-2 ${num === 1 ? 'text-violet-600' : 'text-slate-400'}`}>
                    {num === 1 ? '프로필' : num === 2 ? '건강' : num === 3 ? '통화' : '확인'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-6">
            <SoriCharacter size={120} animated />
          </div>
          <div className="text-center space-y-3 max-w-xs">
            <p className="text-lg font-bold text-slate-800 leading-relaxed">
              {step === 'guardian' ? '보호자님을\n알려주세요' : '소중한 분을\n알려주세요'}
            </p>
            <p className="text-sm font-medium text-slate-600">
              {step === 'guardian' ? '먼저 보호자님의\n정보를 입력해주세요' : '안부를 전할 분의\n정보를 입력해주세요'}
            </p>
          </div>
        </div>

        <div className="w-full p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-violet-200 hover:bg-white/80 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            <p className="text-xs font-bold text-violet-700">다음 단계</p>
          </div>
          <p className="text-sm font-semibold text-slate-700">건강 정보</p>
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-xl">
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-violet-200 mb-4">
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">Chapter 1 • 프로필 정보</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`h-1.5 flex-1 rounded-full ${num === 1 ? 'bg-violet-600' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>

          <div className={`bg-white rounded-3xl shadow-2xl p-8 border-2 border-white/50 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {/* 헤더 */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                {step === 'guardian' ? '보호자 정보' : '소중한 분 정보'}
              </h2>
              <p className="text-sm font-medium text-slate-600">
                {step === 'guardian' ? '먼저 보호자님을 알려주세요' : '안부를 전할 분을 알려주세요'}
              </p>
            </div>

            {/* Guardian Form */}
            {step === 'guardian' && (
              <div className="space-y-5">
                <div ref={(el) => { errorRefs.current.guardianName = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    성함
                    <Tooltip text="소리가 보호자님을 어떻게 부를지 알려주세요" />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className={`w-full h-12 px-4 pr-12 rounded-xl border-2 ${
                        errors.guardianName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : guardianName && isGuardianNameValid
                          ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-200'
                          : 'border-slate-200 focus:border-violet-500 focus:ring-violet-200'
                      } focus:ring-2 transition-all text-base font-medium`}
                      placeholder="홍길동"
                    />
                    {guardianName && isGuardianNameValid && !errors.guardianName && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.guardianName && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.guardianName}
                    </p>
                  )}
                  {guardianName && !errors.guardianName && guardianName.length >= 2 && (
                    <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      확인되었습니다
                    </p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.guardianPhone = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    연락처
                    <Tooltip text="보호자님의 휴대폰 번호를 입력해주세요. 하이픈(-)은 자동으로 입력됩니다" />
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                      className={`w-full h-12 px-4 pr-12 rounded-xl border-2 ${
                        errors.guardianPhone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : guardianPhone && isGuardianPhoneValid
                          ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-200'
                          : 'border-slate-200 focus:border-violet-500 focus:ring-violet-200'
                      } focus:ring-2 transition-all text-base font-medium`}
                      placeholder="010-0000-0000"
                    />
                    {guardianPhone && isGuardianPhoneValid && !errors.guardianPhone && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.guardianPhone && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.guardianPhone}
                    </p>
                  )}
                  {guardianPhone && !errors.guardianPhone && guardianPhone.replace(/-/g, '').length === 11 && (
                    <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      확인되었습니다
                    </p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.guardianRelation = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    관계
                    <Tooltip text="소중한 분과의 관계를 선택해주세요" />
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['자녀', '배우자', '친구', '친척', '요양사', '기타'].map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setGuardianRelation(rel)}
                        className={`h-11 rounded-xl text-sm font-bold transition-all ${
                          guardianRelation === rel
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                  {errors.guardianRelation && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.guardianRelation}
                    </p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.guardianGender = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['남성', '여성'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setGuardianGender(gender)}
                        className={`h-11 rounded-xl text-sm font-bold transition-all ${
                          guardianGender === gender
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                  {errors.guardianGender && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.guardianGender}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Elder Form */}
            {step === 'elder' && (
              <div className="space-y-5">
                <div ref={(el) => { errorRefs.current.elderName = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    성함
                    <Tooltip text="소리가 어떻게 부를지 알려주세요" />
                  </label>
                  <input
                    type="text"
                    value={elderName}
                    onChange={(e) => setElderName(e.target.value)}
                    className={`w-full h-12 px-4 rounded-xl border-2 ${errors.elderName ? 'border-red-500' : 'border-slate-200'} focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-base font-medium`}
                    placeholder="김순자"
                  />
                  {errors.elderName && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.elderName}
                    </p>
                  )}
                  {elderName && !errors.elderName && elderName.length >= 2 && (
                    <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      확인되었습니다
                    </p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.elderPhone = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    연락처
                    <Tooltip text="휴대폰 번호를 입력해주세요. 하이픈(-)은 자동으로 입력됩니다" />
                  </label>
                  <input
                    type="tel"
                    value={elderPhone}
                    onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                    className={`w-full h-12 px-4 rounded-xl border-2 ${errors.elderPhone ? 'border-red-500' : 'border-slate-200'} focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-base font-medium`}
                    placeholder="010-0000-0000"
                  />
                  {errors.elderPhone && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.elderPhone}
                    </p>
                  )}
                  {elderPhone && !errors.elderPhone && elderPhone.replace(/-/g, '').length === 11 && (
                    <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      확인되었습니다
                    </p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.elderGender = el; }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['남성', '여성'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setElderGender(gender)}
                        className={`h-11 rounded-xl text-sm font-bold transition-all ${
                          elderGender === gender
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                  {errors.elderGender && (
                    <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.elderGender}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleBack}
                className="h-11 px-6 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                ← 이전
              </button>
              <button
                onClick={handleNext}
                disabled={step === 'guardian' ? !isGuardianComplete : !isElderComplete}
                className={`flex-1 h-11 rounded-xl font-bold text-sm transition-all ${
                  (step === 'guardian' ? isGuardianComplete : isElderComplete)
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {step === 'guardian' ? '다음 단계로' : '건강 정보로'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
