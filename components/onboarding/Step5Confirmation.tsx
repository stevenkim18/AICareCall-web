'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy, Check, PartyPopper } from 'lucide-react';
import type { LastStepProps, ConfirmationData } from '@/types/onboarding';
import {
    getGenderLabel,
    getRelationshipLabel,
    getLivingArrangementLabel,
    getCallFrequencyLabel,
    getCallTimesLabel,
    getRepeatDaysLabel,
} from '@/lib/onboarding-helpers';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { useUserStore } from '@/store/userStore';
import { elderApi } from '@/lib/api/elder';
import { convertToElderCreate } from '@/lib/api/convert';

const formSchema = z.object({
    elderConsent: z.boolean().refine((val) => val === true, { message: '어르신 동의를 확인해주세요' }),
    privacyConsent: z.boolean().refine((val) => val === true, { message: '개인정보 수집 및 이용에 동의해주세요' }),
});

export function Step5Confirmation({ onSubmit, onPrev, onEdit, allFormData }: LastStepProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const [copied, setCopied] = useState(false);

    const form = useForm<ConfirmationData>({
        resolver: zodResolver(formSchema) as any,
        mode: 'onChange',
        defaultValues: {
            elderConsent: false,
            privacyConsent: false,
        },
    });

    const isFormValid = form.formState.isValid;
    const { guardian, elder, callSettings, callContent } = allFormData;
    const { userId } = useUserStore();

    const handleSubmit = async (data: ConfirmationData) => {
        // userId 확인
        if (!userId) {
            alert('인증 정보가 없습니다. 처음부터 다시 시작해주세요.');
            return;
        }

        // 필수 데이터 확인
        if (!elder || !callSettings || !callContent) {
            alert('온보딩 정보가 완전하지 않습니다.');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. 프론트엔드 데이터를 백엔드 형식으로 변환
            const elderData = convertToElderCreate(elder, callSettings, callContent);

            // 2. 실제 백엔드 API 호출
            const result = await elderApi.createElder(userId, elderData);

            // 3. 초대 코드 표시
            setInviteCode(result.invite_code);
            setIsSubmitting(false);
            setShowSuccessDialog(true);
            onSubmit(data);
        } catch (error) {
            console.error('어르신 등록 실패:', error);
            alert('등록에 실패했습니다. 다시 시도해주세요.');
            setIsSubmitting(false);
        }
    };

    const handleDashboardRedirect = async () => {
        setIsSubmitting(true);
        // 2초 대기 후 이동
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = '/dashboard';
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const InfoSection = ({ title, onEditClick, children }: any) => (
        <div className="p-4 border-2 border-slate-200 rounded-xl bg-slate-50/50">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-black text-slate-900">{title}</h3>
                <Button variant="outline" size="sm" onClick={onEditClick} className="h-8 text-xs font-bold rounded-lg">
                    수정
                </Button>
            </div>
            <div className="space-y-1 text-xs text-slate-700">{children}</div>
        </div>
    );

    if (isSubmitting && inviteCode) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-violet-200/30 rounded-full blur-xl animate-pulse"></div>
                    <SoriCharacter size={120} animated />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 animate-bounce">소리가 대시보드를 준비하고 있어요!</h2>
                <p className="text-slate-600 font-medium">잠시만 기다려주세요...</p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full max-w-2xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">거의 다 왔어요!</h2>
                    <p className="text-sm text-slate-600 font-semibold">입력하신 정보를 확인하고 시작해주세요</p>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
                    <div className="space-y-3 mb-6">
                        <InfoSection title="보호자 정보" onEditClick={() => onEdit(1)}>
                            <p>• 이름: {guardian?.name || '-'}</p>
                            <p>• 이메일: {guardian?.email || '-'}</p>
                        </InfoSection>

                        <InfoSection title="어르신 정보" onEditClick={() => onEdit(2)}>
                            <p>• 이름: {elder?.name || '-'} ({elder?.gender ? getGenderLabel(elder.gender) : '-'}, {elder?.age || '-'}세)</p>
                            <p>• 관계: {elder?.relationship ? getRelationshipLabel(elder.relationship) : '-'}</p>
                            <p>• 연락처: {elder?.phone || '-'}</p>
                            {elder?.livingArrangement && <p>• 거주: {getLivingArrangementLabel(elder.livingArrangement)}</p>}
                            {elder?.healthInfo && <p>• 건강: {elder.healthInfo.substring(0, 30)}{elder.healthInfo.length > 30 ? '...' : ''}</p>}
                        </InfoSection>

                        <InfoSection title="통화 설정" onEditClick={() => onEdit(3)}>
                            <p>• {callSettings?.callFrequency ? getCallFrequencyLabel(callSettings.callFrequency) : '-'} ({callSettings?.callTimes ? getCallTimesLabel(callSettings.callTimes) : '-'})</p>
                            <p>• {callSettings?.startDate ? format(new Date(callSettings.startDate), 'yyyy-MM-dd', { locale: ko }) : '-'} 시작 ~ {callSettings?.hasEndDate && callSettings?.endDate ? format(new Date(callSettings.endDate), 'yyyy-MM-dd', { locale: ko }) : '종료일 없음'}</p>
                            <p>• 요일: {callSettings?.repeatDays ? getRepeatDaysLabel(callSettings.repeatDays) : '-'}</p>
                        </InfoSection>

                        <InfoSection title="통화 내용" onEditClick={() => onEdit(4)}>
                            <p>• 물어볼 내용: {[
                                (callContent as any)?.askMeal && '식사',
                                (callContent as any)?.askMedication && '복약',
                                (callContent as any)?.askMood && '기분',
                                (callContent as any)?.askActivity && '특별한 일',
                            ].filter(Boolean).join(', ') || '-'}</p>
                            {callContent?.additionalQuestions && (
                                <p>• 추가 질문: {callContent.additionalQuestions.substring(0, 40)}{callContent.additionalQuestions.length > 40 ? '...' : ''}</p>
                            )}
                        </InfoSection>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <FormField
                                    control={form.control}
                                    name="elderConsent"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-bold text-slate-900 cursor-pointer">
                                                    어르신께 Sori 서비스 이용 동의를 받았습니다
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="privacyConsent"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-bold text-slate-900 cursor-pointer">
                                                    개인정보 수집 및 이용에 동의합니다
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    onClick={onPrev}
                                    variant="outline"
                                    className="flex-1 h-12 text-sm font-black border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl"
                                >
                                    이전
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className="flex-1 h-12 text-sm font-black bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? '처리중...' : '완료'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-2 border-white/40 shadow-2xl">
                    <DialogHeader>
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <PartyPopper className="w-8 h-8 text-violet-600" />
                        </div>
                        <DialogTitle className="text-center text-2xl font-black text-slate-900">
                            환영합니다!
                        </DialogTitle>
                        <DialogDescription className="text-center text-slate-600 font-medium">
                            Sori 서비스 설정이 완료되었습니다.<br />
                            이제 어르신과 따뜻한 대화를 시작해보세요.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="p-6 border-2 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 text-center space-y-4">
                            <p className="text-sm font-bold text-slate-600">초대 코드</p>
                            <p className="text-4xl font-black tracking-widest text-violet-600">{inviteCode}</p>
                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                className="w-full h-12 font-black border-2 border-violet-300 hover:bg-violet-50 rounded-xl"
                                disabled={copied}
                            >
                                {copied ? (
                                    <>
                                        <Check className="mr-2 h-5 w-5" />
                                        복사됨!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-5 w-5" />
                                        코드 복사
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="font-black text-sm text-slate-900">어르신 앱 설치 안내</p>
                            <ol className="space-y-2 pl-5 list-decimal text-sm text-slate-700 font-semibold">
                                <li>앱스토어에서 '케어콜' 검색</li>
                                <li>앱 설치 후 초대 코드 입력</li>
                                <li>설정한 시간에 첫 통화 시작!</li>
                            </ol>
                        </div>

                        <Button
                            onClick={handleDashboardRedirect}
                            className="w-full h-12 font-black bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                        >
                            대시보드로 이동
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
