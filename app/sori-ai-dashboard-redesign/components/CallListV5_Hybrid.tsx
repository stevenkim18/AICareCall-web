'use client';

import { useRouter } from 'next/navigation';
import { CallListV2_Card } from './CallListV2_Card';
import { CallListV4_Compact } from './CallListV4_Compact';

interface CallRecord {
  id: number;
  success: boolean;
  duration: number;
  date: string;
  time: string;
  summary: string;
  tags: string[];
  hasAlert?: boolean;
  alertMessage?: string;
}

interface CallListV5Props {
  callList: CallRecord[];
  selectedCallId: number | null;
  onCallClick: (id: number) => void;
}

export function CallListV5_Hybrid({ callList, selectedCallId, onCallClick }: CallListV5Props) {
  const router = useRouter();

  // 첫 번째 항목과 나머지 분리
  const firstCall = callList[0];
  const restCalls = callList.slice(1);

  return (
    <div className="space-y-4">
      {/* 첫 번째 항목: 상세 카드 */}
      {firstCall && (
        <div className="border-2 border-violet-300 bg-violet-50/20 rounded-lg overflow-hidden">
          <CallListV2_Card
            callList={[firstCall]}
            selectedCallId={selectedCallId}
            onCallClick={onCallClick}
          />
        </div>
      )}

      {/* 나머지 항목: 컴팩트 리스트 */}
      {restCalls.length > 0 && (
        <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          <CallListV4_Compact
            callList={restCalls}
            selectedCallId={selectedCallId}
            onCallClick={onCallClick}
          />
        </div>
      )}
    </div>
  );
}

