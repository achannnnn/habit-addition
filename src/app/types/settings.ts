// 設定の型定義
export type Language = 'ja' | 'en';

export type ThemeColor = 'orange' | 'green' | 'blue' | 'pink' | 'black';

export interface Settings {
  language: Language;
  themeColor: ThemeColor;
}

// カラーコード定義
export const COLOR_MAP: Record<ThemeColor, string> = {
  orange: '#f88f51',
  green: '#00c47f',
  blue: '#0058c4',
  pink: '#c40090',
  black: '#282828',
};
