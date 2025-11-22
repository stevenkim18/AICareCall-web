'use client';

import { useState, useEffect, useRef } from 'react';
import { LNB } from '@/app/components/custom/LNB';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';

interface Message {
  id: number;
  time: string;
  speaker: 'sori' | 'elder';
  text: string;
  emotion?: string;
  keywords?: string[];
  voiceLevel?: number;
}

export default function Chat() {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [isConnecting, setIsConnecting] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, time: '10:30:15', speaker: 'sori', text: '안녕하세요, 순자님! 오늘 기분이 어떠세요?', emotion: '밝음', keywords: [] },
    { id: 2, time: '10:30:32', speaker: 'elder', text: '아침에 일어나니 무릎이 좀 아프네요', emotion: '불편함', keywords: ['무릎', '통증'], voiceLevel: 65 },
    { id: 3, time: '10:30:48', speaker: 'sori', text: '무릎이 불편하시군요. 언제부터 아프셨어요?', emotion: '공감', keywords: [] },
    { id: 4, time: '10:31:05', speaker: 'elder', text: '어제 산책 갔다 와서부터요', emotion: '차분함', keywords: ['산책', '어제'], voiceLevel: 70 },
    { id: 5, time: '10:31:22', speaker: 'sori', text: '산책은 좋으셨나요? 어디까지 다녀오셨어요?', emotion: '관심', keywords: [] },
    { id: 6, time: '10:31:45', speaker: 'elder', text: '공원에 다녀왔어요. 날씨가 참 좋더라고요', emotion: '기쁨', keywords: ['공원', '날씨'], voiceLevel: 85 },
    { id: 7, time: '10:32:10', speaker: 'sori', text: '좋으셨네요! 오늘 약은 드셨나요?', emotion: '확인', keywords: [] },
    { id: 8, time: '10:32:28', speaker: 'elder', text: '아, 아직 안 먹었네. 지금 먹어야겠어요', emotion: '깨달음', keywords: ['약', '복용'], voiceLevel: 75 },
  ]);

  const [duration, setDuration] = useState(128);
  const [isLive, setIsLive] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'sori' | 'elder' | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showAnalysis, setShowAnalysis] = useState(true);

  // 통화 기록 데이터
  const callHistory = [
    { id: 1, date: '2025-01-19', time: '10:30', duration: '12분', emotion: '기쁨', summary: '손주 방문 소식으로 기뻐하심' },
    { id: 2, date: '2025-01-17', time: '14:20', duration: '15분', emotion: '차분함', summary: '날씨 이야기와 식사 상황 공유' },
    { id: 3, date: '2025-01-15', time: '10:00', duration: '18분', emotion: '밝음', summary: '친구와의 만남 후 즐거운 대화' },
    { id: 4, date: '2025-01-13', time: '10:30', duration: '10분', emotion: '불편함', summary: '무릎 통증 언급, 약 복용 확인' },
  ];

  // 초기 연결 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // 통화 시간 업데이트
  useEffect(() => {
    if (!isConnecting && isLive) {
      const timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnecting, isLive]);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI 생각 중 시뮬레이션
  useEffect(() => {
    const thinkingTimer = setInterval(() => {
      setIsAiThinking(Math.random() > 0.7);
    }, 4000);
    return () => clearInterval(thinkingTimer);
  }, []);

  // 말하기 상태 시뮬레이션
  useEffect(() => {
    const speakingTimer = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsSpeaking(true);
        setCurrentSpeaker(Math.random() > 0.5 ? 'sori' : 'elder');
        setTimeout(() => {
          setIsSpeaking(false);
          setCurrentSpeaker(null);
        }, 2000);
      }
    }, 3000);
    return () => clearInterval(speakingTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case '밝음':
      case '기쁨':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case '불편함':
      case '걱정':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case '공감':
      case '관심':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case '차분함':
        return 'bg-green-50 border-green-200 text-green-700';
      case '확인':
        return 'bg-cyan-50 border-cyan-200 text-cyan-700';
      case '깨달음':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const endCall = () => {
    setIsLive(false);
    setIsSpeaking(false);
    setCurrentSpeaker(null);
    alert('통화가 종료되었습니다. 대시보드에서 통화 내용을 확인할 수 있습니다.');
  };

  // 연결 중 로딩 화면
  if (isConnecting) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <LNB />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 mx-auto">
                <SoriCharacter size={96} animated />
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-4">
              소중한 분과의 대화를 연결하고 있어요...
            </h2>
            <p className="text-sm font-bold text-slate-600 mb-8">AI가 준비 중입니다</p>

            {/* 프로그레스 바 */}
            <div className="w-80 h-3 bg-slate-200 rounded-full overflow-hidden mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 rounded-full animate-[shimmer_2s_ease-in-out_infinite]" style={{ width: '70%' }}></div>
            </div>

            {/* 음성 파동 애니메이션 */}
            <div className="flex justify-center items-end gap-1.5 h-12">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-violet-600 to-purple-600 rounded-full animate-[wave_1.2s_ease-in-out_infinite]"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: `${30 + Math.sin(i) * 20}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />

      <main className="flex-1 flex flex-col">
        {/* 탭 네비게이션 */}
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
          <div className="flex gap-2 px-8 pt-4">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-t-md font-bold text-sm transition-all ${activeTab === 'live'
                  ? 'bg-white text-violet-600 border-2 border-b-0 border-violet-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              실시간 통화
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-t-md font-bold text-sm transition-all ${activeTab === 'history'
                  ? 'bg-white text-violet-600 border-2 border-b-0 border-violet-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              통화 기록
            </button>
          </div>
        </div>

        {/* 실시간 통화 탭 */}
        {activeTab === 'live' && (
          <>
            {/* 헤더 */}
            <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-6">
                  {/* 아바타 */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center transition-all ${isSpeaking && currentSpeaker === 'elder' ? 'ring-4 ring-green-400 ring-offset-2' : ''
                      }`}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>

                    {/* 음성 파동 애니메이션 */}
                    {isSpeaking && currentSpeaker === 'elder' && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-black text-slate-900">김순자 님과 통화 중</h1>
                      {isLive && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border-2 border-red-200">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                          <span className="text-xs font-black text-red-700">LIVE</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold text-slate-700">{formatTime(duration)}</span>
                      </div>
                      <div className="w-px h-4 bg-slate-300"></div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-green-700">연결 양호</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 통화 종료 버튼 */}
                <button
                  onClick={endCall}
                  className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  통화 종료
                </button>
              </div>
            </div>

            {/* 실시간 통화 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-4 animate-slideInUp ${msg.speaker === 'sori' ? '' : 'flex-row-reverse'
                      }`}
                  >
                    {/* 아바타 */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${msg.speaker === 'sori'
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                        : 'bg-gradient-to-br from-violet-600 to-purple-600'
                      }`}>
                      {msg.speaker === 'sori' ? (
                        <SoriCharacter size={28} animated={false} />
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>

                    {/* 메시지 */}
                    <div className={`flex-1 max-w-2xl ${msg.speaker === 'sori' ? '' : 'text-right'}`}>
                      <div className={`inline-block ${msg.speaker === 'sori' ? '' : 'text-left'}`}>
                        {/* 시간 + 감정 */}
                        <div className={`flex items-center gap-2 mb-2 ${msg.speaker === 'sori' ? '' : 'flex-row-reverse'}`}>
                          <span className="text-xs font-bold text-slate-500">{msg.time}</span>
                          {msg.emotion && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getEmotionColor(msg.emotion)}`}>
                              {msg.emotion}
                            </span>
                          )}
                          {msg.voiceLevel && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-end gap-0.5 h-3">
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 rounded-full transition-all ${i < Math.floor(msg.voiceLevel! / 25)
                                        ? 'bg-green-600'
                                        : 'bg-slate-300'
                                      }`}
                                    style={{ height: `${(i + 1) * 25}%` }}
                                  ></div>
                                ))}
                              </div>
                              <span className="text-xs font-bold text-slate-500">{msg.voiceLevel}dB</span>
                            </div>
                          )}
                        </div>

                        {/* 말풍선 */}
                        <div className={`px-5 py-4 rounded-xl ${msg.speaker === 'sori'
                            ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200'
                            : 'bg-white border-2 border-slate-200'
                          }`}>
                          <p className="text-base font-bold text-slate-900 leading-relaxed">{msg.text}</p>

                          {/* 키워드 */}
                          {msg.keywords && msg.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.keywords.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 rounded bg-amber-100 border border-amber-300 text-xs font-bold text-amber-800"
                                >
                                  #{keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI 생각 중 표시 */}
                {isAiThinking && (
                  <div className="flex gap-4 animate-slideInUp">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <SoriCharacter size={28} animated />
                    </div>
                    <div className="flex-1 max-w-2xl">
                      <div className="inline-block">
                        <div className="px-5 py-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm font-bold text-violet-700">답변을 준비하고 있어요...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>

            {/* 실시간 분석 패널 */}
            {showAnalysis && (
              <div className="border-t border-slate-200 bg-white/90 backdrop-blur-xl p-6 animate-slideInUp">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-black text-slate-900">AI 실시간 분석</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-xs font-black text-blue-700 uppercase">건강</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 mb-1">무릎 통증</p>
                        <p className="text-xs text-slate-600">산책 후 발생</p>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                          <span className="text-xs font-black text-yellow-700 uppercase">알림</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 mb-1">약 복용 미완료</p>
                        <p className="text-xs text-slate-600">지금 복용 필요</p>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          <span className="text-xs font-black text-green-700 uppercase">긍정</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 mb-1">산책 활동</p>
                        <p className="text-xs text-slate-600">기분 좋아하심</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* 통화 기록 탭 */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 mb-2">통화 기록</h2>
                <p className="text-sm font-bold text-slate-600">소중한 분과의 모든 대화 기록입니다</p>
              </div>

              <div className="space-y-4">
                {callHistory.map((call) => (
                  <div key={call.id} className="bg-white rounded-md border-2 border-slate-300 p-6 hover:border-violet-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-black text-slate-900">{call.date}</h3>
                            <span className="text-sm font-bold text-slate-600">{call.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-600">{call.duration}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getEmotionColor(call.emotion)}`}>
                              {call.emotion}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`/report?callId=${call.id}`}
                        className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      >
                        상세 리포트
                      </a>
                    </div>
                    <p className="text-base font-bold text-slate-700">{call.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
