'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { ToneIcon } from '@/app/components/custom/ToneIcon';
import { useOnboarding, CallSchedule, ImportantPerson } from '@/app/contexts/OnboardingContext';

export default function OnboardingChapter3() {
  const router = useRouter();
  const { data, updateCallSchedules, updateAISettings } = useOnboarding();
  const timeInputRef = useRef<HTMLInputElement>(null);
  
  const [callSchedules, setCallSchedules] = useState<CallSchedule[]>(data.callSchedules);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [tone, setTone] = useState(data.aiSettings.tone);
  const [notificationsEnabled, setNotificationsEnabled] = useState(data.aiSettings.notificationsEnabled);
  
  // 소중한 사람들
  const [importantPeople, setImportantPeople] = useState<ImportantPerson[]>(data.aiSettings.importantPeople);
  const [personName, setPersonName] = useState('');
  const [personRelation, setPersonRelation] = useState('');
  
  // 관심사/대화 주제
  const [selectedTopics, setSelectedTopics] = useState<string[]>(data.aiSettings.conversationTopics.selectedTopics);
  const [customTopics, setCustomTopics] = useState<string[]>(data.aiSettings.conversationTopics.customTopics);
  const [customInput, setCustomInput] = useState('');
  const [specialNotes, setSpecialNotes] = useState(data.aiSettings.conversationTopics.specialNotes);

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const tones = [
    { id: 'warm' as const, label: '따뜻하게' },
    { id: 'bright' as const, label: '밝게' },
    { id: 'calm' as const, label: '차분하게' }
  ];

  // 대화 주제
  const conversationTopics = [
    '날씨와 계절',
    '건강과 운동',
    '식사와 요리',
    '가족 이야기',
    '손주 이야기',
    '옛날 이야기',
    'TV 프로그램',
    '취미 활동',
    '친구 만남',
    '동네 소식',
    '종교 활동',
    '산책과 외출'
  ];

  useEffect(() => {
    setCallSchedules(data.callSchedules);
    setTone(data.aiSettings.tone);
    setNotificationsEnabled(data.aiSettings.notificationsEnabled);
    setImportantPeople(data.aiSettings.importantPeople);
    setSelectedTopics(data.aiSettings.conversationTopics.selectedTopics);
    setCustomTopics(data.aiSettings.conversationTopics.customTopics);
    setSpecialNotes(data.aiSettings.conversationTopics.specialNotes);
  }, [data]);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const addCustomTopic = () => {
    if (customInput.trim() && !customTopics.includes(customInput.trim())) {
      setCustomTopics([...customTopics, customInput.trim()]);
      setCustomInput('');
    }
  };

  const removeCustomTopic = (topic: string) => {
    setCustomTopics(customTopics.filter(t => t !== topic));
  };

  const addPerson = () => {
    if (personName.trim() && personRelation.trim()) {
      const newPerson: ImportantPerson = {
        id: Date.now().toString(),
        name: personName.trim(),
        relation: personRelation.trim()
      };
      setImportantPeople([...importantPeople, newPerson]);
      setPersonName('');
      setPersonRelation('');
    }
  };

  const removePerson = (id: string) => {
    setImportantPeople(importantPeople.filter(p => p.id !== id));
  };

  const addSchedule = () => {
    if (selectedDays.length === 0) {
      alert('통화 요일을 선택해주세요');
      return;
    }
    
    const newSchedule: CallSchedule = {
      id: Date.now().toString(),
      days: [...selectedDays],
      time: selectedTime
    };
    
    setCallSchedules([...callSchedules, newSchedule]);
    setSelectedDays([]);
    setSelectedTime('10:00');
  };

  const removeSchedule = (id: string) => {
    const updated = callSchedules.filter(s => s.id !== id);
    setCallSchedules(updated);
    updateCallSchedules(updated);
  };

  const handleNext = () => {
    if (callSchedules.length === 0) {
      alert('최소 1개의 통화 일정을 등록해주세요');
      return;
    }

    updateCallSchedules(callSchedules);
    updateAISettings({
      tone,
      notificationsEnabled,
      conversationTopics: {
        selectedTopics,
        customTopics,
        specialNotes
      },
      importantPeople
    });
    
    router.push('/onboarding/chapter-4');
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <svg className="w-4 h-4 text-slate-400 hover:text-amber-600 cursor-help transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
        <p className="font-semibold mb-1">{text}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex">
      {/* 좌측 브랜딩 영역 */}
      <div className="hidden lg:flex lg:w-[420px] border-r-2 border-slate-200 bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Chapter 3 • AI 맞춤 설정</span>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between gap-3 mb-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-1">
                  <div className={`h-2 rounded-full ${num <= 3 ? 'bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg' : 'bg-slate-200'} transition-all duration-500`}></div>
                  <p className={`text-xs font-bold text-center mt-2 ${num <= 3 ? 'text-amber-600' : 'text-slate-400'}`}>
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
              편한 시간을<br/>
              알려주세요
            </p>
            <p className="text-sm font-medium text-slate-600">
              소리가 딱 맞게<br/>
              찾아뵙겠습니다
            </p>
          </div>
        </div>

        <div className="w-full p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-200 hover:bg-white/80 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            <p className="text-xs font-bold text-amber-700">다음 단계</p>
          </div>
          <p className="text-sm font-semibold text-slate-700">최종 확인</p>
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex-1 flex items-start justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-amber-200 mb-4">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">Chapter 3 • AI 맞춤 설정</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`h-1.5 flex-1 rounded-full ${num <= 3 ? 'bg-amber-600' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-white/50 space-y-8">
            {/* 통화 일정 */}
            <section>
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                통화 일정
                <Tooltip text="원하는 요일과 시간을 선택하세요. 여러 개 등록 가능합니다." />
              </h3>

              <div className="space-y-4">
                {/* 요일 선택 */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 요일</label>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`h-9 rounded-md text-sm font-bold transition-all ${
                          selectedDays.includes(day)
                            ? 'bg-amber-600 text-white scale-105'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 시간 선택 - 개선된 UI */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 시간</label>
                  <div 
                    onClick={() => timeInputRef.current?.showPicker()}
                    className="relative p-5 rounded-xl border-2 border-slate-200 hover:border-amber-400 transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-600 mb-1">선택된 시간</p>
                          <p className="text-2xl font-black text-slate-900 font-mono">
                            {selectedTime || '10:00'}
                          </p>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </div>
                    <input
                      ref={timeInputRef}
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="absolute opacity-0 pointer-events-none"
                    />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-2">
                    박스를 클릭하면 시간을 변경할 수 있어요
                  </p>
                </div>

                {/* 일정 추가 버튼 */}
                <button
                  onClick={addSchedule}
                  disabled={selectedDays.length === 0}
                  className="w-full h-9 rounded-md bg-amber-100 text-amber-700 text-sm font-bold hover:bg-amber-200 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  {selectedDays.length > 0 ? `${selectedDays.join(', ')} ${selectedTime} 추가` : '요일을 선택해주세요'}
                </button>

                {/* 등록된 일정 */}
                {callSchedules.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-slate-600">등록된 일정</p>
                    {callSchedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-md border border-slate-200">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-sm font-bold text-slate-700">
                            {schedule.days.join(', ')} • {schedule.time}
                          </span>
                        </div>
                        <button
                          onClick={() => removeSchedule(schedule.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* 소중한 사람들 */}
            <section className="pt-6 border-t-2 border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                소중한 사람들
                <Tooltip text="대화 중 언급할 가족이나 친구의 이름과 관계를 입력하세요" />
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="flex-1 h-9 px-3 rounded-md border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                    placeholder="이름"
                  />
                  <input
                    type="text"
                    value={personRelation}
                    onChange={(e) => setPersonRelation(e.target.value)}
                    className="flex-1 h-9 px-3 rounded-md border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                    placeholder="관계 (예: 딸, 손주)"
                  />
                  <button
                    onClick={addPerson}
                    disabled={!personName.trim() || !personRelation.trim()}
                    className="h-9 px-4 rounded-md bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition-all disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    추가
                  </button>
                </div>

                {importantPeople.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {importantPeople.map((person) => (
                      <span key={person.id} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                        {person.name} ({person.relation})
                        <button onClick={() => removePerson(person.id)} className="hover:text-red-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* 대화 톤 */}
            <section className="pt-6 border-t-2 border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                대화 톤
                <Tooltip text="소리가 대화할 때 사용할 어조를 선택하세요" />
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`relative h-16 rounded-xl text-sm font-bold transition-all ${
                      tone === t.id
                        ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white scale-105 shadow-xl border-2 border-amber-400'
                        : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <ToneIcon type={t.id} size={28} active={tone === t.id} />
                      <span className="text-xs">{t.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 관심사/대화 주제 */}
            <section className="pt-6 border-t-2 border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                관심사/대화 주제
                <Tooltip text="평소 즐겨 대화하는 주제를 선택하면 소리가 대화를 이어갑니다" />
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {conversationTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`h-9 rounded-md text-xs font-bold transition-all ${
                        selectedTopics.includes(topic)
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomTopic()}
                    className="flex-1 h-9 px-3 rounded-md border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm"
                    placeholder="기타 주제 추가 (Enter)"
                  />
                </div>

                {customTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customTopics.map((topic, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-bold">
                        {topic}
                        <button onClick={() => removeCustomTopic(topic)} className="hover:text-red-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* 특이사항/기타 요청사항 */}
            <section className="pt-6 border-t-2 border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                특이사항/기타 요청사항
                <Tooltip text="소리가 알아두면 좋을 특별한 사항이 있다면 자유롭게 적어주세요" />
              </h3>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full h-24 px-4 py-3 rounded-md border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 resize-none text-sm"
                placeholder="예: 귀가 조금 어두우시니 천천히 또박또박 말씀해주세요"
              />
            </section>

            {/* 알림 설정 */}
            <section className="pt-6 border-t-2 border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">알림 받기</h3>
                  <Tooltip text="통화 전 알림과 통화 결과 요약을 받을 수 있습니다" />
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    notificationsEnabled ? 'bg-amber-600' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-7' : ''
                  }`}></div>
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {notificationsEnabled ? '통화 전 알림과 통화 요약을 받습니다' : '알림을 받지 않습니다'}
              </p>
            </section>

            {/* 버튼 */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={() => router.push('/onboarding/chapter-2')}
                className="h-11 px-6 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                ← 이전
              </button>
              <button
                onClick={handleNext}
                disabled={callSchedules.length === 0}
                className={`flex-1 h-11 rounded-xl font-bold text-sm transition-all ${
                  callSchedules.length > 0
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {callSchedules.length > 0 ? '거의 다 됐어요!' : '통화 일정을 추가해주세요'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
