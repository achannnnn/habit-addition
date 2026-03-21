import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Habit } from '../types/habit';
import type { ThemeColor } from '../types/settings';
import { isHabitIcon } from '../constants/habitIcons';
import {
  scheduleHabitNotifications,
  cancelHabitNotifications,
  rescheduleHabitNotifications,
} from '../utils/notificationService';

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  getHabit: (id: string) => Habit | undefined;
  resetHabitCounter: (id: string) => void;
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
      createdAt: new Date(h.createdAt as string),
      lastResetDate: new Date(h.lastResetDate as string),
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
    };
    setHabits((prev) => [...prev, newHabit]);
    scheduleHabitNotifications(newHabit);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) => prev.map((habit) => {
      if (habit.id !== id) return habit;
      const updated = { ...habit, ...updates };
      // 通知設定が変わった場合、または通知ONのまま更新された場合は再スケジュール
      if ('notificationEnabled' in updates || updated.notificationEnabled) {
        rescheduleHabitNotifications(updated);
      }
      return updated;
    }));
  };

  const deleteHabit = (id: string) => {
    cancelHabitNotifications(id);
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const getHabit = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  const resetHabitCounter = (id: string) => {
    setHabits((prev) => prev.map((habit) => {
      if (habit.id !== id) return habit;
      const reset = {
        ...habit,
        lastResetDate: new Date(),
        totalDays: 0,
        currentStreak: 0,
      };
      rescheduleHabitNotifications(reset);
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
