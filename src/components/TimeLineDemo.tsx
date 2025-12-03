import React from 'react';
import TimeLine from './TimeLine';
import { useTimelineStore } from '../stores/timelineStore';

// 时间轴演示组件
const TimeLineDemo: React.FC = () => {
  const { addTrackItem, setZoomLevel, setCurrentTime } = useTimelineStore();

  // 添加示例轨道项
  const addSampleItems = () => {
    addTrackItem(0, {
      type: 'video',
      startTime: 5,
      duration: 10,
      name: '视频片段1',
      color: '#4CAF50'
    });
    
    addTrackItem(1, {
      type: 'audio',
      startTime: 2,
      duration: 15,
      name: '背景音乐',
      color: '#2196F3'
    });
    
    addTrackItem(2, {
      type: 'text',
      startTime: 8,
      duration: 5,
      name: '标题文字',
      color: '#FF9800'
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-white text-lg mb-4">时间轴演示</h2>
        <div className="flex gap-4">
          <button 
            onClick={addSampleItems}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            添加示例轨道项
          </button>
          
          <button 
            onClick={() => setZoomLevel(0.5)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            缩小
          </button>
          
          <button 
            onClick={() => setZoomLevel(2)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            放大
          </button>
          
          <button 
            onClick={() => setCurrentTime(10)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            跳转到10秒
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-300">
          <p>操作说明：</p>
          <ul className="list-disc list-inside ml-4">
            <li>点击空白区域设置播放头位置</li>
            <li>点击轨道项进行选中</li>
            <li>拖拽选中的轨道项调整位置</li>
            <li>拖拽右侧手柄调整轨道项长度</li>
          </ul>
        </div>
      </div>
      
      <div className="flex-1">
        <TimeLine />
      </div>
    </div>
  );
};

export default TimeLineDemo;