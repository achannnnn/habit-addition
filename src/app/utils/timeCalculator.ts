// 経過時間を計算するユーティリティ

export interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * 開始日時から現在までの経過時間を計算
 */
export function calculateElapsedTime(startDate: Date): ElapsedTime {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

/**
 * 経過時間を文字列にフォーマット
 */
export function formatElapsedTime(elapsed: ElapsedTime): string {
  return `${elapsed.days}日 ${elapsed.hours}時間 ${elapsed.minutes}分`;
}
