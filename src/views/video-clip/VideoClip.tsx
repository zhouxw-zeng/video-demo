import React from "react";
import TimeLine from "../../components/TimeLine";
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
        <div className="w-3/5 flex flex-col px-6 py-3  gap-2">
          <MainTool />
          <MainVideo />
        </div>
        <TonePainting />
      </div>
      <TimeLine />
    </VideoProvider>
  </div>;
}

export default VideoClip;