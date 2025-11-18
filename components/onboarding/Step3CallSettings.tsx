'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// 요일 배열
const WEEKDAYS = [
  { label: '월', value: '1' },
  { label: '화', value: '2' },
  { label: '수', value: '3' },
  { label: '목', value: '4' },
  { label: '금', value: '5' },
  { label: '토', value: '6' },
  { label: '일', value: '0' },
];

// 시간 옵션 (00:00 ~ 23:00)
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

// 폼 스키마 정의
const formSchema = z.object({
  callFrequency: z.enum(['1', '2', '3'], {
    required_error: '하루 통화 횟수를 선택해주세요',
  }),
  callTimes: z.array(z.string()).min(1, '통화 시간을 선택해주세요'),
  startDate: z.date({
    required_error: '시작일을 선택해주세요',
  }),
  hasEndDate: z.boolean().default(false),
  endDate: z.date().optional(),
  repeatDays: z.array(z.string()).min(1, '최소 1개의 요일을 선택해주세요'),
}).refine((data) => {
  // callFrequency와 callTimes 개수가 일치해야 함
  return data.callTimes.length === parseInt(data.callFrequency);
}, {
  message: '통화 시간 개수가 일치하지 않습니다',
  path: ['callTimes'],
}).refine((data) => {
  // hasEndDate가 true면 endDate가 필수
  if (data.hasEndDate && !data.endDate) {
    return false;
  }
  return true;
}, {
  message: '종료일을 선택해주세요',
  path: ['endDate'],
}).refine((data) => {
  // endDate가 startDate 이후여야 함
  if (data.hasEndDate && data.endDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: '종료일은 시작일 이후여야 합니다',
  path: ['endDate'],
});

type FormData = z.infer<typeof formSchema>;

interface Step3CallSettingsProps {
  onNext: (data: FormData) => void;
  onPrev: () => void;
}

export function Step3CallSettings({ onNext, onPrev }: Step3CallSettingsProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      callFrequency: '1',
      callTimes: ['09:00'],
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // 내일
      hasEndDate: false,
      endDate: undefined,
      repeatDays: [],
    },
  });

  const watchCallFrequency = form.watch('callFrequency');
  const watchHasEndDate = form.watch('hasEndDate');
  const watchRepeatDays = form.watch('repeatDays');
  const watchCallTimes = form.watch('callTimes');

  // 폼이 유효한지 확인 (모든 필수 항목 입력 + 유효성 검사 통과)
  const isFormValid = form.formState.isValid;

  // 통화 횟수 변경 시 callTimes 배열 조정
  React.useEffect(() => {
    const frequency = parseInt(watchCallFrequency);
    const currentTimes = watchCallTimes || [];

    // 기본 시간 배열
    const defaultTimes = ['09:00', '13:00', '19:00'];

    // 현재 배열 길이와 필요한 길이가 다르면 조정
    if (currentTimes.length !== frequency) {
      const newTimes: string[] = [];
      for (let i = 0; i < frequency; i++) {
        // 기존 값이 있으면 유지, 없으면 기본값 사용
        newTimes.push(currentTimes[i] || defaultTimes[i] || '09:00');
      }
      form.setValue('callTimes', newTimes, { shouldValidate: true });
    }
  }, [watchCallFrequency, watchCallTimes?.length]);

  const onSubmit = (data: FormData) => {
    onNext(data);
  };

  const toggleWeekday = (day: string) => {
    const current = form.getValues('repeatDays');
    if (current.includes(day)) {
      form.setValue('repeatDays', current.filter(d => d !== day), { shouldValidate: true });
    } else {
      form.setValue('repeatDays', [...current, day], { shouldValidate: true });
    }
  };

  return (
    <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
      <CardHeader>
        <CardTitle className="text-2xl">3. 통화 설정</CardTitle>
        <CardDescription>
          AI가 어르신께 전화를 드릴 시간과 일정을 설정해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 하루 통화 횟수 */}
            <FormField
              control={form.control}
              name="callFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    하루 통화 횟수 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      {['1', '2', '3'].map((num) => (
                        <FormItem key={num}>
                          <FormControl>
                            <RadioGroupItem value={num} className="peer sr-only" />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                              'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5'
                            )}
                            onClick={() => field.onChange(num)}
                          >
                            <span className="text-3xl font-bold">{num}회</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 통화 시간대 */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <FormLabel>
                    통화 시간대 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription>
                    정각 단위로 선택 가능합니다
                  </FormDescription>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-md">
                  <Lightbulb className="w-4 h-4" />
                  <span>아침 09:00 / 점심 13:00 / 저녁 19:00 추천</span>
                </div>
              </div>

              {/* 1회일 때: 세로, 2-3회일 때: 가로 */}
              <div className={cn(
                parseInt(watchCallFrequency) === 1 ? 'space-y-4' : 'grid gap-4',
                parseInt(watchCallFrequency) === 2 && 'grid-cols-1 md:grid-cols-2',
                parseInt(watchCallFrequency) === 3 && 'grid-cols-1 md:grid-cols-3'
              )}>
                {Array.from({ length: parseInt(watchCallFrequency) }, (_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`callTimes.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {parseInt(watchCallFrequency) > 1 ? `${index + 1}번째 통화 시간` : '통화 시간'}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="시간 선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {HOUR_OPTIONS.map((hour) => (
                              <SelectItem key={hour.value} value={hour.value}>
                                {hour.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* 시작일 + 종료일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 시작일 */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      시작일 <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ko })
                            ) : (
                              <span>날짜 선택</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          locale={ko}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 종료일 */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      종료일 <span className="text-muted-foreground">(선택)</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            disabled={!watchHasEndDate}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ko })
                            ) : (
                              <span>날짜 선택</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= (form.getValues('startDate') || new Date())
                          }
                          locale={ko}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 종료일 없음 체크박스 */}
            <FormField
              control={form.control}
              name="hasEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={!field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(!checked);
                        if (checked) {
                          form.setValue('endDate', undefined, { shouldValidate: true });
                        }
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      종료일 없음
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* 반복 요일 */}
            <FormField
              control={form.control}
              name="repeatDays"
              render={() => (
                <FormItem>
                  <FormLabel>
                    반복 요일 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription>
                    통화를 진행할 요일을 선택해주세요 (최소 1개)
                  </FormDescription>
                  <FormControl>
                    <div className="flex gap-2">
                      {WEEKDAYS.map((day) => {
                        const isSelected = watchRepeatDays.includes(day.value);
                        return (
                          <Button
                            key={day.value}
                            type="button"
                            variant={isSelected ? 'default' : 'outline'}
                            size="lg"
                            className="flex-1"
                            onClick={() => toggleWeekday(day.value)}
                          >
                            {day.label}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 하단 버튼 */}
            <div className="flex justify-between pt-4 border-t">
              <Button type="button" variant="outline" onClick={onPrev}>
                이전
              </Button>
              <Button type="submit" size="lg" className="min-w-32" disabled={!isFormValid}>
                다음
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
