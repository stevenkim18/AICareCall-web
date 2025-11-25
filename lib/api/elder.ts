/**
 * 어르신 등록 관련 API 함수
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 어르신 등록 요청 데이터 (백엔드 형식)
 */
export interface ElderCreate {
    name: string;
    gender: string;
    age: number;
    phone: string;
    relation: string;  // Changed from 'relationship' to 'relation' to match backend
    residence_type: string;
    health_condition: string;
    begin_date: string;
    end_date: string | null;
    ask_meal: boolean;
    ask_medication: boolean;
    ask_emotion: boolean;
    ask_special_event: boolean;
    additional_info: string;
    call_weekdays: string[];
    call_times: string[];
}

/**
 * 어르신 등록 응답 데이터
 */
export interface ElderResponse {
    id: number;
    user_id: number;
    name: string;
    phone: string;
    relationship: string;
    residence_type: string;
    health_condition: string;
    begin_date: string;
    end_date: string | null;
    ask_meal: boolean;
    ask_medication: boolean;
    ask_emotion: boolean;
    ask_special_event: boolean;
    additional_info: string;
    call_weekdays: string[];
    call_times: string[];
    invite_code: string;
    created_at: string;
    updated_at: string;
}

/**
 * 어르신 API 함수들
 */
export const elderApi = {
    /**
     * 어르신 등록
     */
    async createElder(userId: number, data: ElderCreate): Promise<ElderResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/elders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || '어르신 등록 실패');
            }

            return await response.json();
        } catch (error) {
            console.error('어르신 등록 실패:', error);
            throw error;
        }
    },
};
