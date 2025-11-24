'use client';

import { useState } from 'react';

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: '무릎 통증 지속',
      message: '3일 연속 무릎 통증을 언급하셨습니다. 정형외과 방문을 권장합니다.',
      timestamp: '2시간 전',
      read: false,
      actionLabel: '병원 찾기',
      actionUrl: '/hospitals'
    },
    {
      id: 2,
      type: 'success',
      title: '약 복용 완료',
      message: '오늘 아침 혈압약을 제때 복용하셨습니다.',
      timestamp: '5시간 전',
      read: true
    },
    {
      id: 3,
      type: 'info',
      title: '다음 통화 예정',
      message: '내일 오전 10시에 소리가 전화 드립니다.',
      timestamp: '1일 전',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'from-red-600 to-pink-600';
      case 'warning': return 'from-yellow-600 to-orange-600';
      case 'success': return 'from-green-600 to-emerald-600';
      case 'info': return 'from-blue-600 to-cyan-600';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
      case 'warning':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        );
      case 'success':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        );
      case 'info':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* 알림 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-xs font-black text-white">{unreadCount}</span>
          </div>
        )}
      </button>

      {/* 알림 드롭다운 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 animate-slideInDown">
            {/* 헤더 */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">알림</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-violet-600 hover:text-violet-700"
                  >
                    모두 읽음
                  </button>
                )}
              </div>
            </div>

            {/* 알림 목록 */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <p className="text-sm font-bold text-slate-500">새로운 알림이 없습니다</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-violet-50/50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* 아이콘 */}
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getTypeIcon(notification.type)}
                        </svg>
                      </div>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-black text-slate-900">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-violet-600"></div>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{notification.timestamp}</span>
                          {notification.actionLabel && (
                            <button className="text-xs font-bold text-violet-600 hover:text-violet-700">
                              {notification.actionLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 푸터 */}
            <div className="p-3 border-t border-slate-200">
              <button className="w-full text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors">
                모든 알림 보기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

