import React from 'react';
import { Progress } from 'antd';


interface RingProgressProps {
    status: string;
    percent: number;
     // assuming you pass color as a string like "bg-green-500"
     // same for border color
  }
  const getColor = (percent:any) => {
    // Define your color scale here
    if (percent <= 30) return 'bg-red-500';
    if (percent <= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
const RingProgress: React.FC<RingProgressProps> = ({ status, percent }) => {
  
  const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };
  return (
    <div style={{ position: 'relative', display: 'inline-block' }} className='text-sm font-semibold'>
      <Progress type="dashboard" percent={percent} strokeColor={conicColors} />
      <div style={{
        position: 'absolute',
        top: '22%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div className={`text-sm  `}>{status}</div>
        
      </div>
    </div>
  );
};

export default RingProgress;
