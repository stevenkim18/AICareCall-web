import React from 'react';

interface Emotion3DProps {
    emotion: string | null;
    size?: 'sm' | 'md' | 'lg';
}

export function Emotion3D({ emotion, size = 'md' }: Emotion3DProps) {
    // 부재중 (Missed)
    if (!emotion) {
        const boxClass = size === 'sm' ? 'w-8 h-8 rounded-lg' : size === 'lg' ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10 rounded-xl';
        const dashClass = size === 'sm' ? 'w-2 h-0.5' : 'w-3 h-1';

        return (
            <div className={`${boxClass} bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm`}>
                <div className={`${dashClass} bg-slate-400 rounded-full`} />
            </div>
        );
    }

    const config: Record<string, { bg: string; border: string }> = {
        '좋음': { bg: 'bg-emerald-100', border: 'border-emerald-200' },
        '보통': { bg: 'bg-blue-100', border: 'border-blue-200' },
        '나쁨': { bg: 'bg-red-100', border: 'border-red-200' },
    };

    const style = config[emotion] || { bg: 'bg-slate-100', border: 'border-slate-200' };

    // 사이즈별 스타일 정의
    let boxClass = '';
    let faceClass = '';
    let faceBorderClass = ''; // 테두리 두께 조절용
    let eyeClass = '';
    let eyeLeftClass = '';
    let eyeRightClass = '';
    let mouthClass = '';
    let mouthLineClass = '';

    if (size === 'sm') {
        boxClass = 'w-8 h-8 rounded-lg';
        faceClass = 'w-5 h-5';
        faceBorderClass = 'border'; // 작은 크기에서는 테두리를 1px로 줄여 내부 공간 확보
        eyeClass = 'w-0.5 h-0.5 top-1.5';
        eyeLeftClass = 'left-1';
        eyeRightClass = 'right-1';
        mouthClass = 'w-2.5 h-1 bottom-1';
        mouthLineClass = 'w-2 h-0.5 bottom-1.5'; // 너비와 위치 미세 조정
    } else if (size === 'lg') { // CallHistoryPage 원본 (w-12)
        boxClass = 'w-12 h-12 rounded-2xl';
        faceClass = 'w-8 h-8';
        faceBorderClass = 'border-2';
        eyeClass = 'w-1 h-1 top-2.5';
        eyeLeftClass = 'left-1.5';
        eyeRightClass = 'right-1.5';
        mouthClass = 'w-4 h-2 bottom-1.5';
        mouthLineClass = 'w-4 bottom-2.5';
    } else { // md (default)
        boxClass = 'w-10 h-10 rounded-xl';
        faceClass = 'w-6 h-6';
        faceBorderClass = 'border-2';
        eyeClass = 'w-0.5 h-0.5 top-2';
        eyeLeftClass = 'left-1';
        eyeRightClass = 'right-1';
        mouthClass = 'w-3 h-1.5 bottom-1';
        mouthLineClass = 'w-3 bottom-2';
    }

    return (
        <div className={`${boxClass} ${style.bg} border ${style.border} flex items-center justify-center shadow-sm`}>
            <div className={`${faceClass} rounded-full bg-yellow-400 ${faceBorderClass} border-yellow-500 flex items-center justify-center relative`}>
                <div className={`absolute ${eyeClass} ${eyeLeftClass} rounded-full bg-slate-800`} />
                <div className={`absolute ${eyeClass} ${eyeRightClass} rounded-full bg-slate-800`} />

                {emotion === '좋음' && (
                    <svg className={`absolute ${mouthClass}`} viewBox="0 0 16 8">
                        <path d="M2 2C4 6 12 6 14 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" />
                    </svg>
                )}
                {emotion === '보통' && (
                    <div className={`absolute ${mouthLineClass} bg-slate-800 rounded-full`} />
                )}
                {emotion === '나쁨' && (
                    <svg className={`absolute ${mouthClass}`} viewBox="0 0 16 8">
                        <path d="M2 6C4 2 12 2 14 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" />
                    </svg>
                )}
            </div>
        </div>
    );
}
