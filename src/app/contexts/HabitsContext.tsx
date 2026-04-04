import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Habit } from '../types/habit';
import type { ThemeColor } from '../types/settings';
import { isHabitIcon } from '../constants/habitIcons';
import { getHabitMilestones } from '../constants/milestones';
import type { HabitAchievementMilestone } from '../utils/achievementMilestones';
import {
  scheduleHabitNotifications,
  cancelHabitNotifications,
  rescheduleHabitNotifications,
} from '../utils/notificationService';
import { createRestartLog } from '../utils/habitStats';

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  getHabit: (id: string) => Habit | undefined;
  resetHabitCounter: (id: string) => void;
  recordAchievementMilestones: (achievements: HabitAchievementMilestone[]) => void;
}

const STORAGE_KEY = 'habits_data';

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

function loadHabitsFromStorage(): Habit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Array<Record<string, unknown>>;
    return parsed.map((h) => ({
      ...h,
      icon: isHabitIcon(h.icon) ? h.icon : 'game',
      color: (h.color as ThemeColor) ?? 'orange',
      milestoneDays: getHabitMilestones(Array.isArray(h.milestoneDays) ? h.milestoneDays as number[] : undefined),
      createdAt: new Date(h.createdAt as string),
      lastResetDate: new Date(h.lastResetDate as string),
      achievementHistory: Array.isArray(h.achievementHistory)
        ? (h.achievementHistory as Array<Record<string, unknown>>).map((entry) => ({
          achievementKey: String(entry.achievementKey ?? ''),
          days: Number(entry.days ?? 0),
          reachedAt: new Date(String(entry.reachedAt ?? h.lastResetDate)),
        }))
        : [],
      restartLogs: Array.isArray(h.restartLogs)
        ? (h.restartLogs as Array<Record<string, unknown>>).map((entry) => ({
          id: String(entry.id ?? ''),
          restartedAt: new Date(String(entry.restartedAt ?? h.lastResetDate)),
          streakDays: Number(entry.streakDays ?? 0),
          savedCount: Number(entry.savedCount ?? 0),
          savedMoney: Number(entry.savedMoney ?? 0),
        }))
        : [],
    })) as Habit[];
  } catch {
    return [];
  }
}

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(loadHabitsFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      milestoneDays: getHabitMilestones(habit.milestoneDays),
      achievementHistory: habit.achievementHistory ?? [],
      restartLogs: habit.restartLogs ?? [],
    };
    setHabits((prev) => [...prev, newHabit]);
    scheduleHabitNotifications(newHabit);
  };

  const recordAchievementMilestones = (achievements: HabitAchievementMilestone[]) => {
    if (achievements.length === 0) return;

    setHabits((prev) => {
      let hasAnyChange = false;

      const nextHabits = prev.map((habit) => {
        const relatedAchievements = achievements.filter((achievement) => achievement.habitId === habit.id);
        if (relatedAchievements.length === 0) return habit;

        const existingKeys = new Set(habit.achievementHistory.map((entry) => entry.achievementKey));
        const nextHistory = [...habit.achievementHistory];

        for (const achievement of relatedAchievements) {
          if (!existingKeys.has(achievement.achievementKey)) {
            nextHistory.push({
              achievementKey: achievement.achievementKey,
              days: achievement.days,
              reachedAt: new Date(achievement.reachedAt),
            });
            existingKeys.add(achievement.achievementKey);
          }
        }

        if (nextHistory.length === habit.achievementHistory.length) {
          return habit;
        }

        hasAnyChange = true;
        nextHistory.sort((left, right) => right.reachedAt.getTime() - left.reachedAt.getTime());

        return {
          ...habit,
          achievementHistory: nextHistory,
        };
      });

      return hasAnyChange ? nextHabits : prev;
    });
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) => prev.map((habit) => {
      if (habit.id !== id) return habit;
      const updated = {
        ...habit,
        ...updates,
        milestoneDays: updates.milestoneDays ? getHabitMilestones(updates.milestoneDays) : habit.milestoneDays,
      };
      // 通知設定が変わった場合、または通知ONのまま更新された場合は再スケジュール
      if ('notificationEnabled' in updates || updated.notificationEnabled) {
        rescheduleHabitNotifications(habit, updated);
      }
      return updated;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => {
      const targetHabit = prev.find((habit) => habit.id === id);
      if (targetHabit) {
        cancelHabitNotifications(targetHabit);
      }
      return prev.filter((habit) => habit.id !== id);
    });
  };

  const getHabit = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  const resetHabitCounter = (id: string) => {
    setHabits((prev) => prev.map((habit) => {
      if (habit.id !== id) return habit;
      const now = new Date();
      const restartLog = createRestartLog(habit, now);
      const reset = {
        ...habit,
        lastResetDate: now,
        totalDays: 0,
        currentStreak: 0,
        restartLogs: restartLog ? [restartLog, ...habit.restartLogs] : habit.restartLogs,
      };
      rescheduleHabitNotifications(habit, reset);
      return reset;
    }));
  };

  return (
    <HabitsContext.Provider value={{
      habits,
      addHabit,
      updateHabit,
      deleteHabit,
      getHabit,
      resetHabitCounter,
      recordAchievementMilestones,
    }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}
