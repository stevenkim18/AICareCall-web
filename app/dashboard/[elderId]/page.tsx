"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LNB } from "@/app/components/LNB";
import { SoriCharacter } from "@/app/components/custom/SoriCharacter";
import { NotificationCenter } from "@/app/components/custom/NotificationCenter";
import { TimelineCallList } from "@/app/components/custom/TimelineCallList";
import { SidebarInset } from "@/components/ui/sidebar";
import { dashboardApi, DashboardResponse } from "@/lib/api/dashboard";
import { pushApi } from "@/lib/api/push";
import {
  getAvgDurationDescription,
  getSuccessDescription,
  getAttemptsDescription,
  getDaysDescription,
  convertCallStatus,
} from "@/lib/dashboard-helpers";

const MOCK_CALLS = [
  {
    id: -1,
    date: "2025.01.19",
    time: "10:30",
    duration: 15,
    status: "success" as const,
    summary: "손주가 다음 주에 온다는 소식에 목소리가 매우 밝으셨어요.",
    tags: ["기분좋음", "가족"],
    emotion: "좋음",
    emotionScore: 92,
  },
  {
    id: -2,
    date: "2025.01.18",
    time: "14:20",
    duration: 12,
    status: "success" as const,
    summary: "점심으로 된장찌개를 드셨고, 혈압약도 잊지 않고 챙겨 드셨습니다.",
    tags: ["건강", "식사"],
    emotion: "보통",
    emotionScore: 85,
  },
  {
    id: -3,
    date: "2025.01.17",
    time: "10:00",
    duration: 0,
    status: "missed" as const,
    summary: "전화를 받지 않으셨습니다.",
    tags: ["부재중"],
    emotion: "",
    emotionScore: 0,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const elderId = params.elderId ? Number(params.elderId) : null;

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 테스트 전화 푸시 관련 상태
  const [isPushLoading, setIsPushLoading] = useState(false);
  const [pushToast, setPushToast] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  } | null>(null);

  const highlightKeywords = (message: string, tags: string[]) => {
    if (!tags || tags.length === 0) return message;
    const limitedTags = tags.slice(0, 2);
    let result: (string | React.ReactNode)[] = [message];

    limitedTags.forEach((tag, tagIndex) => {
      const newResult: (string | React.ReactNode)[] = [];
      result.forEach((part, partIndex) => {
        if (typeof part === "string") {
          const parts = part.split(tag);
          parts.forEach((textPart, i) => {
            newResult.push(textPart);
            if (i < parts.length - 1) {
              newResult.push(
                <span
                  key={`${tagIndex}-${partIndex}-${i}`}
                  className="inline-block align-text-bottom px-2 py-0.5 text-xs font-black bg-amber-400 text-slate-900 rounded-md -translate-y-0.5"
                >
                  {tag}
                </span>
              );
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });
    return result;
  };

  const handleTestPush = async () => {
    if (!elderId) return;

    setIsPushLoading(true);
    try {
      await pushApi.sendVoipPush(elderId);
      setPushToast({
        show: true,
        type: "success",
        message: "테스트 전화 알림을 전송했습니다!",
      });
    } catch (error: any) {
      setPushToast({
        show: true,
        type: "error",
        message: error.message || "전화 알림 전송에 실패했습니다.",
      });
    } finally {
      setIsPushLoading(false);
      // 3초 후 토스트 자동 숨김
      setTimeout(() => setPushToast(null), 3000);
    }
  };

  useEffect(() => {
    async function loadDashboard() {
      if (!elderId) {
        setError("잘못된 접근입니다.");
        setIsLoading(false);
        return;
      }

      try {
        const dashboardData = await dashboardApi.getDashboard(elderId);
        setData(dashboardData);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [elderId]);

  return (
    <>
      <LNB />

      {/* 테스트 전화 알림 토스트 */}
      {pushToast?.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg border-2 flex items-center gap-3 ${
              pushToast.type === "success"
                ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                : "bg-red-50 border-red-500 text-red-900"
            }`}
          >
            {pushToast.type === "success" ? (
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="font-bold text-sm">{pushToast.message}</span>
          </div>
        </div>
      )}

      <SidebarInset className="flex-1 overflow-y-auto bg-slate-50/50">
        {isLoading && (
          <div className="flex items-center justify-center h-full min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">
                소리가 데이터를 불러오고 있어요...
              </p>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex items-center justify-center h-full min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-slate-700 font-bold">{error}</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                대시보드로 돌아가기
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="bg-white/80 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl shadow-sm">
              <div className="px-8 py-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shadow-sm border border-violet-200 transition-transform group-hover:scale-105">
                      <SoriCharacter size={28} animated />
                    </div>
                    {data && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      {data ? (
                        <>
                          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            {data.elder.name}
                          </h1>
                          <span className="text-lg font-bold text-slate-500">
                            님의 오늘
                          </span>
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-black text-slate-400 tracking-tight">
                            등록되지 않음
                          </h1>
                          <button
                            onClick={() => router.push("/register")}
                            className="ml-2 px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                          >
                            지금 등록하기 →
                          </button>
                        </>
                      )}
                    </div>
                    {data && (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          소리가 함께 케어 중
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {data && (
                    <button
                      onClick={handleTestPush}
                      disabled={isPushLoading}
                      className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                    >
                      {isPushLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>전송 중...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                          <span>테스트 전화</span>
                        </>
                      )}
                    </button>
                  )}
                  {false && <NotificationCenter />}
                </div>
              </div>
            </div>

            <div className="p-8 w-full space-y-8 pb-20">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6 shadow-lg text-white flex items-center justify-between group hover:shadow-violet-500/20 transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 p-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/10">
                    <SoriCharacter size={40} animated />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-black text-white">
                        소리의 요약
                      </h3>
                      {data?.today_highlight && (
                        <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-bold text-white/90 border border-white/30">
                          {data.today_highlight.call_time}
                        </span>
                      )}
                    </div>
                    {data?.today_highlight ? (
                      <p className="text-base text-white/95 font-semibold leading-relaxed">
                        {highlightKeywords(
                          data.today_highlight.message,
                          data.today_highlight.tags
                        )}
                      </p>
                    ) : (
                      <p className="text-base text-white/95 font-semibold leading-relaxed">
                        아직 오늘의 통화 기록이 없어요. 소리가 곧 따뜻한
                        목소리와 마음을 이어줄 거예요!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="relative bg-violet-50/50 p-6 rounded-lg border border-violet-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-violet-50 hover:to-violet-100 hover:border-violet-300 transition-all duration-300 group overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-violet-200/20 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-violet-500 flex items-center justify-center text-white group-hover:bg-violet-600 transition-colors shadow-md">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-violet-700 mb-1">
                      이번 주 통화 시도
                    </p>
                    <p className="text-3xl font-black text-violet-900 tracking-tight mb-2">
                      {data?.weekly_stats?.call_attempts?.count || 0}회
                    </p>
                    <p className="text-xs text-violet-600 font-medium">
                      {data
                        ? getAttemptsDescription(
                            data.weekly_stats.call_attempts.count
                          )
                        : "아직 통화를 시도하지 않았어요"}
                    </p>
                  </div>
                </div>

                <div className="relative bg-emerald-50/50 p-6 rounded-lg border border-emerald-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300 transition-all duration-300 group overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors shadow-md">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-emerald-700 mb-1">
                      주간 통화 성공 횟수
                    </p>
                    <p className="text-3xl font-black text-emerald-900 tracking-tight mb-2">
                      {data?.weekly_stats?.call_success_count?.count || 0}회
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      {data
                        ? getSuccessDescription(
                            data.weekly_stats.call_success_count.count,
                            data.weekly_stats.call_attempts.count
                          )
                        : "첫 통화를 기다리고 있어요"}
                    </p>
                  </div>
                </div>

                <div className="relative bg-blue-50/50 p-6 rounded-lg border border-blue-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 group overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shadow-md">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-blue-700 mb-1">
                      평균 대화 시간
                    </p>
                    <p className="text-3xl font-black text-blue-900 tracking-tight mb-2">
                      {data?.weekly_stats?.avg_duration?.minutes || 0}분
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      {data
                        ? getAvgDurationDescription(
                            data.weekly_stats.avg_duration.minutes
                          )
                        : "통화가 완료되면 표시됩니다"}
                    </p>
                  </div>
                </div>

                <div className="relative bg-amber-50/50 p-6 rounded-lg border border-amber-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 hover:border-amber-300 transition-all duration-300 group overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-amber-400 flex items-center justify-center border border-amber-500 group-hover:bg-amber-500 transition-colors shadow-md overflow-hidden pt-1">
                        <SoriCharacter size={32} />
                      </div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                        D+{data?.elder?.service_days || 0}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-amber-700 mb-1">
                      소리와 함께
                    </p>
                    <p className="text-3xl font-black text-amber-900 tracking-tight mb-2">
                      {data?.elder?.service_days || 0}일
                    </p>
                    <p className="text-xs text-amber-600 font-medium">
                      {data
                        ? getDaysDescription(data.elder.service_days)
                        : "오늘부터 시작이에요!"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                  <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-8 overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-violet-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            최근 통화 기록
                            <span className="px-2 py-0.5 rounded-md bg-violet-50 text-[10px] font-bold text-violet-600 border border-violet-200">
                              AI 분석
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-200"></span>
                          </h2>
                          <p className="text-xs text-slate-400 mt-1">
                            AI가 매 통화를 분석하고 케어 인사이트를 제공해요
                          </p>
                        </div>
                        <button
                          onClick={() => router.push(`/call-list/${elderId}`)}
                          className="text-sm font-bold text-violet-600 hover:text-white hover:bg-violet-600 transition-all flex items-center gap-1 px-4 py-2 rounded-lg border border-violet-200 hover:border-violet-600 shadow-sm hover:shadow-md"
                        >
                          전체 기록 보기
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-6">
                        {data && data.recent_calls.length > 0 ? (
                          <TimelineCallList
                            calls={data.recent_calls.map((call) => ({
                              id: call.id,
                              date: call.date,
                              time: call.time,
                              duration: call.duration_minutes,
                              status: convertCallStatus(call.status),
                              summary: call.summary,
                              tags: call.tags,
                              emotion: call.emotion || "",
                              emotionScore: 0,
                            }))}
                            onCallClick={(call) =>
                              router.push(`/call-list/${elderId}/${call.id}`)
                            }
                          />
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                              <span className="text-2xl">💡</span>
                              <p className="text-sm font-bold text-blue-900">
                                데이터는 이런 식으로 표기됩니다!
                              </p>
                            </div>

                            <div className="opacity-50 pointer-events-none">
                              <TimelineCallList
                                calls={MOCK_CALLS}
                                onCallClick={() => {}}
                              />
                            </div>

                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 text-center border border-slate-200">
                              <p className="text-sm font-bold text-slate-700 mb-3">
                                첫 통화가 완료되면 이곳에 실제 대화 내용이
                                표시됩니다
                              </p>
                              <button
                                onClick={() => router.push("/register")}
                                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2"
                              >
                                통화 일정 설정하기 →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 pt-6 pb-4">
                      <h3 className="text-base font-black text-slate-900 mb-1">
                        다음 통화 일정
                      </h3>
                      <p className="text-xs text-slate-400">
                        소리가 자동으로 통화를 시작할 예정이에요
                      </p>
                    </div>

                    {data?.next_scheduled_call ? (
                      <>
                        <div className="mx-6 mb-4 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-white/90 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                              예정됨
                            </span>
                            <span className="text-sm font-bold text-white/90">
                              {data.next_scheduled_call.day_of_week}
                            </span>
                          </div>
                          <div className="text-center py-1">
                            <div className="text-5xl font-black mb-2 font-mono tracking-tight">
                              {data.next_scheduled_call.time_display}
                            </div>
                            <p className="text-base font-bold text-white/95">
                              {data.next_scheduled_call.date_display}
                            </p>
                          </div>
                        </div>
                        <div className="px-6 pb-6">
                          <button
                            onClick={() => router.push("/register")}
                            className="w-full py-3 rounded-lg bg-white text-violet-600 text-sm font-bold hover:bg-violet-50 transition-all border-2 border-violet-200 hover:border-violet-300 flex items-center justify-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            일정 관리
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="px-6 pb-6">
                        <div className="rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 p-8 text-center border-2 border-violet-200 mb-4">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <svg
                              className="w-8 h-8 text-violet-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-base font-black text-slate-900 mb-3">
                            예정된 통화가 없습니다
                          </p>
                          <p className="text-sm font-semibold text-slate-600 mb-5">
                            정기적인 안부 전화를 설정해보세요
                          </p>
                          <button
                            onClick={() => router.push("/register")}
                            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            통화 일정 설정하기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-6 overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative">
                      <h3 className="text-base font-black text-slate-900 mb-1">
                        이번 주 통화 일정
                      </h3>
                      <p className="text-xs text-slate-400 mb-5">
                        매일 정해진 시간에 소리가 찾아뵐게요
                      </p>

                      <div className="space-y-3">
                        {data &&
                        data.this_week_schedule
                          .filter((item) => item.scheduled_times.length > 0)
                          .slice(0, 3).length > 0 ? (
                          data.this_week_schedule
                            .filter((item) => item.scheduled_times.length > 0)
                            .slice(0, 3)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 border-slate-200 hover:bg-slate-100 transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="text-left">
                                    <p className="text-xs font-bold text-slate-500">
                                      {item.day_of_week}
                                    </p>
                                    <p className="text-sm font-black text-slate-700">
                                      {item.date_display}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-black text-slate-700">
                                    {item.scheduled_times[0]}
                                  </p>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="w-8 h-8 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm font-bold text-slate-700 mb-2">
                              아직 설정된 일정이 없습니다
                            </p>
                            <p className="text-xs text-slate-500 mb-4">
                              규칙적인 소통이 더 따뜻한 케어를 만들어요
                            </p>
                            <button
                              onClick={() => router.push("/register")}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              일정 추가하기 →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-6 overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative">
                      <h3 className="text-base font-black text-slate-900 mb-1">
                        빠른 액션
                      </h3>
                      <p className="text-xs text-slate-400 mb-5">
                        소리가 준비 중이에요
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="relative py-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 flex flex-col items-center justify-center gap-2 hover:from-red-100 hover:to-red-200 transition-all group overflow-hidden">
                          <div className="absolute top-1 right-1">
                            <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                              SOON
                            </span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-white text-red-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs font-bold text-red-700">
                            긴급 알림
                          </span>
                        </button>

                        <button className="relative py-4 rounded-lg bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 flex flex-col items-center justify-center gap-2 hover:from-violet-100 hover:to-violet-200 transition-all group overflow-hidden">
                          <div className="absolute top-1 right-1">
                            <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                              SOON
                            </span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-white text-violet-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs font-bold text-violet-700">
                            주간 리포트
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SidebarInset>
    </>
  );
}
