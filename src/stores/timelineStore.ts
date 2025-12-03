import { create } from 'zustand';

// 轨道项类型定义
export interface TrackItem {
  id: string;
  type: 'video' | 'audio' | 'text' | 'effect';
  startTime: number; // 开始时间（秒）
  duration: number; // 持续时间（秒）
  name: string;
  color?: string;
}

// 时间轴状态接口
export interface TimelineState {
  // 时间轴配置
  zoomLevel: number; // 缩放级别
  currentTime: number; // 当前播放时间（秒）
  duration: number; // 总时长（秒）
  fps: number; // 帧率
  
  // 轨道数据
  tracks: TrackItem[][]; // 多个轨道，每个轨道包含多个轨道项
  
  // 交互状态
  isDragging: boolean;
  isResizing: boolean;
  selectedItemId: string | null;
  dragStartX: number;
  dragStartTime: number;
  hoverTime: number | null; // 鼠标悬浮时间
  hoverX: number | null; // 鼠标悬浮位置
  
  // 操作方法
  setZoomLevel: (zoom: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  addTrackItem: (trackIndex: number, item: Omit<TrackItem, 'id'>) => void;
  removeTrackItem: (trackIndex: number, itemId: string) => void;
  updateTrackItem: (trackIndex: number, itemId: string, updates: Partial<TrackItem>) => void;
  moveTrackItem: (fromTrack: number, toTrack: number, itemId: string) => void;
  setDraggingState: (isDragging: boolean, startX?: number, startTime?: number) => void;
  setResizingState: (isResizing: boolean) => void;
  selectItem: (itemId: string | null) => void;
  setHoverState: (time: number | null, x: number | null) => void;
  
  // 工具方法
  getTimeFromPosition: (x: number, canvasWidth: number) => number;
  getPositionFromTime: (time: number, canvasWidth: number) => number;
}

// 创建时间轴store
export const useTimelineStore = create<TimelineState>((set, get) => ({
  // 初始状态
  zoomLevel: 1,
  currentTime: 0,
  duration: 60, // 默认60秒
  fps: 30,
  
  tracks: [
    [], // 视频轨道
    [], // 音频轨道
    []  // 效果轨道
  ],
  
  isDragging: false,
  isResizing: false,
  selectedItemId: null,
  dragStartX: 0,
  dragStartTime: 0,
  hoverTime: null,
  hoverX: null,
  
  // 操作方法实现
  setZoomLevel: (zoom) => set({ zoomLevel: Math.max(0.1, Math.min(10, zoom)) }),
  
  setCurrentTime: (time) => set({ currentTime: Math.max(0, Math.min(get().duration, time)) }),
  
  setDuration: (duration) => set({ duration: Math.max(1, duration) }),
  
  addTrackItem: (trackIndex, item) => {
    const { tracks } = get();
    if (trackIndex >= 0 && trackIndex < tracks.length) {
      const newItem: TrackItem = {
        ...item,
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      const newTracks = [...tracks];
      newTracks[trackIndex] = [...newTracks[trackIndex], newItem];
      set({ tracks: newTracks });
    }
  },
  
  removeTrackItem: (trackIndex, itemId) => {
    const { tracks, selectedItemId } = get();
    if (trackIndex >= 0 && trackIndex < tracks.length) {
      const newTracks = [...tracks];
      newTracks[trackIndex] = newTracks[trackIndex].filter(item => item.id !== itemId);
      set({ 
        tracks: newTracks,
        selectedItemId: selectedItemId === itemId ? null : selectedItemId
      });
    }
  },
  
  updateTrackItem: (trackIndex, itemId, updates) => {
    const { tracks } = get();
    if (trackIndex >= 0 && trackIndex < tracks.length) {
      const newTracks = [...tracks];
      newTracks[trackIndex] = newTracks[trackIndex].map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      );
      set({ tracks: newTracks });
    }
  },
  
  moveTrackItem: (fromTrack, toTrack, itemId) => {
    const { tracks } = get();
    if (fromTrack >= 0 && fromTrack < tracks.length && 
        toTrack >= 0 && toTrack < tracks.length) {
      const item = tracks[fromTrack].find(item => item.id === itemId);
      if (item) {
        const newTracks = [...tracks];
        newTracks[fromTrack] = newTracks[fromTrack].filter(item => item.id !== itemId);
        newTracks[toTrack] = [...newTracks[toTrack], item];
        set({ tracks: newTracks });
      }
    }
  },
  
  setDraggingState: (isDragging, startX = 0, startTime = 0) => 
    set({ isDragging, dragStartX: startX, dragStartTime: startTime }),
  
  setResizingState: (isResizing) => set({ isResizing }),
  
  selectItem: (itemId) => set({ selectedItemId: itemId }),
  
  setHoverState: (time, x) => set({ hoverTime: time, hoverX: x }),
  
  // 工具方法实现
  getTimeFromPosition: (x, canvasWidth) => {
    const { zoomLevel, duration } = get();
    const paddingLeft = 20;
    const paddingRight = 20;
    const contentWidth = canvasWidth - paddingLeft - paddingRight;
    const pixelsPerSecond = (contentWidth / duration) * zoomLevel;
    return Math.max(0, Math.min(duration, x / pixelsPerSecond));
  },
  
  getPositionFromTime: (time, canvasWidth) => {
    const { zoomLevel, duration } = get();
    const paddingLeft = 20;
    const paddingRight = 20;
    const contentWidth = canvasWidth - paddingLeft - paddingRight;
    const pixelsPerSecond = (contentWidth / duration) * zoomLevel;
    return paddingLeft + time * pixelsPerSecond;
  }
}));