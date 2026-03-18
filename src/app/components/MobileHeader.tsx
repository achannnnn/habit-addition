import svgPaths from "../../imports/svg-p7m7nil8jg";

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

// ヘッダータイトル
function HeaderTitle() {
  return (
    <div className="-translate-x-1/2 absolute flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px] left-1/2 top-[91px]">
      <p className="text-[26px] text-white tracking-[1.144px]">やめログ</p>
      <p className="text-[#fff] text-[10px] tracking-[0.44px]">やめたい習慣カウンター</p>
    </div>
  );
}

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
}

export function MobileHeader({ title = "やめログ", subtitle = "やめたい習慣カウンター" }: MobileHeaderProps) {
  return (
    <div className="absolute h-[172px] left-0 overflow-clip top-0 w-full">
      <StatusBar />
      {/* Dynamic Island */}

      {/* Camera Indicator */}

      {/* タイトル */}
      <div className="-translate-x-1/2 absolute flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px] left-1/2 top-[91px]">
        <p className="text-[26px] text-white tracking-[1.144px]">{title}</p>
        <p className="text-[10px] tracking-[0.44px] text-[#ffffff]">{subtitle}</p>
      </div>
    </div>
  );
}
