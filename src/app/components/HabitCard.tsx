import { useState, useEffect } from 'react';
import { ElapsedTime } from './ElapsedTime';
import { HabitIcon } from './HabitIcon';
import { calculateElapsedTime } from '../utils/timeCalculator';
import { useSettings } from '../contexts/SettingsContext';
import type { Habit } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  onClick?: () => void;
}

export function HabitCard({ habit, onClick }: HabitCardProps) {
  const { settings } = useSettings();
  const [elapsed, setElapsed] = useState(() => calculateElapsedTime(habit.lastResetDate));

  useEffect(() => {
    // 初回計算
    setElapsed(calculateElapsedTime(habit.lastResetDate));

    // 1分ごとに更新
    const interval = setInterval(() => {
      setElapsed(calculateElapsedTime(habit.lastResetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [habit.lastResetDate]);

  return (
    <button
      type="button"
      className="bg-white rounded-[12px] w-full cursor-pointer hover:bg-gray-50 transition-colors text-left"
      onClick={onClick}
    >
      <div className="flex flex-col items-start px-[10px] py-[18px] w-full">
        <div className="flex gap-[14px] items-center w-full">
          {/* アイコン */}
          <HabitIcon icon={habit.icon} color={settings.themeColor} />

          {/* 習慣名と経過時間 */}
          <div className="flex flex-1 flex-col gap-[4px] items-start min-h-px min-w-px">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] text-[#454545] text-[15px] tracking-[0.616px] w-full">
              {habit.name}
            </p>
            <ElapsedTime
              days={elapsed.days}
              hours={elapsed.hours}
              minutes={elapsed.minutes}
            />
          </div>
        </div>
      </div>
    </button>
  );
}