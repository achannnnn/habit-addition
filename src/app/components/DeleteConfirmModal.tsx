import { useSettings } from '../contexts/SettingsContext';
import { COLOR_MAP } from '../types/settings';

interface DeleteConfirmModalProps {
  habitName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ habitName, onConfirm, onCancel }: DeleteConfirmModalProps) {
  const { settings } = useSettings();
  const isEnglish = false;
  const themeColor = COLOR_MAP[settings.themeColor];

  return (
    <>
      {/* Background Overlay */}
      <div
        className="absolute bg-[rgba(14,14,14,0.5)] h-full left-0 top-0 w-full z-30"
        onClick={onCancel}
      />

      {/* Confirmation Dialog */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[300px]">
        <div className="bg-white rounded-[20px] p-[24px] shadow-lg">
          <div className="flex flex-col gap-[20px] items-center">
            <h3 className={`text-[18px] text-[#454545] text-center leading-[24px] ${isEnglish
                ? "font-['Lato:Bold',sans-serif]"
                : "font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif]"
              }`}>
              {isEnglish ? 'Delete Habit?' : '習慣を削除しますか？'}
            </h3>

            <p className={`text-[14px] text-[#6b6b6b] text-center leading-[20px] ${isEnglish
                ? "font-['Lato:Medium',sans-serif]"
                : "font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif]"
              }`}>
              {isEnglish
                ? `Are you sure you want to delete "${habitName}"? This action cannot be undone.`
                : `「${habitName}」を削除してもよろしいですか？この操作は取り消せません。`
              }
            </p>

            <div className="flex gap-[12px] w-full">
              <button
                onClick={onCancel}
                className="flex-1 bg-white h-[44px] rounded-[100px]"
                style={{ border: `1px solid ${themeColor}` }}
              >
                <p
                  className={`text-[14px] leading-[20px] text-center ${isEnglish
                      ? "font-['Lato:SemiBold',sans-serif]"
                      : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                    }`}
                  style={{ color: themeColor }}
                >
                  {isEnglish ? 'Cancel' : 'いいえ'}
                </p>
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 h-[44px] rounded-[100px]"
                style={{ backgroundColor: themeColor }}
              >
                <p className={`text-white text-[14px] leading-[20px] text-center ${isEnglish
                    ? "font-['Lato:SemiBold',sans-serif]"
                    : "font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif]"
                  }`}>
                  {isEnglish ? 'Delete' : 'はい'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}