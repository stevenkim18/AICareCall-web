'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// 폼 스키마 정의
const formSchema = z.object({
  name: z.string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(20, '이름은 최대 20자까지 입력 가능합니다'),
  email: z.string()
    .email('올바른 이메일 형식이 아닙니다'),
  verificationCode: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Step1GuardianInfoProps {
  onNext: (data: FormData) => void;
}

export function Step1GuardianInfo({ onNext }: Step1GuardianInfoProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      verificationCode: '',
    },
  });

  // 타이머 카운트다운
  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isVerified]);

  // 타이머 포맷 (09:45)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 인증번호 받기
  const handleSendVerification = async () => {
    const email = form.getValues('email');
    const emailValidation = z.string().email().safeParse(email);

    if (!emailValidation.success) {
      form.setError('email', { message: '올바른 이메일 형식이 아닙니다' });
      return;
    }

    // TODO: 실제 API 호출
    // 지금은 Mock
    console.log('인증번호 발송:', email);
    setEmailSent(true);
    setTimer(10 * 60); // 10분
    setVerificationAttempted(false);
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    const code = form.getValues('verificationCode');

    if (!code || code.length !== 6) {
      form.setError('verificationCode', { message: '6자리 인증번호를 입력해주세요' });
      return;
    }

    // TODO: 실제 API 호출
    // 지금은 Mock (123456이면 성공)
    console.log('인증번호 확인:', code);
    if (code === '123456') {
      setIsVerified(true);
      setTimer(0);
    } else {
      setVerificationAttempted(true);
      form.setError('verificationCode', { message: '인증번호가 일치하지 않습니다' });
    }
  };

  // 폼 제출
  const onSubmit = (data: FormData) => {
    if (!isVerified) {
      return;
    }
    onNext(data);
  };

  const canProceed = form.formState.isValid && isVerified;

  return (
    <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
      <CardHeader>
        <CardTitle className="text-2xl">1. 보호자 정보</CardTitle>
        <CardDescription>
          지금 서비스를 사용하고자 하는 분의 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 이름 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    이름 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예) 김민수"
                      {...field}
                      disabled={isVerified}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 이메일 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    이메일 <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                        disabled={isVerified}
                        className={cn(isVerified && 'opacity-60')}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant={emailSent ? 'outline' : 'default'}
                      onClick={handleSendVerification}
                      disabled={isVerified}
                      className="whitespace-nowrap"
                    >
                      {emailSent ? '재발송' : '인증번호 받기'}
                    </Button>
                  </div>
                  <FormMessage />
                  {emailSent && !isVerified && (
                    <p className="text-sm text-primary flex items-center gap-1 mt-2">
                      <Mail className="w-4 h-4" />
                      인증번호가 발송되었습니다
                    </p>
                  )}
                  {isVerified && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-2 font-medium">
                      <Check className="w-4 h-4" />
                      이메일 인증 완료
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* 인증번호 (조건부 표시) */}
            {emailSent && !isVerified && (
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <FormLabel>
                      인증번호 <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="6자리 숫자"
                          maxLength={6}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={handleVerifyCode}
                        className="whitespace-nowrap"
                      >
                        {verificationAttempted ? '다시 받기' : '확인'}
                      </Button>
                    </div>
                    <FormMessage />
                    {timer > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        남은 시간 {formatTimer(timer)}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            )}

            {/* 하단 버튼 */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={!canProceed}
                size="lg"
                className="min-w-32"
              >
                다음
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
