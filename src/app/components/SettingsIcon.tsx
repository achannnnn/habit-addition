import svgPaths from "../../imports/svg-56hhasdwd2";

interface SettingsIconProps {
  onClick?: () => void;
}

export function SettingsIcon({ onClick }: SettingsIconProps) {
  return (
    <button 
      onClick={onClick}
      className="size-[24px] cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="設定"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <mask 
          height="24" 
          id="mask0_2_1263" 
          maskUnits="userSpaceOnUse" 
          style={{ maskType: "alpha" }} 
          width="24" 
          x="0" 
          y="0"
        >
          <rect fill="#D9D9D9" height="24" width="24" />
        </mask>
        <g mask="url(#mask0_2_1263)">
          <path d={svgPaths.p16538480} stroke="white" />
        </g>
      </svg>
    </button>
  );
}
