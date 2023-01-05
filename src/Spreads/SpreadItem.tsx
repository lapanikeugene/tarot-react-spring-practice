import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { SPREAD_ITEM_HEIGHT, SPREAD_ITEM_WIDTH } from '../Cards/assets/settings';
import { spreadsDB } from '../Cards/assets/spreads';
import { useAppSelector } from '../hooks/reduxHooks';

const SpreadItem = (props:{x:number,y:number,title:string,direction?:string, rotate?:number}) => {
    const spreadSelector = useAppSelector((s)=>s.spreads);
    const cardSelector = useAppSelector((s)=>s.cards);
    const [dir,setDir] = useState("flex-row")
    //it should be started on random position on the top of 
    useEffect(()=>{
        if(props.direction){
            switch(props.direction){
                case "top":     setDir('flex-col-reverse');             break;
                case "right":   setDir("flex-row");                      break;
                case "left":    setDir('flex-row-reverse');              break;
                case "bottom":  setDir('flex-col');                     break;
                default:        setDir('flex-row');                     break;
            }
        }
    },[])

    // start position of spread item. 
    const [spring,api] = useSpring(()=>({
        from:{
            opacity:0,
            left:-500,
            top:-500,
            transform: `rotate(${props.rotate}deg)`

        }
    }))
    //check if amount of selected cards is same as spread than start animation
    useEffect(()=>{
        console.log("!!! =====>",spreadSelector.spreadType,spreadsDB[spreadSelector.spreadType].position.length, cardSelector.cards.length )
        if(spreadsDB[spreadSelector.spreadType].position.length === cardSelector.cards.length)
             api.start({
                from:{
                    opacity:0,
                    left:-500*Math.floor(Math.random()*30),
                    top:-500*Math.floor(Math.random()*30),
                    transform: `rotate(0deg)`
                },to:
                {
                opacity:1,
                left:props.x,
                top:props.y,
                transform: `rotate(${props.rotate}deg)`
            }});


    },[cardSelector.cards.length])
    return (
        <animated.div style={{...spring}} className={`absolute flex  ${dir} `}>
            <div
                   >
                    {/* why using style - because h-[] doesn't work with height more than 160px */}
                <div style={{width:SPREAD_ITEM_WIDTH, height:SPREAD_ITEM_HEIGHT+2}} className={` border-l-purple-700 border-2 rounded-md w-[80px] h-[rem] `}> </div>
                <div className=' text-amber-300 mt-3'>{props.title}</div>
                
            </div>
        </animated.div>
    );
};

export default SpreadItem;