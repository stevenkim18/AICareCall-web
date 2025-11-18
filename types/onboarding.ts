// Step 1: Guardian Info
export interface GuardianInfoData {
  name: string;
  email: string;
  verificationCode?: string;
}

// Step 2: Elder Info
export type Gender = 'male' | 'female';

export type Relationship =
  | 'son'
  | 'daughter'
  | 'son-in-law'
  | 'daughter-in-law'
  | 'grandson'
  | 'granddaughter'
  | 'other';

export type LivingArrangement =
  | 'alone'
  | 'with-spouse'
  | 'with-children'
  | 'nursing-home'
  | 'other';

export interface ElderInfoData {
  name: string;
  gender: Gender;
  age: number;
  phone: string;
  relationship: Relationship;
  relationshipOther?: string;
  livingArrangement?: LivingArrangement;
  livingArrangementOther?: string;
  healthInfo: string;
}

// Step 3: Call Settings
export type CallFrequency = '1' | '2' | '3';

export interface CallSettingsData {
  callFrequency: CallFrequency;
  callTimes: string[];
  startDate: Date;
  hasEndDate: boolean;
  endDate?: Date;
  repeatDays: string[];
}

// Step 4: Call Content
export type DetailLevel = 'simple' | 'normal' | 'detailed';
export type MoodDetailLevel = 'simple' | 'detailed';
export type CallLength = 'short' | 'normal' | 'long';

export interface CallContentData {
  // 식사
  mealDepth: DetailLevel;
  askAppetite: boolean;
  askCompany: boolean;

  // 복약/건강
  askMedication: boolean;
  medMorning: boolean;
  medLunch: boolean;
  medEvening: boolean;
  askPain: boolean;
  askSleep: boolean;
  askDiscomfort: boolean;

  // 기분/컨디션
  moodDepth: MoodDetailLevel;
  askLoneliness: boolean;
  askWorries: boolean;
  askContacts: boolean;

  // 특별한 일/하루 요약
  activityDepth: DetailLevel;
  askOutdoor: boolean;
  askExercise: boolean;
  askHobbies: boolean;

  // 통화 길이
  callLength: CallLength;

  // 추가 질문
  additionalQuestions?: string;
}

// Step 5: Confirmation
export interface ConfirmationData {
  elderConsent: boolean;
  privacyConsent: boolean;
}

// Complete Onboarding Data
export interface OnboardingData {
  guardian?: GuardianInfoData;
  elder?: ElderInfoData;
  callSettings?: CallSettingsData;
  callContent?: CallContentData;
  consent?: ConfirmationData;
}

// Step Component Props
export interface StepProps<T> {
  onNext: (data: T) => void;
  onPrev: () => void;
  initialData?: Partial<T>;
}

export interface FirstStepProps {
  onNext: (data: GuardianInfoData) => void;
}

export interface LastStepProps {
  onSubmit: (data: ConfirmationData) => void;
  onPrev: () => void;
  onEdit: (step: number) => void;
  allFormData: OnboardingData;
}
