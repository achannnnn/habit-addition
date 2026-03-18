import { LocalNotifications } from '@capacitor/local-notifications';
import type { Habit } from '../types/habit';

// マイルストーン（日数）
const MILESTONES = [1, 7, 14, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 365] as const;

// マイルストーンごとのメッセージ
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

// 毎月メッセージ（30の倍数で365以外）
function getMonthlyMessages(months: number): string[] {
  return [
    `🎉 また${months}ヶ月達成！積み上がっています。`,
    `🏆 ${months}ヶ月継続中。あなたは変わっています。`,
    `🌱 ${months}ヶ月やめ続けています。誇れる記録です。`,
    `🔥 ストリーク更新中。ここまで来ました。`,
  ];
}

function getMessages(days: number): string[] {
  if (MILESTONE_MESSAGES[String(days)]) {
    return MILESTONE_MESSAGES[String(days)];
  }
  const months = Math.round(days / 30);
  return getMonthlyMessages(months);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * habitId から Capacitor 通知用の整数 ID を生成
 * milestoneIndex: 0〜(MILESTONES.length-1)
 */
function getNotificationId(habitId: string, milestoneIndex: number): number {
  let hash = 0;
  for (let i = 0; i < habitId.length; i++) {
    hash = (hash * 31 + habitId.charCodeAt(i)) % 999983; // 大きめ素数でmod
  }
  return hash * 100 + milestoneIndex;
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
    const notifications: Parameters<typeof LocalNotifications.schedule>[0]['notifications'] = [];

    for (let i = 0; i < MILESTONES.length; i++) {
      const days = MILESTONES[i];
      const notifDate = new Date(startDate);
      notifDate.setDate(notifDate.getDate() + days);
      notifDate.setHours(20, 0, 0, 0); // 毎日20時に通知

      // 過去の通知はスキップ
      if (notifDate <= now) continue;

      notifications.push({
        id: getNotificationId(habit.id, i),
        title: habit.name,
        body: pickRandom(getMessages(days)),
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
export async function cancelHabitNotifications(habitId: string): Promise<void> {
  try {
    const notifications = MILESTONES.map((_, i) => ({
      id: getNotificationId(habitId, i),
    }));
    await LocalNotifications.cancel({ notifications });
  } catch {
    // 通知が存在しない場合は無視
  }
}

/** 通知のキャンセル＋再スケジュール */
export async function rescheduleHabitNotifications(habit: Habit): Promise<void> {
  await cancelHabitNotifications(habit.id);
  await scheduleHabitNotifications(habit);
}
