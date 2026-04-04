import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { HabitAchievementMilestone } from '../utils/achievementMilestones';
import { shareAchievementText } from '../utils/achievementShare';

const CELEBRATION_IMAGE_SRC = '/habit-icons/g10.png?v=20260405';

interface AchievementMilestoneModalProps {
  achievements: HabitAchievementMilestone[];
  onClose: () => void;
}

export function AchievementMilestoneModal({ achievements, onClose }: AchievementMilestoneModalProps) {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const isSingleAchievement = achievements.length === 1;
  const title = achievements.length === 1 ? 'おめでとう！！' : 'まとめて達成！！';

  const summaryText = achievements.length === 1
    ? `${achievements[0].habitName}をやめられた日数が`
    : `${achievements.length}件の習慣がマイルストーン達成しました`;

  const singleAchievement = achievements[0];

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);
    try {
      const result = await shareAchievementText(achievements);

      if (result.status === 'copied') {
        alert('共有文をクリップボードにコピーしました。Xに貼り付けて投稿してください。');
      }
    } catch {
      alert('共有文の作成に失敗しました。時間をおいてもう一度お試しください。');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,14,14,0.45)] px-[18px]" onClick={onClose}>
      <div
        className="w-full max-w-[420px] overflow-hidden rounded-[22px] bg-[#eef5fb] shadow-[0_20px_50px_rgba(41,61,84,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="flex max-h-[min(82vh,720px)] flex-col items-center px-[28px] pb-[30px] pt-[18px] text-center"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.32) 0, rgba(255,255,255,0.32) 19%, transparent 19%, transparent 50%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.32) 69%, transparent 69%, transparent 100%)',
            backgroundSize: '112px 100%',
          }}
        >
          <ImageWithFallback
            src={CELEBRATION_IMAGE_SRC}
            alt="達成を祝うクラッカーのイラスト"
            className="h-[150px] w-[150px] object-contain"
          />
          {isSingleAchievement ? (
            <div className="mt-[4px] w-full font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] text-[#f58e5a]">
              <p className="text-[28px] leading-[1.25] tracking-[0.03em]">{title}</p>
              <p className="mt-[8px] text-[18px] leading-[1.45] tracking-[0.02em]">
                {summaryText}
              </p>
              <p className="text-[22px] leading-[1.35] tracking-[0.04em]">{singleAchievement.days}日達成！！</p>
            </div>
          ) : (
            <>
              <div className="mt-[4px] w-full font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] text-[#f58e5a]">
                <p className="text-[28px] leading-[1.25] tracking-[0.03em]">{title}</p>
                <p className="mt-[8px] text-[18px] leading-[1.45] tracking-[0.02em]">
                  {summaryText}
                </p>
              </div>
              <div className="mt-[18px] w-full overflow-y-auto rounded-[18px] bg-white/70 px-[16px] py-[14px] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <div className="flex flex-col gap-[10px]">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.achievementKey}
                      className="flex items-center justify-between gap-[12px] rounded-[14px] bg-white px-[14px] py-[12px] shadow-[0_6px_16px_rgba(60,64,108,0.06)]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] text-[16px] leading-[1.35] text-[#5b5b5b]">
                          {achievement.habitName}
                        </p>
                        <p className="mt-[2px] font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] text-[12px] leading-[1.4] text-[#8b95a7]">
                          マイルストーン達成
                        </p>
                      </div>
                      <div className="shrink-0 rounded-full bg-[#fef1ea] px-[12px] py-[7px] font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] text-[15px] leading-none text-[#f58e5a]">
                        {achievement.days}日
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            </>
          )}
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="mt-[18px] min-w-[200px] rounded-full bg-[#f58e5a] px-[24px] py-[12px] text-[15px] leading-[20px] text-white shadow-[0_10px_22px_rgba(245,142,90,0.24)] font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] disabled:opacity-60"
          >
            {isSharing ? '共有文を準備中...' : 'テキストを共有する'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-[24px] min-w-[160px] rounded-full bg-white px-[24px] py-[12px] text-[15px] leading-[20px] text-[#f58e5a] shadow-[0_6px_16px_rgba(60,64,108,0.08)] font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
          >
            {isSingleAchievement ? '閉じる' : 'まとめて閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
}
