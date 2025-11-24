'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { StepProps, CallSettingsData } from '@/types/onboarding';

const WEEKDAYS = [
  { label: '월', value: '1' },
  { label: '화', value: '2' },
  { label: '수', value: '3' },
  { label: '목', value: '4' },
  { label: '금', value: '5' },
  { label: '토', value: '6' },
  { label: '일', value: '0' },
];

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const formSchema = z.object({
  callFrequency: z.enum(['1', '2', '3']),
  callTimes: z.array(z.string()).min(1),
  startDate: z.date(),
  hasEndDate: z.boolean().default(false),
  endDate: z.date().optional(),
  repeatDays: z.array(z.string()).min(1),
})
  .refine((data) => data.callTimes.length === parseInt(data.callFrequency), {
    message: '통화 시간 개수가 일치하지 않습니다',
    path: ['callTimes'],
  })
  .refine((data) => !data.hasEndDate || data.endDate, {
    message: '종료일을 선택해주세요',
    path: ['endDate'],
  })
  .refine((data) => !data.hasEndDate || !data.endDate || data.endDate > data.startDate, {
    message: '종료일은 시작일 이후여야 합니다',
    path: ['endDate'],
  });

export function Step3CallSettings({ onNext, onPrev, initialData }: StepProps<CallSettingsData>) {
  const form = useForm<CallSettingsData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      callFrequency: initialData?.callFrequency || '1',
      callTimes: initialData?.callTimes || ['09:00'],
      startDate: initialData?.startDate || new Date(),
      hasEndDate: initialData?.hasEndDate || false,
      endDate: initialData?.endDate,
      repeatDays: initialData?.repeatDays || ['1', '2', '3', '4', '5'],
    },
  });

  const watchFrequency = form.watch('callFrequency');
  const watchCallTimes = form.watch('callTimes');
  const watchHasEndDate = form.watch('hasEndDate');
  const isFormValid = form.formState.isValid;

  const onSubmit = (data: CallSettingsData) => {
    onNext(data);
  };

  const frequencyNum = parseInt(watchFrequency);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-2">통화 일정을 설정해주세요</h2>
        <p className="text-sm text-slate-600 font-semibold">소리가 전화할 시간과 요일을 정해주세요</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="callFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">하루 통화 횟수</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      {['1', '2', '3'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            field.onChange(value);
                            const newTimesCount = parseInt(value);
                            const currentTimes = form.getValues('callTimes') || [];
                            if (currentTimes.length < newTimesCount) {
                              const newTimes = [...currentTimes];
                              while (newTimes.length < newTimesCount) {
                                newTimes.push('09:00');
                              }
                              form.setValue('callTimes', newTimes);
                            } else if (currentTimes.length > newTimesCount) {
                              form.setValue('callTimes', currentTimes.slice(0, newTimesCount));
                            }
                          }}
                          className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${field.value === value ? 'border-blue-600 bg-blue-50 font-black' : 'border-slate-200 hover:border-slate-300 font-bold'
                            }`}
                        >
                          <span className="text-sm">{value}회</span>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="callTimes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">통화 시간</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: frequencyNum }).map((_, index) => (
                      <Select
                        key={index}
                        value={watchCallTimes[index] || ''}
                        onValueChange={(value) => {
                          const newTimes = [...watchCallTimes];
                          newTimes[index] = value;
                          field.onChange(newTimes);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 text-xs border-2 border-slate-300 focus:border-blue-500 rounded-lg">
                            <SelectValue placeholder={`${index + 1}회차`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HOUR_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-900">시작일</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full h-11 text-xs justify-start border-2 border-slate-300 hover:border-blue-500 rounded-lg font-semibold", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {field.value ? format(field.value, 'yyyy-MM-dd', { locale: ko }) : '선택'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} locale={ko} />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-900">
                      종료일 <span className="text-slate-500 text-xs font-semibold">(선택)</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" disabled={!watchHasEndDate} className={cn("w-full h-11 text-xs justify-start border-2 border-slate-300 hover:border-blue-500 rounded-lg font-semibold", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {field.value ? format(field.value, 'yyyy-MM-dd', { locale: ko }) : '선택'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date <= (form.getValues('startDate') || new Date())} locale={ko} />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hasEndDate"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0 p-3 bg-slate-50 rounded-lg">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-xs font-semibold cursor-pointer">종료일 설정</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repeatDays"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    반복 요일
                    <span className="text-slate-500 text-xs font-semibold ml-1">(복수 선택 가능)</span>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex items-center ml-1.5">
                            <Info className="w-4 h-4 text-violet-500 hover:text-violet-700 cursor-help transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-900 text-white border-slate-700">
                          <p className="text-xs font-semibold">최소 1개 이상 선택해주세요</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <div className="flex gap-2">
                    {WEEKDAYS.map((day) => (
                      <FormField
                        key={day.value}
                        control={form.control}
                        name="repeatDays"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <button
                                type="button"
                                onClick={() => {
                                  const newDays = field.value?.includes(day.value)
                                    ? field.value.filter((v: string) => v !== day.value)
                                    : [...(field.value || []), day.value];
                                  field.onChange(newDays);
                                }}
                                className={`w-full flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all ${field.value?.includes(day.value)
                                  ? 'border-blue-600 bg-blue-50 font-black'
                                  : 'border-slate-200 hover:border-slate-300 font-bold'
                                  }`}
                              >
                                <span className="text-sm">{day.label}</span>
                              </button>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

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
                disabled={!isFormValid}
                className="flex-1 h-12 text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
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
