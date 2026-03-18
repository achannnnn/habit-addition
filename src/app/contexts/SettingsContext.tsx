import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Settings, Language, ThemeColor } from '../types/settings';

interface SettingsContextType {
  settings: Settings;
  updateLanguage: (language: Language) => void;
  updateThemeColor: (color: ThemeColor) => void;
}

const SETTINGS_KEY = 'app_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: Settings = {
  language: 'ja',
  themeColor: 'orange',
};

function loadSettingsFromStorage(): Settings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(stored) } as Settings;
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettingsFromStorage);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateLanguage = (language: Language) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const updateThemeColor = (color: ThemeColor) => {
    setSettings((prev) => ({ ...prev, themeColor: color }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateLanguage, updateThemeColor }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
