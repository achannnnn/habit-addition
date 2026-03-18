import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ToggleSwitch({ label, enabled, onChange }: ToggleSwitchProps) {
  const { settings } = useSettings();
  const themeColor = COLOR_MAP[settings.themeColor];

  return (
    <div className="flex items-center justify-between w-full">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] text-[#454545] text-[14px] tracking-[0.616px]">
        {label}
      </p>
      
      {/* トグルスイッチ */}
      <button
        onClick={() => onChange(!enabled)}
        className={`relative h-[14px] w-[35px] rounded-[64.706px] transition-colors duration-200 ${
          enabled ? '' : 'bg-[#e0e0e0]'
        }`}
        style={{
          backgroundColor: enabled ? `${themeColor}30` : undefined
        }}
        aria-label={`${label}を${enabled ? 'オフ' : 'オン'}にする`}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_1.941px_5.176px_0px_rgba(0,0,0,0.15),0px_1.941px_0.647px_0px_rgba(0,0,0,0.06)] transition-all duration-200"
          style={{
            left: enabled ? '44.74%' : '2.63%',
            backgroundColor: enabled ? themeColor : '#9d9d9d'
          }}
        />
      </button>
    </div>
  );
}