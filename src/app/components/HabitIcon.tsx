import { useEffect, useMemo, useState } from 'react';
import type { HabitIcon as HabitIconType } from '../types/habit';
import type { ThemeColor } from '../types/settings';
import { getHabitIconImageCandidates } from '../constants/habitIcons';

interface HabitIconProps {
  icon: HabitIconType;
  color: ThemeColor;
  className?: string;
}

const ICON_BG_MAP: Record<ThemeColor, string> = {
  orange: '#FFE9D9',
  green: '#DAF7EB',
  blue: '#DBE8FF',
  pink: '#F8DBF0',
  black: '#E6E6E6',
};

export function HabitIcon({ icon, color, className }: HabitIconProps) {
  const candidates = useMemo(() => getHabitIconImageCandidates(icon, color), [icon, color]);
  const [imageIndex, setImageIndex] = useState(0);
  const imagePath = candidates[imageIndex];

  useEffect(() => {
    setImageIndex(0);
  }, [icon, color, candidates.length]);

  const handleImageError = () => {
    setImageIndex((prev) => {
      if (prev >= candidates.length - 1) return prev;
      return prev + 1;
    });
  };

  return (
    <div
      className={`shrink-0 rounded-full flex items-center justify-center ${className ?? 'size-[52px]'}`}
      style={{ backgroundColor: ICON_BG_MAP[color] }}
    >
      {imagePath ? (
        <img
          src={imagePath}
          alt="habit icon"
          className="block size-full object-cover rounded-full"
          onError={handleImageError}
        />
      ) : null}
    </div>
  );
}
