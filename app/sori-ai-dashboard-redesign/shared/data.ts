// 공통 데이터 정의

export const registrationInfo = {
  elder: {
    name: '박순자',
    age: 82,
    gender: '여성',
    phone: '010-1234-5678',
    healthConditions: ['고혈압', '관절염']
  },
  guardian: {
    name: '김보호',
    relationship: '아들',
    phone: '010-9876-5432',
    email: 'kim@email.com'
  }
};

export const weeklyStats = {
  totalCalls: 7,
  successfulCalls: 5,
  successRate: 71,
  avgDuration: 14,
  daysWithSori: 128
};

export const summaryData = {
  elderName: '박순자',
  healthScore: 92,
  nextCall: { date: '2025-01-20', time: '10:00', dayName: '월요일' },
  lastCallStatus: 'completed',
  careLevel: 'good'
};

export const upcomingCalls = [
  { id: 1, date: '01/20', day: '월', time: '10:00', status: 'scheduled' },
  { id: 2, date: '01/22', day: '수', time: '10:00', status: 'scheduled' },
  { id: 3, date: '01/24', day: '금', time: '10:00', status: 'scheduled' }
];

export const callList = [
  {
    id: 1,
    success: true,
    duration: 15,
    date: '2025-01-19',
    time: '10:30',
    summary: '손주가 다음 주에 온다는 소식에 목소리가 매우 밝으셨어요',
    tags: ['기분좋음', '가족', '기대감'],
    hasAlert: false
  },
  {
    id: 2,
    success: true,
    duration: 12,
    date: '2025-01-18',
    time: '14:20',
    summary: '점심으로 된장찌개를 드셨고, 혈압약도 잊지 않고 챙겨 드셨습니다',
    tags: ['건강', '식사', '약복용'],
    hasAlert: false
  },
  {
    id: 3,
    success: false,
    duration: 0,
    date: '2025-01-17',
    time: '10:00',
    summary: '전화를 받지 않으셨습니다',
    tags: ['부재중'],
    hasAlert: false
  },
  {
    id: 4,
    success: true,
    duration: 18,
    date: '2025-01-16',
    time: '10:15',
    summary: '무릎이 조금 쑤신다고 하셨지만, 산책은 다녀오셨다고 합니다',
    tags: ['건강', '운동', '통증'],
    hasAlert: false
  },
  {
    id: 5,
    success: true,
    duration: 20,
    date: '2025-01-15',
    time: '10:05',
    summary: '친구분들과 경로당에서 즐거운 시간을 보내셨다고 자랑하셨어요',
    tags: ['사회활동', '즐거움'],
    hasAlert: false
  },
  {
    id: 6,
    success: true,
    duration: 13,
    date: '2025-01-14',
    time: '10:00',
    summary: '오늘 날씨가 좋아서 마당에 나가서 햇빛을 쬐셨다고 하셨어요',
    tags: ['일상', '날씨', '건강'],
    hasAlert: false
  },
  {
    id: 7,
    success: true,
    duration: 16,
    date: '2025-01-13',
    time: '10:00',
    summary: '손주가 보내준 사진을 보시며 좋아하셨고, 다음 주 방문을 기대하신다고 하셨어요',
    tags: ['가족', '기분좋음', '기대감'],
    hasAlert: false
  }
];

// 리스트 (신규) 데이터 - 통화 기록과 완전히 구분되는 새로운 섹션
export const listItems = [
  {
    id: 1,
    type: 'care_tip',
    title: '이번 주 케어 팁',
    description: '무릎 통증이 지속되고 있어 따뜻한 찜질을 권장합니다',
    icon: '💡',
    priority: 'high',
    date: '2025-01-19'
  },
  {
    id: 2,
    type: 'action_item',
    title: '약 복용 확인 필요',
    description: '다음 통화에서 고혈압 약 복용 여부를 확인해주세요',
    icon: '📋',
    priority: 'medium',
    date: '2025-01-19'
  },
  {
    id: 3,
    type: 'trend',
    title: '주간 건강 트렌드',
    description: '이번 주 평균 건강 점수는 85점으로 지난주 대비 5점 상승했습니다',
    icon: '📊',
    priority: 'low',
    date: '2025-01-18'
  },
  {
    id: 4,
    type: 'notification',
    title: '정기 검진 알림',
    description: '다음 달 15일 정기 검진 일정이 예정되어 있습니다',
    icon: '🔔',
    priority: 'medium',
    date: '2025-01-17'
  },
  {
    id: 5,
    type: 'summary',
    title: '월간 케어 요약',
    description: '1월 한 달간 총 28회 통화가 진행되었고, 평균 건강 점수는 88점입니다',
    icon: '📈',
    priority: 'low',
    date: '2025-01-15'
  }
];
