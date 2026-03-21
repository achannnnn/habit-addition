import type { HabitIcon } from '../types/habit';
import type { ThemeColor } from '../types/settings';

export interface HabitIconOption {
  value: HabitIcon;
  labelJa: string;
  labelEn: string;
}

export const HABIT_ICON_OPTIONS: HabitIconOption[] = [
  { value: 'none', labelJa: 'アイコン無し', labelEn: 'No Icon' },
  { value: 'smoking', labelJa: 'タバコ', labelEn: 'Smoking' },
  { value: 'game', labelJa: 'ゲーム', labelEn: 'Game' },
  { value: 'alcohol', labelJa: 'お酒', labelEn: 'Alcohol' },
  { value: 'video', labelJa: '動画', labelEn: 'Video' },
  { value: 'sns', labelJa: 'SNS', labelEn: 'SNS' },
  { value: 'late', labelJa: '遅刻', labelEn: 'Late' },
  { value: 'slacking', labelJa: 'サボり', labelEn: 'Slacking' },
  { value: 'nap', labelJa: '昼寝', labelEn: 'Nap' },
  { value: 'late-night', labelJa: '夜ふかし', labelEn: 'Late Night' },
  { value: 'forgetfulness', labelJa: '忘れ物', labelEn: 'Forgetfulness' },
  { value: 'taxi', labelJa: 'タクシー', labelEn: 'Taxi' },
  { value: 'gambling', labelJa: 'ギャンブル', labelEn: 'Gambling' },
  { value: 'convenience-store', labelJa: 'コンビニ通い', labelEn: 'Convenience Store' },
  { value: 'candy', labelJa: 'お菓子', labelEn: 'Candy' },
  { value: 'bread', labelJa: 'パン', labelEn: 'Bread' },
  { value: 'wheat', labelJa: '小麦', labelEn: 'Wheat' },
  { value: 'impulse-buy', labelJa: '無駄遣い', labelEn: 'Impulse Buy' },
  { value: 'money', labelJa: 'お金', labelEn: 'Money' },
  { value: 'tv', labelJa: 'テレビ', labelEn: 'TV' },
];

export const HABIT_ICON_VALUES = HABIT_ICON_OPTIONS.map((option) => option.value) as HabitIcon[];

export function isHabitIcon(value: unknown): value is HabitIcon {
  return typeof value === 'string' && HABIT_ICON_VALUES.includes(value as HabitIcon);
}

const ICON_LABEL_MAP = Object.fromEntries(
  HABIT_ICON_OPTIONS.map((option) => [option.value, option.labelJa]),
) as Record<HabitIcon, string>;

export function getHabitIconLabel(icon: HabitIcon, isEnglish: boolean): string {
  const option = HABIT_ICON_OPTIONS.find((item) => item.value === icon);
  if (!option) return isEnglish ? 'Icon' : 'アイコン';
  return isEnglish ? option.labelEn : option.labelJa;
}

export function getHabitIconImageCandidates(icon: HabitIcon, color: ThemeColor): string[] {
  if (icon === 'none') return [];

  const jaName = ICON_LABEL_MAP[icon] ?? icon;
  return [
    `/habit-icons/${icon}-${color}.png`,
    `/habit-icons/${icon}_${color}.png`,
    `/habit-icons/${jaName}-${color}.png`,
    `/habit-icons/${jaName}_${color}.png`,
    `/habit-icons/${jaName}${color}.png`,
    `/habit-icons/${icon}-${color}.webp`,
    `/habit-icons/${jaName}-${color}.webp`,
    `/habit-icons/${icon}-${color}.jpg`,
    `/habit-icons/${jaName}-${color}.jpg`,
    `/habit-icons/${icon}-${color}.jpeg`,
    `/habit-icons/${jaName}-${color}.jpeg`,
    `/habit-icons/${icon}-${color}.svg`,
    `/habit-icons/${jaName}-${color}.svg`,
  ];
}
