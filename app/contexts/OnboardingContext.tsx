'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 타입 정의
export interface GuardianInfo {
  name: string;
  phone: string;
  relation: string;
  gender: string;
}

export interface ElderInfo {
  name: string;
  phone: string;
  gender: string;
}

export interface HealthInfo {
  conditions: string[];
  medications: string[];
  emergencyContact: string;
  emergencyPhone: string;
}

export interface CallSchedule {
  id: string;
  days: string[];
  time: string;
}

export interface ConversationTopics {
  selectedTopics: string[];
  customTopics: string[];
  specialNotes: string;
}

export interface ImportantPerson {
  id: string;
  name: string;
  relation: string;
}

export interface AISettings {
  tone: string;
  notificationsEnabled: boolean;
  conversationTopics: ConversationTopics;
  importantPeople: ImportantPerson[];
}

export interface OnboardingData {
  guardian: GuardianInfo;
  elder: ElderInfo;
  health: HealthInfo;
  callSchedules: CallSchedule[];
  aiSettings: AISettings;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateGuardian: (info: Partial<GuardianInfo>) => void;
  updateElder: (info: Partial<ElderInfo>) => void;
  updateHealth: (info: Partial<HealthInfo>) => void;
  updateCallSchedules: (schedules: CallSchedule[]) => void;
  updateAISettings: (settings: Partial<AISettings>) => void;
  resetData: () => void;
}

const defaultData: OnboardingData = {
  guardian: {
    name: '',
    phone: '',
    relation: '',
    gender: ''
  },
  elder: {
    name: '',
    phone: '',
    gender: ''
  },
  health: {
    conditions: [],
    medications: [],
    emergencyContact: '',
    emergencyPhone: ''
  },
  callSchedules: [],
  aiSettings: {
    tone: 'warm',
    notificationsEnabled: true,
    conversationTopics: {
      selectedTopics: [],
      customTopics: [],
      specialNotes: ''
    },
    importantPeople: []
  }
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateGuardian = (info: Partial<GuardianInfo>) => {
    setData(prev => ({
      ...prev,
      guardian: { ...prev.guardian, ...info }
    }));
  };

  const updateElder = (info: Partial<ElderInfo>) => {
    setData(prev => ({
      ...prev,
      elder: { ...prev.elder, ...info }
    }));
  };

  const updateHealth = (info: Partial<HealthInfo>) => {
    setData(prev => ({
      ...prev,
      health: { ...prev.health, ...info }
    }));
  };

  const updateCallSchedules = (schedules: CallSchedule[]) => {
    setData(prev => ({
      ...prev,
      callSchedules: schedules
    }));
  };

  const updateAISettings = (settings: Partial<AISettings>) => {
    setData(prev => ({
      ...prev,
      aiSettings: { ...prev.aiSettings, ...settings }
    }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateGuardian,
        updateElder,
        updateHealth,
        updateCallSchedules,
        updateAISettings,
        resetData
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
