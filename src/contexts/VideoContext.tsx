import React, { createContext, useState, useEffect, type ReactNode } from 'react';

interface VideoContext {
  orientation: "horizontal" | "vertical";
  setOrientation: (orientation: "horizontal" | "vertical") => void;
  currentToolNav: string;
  setCurrentToolNav: (currentToolNav: string) => void;
}

const VideoContext = createContext<VideoContext | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 视频朝向状态
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  // 左侧工具栏选中状态；
  const [ currentToolNav, setCurrentToolNav ] = useState<string>("digitalHuman");
  // 当项目方向变化时，同步视频类容尺寸
  useEffect(() => {
    // TODO: 同步视频类容尺寸
    console.log(`orientation changed to ${orientation}`)
  }, [orientation]);

  // 切换左侧工具栏选中状态
  useEffect(() => {

  }, [currentToolNav])

  // context 内容属性
  const value: VideoContext = {
    orientation,
    setOrientation,
    currentToolNav,
    setCurrentToolNav
  }
  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
};

export { VideoContext };