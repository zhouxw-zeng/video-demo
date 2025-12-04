import React from 'react';

interface ToolNavProps {
  value: {
    currentToolNav: string;
    setCurrentToolNav: (currentToolNav: string) => void;
  };
}

const toolOptions = [
  {
    label: "数字人",
    value: "digitalHuman",
    icon: "doge-icon",
    currentIcon: "doge-current-icon"
  },
  {
    label: "声线",
    value:"voiceLine",
    icon: "friend-avatar-female",
    currentIcon: "friend-avatar-male"
  },
  {
    label: "知识库",
    value: "knowledgeBase",
    icon: "score",
    currentIcon: "score-active"
  },
  {
    label: "背景库",
    value: "backgroundLibrary",
    icon: "astrology-tabs-icon",
    currentIcon: "astrology-icon"
  }
]

// 工具导航组件
const ToolNav: React.FC<ToolNavProps> = ({value}) => {
  const { currentToolNav, setCurrentToolNav}  = value;
  return <div className="w-24 h-full py-6 shadow rounded-r-lg flex flex-col items-center gap-2">
      {
        toolOptions.map(item => (
          <div
            key={item.value}
            className={
              `flex flex-col gap-1 items-center justify-center w-18 h-18 cursor-pointer rounded-md font-medium
                ${currentToolNav === item.value ?
                  'bg-[#d1f6ff] text-[#01b0d9]'
                  : 'text-[#495966]'
                }
              `
            }
            onClick={()=>setCurrentToolNav(item.value)}
          >
            <img className='w-8 h-8' src={`https://zhiwei-suanming.oss-cn-hangzhou.aliyuncs.com/static/icon/${currentToolNav === item.value ? item.currentIcon : item.icon}.png`} alt="" />
            <span>{item.label}</span>
          </div>
        ))
      }
  </div>;
}

export default ToolNav;