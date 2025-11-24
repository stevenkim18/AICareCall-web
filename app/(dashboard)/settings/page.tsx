'use client';

import { useState } from 'react';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  // 프로필 데이터
  const [guardianName, setGuardianName] = useState('홍길동');
  const [elderName, setElderName] = useState('김순자');
  const [elderPhone, setElderPhone] = useState('010-1234-5678');
  const [elderRelation, setElderRelation] = useState('부모님');

  // 건강 정보
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['고혈압', '당뇨']);
  const [medications, setMedications] = useState<string[]>(['혈압약 (아침)', '혈당강하제']);

  // 통화 설정 - 최대 3개까지 지원
  const [callSchedules, setCallSchedules] = useState([
    { id: '1', days: ['월', '수', '금'], time: '10:00' },
    { id: '2', days: ['화', '목'], time: '14:00' }
  ]);
  const [tone, setTone] = useState('따뜻하게');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const conditions = ['고혈압', '당뇨', '관절염', '치매', '심장 질환', '해당 없음'];
  const relations = ['부모님', '조부모님', '친척', '지인', '기타'];
  const tones = ['따뜻하게', '밝게', '차분하게'];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSave = () => {
    // 저장 로직 (API 호출)
    alert('설정이 저장되었습니다!');
    setIsEditing(false);
  };

  return (
    <>
      <LNB />

      <SidebarInset className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  설정 관리
                </h1>
                <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md font-bold">
                    <SoriCharacter size={14} animated={false} />
                    소리
                  </span>의 서비스 설정을 관리하세요
                </p>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${isEditing
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl'
                  }`}
              >
                {isEditing ? '✓ 저장하기' : '✏️ 수정하기'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* 탭 네비게이션 */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 max-w-md py-4 px-6 rounded-xl font-bold text-sm transition-all ${activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>소중한 분 프로필</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 max-w-md py-4 px-6 rounded-xl font-bold text-sm transition-all ${activeTab === 'schedule'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>통화 설정</span>
              </div>
            </button>
          </div>

          {/* 프로필 탭 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-white rounded-md border-2 border-violet-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">기본 정보</h3>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-md bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-all"
                    >
                      수정하기
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4 p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <h4 className="text-sm font-black text-purple-700 mb-3">보호자 정보</h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">성함 *</label>
                      <input
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-md border-2 border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm font-bold disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="text-sm font-black text-blue-700 mb-3">소중한 분 정보</h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">성함 *</label>
                      <input
                        value={elderName}
                        onChange={(e) => setElderName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">연락처 *</label>
                      <input
                        value={elderPhone}
                        onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                        disabled={!isEditing}
                        placeholder="010-0000-0000"
                        maxLength={13}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">관계 *</label>
                      <select
                        value={elderRelation}
                        onChange={(e) => setElderRelation(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      >
                        {relations.map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 건강 프로필 */}
              <div className="bg-white rounded-md border-2 border-red-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">건강 프로필</h3>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-md bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all"
                    >
                      수정하기
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">건강 상태 및 약물 정보</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        id="health-input"
                        placeholder="질환이나 복용 약물을 입력해주세요 (예: 고혈압, 혈압약)"
                        disabled={!isEditing}
                        className="flex-1 h-11 px-4 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-sm font-medium disabled:bg-slate-100 disabled:cursor-not-allowed"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            setMedications([...medications, e.currentTarget.value.trim()]);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById('health-input') as HTMLInputElement;
                          if (input.value.trim()) {
                            setMedications([...medications, input.value.trim()]);
                            input.value = '';
                          }
                        }}
                        disabled={!isEditing}
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        추가
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200 min-h-[80px]">
                      {medications.length === 0 ? (
                        <p className="text-sm text-slate-400 font-medium">등록된 정보가 없습니다</p>
                      ) : (
                        medications.map((med, idx) => (
                          <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold shadow-sm">
                            💊 {med}
                            {isEditing && (
                              <button
                                onClick={() => setMedications(medications.filter((_, i) => i !== idx))}
                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 통화 설정 탭 */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {/* 통화 일정 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>통화 일정</span>
                </h3>
                <div className="space-y-4">
                  {callSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-black text-slate-900">{schedule.time}</p>
                            <p className="text-xs font-medium text-slate-500">매주 정기 통화</p>
                          </div>
                        </div>
                        {isEditing && (
                          <button className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition-all shadow-sm">
                            삭제
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {schedule.days.map((day, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold shadow-sm">
                            {day}요일
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/*대화 톤 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span>대화 톤</span>
                    <span className="text-xs font-bold bg-blue-500 text-white px-3 py-1 rounded-full shadow-sm ml-2">SOON</span>
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => isEditing && setTone(t)}
                      disabled={!isEditing}
                      className={`h-12 rounded-xl font-bold text-sm transition-all ${tone === t
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 알림 설정 */}
              <div className="bg-white rounded-md border-2 border-blue-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">알림 설정</h3>
                </div>
                <label className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-md border-2 border-blue-200 cursor-pointer group hover:border-blue-300 transition-all">
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-1">통화 알림 받기</p>
                    <p className="text-xs font-bold text-slate-600">통화 전후로 알림을 보내드려요</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-all ${notificationsEnabled ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-slate-300'
                      }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                    ></span>
                  </button>
                </label>
              </div>
            </div>
          )}

          {/* 건강 프로필 */}
          <div className="bg-white rounded-md border-2 border-red-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-900">건강 프로필</h3>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all"
                >
                  수정하기
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">건강 상태 및 약물 정보</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    id="health-input"
                    placeholder="질환이나 복용 약물을 입력해주세요 (예: 고혈압, 혈압약)"
                    disabled={!isEditing}
                    className="flex-1 h-11 px-4 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-sm font-medium disabled:bg-slate-100 disabled:cursor-not-allowed"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setMedications([...medications, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('health-input') as HTMLInputElement;
                      if (input.value.trim()) {
                        setMedications([...medications, input.value.trim()]);
                        input.value = '';
                      }
                    }}
                    disabled={!isEditing}
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200 min-h-[80px]">
                  {medications.length === 0 ? (
                    <p className="text-sm text-slate-400 font-medium">등록된 정보가 없습니다</p>
                  ) : (
                    medications.map((med, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold shadow-sm">
                        💊 {med}
                        {isEditing && (
                          <button
                            onClick={() => setMedications(medications.filter((_, i) => i !== idx))}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 통화 설정 탭 */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {/* 통화 일정 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>통화 일정</span>
                </h3>
                <div className="space-y-4">
                  {callSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-black text-slate-900">{schedule.time}</p>
                            <p className="text-xs font-medium text-slate-500">매주 정기 통화</p>
                          </div>
                        </div>
                        {isEditing && (
                          <button className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition-all shadow-sm">
                            삭제
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {schedule.days.map((day, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-bold shadow-sm">
                            {day}요일
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/*대화 톤 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span>대화 톤</span>
                    <span className="text-xs font-bold bg-blue-500 text-white px-3 py-1 rounded-full shadow-sm ml-2">SOON</span>
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => isEditing && setTone(t)}
                      disabled={!isEditing}
                      className={`h-12 rounded-xl font-bold text-sm transition-all ${tone === t
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 알림 설정 */}
              <div className="bg-white rounded-md border-2 border-blue-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">알림 설정</h3>
                </div>
                <label className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-md border-2 border-blue-200 cursor-pointer group hover:border-blue-300 transition-all">
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-1">통화 알림 받기</p>
                    <p className="text-xs font-bold text-slate-600">통화 전후로 알림을 보내드려요</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-all ${notificationsEnabled ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-slate-300'
                      }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                    ></span>
                  </button>
                </label>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </>
  );
}
