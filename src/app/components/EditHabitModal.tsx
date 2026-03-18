import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useHabits } from '../contexts/HabitsContext';
import { useSettings } from '../contexts/SettingsContext';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { COLOR_MAP } from '../types/settings';
import type { Habit } from '../types/habit';
import svgPaths from '../../imports/svg-1wmzhoy7t9';

interface EditHabitModalProps {
  habit: Habit;
  onClose: () => void;
}

export function EditHabitModal({ habit, onClose }: EditHabitModalProps) {
  const ANIMATION_MS = 280;
  const navigate = useNavigate();
  const { updateHabit, deleteHabit } = useHabits();
  const { settings, updateLanguage } = useSettings();
  const isEnglish = settings.language === 'en';
  const themeColor = COLOR_MAP[settings.themeColor];

  const [formData, setFormData] = useState({
    name: habit.name,
    dailyUsage: habit.dailyUsage || '',
    costPerUnit: habit.costPerUnit || '',
    notificationEnabled: habit.notificationEnabled,
  });

  const [localLanguage, setLocalLanguage] = useState<'ja' | 'en'>(settings.language);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const modalPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleCloseAnimated = () => {
    setIsDragging(false);
    setDragOffsetY(0);
    setIsVisible(false);
    window.setTimeout(() => {
      onClose();
    }, ANIMATION_MS);
  };

  const handleDragStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (showDeleteConfirm) return;
    if (modalPanelRef.current && modalPanelRef.current.scrollTop > 0) return;

    setIsDragging(true);
    setDragStartY(event.touches[0].clientY);
    setDragOffsetY(0);
  };

  const handleDragMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaY = event.touches[0].clientY - dragStartY;
    setDragOffsetY(deltaY > 0 ? deltaY : 0);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (dragOffsetY > 120) {
      handleCloseAnimated();
      return;
    }

    setDragOffsetY(0);
  };

  const handleSave = () => {
    updateHabit(habit.id, {
      name: formData.name,
      dailyUsage: formData.dailyUsage || undefined,
      costPerUnit: formData.costPerUnit || undefined,
      notificationEnabled: formData.notificationEnabled,
    });

    // 言語設定が変更されていれば更新
    if (localLanguage !== settings.language) {
      updateLanguage(localLanguage);
    }

    handleCloseAnimated();
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    navigate('/');
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(14,14,14,0.5)] z-10 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={handleCloseAnimated}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-20 flex justify-center pointer-events-none">
        <div
          ref={modalPanelRef}
          className={`pointer-events-auto w-full max-w-[375px] fixed top-[78px] bottom-0 overflow-y-auto rounded-tl-[20px] rounded-tr-[20px] ${isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out'} ${isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
          style={{
            backgroundColor: themeColor,
            transform: isDragging ? `translateY(${dragOffsetY}px)` : undefined,
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[10px] z-30 h-[5px] w-[56px] rounded-full bg-white/55"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
          />
          {/* Header */}
          <div className="absolute flex items-start justify-between left-[30px] top-[43px] w-[315px]">
            <div className="flex flex-col gap-[6px] items-start justify-center">
              <p className={`text-[26px] text-white tracking-[1.144px] leading-[20px] ${isEnglish
                ? "font-['Lato:Bold',sans-serif]"
                : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
                }`}>
                {isEnglish ? 'Edit' : '編集'}
              </p>
              <p className={`text-[#fff] text-[10px] tracking-[0.44px] leading-[20px] ${isEnglish
                ? "font-['Lato:Bold',sans-serif]"
                : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
                }`}>
                {isEnglish ? `Edit ${habit.name}` : `${habit.name}の編集`}
              </p>
            </div>
            <button
              onClick={handleCloseAnimated}
              className="relative shrink-0 size-[24px]"
            >
              <div className="absolute inset-[20.83%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d={svgPaths.pde5d900} fill="white" />
                </svg>
              </div>
            </button>
          </div>

          {/* Form Fields */}
          <div className="absolute flex flex-col gap-[48px] items-start left-[30px] top-[123px] w-[315px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              {/* 習慣名 */}
              <div className="bg-white relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-col items-start pb-[22px] pt-[14px] px-[20px] w-full">
                  <div className="flex flex-col gap-[6px] h-[69px] items-start w-full">
                    <div className="flex gap-[10px] items-center justify-center">
                      <p className={`leading-[20px] text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Habit Name' : 'やめたい習慣の名前'}
                      </p>
                      <p className={`leading-[20px] text-[12px] tracking-[0.528px] whitespace-nowrap text-[#ff0000] ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Required' : '必須'}
                      </p>
                    </div>
                    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex items-center p-[12px] w-full h-full rounded-[8px] border border-[#e0dede] bg-white text-[#454545] text-[14px] tracking-[0.014px] font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] outline-none"
                        onFocus={(e) => e.target.style.borderColor = themeColor}
                        onBlur={(e) => e.target.style.borderColor = '#e0dede'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 1日の使用数または時間 */}
              <div className="bg-white relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-col items-start pb-[22px] pt-[14px] px-[20px] w-full">
                  <div className="flex flex-col gap-[6px] h-[69px] items-start w-full">
                    <div className="flex gap-[10px] items-center justify-center">
                      <p className={`leading-[20px] text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Daily Usage' : '1日の使用数または時間'}
                      </p>
                      <p className={`leading-[20px] text-[#6b6b6b] text-[12px] tracking-[0.528px] whitespace-nowrap ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Optional' : '任意'}
                      </p>
                    </div>
                    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full">
                      <input
                        type="text"
                        value={formData.dailyUsage}
                        onChange={(e) => setFormData({ ...formData, dailyUsage: e.target.value })}
                        className="flex items-center p-[12px] w-full h-full rounded-[8px] border border-[#e0dede] bg-white text-[#454545] text-[14px] tracking-[0.014px] font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] outline-none"
                        placeholder={isEnglish ? '2 hours' : '2時間'}
                        onFocus={(e) => e.target.style.borderColor = themeColor}
                        onBlur={(e) => e.target.style.borderColor = '#e0dede'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 1回あたりの金額 */}
              <div className="bg-white relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-col items-start pb-[22px] pt-[14px] px-[20px] w-full">
                  <div className="flex flex-col gap-[6px] h-[69px] items-start w-full">
                    <div className="flex gap-[10px] items-center justify-center">
                      <p className={`leading-[20px] text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Cost Per Unit' : '1回あたりの金額'}
                      </p>
                      <p className={`leading-[20px] text-[#6b6b6b] text-[12px] tracking-[0.528px] whitespace-nowrap ${isEnglish
                        ? "font-['Lato:Medium',sans-serif]"
                        : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                        }`}>
                        {isEnglish ? 'Optional' : '任意'}
                      </p>
                    </div>
                    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full">
                      <input
                        type="text"
                        value={formData.costPerUnit}
                        onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                        className="flex items-center p-[12px] w-full h-full rounded-[8px] border border-[#e0dede] bg-white text-[#454545] text-[14px] tracking-[0.014px] font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] outline-none"
                        placeholder={isEnglish ? '500 yen' : '500円'}
                        onFocus={(e) => e.target.style.borderColor = themeColor}
                        onBlur={(e) => e.target.style.borderColor = '#e0dede'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 通知 */}
              <div className="bg-white relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-col items-start p-[20px] w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className={`leading-[20px] text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap ${isEnglish
                      ? "font-['Lato:Medium',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
                      }`}>
                      {isEnglish ? 'Notification' : '通知'}
                    </p>
                    <button
                      onClick={() => setFormData({ ...formData, notificationEnabled: !formData.notificationEnabled })}
                      className={`relative h-[14px] w-[35px] rounded-[64.706px] transition-colors duration-200 ${formData.notificationEnabled ? '' : 'bg-[#e0e0e0]'
                        }`}
                      style={{
                        backgroundColor: formData.notificationEnabled ? `${themeColor}30` : undefined,
                      }}
                    >
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_1.941px_5.176px_0px_rgba(0,0,0,0.15),0px_1.941px_0.647px_0px_rgba(0,0,0,0.06)] transition-all duration-200"
                        style={{
                          left: formData.notificationEnabled ? '44.74%' : '2.63%',
                          backgroundColor: formData.notificationEnabled ? themeColor : '#9d9d9d',
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-[20px] items-start w-full">
              <button
                onClick={handleSave}
                className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="flex gap-[6px] items-center justify-center px-[24px] py-[16px] size-full">
                    <p className={`leading-[20px] text-[16px] text-center tracking-[0.016px] whitespace-nowrap ${isEnglish
                      ? "font-['Lato:SemiBold',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                      }`} style={{ color: themeColor }}>
                      {isEnglish ? 'Save Settings' : '設定を保存'}
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="flex gap-[6px] items-center justify-center px-[24px] py-[16px] size-full">
                    <p className={`leading-[20px] text-[16px] text-center tracking-[0.016px] whitespace-nowrap ${isEnglish
                      ? "font-['Lato:SemiBold',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                      }`} style={{ color: themeColor }}>
                      {isEnglish ? 'Delete Habit' : '習慣を削除'}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          habitName={habit.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}