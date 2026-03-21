import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileHeader } from '../components/MobileHeader';
import { MobileFooter } from '../components/MobileFooter';
import { FormField } from '../components/FormField';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { HabitIcon } from '../components/HabitIcon';
import { useHabits } from '../contexts/HabitsContext';
import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';
import type { HabitFormData } from '../types/habit';
import { HABIT_ICON_OPTIONS } from '../constants/habitIcons';

export function AddHabit() {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const { settings } = useSettings();
  const themeColor = COLOR_MAP[settings.themeColor];

  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    dailyUsage: '',
    costPerUnit: '',
    icon: 'none',
    notificationEnabled: true,
  });

  const handleSubmit = () => {
    // 必須フィールドのバリデーション
    if (!formData.name.trim()) {
      alert('習慣の名前を入力してください');
      return;
    }
    if (formData.name.length > 10) {
      alert('習慣の名前は10文字以内で入力してください');
      return;
    }

    // 習慣を追加
    const now = new Date();
    addHabit({
      name: formData.name,
      dailyUsage: formData.dailyUsage || undefined,
      costPerUnit: formData.costPerUnit || undefined,
      icon: formData.icon,
      color: settings.themeColor,
      notificationEnabled: formData.notificationEnabled,
      createdAt: now,
      lastResetDate: now,
      totalDays: 0,
      currentStreak: 0,
    });

    // 習慣一覧画面に遷移
    navigate('/');
  };

  return (
    <div
      className="min-h-screen w-full max-w-[560px] mx-auto relative overflow-x-hidden"
      style={{ backgroundColor: COLOR_MAP[settings.themeColor] }}
    >
      {/* ヘッダー */}
      <MobileHeader />

      {/* メインコンテンツ */}
      <div className="px-[30px] pt-[196px] pb-[48px] flex flex-col gap-[48px]">
        {/* フォームセクション */}
        <div className="flex flex-col gap-[16px]">
          {/* やめたい習慣の名前 */}
          <div className="bg-white rounded-[12px] p-[20px] pb-[22px] pt-[14px]">
            <FormField
              label="やめたい習慣の名前"
              required
              placeholder="例：ゲーム"
              maxLength={10}
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
          </div>

          {/* 1日の使用数または時間 */}
          <div className="bg-white rounded-[12px] p-[20px] pb-[22px] pt-[14px]">
            <FormField
              label="1日の使用数または時間"
              placeholder="2時間"
              value={formData.dailyUsage}
              onChange={(value) => setFormData({ ...formData, dailyUsage: value })}
            />
          </div>

          {/* 1回あたりの金額 */}
          <div className="bg-white rounded-[12px] p-[20px] pb-[22px] pt-[14px]">
            <FormField
              label="1回あたりの金額"
              placeholder="500円"
              value={formData.costPerUnit}
              onChange={(value) => setFormData({ ...formData, costPerUnit: value })}
            />
          </div>

          {/* 通知 */}
          <div className="bg-white rounded-[12px] p-[20px]">
            <ToggleSwitch
              label="通知"
              enabled={formData.notificationEnabled}
              onChange={(enabled) => setFormData({ ...formData, notificationEnabled: enabled })}
            />
          </div>

          {/* アイコン */}
          <div className="bg-white rounded-[12px] p-[20px] flex flex-col gap-[14px]">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] text-[#454545] text-[14px] tracking-[0.616px]">
              アイコン
            </p>

            <div className="grid grid-cols-3 gap-[8px]">
              {HABIT_ICON_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: option.value })}
                  className={`rounded-[12px] border px-[8px] py-[8px] flex flex-col items-center gap-[6px] transition-colors ${formData.icon === option.value ? 'border-current' : 'border-[#e6e6e6]'
                    }`}
                  style={{ color: formData.icon === option.value ? themeColor : undefined }}
                >
                  <HabitIcon icon={option.value} color={settings.themeColor} className="size-[44px]" />
                  <p className="text-[11px] leading-[14px] text-[#454545] tracking-[0.2px] font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] text-center">
                    {option.labelJa}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 追加ボタン */}
        <button
          onClick={handleSubmit}
          className="bg-white h-[52px] rounded-[100px] flex items-center justify-center px-[24px] py-[16px] hover:bg-opacity-95 active:scale-98 transition-all"
        >
          <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] text-[16px] text-center tracking-[0.016px]" style={{ color: themeColor }}>
            習慣を追加
          </p>
        </button>
      </div>

      {/* フッター */}
      <MobileFooter />
    </div>
  );
}