import type { Habit } from '../types/habit';
import { getHabitMilestones } from '../constants/milestones';

const SEEN_ACHIEVEMENTS_STORAGE_KEY = 'seen_habit_achievement_milestones';

export interface HabitAchievementMilestone {
  habitId: string;
  habitName: string;
  days: number;
  reachedAt: string;
  achievementKey: string;
}

function getReachedAt(lastResetDate: Date, days: number): Date {
  const reachedAt = new Date(lastResetDate);
  reachedAt.setDate(reachedAt.getDate() + days);
  return reachedAt;
}

export function getAchievementKey(habit: Habit, days: number): string {
  return `${habit.id}:${habit.lastResetDate.toISOString()}:${days}`;
}

export function getReachedHabitAchievementsForHabit(habit: Habit, now = new Date()): HabitAchievementMilestone[] {
  return getHabitMilestones(habit).map((days) => {
    const reachedAt = getReachedAt(habit.lastResetDate, days);
    if (reachedAt > now) {
      return null;
    }

    return {
      habitId: habit.id,
      habitName: habit.name,
      days,
      reachedAt: reachedAt.toISOString(),
      achievementKey: getAchievementKey(habit, days),
    } satisfies HabitAchievementMilestone;
  }).filter((achievement): achievement is HabitAchievementMilestone => achievement !== null);
}

export function getReachedHabitAchievements(habits: Habit[], now = new Date()): HabitAchievementMilestone[] {
  return habits
    .flatMap((habit) => getReachedHabitAchievementsForHabit(habit, now))
    .sort((left, right) => {
      const timeDiff = new Date(left.reachedAt).getTime() - new Date(right.reachedAt).getTime();
      if (timeDiff !== 0) return timeDiff;
      return left.days - right.days;
    });
}

function readSeenAchievementKeys(): string[] {
  try {
    const stored = localStorage.getItem(SEEN_ACHIEVEMENTS_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

export function markAchievementAsSeen(achievementKey: string): void {
  const currentKeys = new Set(readSeenAchievementKeys());
  currentKeys.add(achievementKey);
  localStorage.setItem(SEEN_ACHIEVEMENTS_STORAGE_KEY, JSON.stringify([...currentKeys]));
}

export function getPendingHabitAchievements(habits: Habit[], now = new Date()): HabitAchievementMilestone[] {
  const seenKeys = new Set(readSeenAchievementKeys());

  return getReachedHabitAchievements(habits, now)
    .filter((achievement) => !seenKeys.has(achievement.achievementKey))
    .sort((left, right) => {
      const timeDiff = new Date(left.reachedAt).getTime() - new Date(right.reachedAt).getTime();
      if (timeDiff !== 0) return timeDiff;
      return left.days - right.days;
    });
}
