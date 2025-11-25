import type {
    Gender,
    Relationship,
    LivingArrangement,
    CallFrequency,
    DetailLevel,
    MoodDetailLevel,
    CallLength,
    CallContentData,
} from '@/types/onboarding';

// Gender labels
export const getGenderLabel = (gender: Gender): string => {
    return gender === 'male' ? '남' : '여';
};

// Relationship labels
export const getRelationshipLabel = (relationship: Relationship): string => {
    const relationshipMap: Record<Relationship, string> = {
        son: '아들',
        daughter: '딸',
        'son-in-law': '사위',
        'daughter-in-law': '며느리',
        grandson: '손자',
        granddaughter: '손녀',
        other: '기타',
    };
    return relationshipMap[relationship];
};

// Living arrangement labels
export const getLivingArrangementLabel = (
    livingArrangement: LivingArrangement
): string => {
    const livingArrangementMap: Record<LivingArrangement, string> = {
        alone: '독거',
        'with-spouse': '배우자와 동거',
        'with-children': '자녀와 동거',
        'nursing-home': '요양시설',
        other: '기타',
    };
    return livingArrangementMap[livingArrangement];
};

// Call frequency labels
export const getCallFrequencyLabel = (frequency: CallFrequency): string => {
    return `하루 ${frequency}회`;
};

// Call times labels
export const getCallTimesLabel = (times: string[]): string => {
    return times
        .map((time) => {
            const hour = parseInt(time.split(':')[0]);
            if (hour < 12) return `오전 ${hour}시`;
            if (hour === 12) return '낮 12시';
            return `오후 ${hour - 12}시`;
        })
        .join(', ');
};

// Repeat days labels
export const getRepeatDaysLabel = (days: string[]): string => {
    if (days.length === 7) return '매일';
    if (
        days.length === 5 &&
        !days.includes('0') &&
        !days.includes('6')
    ) {
        return '평일';
    }

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const sorted = [...days].sort((a, b) => parseInt(a) - parseInt(b));
    return sorted.map((d) => dayNames[parseInt(d)]).join(', ');
};

// Call length labels
export const getCallLengthLabel = (length: CallLength): string => {
    const callLengthMap: Record<CallLength, string> = {
        short: '짧게 (2-3분)',
        normal: '보통 (5분)',
        long: '길게 (7-10분)',
    };
    return callLengthMap[length];
};

// Detail level labels
export const getDetailLevelLabel = (
    depth: DetailLevel | MoodDetailLevel
): string => {
    const depthMap: Record<DetailLevel | MoodDetailLevel, string> = {
        simple: '간단히',
        normal: '보통',
        detailed: '자세히',
    };
    return depthMap[depth];
};

// Call content summary
export const getCallContentSummary = (
    callContent?: CallContentData
): string => {
    if (!callContent) return '설정 없음';

    const parts: string[] = [];

    // 식사
    if (callContent.mealDepth) {
        const extras = [];
        if (callContent.askAppetite) extras.push('입맛');
        if (callContent.askCompany) extras.push('동반식사');
        parts.push(
            `식사(${getDetailLevelLabel(callContent.mealDepth)}${extras.length > 0 ? ', ' + extras.join(', ') : ''
            })`
        );
    }

    // 복약/건강
    if (
        callContent.askMedication ||
        callContent.askPain ||
        callContent.askSleep ||
        callContent.askDiscomfort
    ) {
        const healthItems = [];
        if (callContent.askMedication) {
            const medTimes = [];
            if (callContent.medMorning) medTimes.push('아침');
            if (callContent.medLunch) medTimes.push('점심');
            if (callContent.medEvening) medTimes.push('저녁');
            healthItems.push(
                `복약${medTimes.length > 0 ? '(' + medTimes.join(',') + ')' : ''}`
            );
        }
        if (callContent.askPain) healthItems.push('통증');
        if (callContent.askSleep) healthItems.push('수면');
        if (callContent.askDiscomfort) healthItems.push('불편감');
        parts.push(healthItems.join(', '));
    }

    // 기분/컨디션
    if (callContent.moodDepth) {
        const extras = [];
        if (callContent.askLoneliness) extras.push('외로움');
        if (callContent.askWorries) extras.push('걱정');
        if (callContent.askContacts) extras.push('연락');
        parts.push(
            `기분(${getDetailLevelLabel(callContent.moodDepth)}${extras.length > 0 ? ', ' + extras.join(', ') : ''
            })`
        );
    }

    // 특별한 일/하루 요약
    if (callContent.activityDepth) {
        const extras = [];
        if (callContent.askOutdoor) extras.push('외출');
        if (callContent.askExercise) extras.push('운동');
        if (callContent.askHobbies) extras.push('취미');
        parts.push(
            `활동(${getDetailLevelLabel(callContent.activityDepth)}${extras.length > 0 ? ', ' + extras.join(', ') : ''
            })`
        );
    }

    return parts.join(', ');
};

// Phone number formatting
export const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

// Timer formatting
export const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
