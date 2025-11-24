'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { StepProps, CallContentData } from '@/types/onboarding';

const formSchema = z.object({
  askMeal: z.boolean().default(false),
  askMedication: z.boolean().default(false),
  askMood: z.boolean().default(false),
  askActivity: z.boolean().default(false),
  additionalQuestions: z.string().max(500, '최대 500자까지 입력 가능합니다').optional(),
});

export function Step4CallContent({ onNext, onPrev, initialData }: StepProps<CallContentData>) {
  const form = useForm<any>({
    resolver: zodResolver(formSchema) as any,
    mode: "onChange",
    defaultValues: {
      askMeal: (initialData as any)?.askMeal ?? false,
      askMedication: (initialData as any)?.askMedication ?? false,
      askMood: (initialData as any)?.askMood ?? false,
      askActivity: (initialData as any)?.askActivity ?? false,
      additionalQuestions: initialData?.additionalQuestions || '',
    },
  });

  const additionalQuestionsValue = form.watch('additionalQuestions') || '';

  const onSubmit = (data: any) => {
    onNext(data);
  };

  const categories = [
    {
      id: 'askMeal',
      label: '식사 여부',
      description: '오늘 식사는 하셨어요?',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18M9 21V9m6 12V9" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'askMedication',
      label: '복약 여부',
      description: '오늘 약은 드셨어요?',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'askMood',
      label: '기분/컨디션',
      description: '오늘 기분은 어떠세요?',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'askActivity',
      label: '특별한 일',
      description: '오늘 특별한 일이 있으셨어요?',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 타이틀 */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-2">어떤 이야기를 나눌까요?</h2>
        <p className="text-sm text-slate-600 font-semibold">소리가 매일 물어볼 내용을 선택해주세요</p>
      </div>

      {/* 폼 박스 */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-4">
                기본 질문 선택 <span className="text-xs font-normal text-slate-500 ml-2">(클릭하여 선택해주세요)</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name={category.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${field.value
                              ? `bg-gradient-to-br ${category.gradient} border-transparent shadow-md`
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${field.value ? 'bg-white/20 text-white' : `bg-gradient-to-br ${category.gradient} text-white`
                                }`}>
                                {category.icon}
                              </div>
                              <div className="flex-1 text-left">
                                <h4 className={`text-sm font-black mb-0.5 ${field.value ? 'text-white' : 'text-slate-900'}`}>
                                  {category.label}
                                </h4>
                                <p className={`text-xs font-semibold ${field.value ? 'text-white/90' : 'text-slate-600'}`}>
                                  {category.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-900">
                  💡 선택한 항목에 대해서만 소리가 질문합니다
                </p>
              </div>
            </div>

            <div className="pt-2">
              <FormField
                control={form.control}
                name="additionalQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-black text-slate-900">
                      더 물어볼 내용 <span className="text-slate-500 font-semibold text-sm">(선택)</span>
                    </FormLabel>
                    <p className="text-xs text-slate-600 font-medium mb-3">
                      어르신과 나누고 싶은 특별한 대화가 있다면 적어주세요
                    </p>
                    <FormControl>
                      <Textarea
                        placeholder="예시:&#10;• 손주들 보고 싶진 않으세요?&#10;• 오늘 교회 가셨어요?"
                        className="resize-none min-h-[100px] border-2 border-slate-300 focus:border-violet-500 rounded-xl text-sm p-3"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center mt-2">
                      <FormMessage className="text-xs" />
                      <p className="text-xs text-slate-500 font-bold">
                        {additionalQuestionsValue.length}/500
                      </p>
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
                className="flex-1 h-12 text-sm font-black bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                다음
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
