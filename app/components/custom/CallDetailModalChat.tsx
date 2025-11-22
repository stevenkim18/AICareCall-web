'use client';

import { SoriCharacter } from './SoriCharacter';

interface CallDetailModalChatProps {
    isOpen: boolean;
    onClose: () => void;
    call: {
        id: number;
        date: string;
        time: string;
        duration: number;
        summary: string;
        emotion: string;
    };
}

export function CallDetailModalChat({ isOpen, onClose, call }: CallDetailModalChatProps) {
    if (!isOpen) return null;

    //  Full conversation data (확장 가능)
    const conversation = [
        { sender: 'sori', time: '10:00:05', text: '안녕하세요, 할머니! 오늘 기분은 어떠세요?' },
        { sender: 'elder', time: '10:00:12', text: '아이고, 소리야! 오늘 날씨가 참 좋더라.' },
        { sender: 'sori', time: '10:00:18', text: '그러게요! 오늘 점심은 무엇 드셨어요?' },
        { sender: 'elder', time: '10:00:25', text: '된장찌개랑 밥 먹었어. 맛있었어!' },
        { sender: 'sori', time: '10:00:32', text: '좋으시네요! 혹시 오늘 약은 드셨나요?' },
        { sender: 'elder', time: '10:00:40', text: '아침에 먹었지. 걱정 마!' },
        { sender: 'sori', time: '10:00:45', text: '잘하셨어요! 손주분들 소식은 어떠세요?' },
        { sender: 'elder', time: '10:00:55', text: '다음 주에 손주가 온대! 기대된다!' },
        { sender: 'sori', time: '10:01:02', text: '와! 정말 반가우시겠어요. 건강 잘 챙기세요!' },
        { sender: 'elder', time: '10:01:10', text: '고마워, 소리야. 너도 잘 있어!' },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between rounded-t-lg">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">전체 대화 내용</h2>
                        <p className="text-xs text-slate-400 mt-0.5">{call.date} {call.time} · {call.duration}분</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {conversation.map((msg, idx) => (
                            msg.sender === 'sori' ? (
                                // Sori message - left
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md">
                                        <SoriCharacter size={24} />
                                    </div>
                                    <div className="flex-1 max-w-[70%]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-xs font-bold text-violet-600">소리</p>
                                            <p className="text-[10px] text-slate-400">{msg.time}</p>
                                        </div>
                                        <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-violet-100">
                                            <p className="text-sm text-slate-700">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Elder message - right
                                <div key={idx} className="flex gap-3 items-start justify-end">
                                    <div className="flex-1 max-w-[70%] flex flex-col items-end">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-[10px] text-slate-400">{msg.time}</p>
                                            <p className="text-xs font-bold text-slate-700">어르신</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg rounded-tr-none px-4 py-3 shadow-md">
                                            <p className="text-sm text-white">{msg.text}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-8 py-4 bg-white rounded-b-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">총 {conversation.length}개의 메시지</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition-all"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
