import { LocalNotifications } from '@capacitor/local-notifications';
import type { Habit } from '../types/habit';
import { getHabitMilestones, getMilestoneMessages } from '../constants/milestones';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * habitId から Capacitor 通知用の整数 ID を生成
 * milestoneDay: マイルストーン日数
 */
function getNotificationId(habitId: string, milestoneDay: number): number {
  let hash = 0;
  for (let i = 0; i < habitId.length; i++) {
    hash = (hash * 31 + habitId.charCodeAt(i)) % 999983; // 大きめ素数でmod
  }
  return hash * 10000 + milestoneDay;
}

/** 通知権限をリクエスト */
export async function requestNotificationPermission(): Promise<void> {
  try {
    await LocalNotifications.requestPermissions();
  } catch {
    // Web環境やCapacitorが無効な場合は無視
  }
}

/** 習慣のマイルストーン通知をスケジュール */
export async function scheduleHabitNotifications(habit: Habit): Promise<void> {
  if (!habit.notificationEnabled) return;

  try {
    const now = new Date();
    const startDate = new Date(habit.lastResetDate);
    const milestoneDays = getHabitMilestones(habit);
    const notifications: Parameters<typeof LocalNotifications.schedule>[0]['notifications'] = [];

    for (const days of milestoneDays) {
      const notifDate = new Date(startDate);
      notifDate.setDate(notifDate.getDate() + days);
      notifDate.setHours(20, 0, 0, 0); // 毎日20時に通知

      // 過去の通知はスキップ
      if (notifDate <= now) continue;

      notifications.push({
        id: getNotificationId(habit.id, days),
        title: habit.name,
        body: pickRandom(getMilestoneMessages(days)),
        schedule: { at: notifDate },
        extra: { habitId: habit.id, days },
      });
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
    }
  } catch {
    // Web環境などでは無視
  }
}

/** 習慣のスケジュール済み通知をキャンセル */
export async function cancelHabitNotifications(habit: Pick<Habit, 'id' | 'milestoneDays'>): Promise<void> {
  try {
    const notifications = getHabitMilestones(habit).map((days) => ({
      id: getNotificationId(habit.id, days),
    }));

    if (notifications.length === 0) return;
    await LocalNotifications.cancel({ notifications });
  } catch {
    // 通知が存在しない場合は無視
  }
}

/** 通知のキャンセル＋再スケジュール */
export async function rescheduleHabitNotifications(previousHabit: Habit, nextHabit: Habit): Promise<void> {
  await cancelHabitNotifications(previousHabit);
  if (previousHabit.id === nextHabit.id) {
    const nextOnlyMilestones = getHabitMilestones(nextHabit).filter((days) => !getHabitMilestones(previousHabit).includes(days));
    if (nextOnlyMilestones.length > 0) {
      await LocalNotifications.cancel({
        notifications: nextOnlyMilestones.map((days) => ({
          id: getNotificationId(nextHabit.id, days),
        })),
      }).catch(() => undefined);
    }
  }
  await scheduleHabitNotifications(nextHabit);
}
