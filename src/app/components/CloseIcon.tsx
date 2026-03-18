import svgPaths from "../../imports/svg-uc5hty5et6";

interface CloseIconProps {
  onClick?: () => void;
}

export function CloseIcon({ onClick }: CloseIconProps) {
  return (
    <button 
      onClick={onClick}
      className="relative size-[24px] cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
      aria-label="閉じる"
    >
      <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
        <path d={svgPaths.pde5d900} fill="white" />
      </svg>
    </button>
  );
}