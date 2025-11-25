import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * 사용자 상태 관리 스토어
 * - userId: 백엔드 인증 후 받은 사용자 ID
 * - email: 사용자 이메일
 * - localStorage에 자동 저장되어 새로고침해도 유지됨
 */

interface UserState {
    userId: number | null;
    email: string | null;

    // Actions
    setUser: (id: number, email: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            // Initial state
            userId: null,
            email: null,

            // Actions
            setUser: (id, email) => set({ userId: id, email }),
            clearUser: () => set({ userId: null, email: null }),
        }),
        {
            name: 'sori-user-storage', // localStorage key 이름
            storage: createJSONStorage(() => localStorage),
        }
    )
);
