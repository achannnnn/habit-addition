import { useNavigate } from 'react-router';
import svgPaths from "../../imports/svg-uc5hty5et6";
import { MobileFooter } from '../components/MobileFooter';
import { CloseIcon } from '../components/CloseIcon';
import { LanguageSelector } from '../components/LanguageSelector';
import { ColorSelector } from '../components/ColorSelector';
import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';
import type { Language, ThemeColor } from '../types/settings';

// ステータスバー用のバッテリーアイコン
function Battery() {
  return (
    <div className="absolute h-[13.5px] left-[310.5px] top-[22.2px] w-[27.164px]">

    </div>
  );
}

// ステータスバー
function StatusBar() {
  return (
    <div className="absolute left-[36px] top-[19.1px]">
      <Battery />
      {/* WiFiアイコン */}
      <div className="absolute h-[12px] right-[71.95px] top-[22.9px] w-[16.8px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7998 12">
          <path d={svgPaths.p3dc9d200} fill="white" />
        </svg>
      </div>
      {/* Cellularアイコン */}
      <div className="absolute h-[12.078px] right-[96px] top-[23px] w-[19.249px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.249 12.0781">
          <path d={svgPaths.p12c62400} fill="white" />
        </svg>
      </div>
      {/* 時刻表示 */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] left-[51.5px] text-[17px] text-center text-white top-[29.1px] tracking-[-0.5px] whitespace-nowrap">

      </div>
    </div>
  );
}

export function Settings() {
  const navigate = useNavigate();
  const { settings, updateLanguage, updateThemeColor } = useSettings();

  const handleClose = () => {
    // TODO: 設定を保存する処理（ローカルストレージなど）
    console.log('設定を保存:', settings);
    navigate('/');
  };

  const handleLanguageChange = (language: Language) => {
    updateLanguage(language);
  };

  const handleColorChange = (themeColor: ThemeColor) => {
    updateThemeColor(themeColor);
  };

  return (
    <div
      className="min-h-screen w-full max-w-[560px] mx-auto relative overflow-hidden"
      style={{ backgroundColor: COLOR_MAP[settings.themeColor] }}
    >
      {/* ヘッダー */}
      <div className="absolute h-[172px] left-0 overflow-clip top-0 w-full">
        <StatusBar />

        {/* Dynamic Island */}


        {/* Camera Indicator */}


        {/* タイトルと閉じるボタン */}
        <div className="-translate-x-1/2 absolute flex items-start justify-between left-1/2 top-[91px] w-[calc(100%-60px)]">
          <div className="flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] items-start justify-center leading-[20px]">
            <p className="text-[26px] text-white tracking-[1.144px]">設定</p>
          </div>
          <CloseIcon onClick={handleClose} />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="absolute flex flex-col items-start left-[30px] right-[30px] top-[201px] w-auto">
        <div className="flex flex-col gap-[16px] items-start w-full">
          {/* 単位の言語設定 */}
          <div className="bg-white rounded-[12px] w-full">
            <div className="flex flex-col items-start pb-[22px] pt-[14px] px-[20px] w-full">
              <LanguageSelector
                selected={settings.language}
                onChange={handleLanguageChange}
              />
            </div>
          </div>

          {/* カラー設定 */}
          <div className="bg-white rounded-[12px] w-full">
            <div className="flex flex-col items-start pb-[22px] pt-[14px] px-[20px] w-full">
              <ColorSelector
                selected={settings.themeColor}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <MobileFooter />
    </div>
  );
}