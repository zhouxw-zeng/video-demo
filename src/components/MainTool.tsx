import React from "react";
import { Radio, Button } from "antd";
import { useVideo } from "../hooks/useVideo";
// 视频内容工具
const MainTool: React.FC = () => {
  const {orientation, setOrientation} = useVideo();
  return <div className="w-full h-14 flex justify-between items-center">
    <Radio.Group size="large" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
      <Radio.Button value="horizontal">横屏</Radio.Button>
      <Radio.Button value="vertical">竖屏</Radio.Button>
    </Radio.Group>
    <Button type="primary" size="small" className="">合成视频</Button>
  </div>;
};

export default MainTool;