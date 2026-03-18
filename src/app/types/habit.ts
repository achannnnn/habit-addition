// 習慣の型定義
export interface Habit {
  id: string;
  name: string;
  dailyUsage?: string; // 1日の使用数または時間
  costPerUnit?: string; // 1回あたりの金額
  notificationEnabled: boolean;
  createdAt: Date;
  lastResetDate: Date; // 最後にリセットした日
  totalDays: number; // 累計達成日数
  currentStreak: number; // 現在の連続日数
}

// 習慣追加フォームの型定義
export interface HabitFormData {
  name: string;
  dailyUsage: string;
  costPerUnit: string;
  notificationEnabled: boolean;
}
