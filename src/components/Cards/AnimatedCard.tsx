import React from 'react'
import { ProCard } from '@ant-design/pro-components';
import { useSpring, animated,useTransition } from 'react-spring';
export  const AnimatedCard = ({content}:any) => {
    const bounceAndColorAnimation = useSpring({
        loop: true,
        to: [
          { transform: 'scale(1.05)', color: '#ff4ecd', opacity: 0.8 },
          { transform: 'scale(1)', color: '#4ecfff', opacity: 1 },
          { transform: 'scale(1.05)', color: '#4eff7a', opacity: 0.8 },
          { transform: 'scale(1)', color: 'rgb(255, 200, 0)', opacity: 1 }
        ],
        from: { transform: 'scale(1)', color: 'red', opacity: 1 },
        config: { tension: 180, friction: 12 },
      });
  return (
    <>
    
    <ProCard direction="column" ghost style={{ overflow: 'hidden', padding: '10px' }}>
      <ProCard layout="center" bordered style={{ height: '100px' }}>
      <animated.div style={{ ...bounceAndColorAnimation, fontSize: '30px' }}>
            {content ? content:"Congratulations!  🎉"}
            </animated.div>
      </ProCard>
    </ProCard>
    
    </>
  )
}
