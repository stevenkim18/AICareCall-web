'use client';

import React, { useState } from 'react';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { Step1GuardianInfo } from '@/components/onboarding/Step1GuardianInfo';
import { Step2ElderInfo } from '@/components/onboarding/Step2ElderInfo';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleStep1Complete = (data: any) => {
    console.log('Step 1 데이터:', data);
    setFormData({ ...formData, guardian: data });
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: any) => {
    console.log('Step 2 데이터:', data);
    setFormData({ ...formData, elder: data });
    // TODO: 3단계로 이동
    // setCurrentStep(3);
    alert('2단계 완료! (다음 단계는 아직 구현되지 않았습니다)');
  };

  const handleStep2Prev = () => {
    setCurrentStep(1);
  };

  return (
    <OnboardingLayout>
      <ProgressIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <Step1GuardianInfo onNext={handleStep1Complete} />
      )}

      {currentStep === 2 && (
        <Step2ElderInfo onNext={handleStep2Complete} onPrev={handleStep2Prev} />
      )}

      {/* TODO: 나머지 단계들 추가 */}
      {/* {currentStep === 3 && <Step3CallSettings onNext={...} onPrev={...} />} */}
      {/* {currentStep === 4 && <Step4CallContent onNext={...} onPrev={...} />} */}
      {/* {currentStep === 5 && <Step5Confirmation onSubmit={...} onPrev={...} />} */}
    </OnboardingLayout>
  );
}
