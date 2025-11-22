"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type { StepProps, ElderInfoData } from "@/types/onboarding";
import { formatPhoneNumber } from "@/lib/onboarding-helpers";

const formSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다").max(20, "이름은 최대 20자까지 입력 가능합니다"),
  gender: z.enum(["male", "female"]).refine((val) => val, { message: "성별을 선택해주세요" }),
  age: z.number().min(1, "올바른 나이를 입력해주세요").max(150, "올바른 나이를 입력해주세요"),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다 (010-0000-0000)"),
  relationship: z.string().min(1, "관계를 선택해주세요"),
  relationshipOther: z.string().optional(),
  livingArrangement: z.string().optional(),
  livingArrangementOther: z.string().optional(),
  healthInfo: z.string().min(1, "건강 정보를 입력해주세요").max(500, "최대 500자까지 입력 가능합니다"),
})
  .refine((data) => data.relationship !== "other" || data.relationshipOther?.trim(), {
    message: "관계를 입력해주세요",
    path: ["relationshipOther"],
  })
  .refine((data) => data.livingArrangement !== "other" || data.livingArrangementOther?.trim(), {
    message: "거주 형태를 입력해주세요",
    path: ["livingArrangementOther"],
  });

export function Step2ElderInfo({ onNext, onPrev, initialData }: StepProps<ElderInfoData>) {
  const form = useForm<ElderInfoData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      gender: initialData?.gender || undefined,
      age: initialData?.age || ("" as any),
      phone: initialData?.phone || "",
      relationship: initialData?.relationship || "",
      relationshipOther: initialData?.relationshipOther || "",
      livingArrangement: initialData?.livingArrangement || "",
      livingArrangementOther: initialData?.livingArrangementOther || "",
      healthInfo: initialData?.healthInfo || "",
    },
  });

  const watchRelationship = form.watch("relationship");
  const watchLivingArrangement = form.watch("livingArrangement");
  const watchHealthInfo = form.watch("healthInfo");
  const isFormValid = form.formState.isValid;

  const onSubmit = (data: ElderInfoData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-2">소중한 분을 알려주세요</h2>
        <p className="text-sm text-slate-600 font-semibold">안부 전화를 받으실 어르신의 정보를 입력해주세요</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    이름 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="예) 김영희" {...field} className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-900">
                      성별 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-2">
                        {[{ value: "male", label: "남성" }, { value: "female", label: "여성" }].map((option) => (
                          <div
                            key={option.value}
                            onClick={() => field.onChange(option.value)}
                            className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${field.value === option.value ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'
                              }`}
                          >
                            <RadioGroupItem value={option.value} className="sr-only" />
                            <span className="font-bold text-sm">{option.label}</span>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-sm font-bold text-slate-900">
                      나이 <span className="text-red-500">*</span>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="inline-flex items-center ml-1.5">
                              <Info className="w-4 h-4 text-violet-500 hover:text-violet-700 cursor-help transition-colors" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-slate-900 text-white border-slate-700">
                            <p className="text-xs font-semibold">만 나이로 입력해주세요</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="만 나이 (예: 78세)"
                        value={field.value === undefined || field.value === null ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "" && value.length > 3) return;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        maxLength={3}
                        className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    연락처 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="010-0000-0000"
                      {...field}
                      onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                      maxLength={13}
                      className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-900">
                      보호자와의 관계 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="son">아들</SelectItem>
                        <SelectItem value="daughter">딸</SelectItem>
                        <SelectItem value="son-in-law">사위</SelectItem>
                        <SelectItem value="daughter-in-law">며느리</SelectItem>
                        <SelectItem value="grandson">손자</SelectItem>
                        <SelectItem value="granddaughter">손녀</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="livingArrangement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-900">
                      거주형태 <span className="text-slate-500 text-xs font-semibold">(선택)</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="alone">독거</SelectItem>
                        <SelectItem value="with-spouse">배우자 동거</SelectItem>
                        <SelectItem value="with-children">자녀 동거</SelectItem>
                        <SelectItem value="nursing-home">요양시설</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {watchRelationship === "other" && (
              <FormField
                control={form.control}
                name="relationshipOther"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <FormLabel className="text-sm font-bold text-slate-900">관계 입력</FormLabel>
                    <FormControl>
                      <Input placeholder="예) 조카" {...field} className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            {watchLivingArrangement === "other" && (
              <FormField
                control={form.control}
                name="livingArrangementOther"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <FormLabel className="text-sm font-bold text-slate-900">거주형태 입력</FormLabel>
                    <FormControl>
                      <Input placeholder="예) 친척과 동거" {...field} className="h-12 text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="healthInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-slate-900">
                    주요 질환 <span className="text-red-500">*</span>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex items-center ml-1.5">
                            <Info className="w-4 h-4 text-violet-500 hover:text-violet-700 cursor-help transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-900 text-white border-slate-700 max-w-xs">
                          <p className="text-xs font-semibold">현재 복용 중인 약이나<br />주요 질환을 입력해주세요</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="예) 고혈압, 당뇨로 매일 아침 약 복용 중"
                      className="resize-none min-h-[80px] text-sm border-2 border-slate-300 focus:border-emerald-500 rounded-xl"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormMessage className="text-xs" />
                    <span className="text-xs text-slate-500 font-bold">{watchHealthInfo?.length || 0}/500</span>
                  </div>
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
                className="flex-1 h-12 text-sm font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
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
