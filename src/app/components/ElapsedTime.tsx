import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

interface ElapsedTimeProps {
  days: number;
  hours: number;
  minutes: number;
}

export function ElapsedTime({ days, hours, minutes }: ElapsedTimeProps) {
  const { settings } = useSettings();
  const isEnglish = settings.language === 'en';
  const themeColor = COLOR_MAP[settings.themeColor];

  return (
    <div className="flex gap-[4px] items-center">
      {/* 日数 */}
      <div className="flex gap-[2px] items-end">
        <p className={`leading-none text-[26px] tracking-[0.52px] ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Lato:Medium',sans-serif]"
          }`} style={{ color: themeColor }}>
          {days}
        </p>
        <div className="flex flex-col items-center justify-center w-auto">
          <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
            }`}>
            {isEnglish ? 'day' : '日'}
          </p>
        </div>
      </div>

      {/* 時間 */}
      <div className="flex gap-[2px] items-end">
        <p className={`leading-none text-[26px] tracking-[0.52px] ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Lato:Medium',sans-serif]"
          }`} style={{ color: themeColor }}>
          {hours}
        </p>
        <div className="flex flex-col items-center justify-center">
          <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
            }`}>
            {isEnglish ? 'h' : '時間'}
          </p>
        </div>
      </div>

      {/* 分 */}
      <div className="flex gap-[2px] items-end">
        <p className={`leading-none text-[26px] tracking-[0.52px] ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Lato:Medium',sans-serif]"
          }`} style={{ color: themeColor }}>
          {minutes}
        </p>
        <div className="flex flex-col items-center justify-center">
          <p className={`leading-[20px] text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap ${isEnglish ? "font-['Lato:Medium',sans-serif]" : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
            }`}>
            {isEnglish ? 'm' : '分'}
          </p>
        </div>
      </div>
    </div>
  );
}