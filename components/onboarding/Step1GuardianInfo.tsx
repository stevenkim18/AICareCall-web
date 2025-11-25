"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FirstStepProps, GuardianInfoData } from "@/types/onboarding";
import { formatTimer } from "@/lib/onboarding-helpers";
import { authApi } from "@/lib/api/auth";
import { useUserStore } from "@/store/userStore";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다")
    .max(20, "이름은 최대 20자까지 입력 가능합니다")
    .regex(/^[가-힣a-zA-Z]+$/, "이름은 한글 또는 영문만 입력 가능합니다"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  verificationCode: z.string().optional(),
});

export function Step1GuardianInfo({ onNext }: FirstStepProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Zustand 전역 상태 사용
  const { setUser, userId } = useUserStore();

  const form = useForm<GuardianInfoData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      verificationCode: "",
    },
  });

  const emailValue = form.watch("email");

  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isVerified]);

  useEffect(() => {
    setShowEmailError(false);
    const debounceTimer = setTimeout(() => {
      if (!emailValue || emailValue.trim() === "") {
        setIsEmailValid(false);
        return;
      }
      const emailValidation = z.string().email().safeParse(emailValue);
      setIsEmailValid(emailValidation.success);
      setShowEmailError(!emailValidation.success);
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [emailValue]);

  const handleSendVerification = async () => {
    const email = form.getValues("email");
    const emailValidation = z.string().email().safeParse(email);
    if (!emailValidation.success) {
      form.setError("email", { message: "올바른 이메일 형식이 아닙니다" });
      return;
    }

    try {
      setIsLoading(true);
      // ✅ 실제 백엔드 API 호출!
      const data = await authApi.requestCode(email);

      if (data.success) {
        setEmailSent(true);
        setTimer(10 * 60);
        setVerificationAttempted(false);
      } else {
        form.setError("email", { message: data.message });
      }
    } catch (error: any) {
      form.setError("email", { message: error.message || "이메일 발송에 실패했습니다. 다시 시도해주세요." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const code = form.getValues("verificationCode");
    const email = form.getValues("email");

    if (!code || code.length !== 6) {
      form.setError("verificationCode", { message: "6자리 인증번호를 입력해주세요" });
      return;
    }

    try {
      setIsLoading(true);
      // ✅ 실제 백엔드 API 호출!
      const data = await authApi.verifyCode(email, code);

      if (data.success && data.user) {
        setIsVerified(true);
        // ✅ Zustand 전역 상태에 저장
        setUser(data.user.id, email);
        setTimer(0);
      } else {
        setVerificationAttempted(true);
        form.setError("verificationCode", {
          message: data.message || "인증번호가 일치하지 않습니다"
        });
      }
    } catch (error) {
      setVerificationAttempted(true);
      form.setError("verificationCode", { message: "인증에 실패했습니다. 다시 시도해주세요." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: GuardianInfoData) => {
    if (!isVerified || !userId) return;
    // userId를 함께 전달
    onNext({ ...data, userId });
  };

  const canProceed = form.formState.isValid && isVerified;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-2">반가워요!</h2>
        <p className="text-sm text-slate-600 font-semibold">먼저 보호자님의 정보를 알려주세요</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    이름 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예) 김민수"
                      {...field}
                      disabled={isVerified}
                      className={`h-12 text-sm border-2 focus:border-violet-500 rounded-xl font-medium ${form.formState.errors.name ? 'border-red-500' : 'border-slate-300'}`}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-semibold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    이메일 <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          disabled={isVerified}
                          className="h-12 pl-10 text-sm border-2 border-slate-300 focus:border-violet-500 rounded-xl font-medium"
                        />
                        {isEmailValid && !emailSent && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </FormControl>
                    <Button
                      type="button"
                      onClick={handleSendVerification}
                      disabled={!isEmailValid || emailSent || isVerified}
                      className="h-12 px-5 font-bold text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl disabled:opacity-50"
                    >
                      {emailSent ? "발송완료" : "인증받기"}
                    </Button>
                  </div>
                  <FormMessage className="text-xs font-semibold" />
                </FormItem>
              )}
            />

            {emailSent && !isVerified && (
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <FormLabel className="text-sm font-bold text-slate-900">
                      인증번호 <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="6자리 숫자"
                          maxLength={6}
                          {...field}
                          className="flex-1 h-12 text-sm border-2 border-slate-300 focus:border-violet-500 rounded-xl font-medium"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={handleVerifyCode}
                        className="h-12 px-5 font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl"
                      >
                        확인
                      </Button>
                    </div>
                    {timer > 0 && (
                      <p className="text-xs font-semibold text-amber-600">
                        {formatTimer(timer)} 후 만료
                      </p>
                    )}
                    <FormMessage className="text-xs font-semibold" />
                  </FormItem>
                )}
              />
            )}

            {isVerified && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-black text-emerald-900">이메일 인증 완료!</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={!canProceed}
              className="w-full h-12 text-sm font-black bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              다음
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
