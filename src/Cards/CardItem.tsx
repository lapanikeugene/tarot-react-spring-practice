

import { useSpring, animated } from '@react-spring/web'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';

const CardItem = () => {
    const [spring,api] = useSpring(()=>({from:{x:0,y:0}}));
    const [position, setPosition] = useState({x:0,y:0})
    const selector = useAppSelector((s)=>s.deck);


    const handleClick = () => {
        console.log("click");
        const newPosX = Math.floor(Math.random()*100)-position.x;
        const newPosY = Math.floor(Math.random()*100);
        api.start({
          from: {
            x: position.x,
            y: position.y,
          },
          to: {
            x:newPosX,
            y: newPosY,
          },
        })

        setPosition({x:newPosX,y:newPosY})

      }

      useEffect(()=>{
        console.log(selector.mixStep)
        if(selector.mixStep>1)
            handleClick();
      },[selector.mixStep])
    return (
        <animated.div  onClick={handleClick} style={{
            width:40,
            position:'absolute',
            left:50,
            top:50,
            height:80,
            background:'#000',
            ...spring

        }}
            
       />
    );
};

export default CardItem;