/** 회원 등급 누적 구매 금액 임계값 (원) */
export const GRADE_THRESHOLDS: Record<number, number> = {
  0: 0,
  1: 100_000,
  2: 300_000,
  3: 1_000_000,
};

/** 회원 등급 레이블 */
export const GRADE_LABELS: Record<number, string> = {
  0: '일반',
  1: '실버',
  2: '골드',
  3: 'VIP',
};

/** 포인트 적립률 (구매 금액의 1%) */
export const POINTS_RATE = 0.01;
