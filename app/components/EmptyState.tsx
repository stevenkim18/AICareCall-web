'use client';

interface EmptyStateProps {
  type: 'calls' | 'insights' | 'reports' | 'messages' | 'notifications' | 'general';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ type, title, description, actionLabel, onAction }: EmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case 'calls':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          ),
          defaultTitle: '아직 통화 기록이 없어요',
          defaultDescription: '첫 통화가 시작되면 여기에 기록이 표시됩니다',
          defaultActionLabel: '통화 일정 설정하기'
        };
      case 'insights':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          ),
          defaultTitle: '분석할 데이터가 충분하지 않아요',
          defaultDescription: '더 많은 통화가 쌓이면 AI가 유용한 인사이트를 제공해드릴게요',
          defaultActionLabel: null
        };
      case 'reports':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          ),
          defaultTitle: '리포트를 생성할 수 없어요',
          defaultDescription: '최소 7일간의 통화 데이터가 필요합니다',
          defaultActionLabel: null
        };
      case 'messages':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          ),
          defaultTitle: '대화 내역이 없어요',
          defaultDescription: '소리와의 첫 대화를 시작해보세요',
          defaultActionLabel: '지금 대화하기'
        };
      case 'notifications':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          ),
          defaultTitle: '새로운 알림이 없어요',
          defaultDescription: '모든 알림을 확인하셨습니다',
          defaultActionLabel: null
        };
      default:
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          ),
          defaultTitle: '데이터가 없어요',
          defaultDescription: '표시할 내용이 없습니다',
          defaultActionLabel: null
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {/* 아이콘 */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative text-slate-300">
          {content.icon}
        </div>
      </div>

      {/* 텍스트 */}
      <h3 className="text-xl font-black text-slate-900 mb-2">
        {title || content.defaultTitle}
      </h3>
      <p className="text-sm font-medium text-slate-600 mb-6 max-w-md">
        {description || content.defaultDescription}
      </p>

      {/* 액션 버튼 */}
      {(actionLabel || content.defaultActionLabel) && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
        >
          {actionLabel || content.defaultActionLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export function EmptyCallList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12">
      <EmptyState 
        type="calls"
        onAction={() => window.location.href = '/settings'}
      />
    </div>
  );
}

export function EmptyInsightList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12">
      <EmptyState type="insights" />
    </div>
  );
}

export function EmptyReportData() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12">
      <EmptyState type="reports" />
    </div>
  );
}

