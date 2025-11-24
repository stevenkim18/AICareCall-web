'use client';

export function DashboardSkeleton() {
  return (
    <div className="p-8 animate-pulse">
      {/* 통계 카드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
              <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <div className="h-8 w-16 bg-slate-200 rounded"></div>
              <div className="h-3 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 메인 그리드 스켈레톤 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 좌측 */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="h-6 w-40 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-slate-200 rounded"></div>
                      <div className="h-3 w-full bg-slate-200 rounded"></div>
                      <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측 */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-200 rounded-2xl h-64"></div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="h-6 w-32 bg-slate-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CallCardSkeleton() {
  return (
    <div className="border border-slate-200 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
          <div className="h-3 w-full bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function InsightCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border-2 border-slate-200 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
          <div className="h-3 w-full bg-slate-200 rounded"></div>
          <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
        <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-8 w-16 bg-slate-200 rounded"></div>
        <div className="h-3 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div className="p-8 animate-pulse">
      <div className="mb-6">
        <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-slate-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="h-6 w-32 bg-slate-200 rounded mb-4"></div>
            <div className="h-48 bg-slate-200 rounded-xl"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="h-6 w-40 bg-slate-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="p-6 border-b border-slate-200">
        <div className="h-6 w-48 bg-slate-200 rounded"></div>
      </div>
      
      <div className="flex-1 p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex gap-3 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
            <div className="flex-1 max-w-md">
              <div className="h-20 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-slate-200">
        <div className="h-12 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

