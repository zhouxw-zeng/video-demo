import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { languages, appTexts, type AppTextKey } from '../config/locales';
import { themes } from '../config/constants';

interface AppContextType {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  t: (key: AppTextKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('app-theme') || 'light';
  });
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('app-language') || 'zh-CN';
  });


  // 保存设置到本地存储
  useEffect(() => {
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('app-language', currentLanguage);
  }, [currentLanguage]);

  // 获取当前主题配置
  const getCurrentThemeConfig = () => {
    const theme = themes.find(t => t.key === currentTheme);
    return theme ? theme.config : themes[0].config;
  };

  // 获取当前语言配置
  const getCurrentLocale = () => {
    const language = languages.find(l => l.key === currentLanguage);
    return language ? language.locale : languages[0].locale;
  };

  // 多语言翻译函数
  const t = (key: AppTextKey): string => {
    return appTexts[currentLanguage as keyof typeof appTexts]?.[key] || 
      appTexts['zh-CN'][key] || 
      key.toString();
  };

  // 根据主题设置暗色模式
  const isDark = currentTheme === 'dark';
  const algorithm = isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  const themeConfig = {
    ...getCurrentThemeConfig(),
    algorithm,
  };

  const value: AppContextType = {
    currentTheme,
    setCurrentTheme,
    currentLanguage,
    setCurrentLanguage,
    t,
  };

  return (
    <AppContext.Provider value={value}>
      <ConfigProvider
        locale={getCurrentLocale()}
        theme={themeConfig}
      >
        {children}
      </ConfigProvider>
    </AppContext.Provider>
  );
};

export { AppContext };