"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";

const formSchema = z.object({
  elderConsent: z.boolean().refine((val) => val === true, {
    message: "어르신 동의를 확인해주세요",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용에 동의해주세요",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Step5ConfirmationProps {
  onSubmit: (data: FormData) => void;
  onPrev: () => void;
  onEdit: (step: number) => void;
  allFormData: any;
}

// Helper functions for formatting
const getGenderLabel = (gender: string) => {
  return gender === "male" ? "남" : "여";
};

const getRelationshipLabel = (rel: string) => {
  const map: Record<string, string> = {
    son: "아들",
    daughter: "딸",
    "son-in-law": "사위",
    "daughter-in-law": "며느리",
    grandson: "손자",
    granddaughter: "손녀",
    other: "기타",
  };
  return map[rel] || rel;
};

const getLivingArrangementLabel = (living: string) => {
  const map: Record<string, string> = {
    alone: "독거",
    "with-spouse": "배우자와 동거",
    "with-children": "자녀와 동거",
    "nursing-home": "요양시설",
    other: "기타",
  };
  return map[living] || living;
};

const getCallFrequencyLabel = (freq: number) => {
  return `하루 ${freq}회`;
};

const getCallTimesLabel = (times: string[]) => {
  return times.map(t => {
    const hour = parseInt(t.split(":")[0]);
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return "낮 12시";
    return `오후 ${hour - 12}시`;
  }).join(", ");
};

const getRepeatDaysLabel = (days: string[]) => {
  if (days.length === 7) return "매일";
  if (days.length === 5 && !days.includes('0') && !days.includes('6')) return "평일";

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  // 숫자로 변환하여 정렬 (월, 화, 수 순서로)
  const sorted = [...days].sort((a, b) => parseInt(a) - parseInt(b));
  return sorted.map(d => dayNames[parseInt(d)]).join(", ");
};

const getCallLengthLabel = (length: string) => {
  const map: Record<string, string> = {
    short: "짧게 (2-3분)",
    normal: "보통 (5분)",
    long: "길게 (7-10분)",
  };
  return map[length] || length;
};

const getDepthLabel = (depth: string) => {
  const map: Record<string, string> = {
    simple: "간단히",
    normal: "보통",
    detailed: "자세히",
  };
  return map[depth] || depth;
};

export default function Step5Confirmation({ onSubmit, onPrev, onEdit, allFormData }: Step5ConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      elderConsent: false,
      privacyConsent: false,
    },
  });

  // 폼이 유효한지 확인 (모든 체크박스 선택)
  const isFormValid = form.formState.isValid;

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock invite code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);

    setIsSubmitting(false);
    setShowSuccessDialog(true);
    onSubmit(data);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const { guardian, elder, callSettings, callContent } = allFormData;

  // Build call content summary
  const getCallContentSummary = () => {
    if (!callContent) return "설정 없음";

    const parts: string[] = [];

    if (callContent.mealDepth) {
      const extras = [];
      if (callContent.askAppetite) extras.push("입맛");
      if (callContent.askCompany) extras.push("동반식사");
      parts.push(`식사(${getDepthLabel(callContent.mealDepth)}${extras.length > 0 ? ", " + extras.join(", ") : ""})`);
    }

    if (callContent.askMedication || callContent.askPain || callContent.askSleep || callContent.askDiscomfort) {
      const healthItems = [];
      if (callContent.askMedication) {
        const medTimes = [];
        if (callContent.medMorning) medTimes.push("아침");
        if (callContent.medLunch) medTimes.push("점심");
        if (callContent.medEvening) medTimes.push("저녁");
        healthItems.push(`복약${medTimes.length > 0 ? "(" + medTimes.join(",") + ")" : ""}`);
      }
      if (callContent.askPain) healthItems.push("통증");
      if (callContent.askSleep) healthItems.push("수면");
      if (callContent.askDiscomfort) healthItems.push("불편감");
      parts.push(healthItems.join(", "));
    }

    if (callContent.moodDepth) {
      const extras = [];
      if (callContent.askLoneliness) extras.push("외로움");
      if (callContent.askWorries) extras.push("걱정");
      if (callContent.askContacts) extras.push("연락");
      parts.push(`기분(${getDepthLabel(callContent.moodDepth)}${extras.length > 0 ? ", " + extras.join(", ") : ""})`);
    }

    if (callContent.activityDepth) {
      const extras = [];
      if (callContent.askOutdoor) extras.push("외출");
      if (callContent.askExercise) extras.push("운동");
      if (callContent.askHobbies) extras.push("취미");
      parts.push(`활동(${getDepthLabel(callContent.activityDepth)}${extras.length > 0 ? ", " + extras.join(", ") : ""})`);
    }

    return parts.join(", ");
  };

  return (
    <>
      <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
        <CardHeader>
          <CardTitle className="text-2xl">5. 최종 확인</CardTitle>
          <CardDescription>
            입력하신 정보를 확인하고 서비스를 시작해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 보호자 정보 카드 */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">보호자 정보</h3>
                <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
                  수정
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p>• 이름: {guardian?.name || "-"}</p>
                <p>• 이메일: {guardian?.email || "-"}</p>
              </div>
            </div>

            {/* 어르신 정보 카드 */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">어르신 정보</h3>
                <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
                  수정
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p>• 이름: {elder?.name || "-"} ({elder?.gender ? getGenderLabel(elder.gender) : "-"}, {elder?.age || "-"}세)</p>
                <p>• 관계: {elder?.relationship ? getRelationshipLabel(elder.relationship) : "-"}</p>
                <p>• 연락처: {elder?.phone || "-"}</p>
                {elder?.livingArrangement && (
                  <p>• 거주: {getLivingArrangementLabel(elder.livingArrangement)}</p>
                )}
                {elder?.healthInfo && (
                  <p>• 건강: {elder.healthInfo}</p>
                )}
              </div>
            </div>

            {/* 통화 설정 카드 */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">통화 설정</h3>
                <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
                  수정
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p>• {callSettings?.callFrequency ? getCallFrequencyLabel(callSettings.callFrequency) : "-"} ({callSettings?.callTimes ? getCallTimesLabel(callSettings.callTimes) : "-"})</p>
                <p>• {callSettings?.startDate ? format(new Date(callSettings.startDate), "yyyy-MM-dd", { locale: ko }) : "-"} 시작 ~ {callSettings?.hasEndDate && callSettings?.endDate ? format(new Date(callSettings.endDate), "yyyy-MM-dd", { locale: ko }) : "종료일 없음"}</p>
                <p>• 요일: {callSettings?.repeatDays ? getRepeatDaysLabel(callSettings.repeatDays) : "-"}</p>
              </div>
            </div>

            {/* 통화 내용 카드 */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">통화 내용</h3>
                <Button variant="outline" size="sm" onClick={() => onEdit(4)}>
                  수정
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p>• 질문: {getCallContentSummary()}</p>
                <p>• 대화 길이: {callContent?.callLength ? getCallLengthLabel(callContent.callLength) : "-"}</p>
                {callContent?.additionalQuestions && (
                  <p>• 추가 질문: {callContent.additionalQuestions.substring(0, 50)}{callContent.additionalQuestions.length > 50 ? "..." : ""}</p>
                )}
              </div>
            </div>

            {/* 동의 체크박스 */}
            <div className="pt-6 space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="elderConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-semibold cursor-pointer">
                            <span className="text-destructive">* </span>
                            서비스 신청에 대해 어르신 본인의 동의를 얻었음을 확인합니다
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-semibold cursor-pointer">
                            <span className="text-destructive">* </span>
                            서비스 제공을 위한 개인정보 수집 및 이용에 동의합니다
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* 버튼 */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button type="button" variant="outline" onClick={onPrev}>
                      이전
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !isFormValid} className="min-w-[120px]">
                      {isSubmitting ? "처리 중..." : "시작하기"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">🎉</DialogTitle>
            <DialogTitle className="text-center">신청이 완료되었습니다!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              어르신께 아래 초대 코드를 전달해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Invite Code Card */}
            <div className="p-6 border-2 rounded-lg bg-primary/5 border-primary/20 text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">초대 코드</p>
              <p className="text-3xl font-bold tracking-wider">{inviteCode}</p>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    복사됨!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    코드 복사
                  </>
                )}
              </Button>
            </div>

            {/* Instructions */}
            <div className="space-y-3 text-sm">
              <p className="font-semibold">📱 어르신 앱 설치 안내</p>
              <ol className="space-y-2 pl-5 list-decimal text-muted-foreground">
                <li>앱스토어에서 'ai케어콜' 검색</li>
                <li>앱 설치 후 초대 코드 입력</li>
                <li>설정한 시간에 첫 통화 시작!</li>
              </ol>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => window.location.href = "/dashboard"}
              className="w-full"
            >
              대시보드로 이동
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
