import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function FormField({ label, required = false, type = 'text', value, onChange, placeholder, maxLength }: FormFieldProps) {
  const { settings } = useSettings();
  const themeColor = COLOR_MAP[settings.themeColor];

  return (
    <div className="flex flex-col gap-[12px] items-start w-full">
      <div className="flex gap-[10px] items-center">
        <p className="text-[#454545] text-[14px] tracking-[0.616px]">{label}</p>
        {required ? (
          <p className="text-[12px] tracking-[0.528px] text-[#ff0000]">必須</p>
        ) : (
          <p className="text-[#6b6b6b] text-[12px] tracking-[0.528px]">任意</p>
        )}
      </div>
      <div className="flex h-[47px] items-center w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full h-full px-[12px] rounded-[8px] border border-[#e0dede] font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] text-[16px] text-[#454545] placeholder:text-[#9d9d9d] focus:outline-none"
          style={{
            '--focus-border-color': themeColor,
          } as React.CSSProperties}
          onFocus={(e) => e.target.style.borderColor = themeColor}
          onBlur={(e) => e.target.style.borderColor = '#e0dede'}
        />
      </div>
    </div>
  );
}