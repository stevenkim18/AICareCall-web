/**
 * 온보딩 데이터 변환 유틸리티
 * 프론트엔드 데이터를 백엔드 API 형식으로 변환
 */

import type { ElderInfoData, CallSettingsData, CallContentData } from '@/types/onboarding';
import type { ElderCreate } from './elder';

/**
 * 숫자 요일을 한글 요일로 변환
 * 백엔드가 "월요일", "화요일" 형식을 요구함
 */
function convertWeekdaysToKorean(numericDays: string[]): string[] {
    const weekdayMap: Record<string, string> = {
        '0': '일요일',
        '1': '월요일',
        '2': '화요일',
        '3': '수요일',
        '4': '목요일',
        '5': '금요일',
        '6': '토요일',
    };

    return numericDays.map(day => weekdayMap[day] || '월요일');
}

/**
 * 거주 형태를 한글로 변환
 */
function convertLivingArrangement(
    living?: string,
    other?: string
): string {
    if (!living) return '독거';

    if (living === 'other' && other) {
        return other;
    }

    const map:

        Record<string, string> = {
        'alone': '독거',
        'with-spouse': '배우자와 동거',
        'with-children': '자녀와 동거',
        'nursing-home': '요양시설',
    };

    return map[living] || '독거';
}

/**
 * 온보딩 데이터를 백엔드 ElderCreate 형식으로 변환
 */
export function convertToElderCreate(
    elder: ElderInfoData,
    callSettings: CallSettingsData,
    callContent: CallContentData
): ElderCreate {
    // 거주 형태 변환
    const residenceType = convertLivingArrangement(
        elder.livingArrangement,
        elder.livingArrangementOther
    );

    // 관계 변환 (other인 경우 직접 입력값 사용)
    const relationship = elder.relationship === 'other' && elder.relationshipOther
        ? elder.relationshipOther
        : elder.relationship;

    // 요일을 한글로 변환
    const koreanWeekdays = convertWeekdaysToKorean(callSettings.repeatDays);

    // 시간 형식 변환: HH:MM → HH:MM:SS
    const formattedTimes = callSettings.callTimes.map(time => `${time}:00`);

    return {
        name: elder.name,
        gender: elder.gender,
        age: Number(elder.age),
        phone: elder.phone,
        relation: relationship,
        residence_type: residenceType,
        health_condition: elder.healthInfo || "",
        begin_date: new Date().toISOString(),
        end_date: null,

        // Step 4 데이터 변환 (DetailLevel → boolean)
        ask_meal: callContent.mealDepth !== 'simple',
        ask_medication: callContent.askMedication,
        ask_emotion: callContent.moodDepth !== 'simple',
        ask_special_event: callContent.activityDepth !== 'simple',
        additional_info: callContent.additionalQuestions || "",

        // Step 3 데이터 변환 (한글 요일 + HH:MM:SS 형식)
        call_weekdays: koreanWeekdays,
        call_times: formattedTimes
    };
}
