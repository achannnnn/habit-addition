import type { ThemeColor } from './settings';

export type HabitIcon =
  | 'none'
  | 'bread'
  | 'wheat'
  | 'game'
  | 'smoking'
  | 'nap'
  | 'video'
  | 'forgetfulness'
  | 'impulse-buy'
  | 'sns'
  | 'alcohol'
  | 'tv'
  | 'money'
  | 'late-night'
  | 'late'
  | 'gambling'
  | 'convenience-store'
  | 'taxi'
  | 'slacking'
  | 'candy';

// 習慣の型定義
export interface Habit {
  id: string;
  name: string;
  dailyUsage?: string; // 1日の使用数または時間
  costPerUnit?: string; // 1回あたりの金額
  icon: HabitIcon;
  color: ThemeColor;
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
  icon: HabitIcon;
  notificationEnabled: boolean;
}
