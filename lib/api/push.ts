/**
 * VoIP 푸시 API 클라이언트
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface VoipPushRequest {
  elder_id: number;
  ai_call_id?: string;
}

export interface PushResponse {
  status_code: number;
  apns_id: string | null;
  body: string;
}

/**
 * 푸시 관련 API
 */
export const pushApi = {
  /**
   * VoIP 푸시 전송
   */
  async sendVoipPush(
    elderId: number,
    aiCallId?: string
  ): Promise<PushResponse> {
    const requestBody: VoipPushRequest = {
      elder_id: elderId,
    };

    if (aiCallId) {
      requestBody.ai_call_id = aiCallId;
    }

    const response = await fetch(`${API_BASE_URL}/push/voip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.detail || `VoIP 푸시 전송 실패: ${response.status}`
      );
    }

    return response.json();
  },
};
