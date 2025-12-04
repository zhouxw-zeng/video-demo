import React from "react";
import TimeLine from "../../components/TimeLine";
import TimeLine1 from "../../components/Timeline1"; 
import TimeLineDemo from "../../components/TimeLineDemo";
import MainVideo from "../../components/MainVideo";
import Material from "../../components/Material";
import TonePainting from "../../components/TonePainting";
import MainTool from "../../components/MainTool";
import { VideoProvider } from "../../contexts/VideoContext";

// the below code fragment can be found in: src/views/video-clip/VideoClip.tsx
const VideoClip: React.FC = () => {
  return <div className="flex w-dvw h-dvh flex-col bg-white">
    <VideoProvider>
      <div className="flex w-dvw h-2/3 flex-1">
        <Material />
        <div className="w-1/2 flex flex-col px-6 py-3  gap-2">
          <MainTool />
          <MainVideo />
          {/* 数字人版 */}
          <TimeLine1 />
        </div>
        <TonePainting />
      </div>
      
      {/* 剪辑版 */}
      {/* <TimeLine /> */}
      
      {/* 测试版本 */}
      {/* <TimeLineDemo /> */}
      
    </VideoProvider>
  </div>;
}

export default VideoClip;