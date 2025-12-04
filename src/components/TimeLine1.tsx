import React, { useState } from 'react';
import { Button, Slider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const TimeLine1: React.FC = () => {
  const [density, setDensity] = useState(30)
  return (
    <div className='w-full h-1/4 bg-white shadow rounded-xl p-4 box-border flex flex-col gap-4'>
      {/* 头部互动组件 */}
      <div className='w-full h-12 flex justify-between items-center'> 
        {/* 视频时间播放状态 */}
        <div className='w-68 h-full flex items-center text-[#9facbc] gap-2'>
          <span>00:08:42</span>
          <span>/</span>
          <span>00:12:36</span>
        </div>
        {/* 播放/暂停开关 */}
        <div className='w-12 h-12 rounded-[50%] bg-blue-400 flex items-center justify-center'>
          Stop
        </div>
        {/* 进度栏（图片帧率显示）密度调节 */}
        <div className='w-68 h-full flex justify-end items-center gap-2'>
          {density}%
          <MinusOutlined />
          {/* <Button className='w-8 h-8' shape="circle" icon={<MinusOutlined />} /> */}
          <Slider className='w-full flex-1' value={density} onChange={(value) => setDensity(value)} />
          <PlusOutlined />
          {/* <Button className='w-8 h-8' shape="circle" icon={<PlusCircleOutlined />} /> */}
        </div>
      </div>
      {/* 视频帧内容组件 */}
      <div className='w-full h-full flex-1 flex justify-between items-center border-amber-100 border-2'>

      </div>
    </div>
  )
}

export default TimeLine1;