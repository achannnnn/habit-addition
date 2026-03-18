import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileHeader } from '../components/MobileHeader';
import { MobileFooter } from '../components/MobileFooter';
import { FormField } from '../components/FormField';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { useHabits } from '../contexts/HabitsContext';
import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';
import type { HabitFormData } from '../types/habit';

export function AddHabit() {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const { settings } = useSettings();
  const isEnglish = settings.language === 'en';
  const themeColor = COLOR_MAP[settings.themeColor];

  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    dailyUsage: '',
    costPerUnit: '',
    notificationEnabled: true,
  });

  const handleSubmit = () => {
    // 必須フィールドのバリデーション
    if (!formData.name.trim()) {
      alert(isEnglish ? 'Please enter a habit name' : '習慣の名前を入力してください');
      return;
    }

    // 習慣を追加
    const now = new Date();
    addHabit({
      name: formData.name,
      dailyUsage: formData.dailyUsage || undefined,
      costPerUnit: formData.costPerUnit || undefined,
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
      className="min-h-screen w-full max-w-[375px] mx-auto relative overflow-x-hidden"
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