import type { Habit } from '../types/habit';

// 通知と達成モーダルの既定マイルストーン（日数）
export const DEFAULT_HABIT_MILESTONES = [1, 7, 14, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 365] as const;
export const MAX_MILESTONE_DAY = 730;

export interface MilestonePresetOption {
  key: string;
  label: string;
  description: string;
  days: number[];
  displayText?: string;
}

function createStepDays(step: number, max: number): number[] {
  const days: number[] = [];
  for (let day = step; day <= max; day += step) {
    days.push(day);
  }
  return days;
}

function extendByInterval(baseDays: number[], interval: number, max: number): number[] {
  const normalizedBase = [...new Set(baseDays)].sort((left, right) => left - right);
  const extendedDays = [...normalizedBase];
  let cursor = normalizedBase[normalizedBase.length - 1] ?? interval;

  while (cursor < max) {
    cursor += interval;
    if (cursor <= max) {
      extendedDays.push(cursor);
    }
  }

  return [...new Set(extendedDays)].sort((left, right) => left - right);
}

const DAILY_MILESTONES = createStepDays(1, MAX_MILESTONE_DAY);
const WEEKLY_MILESTONES = createStepDays(7, MAX_MILESTONE_DAY);
const MONTHLY_MILESTONES = createStepDays(30, MAX_MILESTONE_DAY);
const STARTER_MILESTONES = extendByInterval([1, 3, 7, 14, 21, 30, 45, 60, 90, 120, 180, 365], 30, MAX_MILESTONE_DAY);
const STANDARD_MILESTONES = extendByInterval([...DEFAULT_HABIT_MILESTONES], 30, MAX_MILESTONE_DAY);

export const MILESTONE_PRESET_OPTIONS: MilestonePresetOption[] = [
  {
    key: 'daily',
    label: '1日ごと',
    description: '毎日の積み上げを細かく記録する',
    days: DAILY_MILESTONES,
    displayText: '1日, 2日, 3日 ... 730日',
  },
  {
    key: 'weekly',
    label: '1週間ごと',
    description: '1週間単位で達成を積み上げる',
    days: WEEKLY_MILESTONES,
    displayText: '7日, 14日, 21日 ... 728日',
  },
  {
    key: 'monthly',
    label: '1ヶ月ごと',
    description: '1ヶ月単位で長く続ける',
    days: MONTHLY_MILESTONES,
    displayText: '30日, 60日, 90日 ... 720日',
  },
  {
    key: 'starter',
    label: '小さく積み上げる',
    description: '1日, 3日, 7日から細かく達成感を得る',
    days: STARTER_MILESTONES,
    displayText: '1日, 3日, 7日 ... 365日以降は30日ごと',
  },
  {
    key: 'standard',
    label: '標準',
    description: '今まで通りのバランス型',
    days: STANDARD_MILESTONES,
    displayText: '1日, 7日, 14日 ... 365日以降は30日ごと',
  },
];

const STANDARD_PRESET = MILESTONE_PRESET_OPTIONS.find((preset) => preset.key === 'standard');
export const DEFAULT_SELECTED_MILESTONES = STANDARD_PRESET ? [...STANDARD_PRESET.days] : [...DEFAULT_HABIT_MILESTONES];

export const HABIT_MILESTONES = DEFAULT_HABIT_MILESTONES;

export function sanitizeMilestoneDays(days: number[]): number[] {
  const normalized = days
    .map((day) => Math.floor(day))
    .filter((day) => Number.isFinite(day) && day > 0 && day <= MAX_MILESTONE_DAY);

  const uniqueSortedDays = [...new Set(normalized)].sort((left, right) => left - right);
  return uniqueSortedDays.length > 0 ? uniqueSortedDays : [...DEFAULT_SELECTED_MILESTONES];
}

export function normalizeMilestonesToPreset(days: number[]): number[] {
  const sanitized = sanitizeMilestoneDays(days);
  const matchedPreset = getMatchingMilestonePreset(sanitized);

  if (!matchedPreset) {
    return [...DEFAULT_SELECTED_MILESTONES];
  }

  return [...matchedPreset.days];
}

export function getHabitMilestones(habitOrDays?: Pick<Habit, 'milestoneDays'> | number[]): number[] {
  if (!habitOrDays) {
    return [...DEFAULT_SELECTED_MILESTONES];
  }

  if (Array.isArray(habitOrDays)) {
    return normalizeMilestonesToPreset(habitOrDays);
  }

  return normalizeMilestonesToPreset(habitOrDays.milestoneDays);
}

export function getMatchingMilestonePreset(days: number[]): MilestonePresetOption | null {
  const normalizedDays = sanitizeMilestoneDays(days);
  return MILESTONE_PRESET_OPTIONS.find((preset) => {
    if (preset.days.length !== normalizedDays.length) {
      return false;
    }

    return preset.days.every((day, index) => day === normalizedDays[index]);
  }) ?? null;
}

const MILESTONE_MESSAGES: Record<string, string[]> = {
  '1': [
    '🎉 1日達成！いいスタートです。',
    '🌱 まだ1日。でも確実な一歩です。',
    '👏 今日もやらずに過ごせました。ナイス！',
    '🔥 ストリーク1日目。ここからです。',
  ],
  '7': [
    '🎉 1週間達成！いい流れです。',
    '💪 7日継続。もう立派な記録です。',
    '🌱 1週間やらずに過ごしました。続いています。',
    '🔥 7日ストリーク。ここから強くなります。',
  ],
  '14': [
    '🎉 2週間達成！変化を感じ始める頃です。',
    '💪 14日継続。かなり強いストリークです。',
    '🌱 2週間やめています。素晴らしいです。',
    '🔥 14日。ここまで来た人は少ないです。',
  ],
  '30': [
    '🏆 1ヶ月達成！本当にすごいです。',
    '🎉 30日ストリーク！これは大きな記録です。',
    '🌱 1ヶ月やめ続けました。自信にしていい記録です。',
    '🔥 30日。新しい習慣ができています。',
  ],
  '365': [
    '🏆 365日達成。本当にすごいです。',
    '🎉 1年間継続しました。誇れる記録です。',
    '🔥 365日ストリーク。あなたは変わりました。',
    '🌱 1年やめ続けました。素晴らしいです。',
  ],
};

function getMonthlyMessages(months: number): string[] {
  return [
    `🎉 また${months}ヶ月達成！積み上がっています。`,
    `🏆 ${months}ヶ月継続中。あなたは変わっています。`,
    `🌱 ${months}ヶ月やめ続けています。誇れる記録です。`,
    '🔥 ストリーク更新中。ここまで来ました。',
  ];
}

export function getMilestoneMessages(days: number): string[] {
  if (MILESTONE_MESSAGES[String(days)]) {
    return MILESTONE_MESSAGES[String(days)];
  }

  const months = Math.round(days / 30);
  return getMonthlyMessages(months);
}
