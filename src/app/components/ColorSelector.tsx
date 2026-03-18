import type { ThemeColor } from '../types/settings';
import { COLOR_MAP } from '../types/settings';

interface ColorSelectorProps {
  selected: ThemeColor;
  onChange: (color: ThemeColor) => void;
}

export function ColorSelector({ selected, onChange }: ColorSelectorProps) {
  const colors: ThemeColor[] = ['orange', 'green', 'blue', 'pink', 'black'];

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {/* ラベル */}
      <div className="flex gap-[10px] items-center justify-start">
        <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] text-[#454545] text-[14px] tracking-[0.616px]">
          カラー
        </p>
      </div>
      
      {/* カラーボタン */}
      <div className="flex gap-[8px] items-start w-full">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`rounded-[100px] size-[30px] transition-all hover:scale-110 ${
              selected === color ? 'ring-2 ring-white' : ''
            }`}
            style={{ backgroundColor: COLOR_MAP[color] }}
            aria-label={`${color}カラーに変更`}
          />
        ))}
      </div>
    </div>
  );
}