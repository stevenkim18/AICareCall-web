'use client';

import React, { useState } from 'react';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { Step1GuardianInfo } from '@/components/onboarding/Step1GuardianInfo';
import { Step2ElderInfo } from '@/components/onboarding/Step2ElderInfo';
import { Step3CallSettings } from '@/components/onboarding/Step3CallSettings';
import { Step4CallContent } from '@/components/onboarding/Step4CallContent';
import { Step5Confirmation } from '@/components/onboarding/Step5Confirmation';
import type {
  OnboardingData,
  GuardianInfoData,
  ElderInfoData,
  CallSettingsData,
  CallContentData,
  ConfirmationData,
} from '@/types/onboarding';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({});

  const handleStep1Complete = (data: GuardianInfoData) => {
    console.log('Step 1 데이터:', data);
    setFormData({ ...formData, guardian: data });
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: ElderInfoData) => {
    console.log('Step 2 데이터:', data);
    setFormData({ ...formData, elder: data });
    setCurrentStep(3);
  };

  const handleStep2Prev = () => {
    setCurrentStep(1);
  };

  const handleStep3Complete = (data: CallSettingsData) => {
    console.log('Step 3 데이터:', data);
    setFormData({ ...formData, callSettings: data });
    setCurrentStep(4);
  };

  const handleStep3Prev = () => {
    setCurrentStep(2);
  };

  const handleStep4Complete = (data: CallContentData) => {
    console.log('Step 4 데이터:', data);
    setFormData({ ...formData, callContent: data });
    setCurrentStep(5);
  };

  const handleStep4Prev = () => {
    setCurrentStep(3);
  };

  const handleStep5Submit = (data: ConfirmationData) => {
    console.log('Step 5 제출:', data);
    console.log('전체 폼 데이터:', { ...formData, consent: data });
    // TODO: API 제출 로직 추가
  };

  const handleStep5Prev = () => {
    setCurrentStep(4);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      <ProgressIndicator
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {currentStep === 1 && (
        <Step1GuardianInfo onNext={handleStep1Complete} />
      )}

      {currentStep === 2 && (
        <Step2ElderInfo
          onNext={handleStep2Complete}
          onPrev={handleStep2Prev}
          initialData={formData.elder}
        />
      )}

      {currentStep === 3 && (
        <Step3CallSettings
          onNext={handleStep3Complete}
          onPrev={handleStep3Prev}
          initialData={formData.callSettings}
        />
      )}

      {currentStep === 4 && (
        <Step4CallContent
          onNext={handleStep4Complete}
          onPrev={handleStep4Prev}
          initialData={formData.callContent}
        />
      )}

      {currentStep === 5 && (
        <Step5Confirmation
          onSubmit={handleStep5Submit}
          onPrev={handleStep5Prev}
          onEdit={handleEdit}
          allFormData={formData}
        />
      )}
    </OnboardingLayout>
  );
}
