import type { HabitAchievementMilestone } from './achievementMilestones';

export interface ShareAchievementResult {
  status: 'shared' | 'copied' | 'cancelled';
}

export function buildAchievementShareText(achievements: HabitAchievementMilestone[]): string {
  if (achievements.length === 1) {
    const achievement = achievements[0];
    return [
      '🔥 やった。少しずつでも、ちゃんと前に進めてる。',
      `「${achievement.habitName}」を${achievement.days}日やめられました。`,
      '🌱 続けた日数が、自信になってきた。',
      '#やめログ',
    ].join('\n');
  }

  const emojis = ['🔥', '🎉', '👏', '💪', '🌱'];
  const lines = achievements.slice(0, 5).map((achievement, index) => {
    const emoji = emojis[index % emojis.length];
    return `${emoji} ${achievement.habitName} ${achievement.days}日`;
  });
  const footerLine = achievements.length > 5
    ? `✨ ほか${achievements.length - 5}件。積み上げた分だけ、ちゃんと変われてる。`
    : '🚀 派手じゃなくても、この積み重ねはきっと未来を変える。';

  return [
    `🔥 ${achievements.length}件の習慣でマイルストーン達成。`,
    '少しずつでも、続けた分だけ前に進めてる。',
    ...lines,
    footerLine,
    '#やめログ',
  ].filter(Boolean).join('\n');
}

export async function shareAchievementText(achievements: HabitAchievementMilestone[]): Promise<ShareAchievementResult> {
  const text = buildAchievementShareText(achievements);

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'やめログ',
        text,
      });
      return { status: 'shared' };
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { status: 'cancelled' };
    }
    throw error;
  }

  await navigator.clipboard.writeText(text);
  return { status: 'copied' };
}
