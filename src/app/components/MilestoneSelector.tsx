import { useMemo } from 'react';
import {
  getMatchingMilestonePreset,
  MILESTONE_PRESET_OPTIONS,
  normalizeMilestonesToPreset,
  sanitizeMilestoneDays,
} from '../constants/milestones';
import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

interface MilestoneSelectorProps {
  value: number[];
  onChange: (days: number[]) => void;
}

export function MilestoneSelector({ value, onChange }: MilestoneSelectorProps) {
  const { settings } = useSettings();
  const themeColor = COLOR_MAP[settings.themeColor];

  const normalizedDays = useMemo(() => normalizeMilestonesToPreset(value), [value]);
  const activePreset = useMemo(() => getMatchingMilestonePreset(normalizedDays), [normalizedDays]);

  const handleSelectPreset = (days: number[]) => {
    onChange(sanitizeMilestoneDays(days));
  };

  return (
    <div className="flex flex-col gap-[14px] items-start w-full">
      <div className="flex flex-col gap-[4px] items-start w-full">
        <p className="text-[#454545] text-[14px] tracking-[0.616px] font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]">
          マイルストーン
        </p>
        <p className="text-[#8b95a7] text-[12px] leading-[18px] font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]">
          以下のプリセットから1つ選択してください
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[8px] w-full">
        {MILESTONE_PRESET_OPTIONS.map((preset) => {
          const isActive = activePreset?.key === preset.key;

          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => handleSelectPreset(preset.days)}
              className={`rounded-[12px] border px-[14px] py-[12px] text-left transition-colors ${isActive ? 'border-current bg-white' : 'border-[#e6e6e6] bg-[#fafafa]'
                }`}
              style={{ color: isActive ? themeColor : undefined }}
            >
              <div className="flex items-center justify-between gap-[12px]">
                <p className="text-[14px] leading-[18px] font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] text-[#454545]">
                  {preset.label}
                </p>
                {isActive && (
                  <span className="rounded-full px-[8px] py-[4px] text-[11px] leading-none text-white" style={{ backgroundColor: themeColor }}>
                    選択中
                  </span>
                )}
              </div>
              <p className="mt-[4px] text-[12px] leading-[18px] text-[#8b95a7]">
                {preset.description}
              </p>
              {!['daily', 'weekly', 'monthly'].includes(preset.key) && (
                <p className="mt-[6px] text-[12px] leading-[18px] text-[#6b6b6b]">
                  {preset.displayText ?? `${preset.days.join(' / ')}日`}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {activePreset?.key === 'daily' && (
        <p className="w-full rounded-[10px] bg-[#fff6ec] px-[12px] py-[10px] text-[12px] leading-[18px] text-[#b36b2f]">
          1日ごとは通知が多くなります。通知ONの場合は端末側の通知数にもご注意ください。
        </p>
      )}

      <div className="w-full rounded-[10px] bg-[#f8f8f8] px-[12px] py-[10px]">
        <p className="text-[12px] leading-[18px] text-[#6b6b6b]">
          選択中: {activePreset?.label ?? '標準'}
        </p>
        <p className="mt-[2px] text-[12px] leading-[18px] text-[#8b95a7]">
          {activePreset?.displayText ?? '1日, 7日, 14日 ... 365日以降は30日ごと'}
        </p>
      </div>
    </div>
  );
}