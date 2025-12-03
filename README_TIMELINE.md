# 时间轴组件使用说明

## 功能特性

- ✅ Canvas绘制时间轴和轨道
- ✅ 拖拽轨道项调整位置
- ✅ 拉伸轨道项调整时长
- ✅ 播放头定位和时间刻度显示
- ✅ 多轨道支持（视频、音频、文字、特效）
- ✅ Zustand状态管理
- ✅ 响应式设计

## 核心组件

### TimeLine 组件
主时间轴组件，负责Canvas绘制和交互处理。

**主要功能：**
- 绘制时间轴刻度线和播放头
- 绘制多个轨道和轨道项
- 处理鼠标事件（点击、拖拽、拉伸）
- 与Zustand store进行状态同步

### Timeline Store (Zustand)
状态管理store，位于 `src/stores/timelineStore.ts`

**状态属性：**
- `zoomLevel`: 缩放级别
- `currentTime`: 当前播放时间
- `duration`: 总时长
- `tracks`: 轨道数据数组
- `isDragging/isResizing`: 交互状态
- `selectedItemId`: 选中的轨道项ID

**操作方法：**
- `setZoomLevel()`: 设置缩放级别
- `setCurrentTime()`: 设置当前时间
- `addTrackItem()`: 添加轨道项
- `updateTrackItem()`: 更新轨道项
- `removeTrackItem()`: 删除轨道项
- `moveTrackItem()`: 移动轨道项到其他轨道

## 使用方法

### 基本使用
```tsx
import TimeLine from './components/TimeLine';
import { useTimelineStore } from './stores/timelineStore';

function MyComponent() {
  const { addTrackItem, setCurrentTime } = useTimelineStore();
  
  // 添加视频轨道项
  const addVideoClip = () => {
    addTrackItem(0, {
      type: 'video',
      startTime: 5,
      duration: 10,
      name: '视频片段',
      color: '#4CAF50'
    });
  };
  
  return (
    <div className="h-full">
      <button onClick={addVideoClip}>添加视频</button>
      <TimeLine />
    </div>
  );
}
```

### 交互操作
1. **设置播放头**: 点击时间轴空白区域
2. **选中轨道项**: 点击轨道项
3. **拖拽移动**: 选中后拖拽轨道项
4. **拉伸时长**: 拖拽轨道项右侧手柄
5. **缩放视图**: 使用缩放按钮或滚轮事件（可扩展）

## 自定义配置

### 轨道类型颜色
在 `TimeLine.tsx` 的 `getTrackItemColor` 函数中修改：
```tsx
const getTrackItemColor = (type: TrackItem['type']): string => {
  const colors = {
    video: '#4CAF50',
    audio: '#2196F3',
    text: '#FF9800',
    effect: '#9C27B0'
  };
  return colors[type] || '#666';
};
```

### 轨道高度和间距
在 `drawTimeline` 函数中修改：
```tsx
const trackHeight = 40;      // 单个轨道高度
const headerHeight = 30;     // 时间轴头部高度
const trackSpacing = 10;     // 轨道间距
```

## 扩展建议

1. **键盘快捷键**: 添加键盘操作支持
2. **滚轮缩放**: 实现鼠标滚轮缩放功能
3. **吸附功能**: 添加时间点和轨道项的吸附对齐
4. **预览功能**: 实时预览轨道内容
5. **导入导出**: 支持项目文件的导入导出

## 演示组件

项目包含 `TimeLineDemo.tsx` 演示组件，展示了完整的功能使用方式。