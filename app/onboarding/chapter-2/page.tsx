'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { useOnboarding } from '@/app/contexts/OnboardingContext';

export default function OnboardingChapter2() {
  const router = useRouter();
  const { data, updateHealth } = useOnboarding();
  
  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.health.conditions);
  const [medicationTags, setMedicationTags] = useState<string[]>(data.health.medications);
  const [currentMed, setCurrentMed] = useState('');
  const [emergencyContact, setEmergencyContact] = useState(data.health.emergencyContact);
  const [emergencyPhone, setEmergencyPhone] = useState(data.health.emergencyPhone);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [customCondition, setCustomCondition] = useState('');
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);

  // 자주 발생하는 질환 (예측)
  const commonConditions = [
    '고혈압',
    '당뇨',
    '관절염',
    '치매',
    '심장 질환',
    '기타'
  ];
  
  const [showOtherCondition, setShowOtherCondition] = useState(false);
  const [otherConditionInput, setOtherConditionInput] = useState('');

  // 전체 질환 목록 (드롭다운용)
  const allConditions = [
    ...commonConditions,
    '뇌졸중',
    '파킨슨병',
    '골다공증',
    '백내장',
    '녹내장',
    '천식',
    '만성폐쇄성폐질환',
    '신부전',
    '간질환',
    '갑상선 질환',
    '우울증',
    '불면증',
    '위염',
    '역류성식도염',
    '대상포진'
  ];

  // 질환별 약물 추천
  const medicationSuggestions: Record<string, string[]> = {
    '고혈압': ['혈압약 (아침)', '항고혈압제', '이뇨제'],
    '당뇨': ['혈당강하제', '인슐린', '메트포르민'],
    '관절염': ['소염진통제', '연골보호제', '관절염약'],
    '치매': ['아리셉트', '메만틴', '치매약'],
    '심장 질환': ['아스피린', '심장약', '항응고제']
  };

  useEffect(() => {
    setSelectedConditions(data.health.conditions);
    setMedicationTags(data.health.medications);
    setEmergencyContact(data.health.emergencyContact);
    setEmergencyPhone(data.health.emergencyPhone);
  }, [data]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const toggleCondition = (condition: string) => {
    // "기타" 클릭 시 인풋 표시
    if (condition === '기타') {
      setShowOtherCondition(!showOtherCondition);
      return;
    }
    
    setSelectedConditions(prev => {
      const newConditions = prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition];
      
      // 새로 선택된 질환이면 약물 제안 보여주기
      if (!prev.includes(condition)) {
        setShowSuggestion(true);
      }
      
      return newConditions;
    });
  };

  const addOtherCondition = () => {
    if (otherConditionInput.trim() && !selectedConditions.includes(otherConditionInput.trim())) {
      setSelectedConditions([...selectedConditions, otherConditionInput.trim()]);
      setOtherConditionInput('');
      setShowOtherCondition(false);
      setShowSuggestion(true);
    }
  };

  const addCustomCondition = () => {
    if (customCondition.trim() && !selectedConditions.includes(customCondition.trim())) {
      setSelectedConditions([...selectedConditions, customCondition.trim()]);
      setCustomCondition('');
      setShowConditionDropdown(false);
    }
  };

  const removeCondition = (condition: string) => {
    setSelectedConditions(selectedConditions.filter(c => c !== condition));
  };

  const getSuggestedMedications = () => {
    const suggestions: string[] = [];
    selectedConditions.forEach(condition => {
      if (medicationSuggestions[condition]) {
        suggestions.push(...medicationSuggestions[condition]);
      }
    });
    return [...new Set(suggestions)];
  };

  const addMedicationTag = () => {
    if (currentMed.trim() && !medicationTags.includes(currentMed.trim())) {
      setMedicationTags([...medicationTags, currentMed.trim()]);
      setCurrentMed('');
    }
  };

  const removeMedicationTag = (med: string) => {
    setMedicationTags(medicationTags.filter(m => m !== med));
  };

  const handleMedicationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMedicationTag();
    }
  };

  const handleNext = () => {
    updateHealth({
      conditions: selectedConditions,
      medications: medicationTags,
      emergencyContact,
      emergencyPhone
    });
    router.push('/onboarding/chapter-3');
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <svg className="w-4 h-4 text-slate-400 hover:text-emerald-600 cursor-help transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
        <p className="font-semibold mb-1">{text}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex">
      {/* 좌측 브랜딩 영역 */}
      <div className="hidden lg:flex lg:w-[420px] border-r-2 border-slate-200 bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Chapter 2 • 건강 정보</span>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between gap-3 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-1">
                  <div className={`h-2 rounded-full ${num <= 2 ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg' : 'bg-slate-200'} transition-all duration-500`}></div>
                  <p className={`text-xs font-bold text-center mt-2 ${num <= 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {num === 1 ? '프로필' : num === 2 ? '건강' : num === 3 ? 'AI설정' : '확인'}
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
              건강 정보를<br/>
              알려주세요
            </p>
            <p className="text-sm font-medium text-slate-600">
              더 세심하게<br/>
              대화할 수 있어요
            </p>
          </div>
        </div>

        <div className="w-full p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-200 hover:bg-white/80 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            <p className="text-xs font-bold text-emerald-700">다음 단계</p>
          </div>
          <p className="text-sm font-semibold text-slate-700">AI 맞춤 설정</p>
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-emerald-200 mb-4">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">Chapter 2 • 건강 정보</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`h-1.5 flex-1 rounded-full ${num <= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-white/50">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">건강 정보</h2>
              <p className="text-sm font-medium text-slate-600">
                소리가 더 세심하게 대화할 수 있어요 <span className="text-xs text-slate-500">(선택)</span>
              </p>
            </div>

            <div className="space-y-8">
              {/* 주요 질환 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  주요 질환
                  <Tooltip text="자주 발생하는 질환을 선택하거나, 드롭다운에서 찾거나, 직접 입력하세요" />
                </label>

                {/* 자주 발생하는 질환 (버튼) */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {commonConditions.map((condition) => (
                    <button
                      key={condition}
                      onClick={() => toggleCondition(condition)}
                      className={`h-10 rounded-lg text-sm font-bold transition-all ${
                        condition === '기타'
                          ? showOtherCondition
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-50 text-indigo-700 border-2 border-indigo-200 hover:bg-indigo-100'
                          : selectedConditions.includes(condition)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>

                {/* 기타 질환 입력 */}
                {showOtherCondition && (
                  <div className="mb-3 p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200 animate-slideInDown">
                    <label className="block text-sm font-bold text-indigo-700 mb-2">기타 질환 입력</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otherConditionInput}
                        onChange={(e) => setOtherConditionInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addOtherCondition()}
                        className="flex-1 h-10 px-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm"
                        placeholder="질환명을 입력하세요 (Enter)"
                        autoFocus
                      />
                      <button
                        onClick={addOtherCondition}
                        disabled={!otherConditionInput.trim()}
                        className="h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all disabled:bg-slate-200 disabled:text-slate-400"
                      >
                        추가
                      </button>
                    </div>
                  </div>
                )}

                {/* 드롭다운 + 직접 입력 */}
                <div className="relative">
                  <button
                    onClick={() => setShowConditionDropdown(!showConditionDropdown)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 hover:border-emerald-300 text-sm font-medium text-slate-700 flex items-center justify-between transition-all"
                  >
                    <span>다른 질환 추가</span>
                    <svg className={`w-4 h-4 transition-transform ${showConditionDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {showConditionDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-50 animate-slideInDown">
                      <div className="p-3">
                        <input
                          type="text"
                          value={customCondition}
                          onChange={(e) => setCustomCondition(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addCustomCondition()}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm"
                          placeholder="직접 입력 (Enter)"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto border-t border-slate-200">
                        {allConditions
                          .filter(c => !selectedConditions.includes(c))
                          .map((condition) => (
                            <button
                              key={condition}
                              onClick={() => {
                                toggleCondition(condition);
                                setShowConditionDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
                            >
                              {condition}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 선택된 질환 태그 */}
                {selectedConditions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedConditions.map((condition) => (
                      <span key={condition} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                        {condition}
                        <button
                          onClick={() => removeCondition(condition)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 복용 약물 */}
              {selectedConditions.length > 0 && (
                <div className="space-y-4 animate-slideInDown">
                  {showSuggestion && getSuggestedMedications().length > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                          <SoriCharacter size={24} animated />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800 mb-1">
                            자주 복용하는 약이 있나요?
                          </p>
                          <p className="text-xs font-medium text-slate-600 mb-3">
                            클릭하면 추가됩니다
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {getSuggestedMedications().map((med, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (!medicationTags.includes(med)) {
                                    setMedicationTags([...medicationTags, med]);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  medicationTags.includes(med)
                                    ? 'bg-emerald-600 text-white cursor-not-allowed'
                                    : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 active:scale-95'
                                }`}
                                disabled={medicationTags.includes(med)}
                              >
                                {med}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                      복용 약물
                      <Tooltip text="약 이름을 입력하고 Enter를 누르면 추가됩니다" />
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentMed}
                        onChange={(e) => setCurrentMed(e.target.value)}
                        onKeyDown={handleMedicationKeyDown}
                        className="flex-1 h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-sm"
                        placeholder="예: 혈압약 (아침)"
                      />
                      <button
                        onClick={addMedicationTag}
                        disabled={!currentMed.trim()}
                        className="h-10 px-4 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                      >
                        추가
                      </button>
                    </div>

                    {medicationTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {medicationTags.map((med, idx) => (
                          <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                            {med}
                            <button
                              onClick={() => removeMedicationTag(med)}
                              className="hover:text-red-600 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 긴급 연락처 */}
              <div className="p-5 rounded-xl bg-red-50 border-2 border-red-200">
                <label className="block text-sm font-bold text-red-700 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  긴급 연락처
                  <Tooltip text="응급 상황 시 연락할 분의 정보를 입력하세요" />
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm"
                    placeholder="이름"
                  />
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(formatPhone(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => router.push('/onboarding/chapter-1')}
                className="h-11 px-6 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                ← 이전
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:shadow-lg transition-all"
              >
                다음 단계로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
