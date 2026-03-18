import { useNavigate } from 'react-router';
import { MobileHeader } from '../components/MobileHeader';
import { MobileFooter } from '../components/MobileFooter';
import { HabitCard } from '../components/HabitCard';
import { SettingsIcon } from '../components/SettingsIcon';
import { useHabits } from '../contexts/HabitsContext';
import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

export function HabitList() {
  const navigate = useNavigate();
  const { habits } = useHabits();
  const { settings } = useSettings();

  const handleCreateHabit = () => {
    navigate('/add');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleHabitClick = (habitId: string) => {
    navigate(`/habit/${habitId}`);
  };

  return (
    <div className="bg-[#eee] min-h-screen w-full max-w-[375px] mx-auto relative overflow-hidden">
      {/* ヘッダー */}
      <div className="absolute h-[172px] left-0 overflow-clip top-0 w-full">
        {/* 背景 */}
        <div
          className="absolute h-[172px] left-0 rounded-bl-[40px] rounded-br-[40px] top-0 w-[375px]"
          style={{ backgroundColor: COLOR_MAP[settings.themeColor] }}
        />

        {/* タイトルと設定ボタン */}
        <div className="-translate-x-1/2 absolute flex items-start justify-between left-1/2 top-[91px] w-[315px]">
          <div className="flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px]">
            <p className="text-[26px] text-white tracking-[1.144px]">やめログ</p>
            <p className="text-[#fff] text-[10px] tracking-[0.44px]">やめたい習慣カウンター</p>
          </div>
          <SettingsIcon onClick={handleSettingsClick} />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="absolute flex flex-col gap-[48px] items-start left-[30px] top-[201px] w-[315px]">
        {/* 習慣リスト */}
        <div className="flex flex-col gap-[16px] items-start w-full">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={() => handleHabitClick(habit.id)}
            />
          ))}
        </div>

        {/* 習慣を作成ボタン */}
        <button
          onClick={handleCreateHabit}
          className="h-[52px] rounded-[100px] w-full hover:bg-opacity-95 active:scale-98 transition-all"
          style={{ backgroundColor: COLOR_MAP[settings.themeColor] }}
        >
          <div className="flex items-center justify-center px-[24px] py-[16px] size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] text-[16px] text-center text-white tracking-[0.016px]">
              習慣を作成
            </p>
          </div>
        </button>
      </div>

      {/* フッター */}
      <MobileFooter />
    </div>
  );
}