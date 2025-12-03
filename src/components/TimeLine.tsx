import React, { useRef, useEffect, useCallback } from 'react';
import { useTimelineStore, type TrackItem } from '../stores/timelineStore';

// 时间轴组件
const TimeLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 从store获取状态和方法
  const {
    zoomLevel,
    currentTime,
    duration,
    tracks,
    isDragging,
    isResizing,
    selectedItemId,
    dragStartX,
    dragStartTime,
    hoverTime,
    hoverX,
    setCurrentTime,
    setDraggingState,
    setResizingState,
    selectItem,
    updateTrackItem,
    setHoverState,
    getTimeFromPosition,
    getPositionFromTime
  } = useTimelineStore();

  // Canvas绘制函数
  const drawTimeline = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置Canvas尺寸
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 计算时间轴参数
    const paddingLeft = 20; // 左侧间距
    const paddingRight = 20; // 右侧间距
    const contentWidth = canvas.width - paddingLeft - paddingRight;
    const pixelsPerSecond = (contentWidth / duration) * zoomLevel;
    const trackHeight = 40;
    const headerHeight = 30;
    const trackSpacing = 10;

    // 绘制时间刻度
    ctx.fillStyle = '#fff'; // 刻度值颜色改为白色
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // 绘制时间刻度背景
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(paddingLeft, 0, contentWidth, headerHeight);
    
    for (let time = 0; time <= duration; time += 1) {
      const x = paddingLeft + time * pixelsPerSecond;
      
      // 只绘制在可见区域内的刻度
      if (x >= paddingLeft && x <= canvas.width - paddingRight) {
        // 主刻度（每秒）
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, headerHeight);
        ctx.strokeStyle = '#888';
        ctx.stroke();
        
        // 时间标签
        if (time % 5 === 0) {
          ctx.fillText(`${time}s`, x, headerHeight - 5);
        }
        
        // 子刻度（每0.5秒）
        if (time + 0.5 <= duration) {
          const subX = paddingLeft + (time + 0.5) * pixelsPerSecond;
          if (subX >= paddingLeft && subX <= canvas.width - paddingRight) {
            ctx.beginPath();
            ctx.moveTo(subX, 0);
            ctx.lineTo(subX, headerHeight / 2);
            ctx.strokeStyle = '#555';
            ctx.stroke();
          }
        }
      }
    }

    // 绘制播放头（次高层级，低于悬浮线）
    const playheadX = paddingLeft + currentTime * pixelsPerSecond;
    if (playheadX >= paddingLeft && playheadX <= canvas.width - paddingRight) {
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, canvas.height);
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // 绘制鼠标悬浮指示器（最高层级）
    if (hoverX !== null && hoverTime !== null) {
      const hoverIndicatorX = paddingLeft + hoverTime * pixelsPerSecond;
      if (hoverIndicatorX >= paddingLeft && hoverIndicatorX <= canvas.width - paddingRight) {
        // 黄色悬浮线（最高z轴层级）
        ctx.beginPath();
        ctx.moveTo(hoverIndicatorX, 0);
        ctx.lineTo(hoverIndicatorX, canvas.height);
        ctx.strokeStyle = '#ffcc00'; // 黄色
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 黄色悬浮时间标签
        ctx.fillStyle = '#ffcc00';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${hoverTime.toFixed(1)}s`,
          hoverIndicatorX,
          headerHeight - 15
        );
        
        // 黄色宽度标（显示当前时间位置到悬浮位置的宽度）
        if (currentTime < hoverTime) {
          const widthStartX = paddingLeft + currentTime * pixelsPerSecond;
          const widthEndX = hoverIndicatorX;
          const width = widthEndX - widthStartX;
          
          // 绘制黄色宽度背景
          ctx.fillStyle = 'rgba(255, 204, 0, 0.2)';
          ctx.fillRect(widthStartX, 0, width, headerHeight);
          
          // 绘制宽度标签
          ctx.fillStyle = '#ffcc00';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            `+${(hoverTime - currentTime).toFixed(1)}s`,
            widthStartX + width / 2,
            headerHeight - 20
          );
        }
      }
    }

    // 绘制轨道
    tracks.forEach((trackItems, trackIndex) => {
      const trackY = headerHeight + trackIndex * (trackHeight + trackSpacing);
      
      // 轨道背景（带间距）
      ctx.fillStyle = '#333';
      ctx.fillRect(paddingLeft, trackY, contentWidth, trackHeight);
      
      // 轨道边框
      ctx.strokeStyle = '#555';
      ctx.strokeRect(paddingLeft, trackY, contentWidth, trackHeight);
      
      // 绘制轨道项
      trackItems.forEach((item) => {
        const itemX = paddingLeft + item.startTime * pixelsPerSecond;
        const itemWidth = item.duration * pixelsPerSecond;
        
        // 只绘制在可见区域内的轨道项
        if (itemX + itemWidth >= paddingLeft && itemX <= canvas.width - paddingRight) {
          // 轨道项背景
          const isSelected = item.id === selectedItemId;
          ctx.fillStyle = item.color || getTrackItemColor(item.type);
          ctx.fillRect(itemX, trackY + 2, itemWidth, trackHeight - 4);
          
          // 选中边框
          if (isSelected) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(itemX, trackY + 2, itemWidth, trackHeight - 4);
          }
          
          // 轨道项名称
          ctx.fillStyle = '#fff';
          ctx.font = '12px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(
            item.name,
            itemX + 5,
            trackY + trackHeight / 2 + 4
          );
          
          // 拉伸手柄（仅在选中时显示）
          if (isSelected) {
            // 右侧拉伸手柄
            ctx.fillStyle = '#fff';
            ctx.fillRect(itemX + itemWidth - 5, trackY + 5, 4, trackHeight - 10);
          }
        }
      });
    });
  }, [zoomLevel, currentTime, duration, tracks, selectedItemId]);

  // 获取轨道项颜色
  const getTrackItemColor = (type: TrackItem['type']): string => {
    const colors = {
      video: '#4CAF50',
      audio: '#2196F3',
      text: '#FF9800',
      effect: '#9C27B0'
    };
    return colors[type] || '#666';
  };

  // 处理鼠标事件
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 检查是否点击了轨道项
    const clickedItem = findTrackItemAtPosition(x, y);
    
    if (clickedItem) {
      selectItem(clickedItem.item.id);
      
      // 检查是否点击了拉伸手柄
      const isOnResizeHandle = checkResizeHandle(x, y, clickedItem);
      
      if (isOnResizeHandle) {
        setResizingState(true);
      } else {
        setDraggingState(true, x, clickedItem.item.startTime);
      }
    } else {
      // 点击空白区域，设置当前时间
      const time = getTimeFromPosition(x, canvas.width);
      setCurrentTime(time);
      selectItem(null);
    }
  };

  // 鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // 更新鼠标悬浮状态
    const paddingLeft = 20;
    const paddingRight = 20;
    const contentWidth = canvas.width - paddingLeft - paddingRight;
    
    if (x >= paddingLeft && x <= canvas.width - paddingRight) {
      const relativeX = x - paddingLeft;
      const hoverTime = getTimeFromPosition(relativeX, contentWidth);
      setHoverState(hoverTime, x);
    } else {
      setHoverState(null, null);
    }
    
    if (isDragging && selectedItemId) {
      // 拖拽轨道项
      const deltaTime = getTimeFromPosition(x - dragStartX, contentWidth);
      const newStartTime = Math.max(0, dragStartTime + deltaTime);
      
      const trackIndex = tracks.findIndex(track =>
        track.some(item => item.id === selectedItemId)
      );
      
      if (trackIndex !== -1) {
        updateTrackItem(trackIndex, selectedItemId, { startTime: newStartTime });
      }
    } else if (isResizing && selectedItemId) {
      // 拉伸轨道项
      const trackIndex = tracks.findIndex(track =>
        track.some(item => item.id === selectedItemId)
      );
      
      if (trackIndex !== -1) {
        const item = tracks[trackIndex].find(item => item.id === selectedItemId);
        if (item) {
          const relativeX = x - paddingLeft;
          const newDuration = Math.max(0.1, getTimeFromPosition(relativeX, contentWidth) - item.startTime);
          updateTrackItem(trackIndex, selectedItemId, { duration: newDuration });
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingState(false);
    setResizingState(false);
  };

  const handleMouseLeave = () => {
    setHoverState(null, null);
    setDraggingState(false);
    setResizingState(false);
  };

  // 查找指定位置的轨道项
  const findTrackItemAtPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const paddingLeft = 20;
    const paddingRight = 20;
    const contentWidth = canvas.width - paddingLeft - paddingRight;
    const pixelsPerSecond = (contentWidth / duration) * zoomLevel;
    const trackHeight = 40;
    const headerHeight = 30;
    const trackSpacing = 10;

    for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
      const trackY = headerHeight + trackIndex * (trackHeight + trackSpacing);
      
      if (y >= trackY && y <= trackY + trackHeight) {
        for (const item of tracks[trackIndex]) {
          const itemX = paddingLeft + item.startTime * pixelsPerSecond;
          const itemWidth = item.duration * pixelsPerSecond;
          
          if (x >= itemX && x <= itemX + itemWidth) {
            return { item, trackIndex };
          }
        }
      }
    }
    
    return null;
  };

  // 检查是否点击了拉伸手柄
  const checkResizeHandle = (x: number, y: number, clickedItem: { item: TrackItem; trackIndex: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const paddingLeft = 20;
    const paddingRight = 20;
    const contentWidth = canvas.width - paddingLeft - paddingRight;
    const pixelsPerSecond = (contentWidth / duration) * zoomLevel;
    const trackHeight = 40;
    const headerHeight = 30;
    const trackSpacing = 10;
    
    const trackY = headerHeight + clickedItem.trackIndex * (trackHeight + trackSpacing);
    const itemX = paddingLeft + clickedItem.item.startTime * pixelsPerSecond;
    const itemWidth = clickedItem.item.duration * pixelsPerSecond;
    
    // 检查右侧拉伸手柄
    const resizeHandleX = itemX + itemWidth - 5;
    return (x >= resizeHandleX && x <= resizeHandleX + 4 &&
            y >= trackY + 5 && y <= trackY + trackHeight - 5);
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      drawTimeline();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawTimeline]);

  // 初始绘制和状态变化时重绘
  useEffect(() => {
    drawTimeline();
  }, [drawTimeline]);

  return (
    <div
      ref={containerRef}
      className="w-full h-1/3 shadow px-4 box-border bg-[#262626] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : isResizing ? 'col-resize' : 'default' }}
      />
    </div>
  );
};

export default TimeLine;
