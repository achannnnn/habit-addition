import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useHabits } from '../contexts/HabitsContext';
import { useSettings } from '../contexts/SettingsContext';
import { MobileFooter } from '../components/MobileFooter';
import { EditHabitModal } from '../components/EditHabitModal';
import { calculateElapsedTime } from '../utils/timeCalculator';
import { COLOR_MAP } from '../types/settings';
import svgPaths from '../../imports/svg-ljemd4bgmx';

export function HabitDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHabit, resetHabitCounter } = useHabits();
  const { settings } = useSettings();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const habit = getHabit(id || '');
  const isEnglish = settings.language === 'en';
  const themeColor = COLOR_MAP[settings.themeColor];

  // リアルタイムで経過時間を更新
  const [elapsedTime, setElapsedTime] = useState(() =>
    habit ? calculateElapsedTime(habit.lastResetDate) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  useEffect(() => {
    if (!habit) return;

    // 初回計算
    setElapsedTime(calculateElapsedTime(habit.lastResetDate));

    // 1分ごとに更新
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime(habit.lastResetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [habit?.lastResetDate]);

  // やめられた量を計算
  const savedCount = useMemo(() => {
    if (!habit?.dailyUsage) return 0;

    const match = habit.dailyUsage.match(/(\d+)/);
    if (!match) return 0;

    const dailyCount = parseInt(match[1]);
    return Math.floor(elapsedTime.days * dailyCount + (elapsedTime.hours / 24) * dailyCount);
  }, [habit, elapsedTime]);

  // 節約できた金額を計算
  const savedMoney = useMemo(() => {
    if (!habit?.costPerUnit) return 0;

    const match = habit.costPerUnit.match(/(\d+)/);
    if (!match) return 0;

    const costPerUnit = parseInt(match[1]);
    return savedCount * costPerUnit;
  }, [habit, savedCount]);

  // 単位を抽出
  const countUnit = useMemo(() => {
    if (!habit?.dailyUsage) return '';

    const match = habit.dailyUsage.match(/[^\d\s]+/);
    return match ? match[0] : '';
  }, [habit]);

  if (!habit) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">習慣が見つかりません</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleResetCounter = () => {
    if (id) {
      resetHabitCounter(id);
    }
    setIsResetConfirmOpen(false);
  };

  const handleOpenResetConfirm = () => {
    setIsResetConfirmOpen(true);
  };

  const handleCloseResetConfirm = () => {
    setIsResetConfirmOpen(false);
  };

  // 開始日時のフォーマット
  const formatStartDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (isEnglish) {
      return `Start: ${month}/${day}/${year} ${hours}:${minutes.toString().padStart(2, '0')}`;
    }
    return `開始日時：${year}年${month}月${day}日${hours}時${minutes}分`;
  };

  return (
    <div className="bg-[#eee] min-h-screen w-full max-w-[375px] mx-auto relative overflow-hidden">
      {/* Footer */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[375px]" />

      {/* Header */}
      <div className="absolute h-[172px] left-0 overflow-clip top-0 w-[375px]">
        <div className="absolute h-[172px] left-0 rounded-bl-[40px] rounded-br-[40px] top-0 w-[375px]" style={{ backgroundColor: themeColor }} />
        <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[27px] top-[71px] w-[318px]">
          {/* 戻るボタン */}
          <button
            onClick={handleBack}
            className="relative shrink-0 size-[24px] flex items-center justify-center"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d={svgPaths.p148b3700}
                fill="white"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {/* タイトルとハンバーガーメニュー */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className={`leading-[20px] text-white text-[26px] tracking-[1.144px] whitespace-nowrap ${isEnglish
              ? "font-['Lato:Bold',sans-serif]"
              : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
              }`}>
              {habit.name}
            </p>
            <button
              onClick={handleOpenEditModal}
              className="relative shrink-0 size-[24px] flex items-center justify-center"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <mask height="24" id="mask0_2_2137" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                  <rect fill="#D9D9D9" height="24" width="24" />
                </mask>
                <g mask="url(#mask0_2_2137)">
                  <path d={svgPaths.pd10700} fill="white" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="fixed content-stretch flex flex-col gap-[48px] items-start left-1/2 -translate-x-1/2 top-[201px] w-[315px]">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          {/* やめた時間 */}
          <div className="bg-white relative rounded-[12px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
              <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[52px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" fill="#D9D9D9" r="26" />
                  </svg>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                  <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                    ? "font-['Lato:Medium',sans-serif]"
                    : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                    }`}>
                    {isEnglish ? 'Time Saved' : 'やめた時間'}
                  </p>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    {/* 日数 */}
                    <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                      <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                        {elapsedTime.days}
                      </p>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
                        <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] w-full ${isEnglish
                          ? "font-['Lato:Medium',sans-serif]"
                          : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                          }`}>
                          {isEnglish ? 'day' : '日'}
                        </p>
                      </div>
                    </div>
                    {/* 時間 */}
                    <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                      <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                        {elapsedTime.hours}
                      </p>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
                        <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap ${isEnglish
                          ? "font-['Lato:Medium',sans-serif]"
                          : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                          }`}>
                          {isEnglish ? 'h' : '時間'}
                        </p>
                      </div>
                    </div>
                    {/* 分 */}
                    <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                      <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                        {elapsedTime.minutes}
                      </p>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
                        <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap ${isEnglish
                          ? "font-['Lato:Medium',sans-serif]"
                          : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                          }`}>
                          {isEnglish ? 'm' : '分'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* やめられた量 */}
          {habit.dailyUsage && (
            <div className="bg-white relative rounded-[12px] shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
                <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
                  <div className="relative shrink-0 size-[52px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" fill="#D9D9D9" r="26" />
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                    <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                      ? "font-['Lato:Medium',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                      }`}>
                      {isEnglish ? 'Count Saved' : 'やめられた量'}
                    </p>
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                        <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                          {savedCount}
                        </p>
                        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
                          <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap w-full ${isEnglish
                            ? "font-['Lato:Medium',sans-serif]"
                            : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                            }`}>
                            {countUnit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 節約できた金額 */}
          {habit.costPerUnit && (
            <div className="bg-white relative rounded-[12px] shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
                <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
                  <div className="relative shrink-0 size-[52px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" fill="#D9D9D9" r="26" />
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                    <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                      ? "font-['Lato:Medium',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                      }`}>
                      {isEnglish ? 'Money Saved' : '節約できた金額'}
                    </p>
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                        <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                          {savedMoney}
                        </p>
                        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
                          <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] w-full ${isEnglish
                            ? "font-['Lato:Medium',sans-serif]"
                            : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                            }`}>
                            {isEnglish ? '¥' : '円'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 開始日時 */}
          <p className={`leading-[20px] text-[#959595] text-[14px] text-center tracking-[0.616px] w-full ${isEnglish
            ? "font-['Lato:Medium',sans-serif]"
            : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
            }`}>
            {formatStartDate(habit.createdAt)}
          </p>
        </div>

        {/* リセットボタン */}
        <button
          onClick={handleOpenResetConfirm}
          className="h-[52px] relative rounded-[100px] shrink-0 w-full"
          style={{ backgroundColor: themeColor }}
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
              <p className={`leading-[20px] text-[16px] text-center text-white tracking-[0.016px] whitespace-nowrap ${isEnglish
                ? "font-['Lato:SemiBold',sans-serif]"
                : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                }`}>
                {isEnglish ? 'Reset Counter' : 'カウンターをリセット'}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditHabitModal
          habit={habit}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <>
          <div
            className="absolute bg-[rgba(14,14,14,0.5)] h-full left-0 top-0 w-[375px] z-30"
            onClick={handleCloseResetConfirm}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[300px]">
            <div className="bg-white rounded-[20px] p-[24px] shadow-lg">
              <div className="flex flex-col gap-[20px] items-center">
                <h3 className={`text-[18px] text-[#454545] text-center leading-[24px] ${isEnglish
                  ? "font-['Lato:Bold',sans-serif]"
                  : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
                  }`}>
                  {isEnglish ? 'Reset Counter?' : '本当にリセットしますか？'}
                </h3>

                <p className={`text-[14px] text-[#6b6b6b] text-center leading-[20px] ${isEnglish
                  ? "font-['Lato:Medium',sans-serif]"
                  : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                  }`}>
                  {isEnglish
                    ? 'Elapsed time and counters will return to zero.'
                    : '経過時間とカウンターが0に戻ります。'}
                </p>

                <div className="flex gap-[12px] w-full">
                  <button
                    onClick={handleCloseResetConfirm}
                    className="flex-1 bg-white h-[44px] rounded-[100px]"
                    style={{ border: `1px solid ${themeColor}` }}
                  >
                    <p
                      className={`text-[14px] leading-[20px] text-center ${isEnglish
                        ? "font-['Lato:SemiBold',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                        }`}
                      style={{ color: themeColor }}
                    >
                      {isEnglish ? 'Cancel' : 'キャンセル'}
                    </p>
                  </button>

                  <button
                    onClick={handleResetCounter}
                    className="flex-1 h-[44px] rounded-[100px]"
                    style={{ backgroundColor: themeColor }}
                  >
                    <p className={`text-white text-[14px] leading-[20px] text-center ${isEnglish
                      ? "font-['Lato:SemiBold',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                      }`}>
                      {isEnglish ? 'Reset' : 'リセット'}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}