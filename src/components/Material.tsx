import React from "react";
import ToolNav from "./ToolNav";
import { useVideo } from "../hooks/useVideo";

const BackgroundLibrary = React.lazy(() => import("./material/BackgroundLibrary"));
const KnowledgeBase = React.lazy(() => import("./material/KnowledgeBase"));
const DigitalHuman = React.lazy(() => import("./material/DigitalHuman"));
const VoiceLine = React.lazy(() => import("./material/VoiceLine"));

// 左侧材料选择组件
const Material: React.FC = () => {
  const { currentToolNav, setCurrentToolNav } = useVideo();

  const renderMainComponent = () => {
    switch(currentToolNav) {
      case 'digitalHuman': {
        return <DigitalHuman />;
      }
      case 'backgroundLibrary': {
        return <BackgroundLibrary />;
      }
      case 'knowledgeBase': {
        return <KnowledgeBase />;
      }
      case 'voiceLine': {
        return <VoiceLine />;
      }
      default: {
        return <DigitalHuman />;
      }
    }
  };
  const value = {
    currentToolNav,
    setCurrentToolNav
  };
  
  return <div className="w-5/30 h-full overflow-y-auto  shadow rounded-lg flex  text-black">
    <ToolNav value={value}  />
    { renderMainComponent() }
  </div>;
};

export default Material;