import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';
import type { Language } from '../types/settings';

interface LanguageSelectorProps {
  selected: Language;
  onChange: (language: Language) => void;
}

export function LanguageSelector({ selected, onChange }: LanguageSelectorProps) {
  const { settings } = useSettings();
  const themeColor = COLOR_MAP[settings.themeColor];

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {/* ラベル */}
      <div className="flex gap-[10px] items-center justify-start">
        <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] text-[#454545] text-[14px] tracking-[0.616px]">
          単位の言語設定
        </p>
      </div>
      
      {/* ボタン */}
      <div className="flex gap-[6px] items-start w-full">
        {/* 日本語ボタン */}
        <button
          onClick={() => onChange('ja')}
          className="flex-1 h-[42px] rounded-[100px] transition-all"
          style={
            selected === 'ja'
              ? { backgroundColor: themeColor }
              : { backgroundColor: 'white', border: `1px solid ${themeColor}` }
          }
        >
          <div className="flex items-center justify-center px-[24px] py-[16px] size-full">
            <p 
              className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] text-[16px] text-center tracking-[0.016px]"
              style={{ color: selected === 'ja' ? 'white' : themeColor }}
            >
              日本語
            </p>
          </div>
        </button>
        
        {/* 英語ボタン */}
        <button
          onClick={() => onChange('en')}
          className="flex-1 h-[42px] rounded-[100px] transition-all"
          style={
            selected === 'en'
              ? { backgroundColor: themeColor }
              : { backgroundColor: 'white', border: `1px solid ${themeColor}` }
          }
        >
          <div className="flex items-center justify-center px-[24px] py-[16px] size-full">
            <p 
              className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] text-[16px] text-center tracking-[0.016px]"
              style={{ color: selected === 'en' ? 'white' : themeColor }}
            >
              英語
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}