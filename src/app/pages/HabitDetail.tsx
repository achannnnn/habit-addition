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
  const isUnitEnglish = settings.language === 'en';
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
  const preciseSavedCount = useMemo(() => {
    if (!habit?.dailyUsage) return 0;

    const match = habit.dailyUsage.match(/(\d+)/);
    if (!match) return 0;

    const dailyCount = parseInt(match[1]);
    const elapsedDays = elapsedTime.days + elapsedTime.hours / 24 + elapsedTime.minutes / (24 * 60);

    return elapsedDays * dailyCount;
  }, [habit, elapsedTime]);

  const savedCount = useMemo(() => {
    if (preciseSavedCount === 0) return '0';

    const rounded = Math.round(preciseSavedCount * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }, [preciseSavedCount]);

  // 節約できた金額を計算
  const savedMoney = useMemo(() => {
    if (!habit?.costPerUnit) return 0;

    const match = habit.costPerUnit.match(/(\d+)/);
    if (!match) return 0;

    const costPerUnit = parseInt(match[1]);
    return Math.floor(preciseSavedCount * costPerUnit);
  }, [habit, preciseSavedCount]);

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

    return `開始日時：${year}年${month}月${day}日${hours}時${minutes}分`;
  };

  return (
    <div className="bg-[#eee] min-h-screen w-full max-w-[560px] mx-auto relative overflow-hidden">
      {/* Footer */}
      <div className="absolute bottom-0 h-[34px] left-0 w-full" />

      {/* Header */}
      <div className="absolute h-[172px] left-0 overflow-clip top-0 w-full">
        <div className="absolute h-[172px] left-0 rounded-bl-[40px] rounded-br-[40px] top-0 w-full" style={{ backgroundColor: themeColor }} />
        <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[30px] right-[30px] top-[71px] w-auto">
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
          <div className="content-stretch flex items-center justify-between gap-[12px] min-w-0 relative shrink-0 w-full">
            <p className={`flex-1 min-w-0 leading-[32px] overflow-hidden text-ellipsis text-white text-[26px] tracking-[1.144px] whitespace-nowrap ${isEnglish
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
      <div className="fixed content-stretch flex flex-col gap-[48px] items-start left-1/2 -translate-x-1/2 top-[201px] w-[calc(100%-60px)] max-w-[500px]">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          {/* やめた時間 */}
          <div className="bg-white relative rounded-[12px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
              <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[42px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                    <path d="M28.1667 27.3V19.5C28.1667 18.8861 27.959 18.3715 27.5437 17.9562C27.1285 17.5409 26.6139 17.3333 26 17.3333C25.3861 17.3333 24.8715 17.5409 24.4562 17.9562C24.041 18.3715 23.8333 18.8861 23.8333 19.5V28.1125C23.8333 28.4013 23.8875 28.6812 23.9958 28.952C24.1042 29.2229 24.2667 29.4666 24.4833 29.6833L30.55 35.75C30.9472 36.1472 31.4528 36.3458 32.0667 36.3458C32.6805 36.3458 33.1861 36.1472 33.5833 35.75C33.9805 35.3527 34.1792 34.8472 34.1792 34.2333C34.1792 33.6194 33.9805 33.1138 33.5833 32.7166L28.1667 27.3ZM18.3896 46.1229C16.0243 45.0937 13.966 43.7034 12.2146 41.952C10.4632 40.2006 9.07291 38.1423 8.04374 35.777C7.01458 33.4118 6.49999 30.875 6.49999 28.1666C6.49999 25.4583 7.01458 22.9215 8.04374 20.5562C9.07291 18.1909 10.4632 16.1326 12.2146 14.3812C13.966 12.6298 16.0243 11.2395 18.3896 10.2104C20.7549 9.1812 23.2917 8.66662 26 8.66662C28.7083 8.66662 31.2451 9.1812 33.6104 10.2104C35.9757 11.2395 38.034 12.6298 39.7854 14.3812C41.5368 16.1326 42.9271 18.1909 43.9562 20.5562C44.9854 22.9215 45.5 25.4583 45.5 28.1666C45.5 30.875 44.9854 33.4118 43.9562 35.777C42.9271 38.1423 41.5368 40.2006 39.7854 41.952C38.034 43.7034 35.9757 45.0937 33.6104 46.1229C31.2451 47.152 28.7083 47.6666 26 47.6666C23.2917 47.6666 20.7549 47.152 18.3896 46.1229ZM4.44166 15.8166C4.04444 15.4194 3.84583 14.9138 3.84583 14.3C3.84583 13.6861 4.04444 13.1805 4.44166 12.7833L10.6167 6.60828C11.0139 6.21106 11.5194 6.01245 12.1333 6.01245C12.7472 6.01245 13.2528 6.21106 13.65 6.60828C14.0472 7.00551 14.2458 7.51106 14.2458 8.12495C14.2458 8.73884 14.0472 9.2444 13.65 9.64162L7.47499 15.8166C7.07777 16.2138 6.57221 16.4125 5.95833 16.4125C5.34444 16.4125 4.83888 16.2138 4.44166 15.8166ZM47.5583 15.8166C47.1611 16.2138 46.6555 16.4125 46.0417 16.4125C45.4278 16.4125 44.9222 16.2138 44.525 15.8166L38.35 9.64162C37.9528 9.2444 37.7542 8.73884 37.7542 8.12495C37.7542 7.51106 37.9528 7.00551 38.35 6.60828C38.7472 6.21106 39.2528 6.01245 39.8667 6.01245C40.4805 6.01245 40.9861 6.21106 41.3833 6.60828L47.5583 12.7833C47.9556 13.1805 48.1542 13.6861 48.1542 14.3C48.1542 14.9138 47.9556 15.4194 47.5583 15.8166Z" fill={themeColor} />
                  </svg>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                  <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                    ? "font-['Lato:Medium',sans-serif]"
                    : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                    }`}>
                    やめた時間
                  </p>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    {/* 日数 */}
                    <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
                      <p className="font-['Lato:Medium',sans-serif] leading-none text-[26px] tracking-[0.52px] whitespace-nowrap" style={{ color: themeColor }}>
                        {elapsedTime.days}
                      </p>
                      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-auto">
                        <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] w-full ${isEnglish
                          ? "font-['Lato:Medium',sans-serif]"
                          : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                          }`}>
                          {isUnitEnglish ? 'day' : '日'}
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
                          {isUnitEnglish ? 'h' : '時間'}
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
                          {isUnitEnglish ? 'm' : '分'}
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
                  <div className="relative shrink-0 size-[42px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                      <path d="M17.55 45.9603C14.9139 44.8228 12.6208 43.2791 10.6708 41.3291C8.72081 39.3791 7.17706 37.086 6.03956 34.4499C4.90206 31.8138 4.33331 28.9971 4.33331 25.9999C4.33331 23.0027 4.90206 20.186 6.03956 17.5499C7.17706 14.9138 8.72081 12.6208 10.6708 10.6708C12.6208 8.72075 14.9139 7.177 17.55 6.0395C20.1861 4.902 23.0028 4.33325 26 4.33325C28.9972 4.33325 31.8139 4.902 34.45 6.0395C37.0861 7.177 39.3791 8.72075 41.3291 10.6708C43.2791 12.6208 44.8229 14.9138 45.9604 17.5499C47.0979 20.186 47.6666 23.0027 47.6666 25.9999C47.6666 28.9971 47.0979 31.8138 45.9604 34.4499C44.8229 37.086 43.2791 39.3791 41.3291 41.3291C39.3791 43.2791 37.0861 44.8228 34.45 45.9603C31.8139 47.0978 28.9972 47.6666 26 47.6666C23.0028 47.6666 20.1861 47.0978 17.55 45.9603ZM26 43.3332C27.95 43.3332 29.8278 43.0173 31.6333 42.3853C33.4389 41.7534 35.1 40.8416 36.6166 39.6499L12.35 15.3833C11.1583 16.8999 10.2465 18.561 9.61456 20.3666C8.98262 22.1721 8.66665 24.0499 8.66665 25.9999C8.66665 30.8388 10.3458 34.9374 13.7041 38.2957C17.0625 41.6541 21.1611 43.3332 26 43.3332ZM39.65 36.6166C40.8416 35.0999 41.7534 33.4388 42.3854 31.6333C43.0173 29.8277 43.3333 27.9499 43.3333 25.9999C43.3333 21.161 41.6541 17.0624 38.2958 13.7041C34.9375 10.3458 30.8389 8.66658 26 8.66658C24.05 8.66658 22.1722 8.98256 20.3666 9.6145C18.5611 10.2464 16.9 11.1583 15.3833 12.3499L39.65 36.6166Z" fill={themeColor} />
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                    <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                      ? "font-['Lato:Medium',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                      }`}>
                      やめられた量
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
                  <div className="relative shrink-0 size-[42px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
                      <path d="M12.8375 45.4999C12.0069 45.4999 11.2035 45.211 10.4271 44.6333C9.65067 44.0555 9.13609 43.3513 8.88331 42.5208C7.98054 39.4874 7.24026 36.8603 6.66248 34.6395C6.0847 32.4187 5.62429 30.4687 5.28123 28.7895C4.93817 27.1103 4.69442 25.6208 4.54998 24.3208C4.40554 23.0208 4.33331 21.7749 4.33331 20.5833C4.33331 17.261 5.48887 14.4444 7.79998 12.1333C10.1111 9.82214 12.9278 8.66659 16.25 8.66659H27.0833C28.0583 7.36659 29.2951 6.31936 30.7937 5.52492C32.2923 4.73047 33.9444 4.33325 35.75 4.33325C36.6528 4.33325 37.4201 4.64922 38.0521 5.28117C38.684 5.91311 39 6.68047 39 7.58325C39 7.79992 38.9729 8.01659 38.9187 8.23325C38.8646 8.44992 38.8014 8.64853 38.7291 8.82909C38.5847 9.22631 38.4493 9.62353 38.3229 10.0208C38.1965 10.418 38.0972 10.8513 38.025 11.3208L42.9541 16.2499H45.5C46.1139 16.2499 46.6284 16.4576 47.0437 16.8728C47.459 17.2881 47.6666 17.8027 47.6666 18.4166V29.7916C47.6666 30.261 47.5312 30.6763 47.2604 31.0374C46.9896 31.3985 46.6194 31.6694 46.15 31.8499L41.5458 33.3666L38.8375 42.4124C38.5486 43.3513 38.025 44.1006 37.2666 44.6603C36.5083 45.2201 35.6416 45.4999 34.6666 45.4999H30.3333C29.1416 45.4999 28.1215 45.0756 27.2729 44.227C26.4243 43.3784 26 42.3583 26 41.1666H21.6666C21.6666 42.3583 21.2423 43.3784 20.3937 44.227C19.5451 45.0756 18.525 45.4999 17.3333 45.4999H12.8375ZM13 41.1666H17.3333V36.8333H30.3333V41.1666H34.6666L38.025 30.0083L43.3333 28.2208V20.5833H41.1666L33.5833 12.9999C33.5833 12.2777 33.6284 11.5735 33.7187 10.8874C33.809 10.2013 33.9444 9.53325 34.125 8.88325C33.0778 9.17214 32.1569 9.66867 31.3625 10.3728C30.568 11.077 29.9903 11.9527 29.6291 12.9999H16.25C14.1555 12.9999 12.368 13.7402 10.8875 15.2208C9.40692 16.7013 8.66665 18.4888 8.66665 20.5833C8.66665 22.0638 9.04581 24.6006 9.80415 28.1937C10.5625 31.7867 11.6278 36.111 13 41.1666ZM36.2104 23.2103C36.6257 22.7951 36.8333 22.2805 36.8333 21.6666C36.8333 21.0527 36.6257 20.5381 36.2104 20.1228C35.7951 19.7076 35.2805 19.4999 34.6666 19.4999C34.0528 19.4999 33.5382 19.7076 33.1229 20.1228C32.7076 20.5381 32.5 21.0527 32.5 21.6666C32.5 22.2805 32.7076 22.7951 33.1229 23.2103C33.5382 23.6256 34.0528 23.8333 34.6666 23.8333C35.2805 23.8333 35.7951 23.6256 36.2104 23.2103ZM26 19.4999C26.6139 19.4999 27.1285 19.2923 27.5437 18.877C27.959 18.4617 28.1666 17.9471 28.1666 17.3333C28.1666 16.7194 27.959 16.2048 27.5437 15.7895C27.1285 15.3742 26.6139 15.1666 26 15.1666H19.5C18.8861 15.1666 18.3715 15.3742 17.9562 15.7895C17.541 16.2048 17.3333 16.7194 17.3333 17.3333C17.3333 17.9471 17.541 18.4617 17.9562 18.877C18.3715 19.2923 18.8861 19.4999 19.5 19.4999H26Z" fill={themeColor} />
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
                    <p className={`leading-[20px] min-w-full text-[#454545] text-[14px] tracking-[0.616px] w-[min-content] ${isEnglish
                      ? "font-['Lato:Medium',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                      }`}>
                      節約できた金額
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
                            円
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
                カウンターをリセット
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
            className="absolute bg-[rgba(14,14,14,0.5)] h-full left-0 top-0 w-full z-30"
            onClick={handleCloseResetConfirm}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[300px]">
            <div className="bg-white rounded-[20px] p-[24px] shadow-lg">
              <div className="flex flex-col gap-[20px] items-center">
                <h3 className={`text-[18px] text-[#454545] text-center leading-[24px] ${isEnglish
                  ? "font-['Lato:Bold',sans-serif]"
                  : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
                  }`}>
                  本当にリセットしますか？
                </h3>

                <p className={`text-[14px] text-[#6b6b6b] text-center leading-[20px] ${isEnglish
                  ? "font-['Lato:Medium',sans-serif]"
                  : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                  }`}>
                  経過時間とカウンターが0に戻ります。
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
                      キャンセル
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
                      リセット
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