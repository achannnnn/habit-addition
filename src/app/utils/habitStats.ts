import { getHabitMilestones } from '../constants/milestones';
import type { Habit, HabitRestartLog } from '../types/habit';

export interface HabitSavingsStats {
  preciseSavedCount: number;
  displaySavedCount: string;
  savedMoney: number;
  countUnit: string;
}

function extractNumericValue(value?: string): number {
  if (!value) return 0;

  const match = value.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  return Number.parseFloat(match[1]);
}

export function extractCountUnit(value?: string): string {
  if (!value) return '';

  const match = value.match(/[^\d\s.]+/);
  return match ? match[0] : '';
}

export function calculateElapsedDays(lastResetDate: Date, now = new Date()): number {
  const diffMs = Math.max(0, now.getTime() - lastResetDate.getTime());
  return diffMs / (1000 * 60 * 60 * 24);
}

export function calculatePreciseSavedCount(habit: Habit, now = new Date()): number {
  const dailyCount = extractNumericValue(habit.dailyUsage);
  if (dailyCount === 0) return 0;

  return calculateElapsedDays(habit.lastResetDate, now) * dailyCount;
}

export function calculateSavedMoney(habit: Habit, preciseSavedCount: number): number {
  const costPerUnit = extractNumericValue(habit.costPerUnit);
  if (costPerUnit === 0) return 0;

  return Math.floor(preciseSavedCount * costPerUnit);
}

export function formatSavedCount(value: number): string {
  if (value === 0) return '0';

  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function getHabitSavingsStats(habit: Habit, now = new Date()): HabitSavingsStats {
  const preciseSavedCount = calculatePreciseSavedCount(habit, now);

  return {
    preciseSavedCount,
    displaySavedCount: formatSavedCount(preciseSavedCount),
    savedMoney: calculateSavedMoney(habit, preciseSavedCount),
    countUnit: extractCountUnit(habit.dailyUsage),
  };
}

export function createRestartLog(habit: Habit, now = new Date()): HabitRestartLog | null {
  const streakDays = Math.floor(calculateElapsedDays(habit.lastResetDate, now));
  const savingsStats = getHabitSavingsStats(habit, now);

  if (streakDays <= 0 && savingsStats.preciseSavedCount <= 0 && savingsStats.savedMoney <= 0) {
    return null;
  }

  return {
    id: `${habit.id}:${now.toISOString()}`,
    restartedAt: now,
    streakDays,
    savedCount: Number.parseFloat(savingsStats.displaySavedCount),
    savedMoney: savingsStats.savedMoney,
  };
}

export function getAllTimeSavedCount(habit: Habit, now = new Date()): number {
  const restartTotal = habit.restartLogs.reduce((total, log) => total + log.savedCount, 0);
  return restartTotal + getHabitSavingsStats(habit, now).preciseSavedCount;
}

export function getAllTimeSavedMoney(habit: Habit, now = new Date()): number {
  const restartTotal = habit.restartLogs.reduce((total, log) => total + log.savedMoney, 0);
  return restartTotal + getHabitSavingsStats(habit, now).savedMoney;
}

export function getNextMilestone(days: number, milestoneDays: number[]): number | null {
  return getHabitMilestones(milestoneDays).find((milestone) => milestone > days) ?? null;
}

export function getMilestoneProgress(days: number, milestoneDays: number[]): number {
  const normalizedMilestones = getHabitMilestones(milestoneDays);
  const previousMilestone = [...normalizedMilestones].reverse().find((milestone) => milestone <= days) ?? 0;
  const nextMilestone = getNextMilestone(days, normalizedMilestones);

  if (nextMilestone === null) {
    return 1;
  }

  const span = nextMilestone - previousMilestone;
  if (span <= 0) return 1;

  return Math.min(1, Math.max(0, (days - previousMilestone) / span));
}
