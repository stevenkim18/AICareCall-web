/**
 * 인증 관련 API 함수
 * 백엔드 서버와 통신하는 함수들
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 인증 코드 요청 응답 타입
export interface CodeResponse {
    success: boolean;
    message: string;
}

// 사용자 정보 타입
export interface UserInfo {
    id: number;
    email: string;
    created_at: string;
}

// 인증 코드 검증 응답 타입
export interface VerifyResponse {
    success: boolean;
    message: string;
    user?: UserInfo;
}

/**
 * 인증 API 함수들
 */
export const authApi = {
    /**
     * 이메일로 인증 코드 요청
     * 백엔드가 Gmail로 6자리 코드를 발송합니다
     */
    async requestCode(email: string): Promise<CodeResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API 요청 실패');
            }

            return await response.json();
        } catch (error) {
            console.error('인증 코드 요청 실패:', error);
            throw error;
        }
    },

    /**
     * 인증 코드 검증
     * 백엔드에서 코드가 맞는지 확인하고 userId를 반환합니다
     */
    async verifyCode(email: string, code: string): Promise<VerifyResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code }),
            });

            if (!response.ok) {
                throw new Error('API 요청 실패');
            }

            return await response.json();
        } catch (error) {
            console.error('인증 코드 검증 실패:', error);
            throw error;
        }
    },
};
