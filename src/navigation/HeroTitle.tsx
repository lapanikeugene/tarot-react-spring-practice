import { animated, useSpring, useTrail } from '@react-spring/web';
import React, { useState } from 'react';
import TarotSlider from '../Interface/Slider';
import { cardsTrigger,navMixTrigger } from '../redux/navigationSlice';
import { useAppDispatch } from '../redux/store';
import FirstStep from './FirstStep';

const HeroTitle = () => {
    const dispatch = useAppDispatch();
    const items = ['Tarot','Spreads'];
    const [showButtons,setShowButtons]= useState(false);
    const [readyToSpread,setReadyToSpread] = useState(false); 
    const config = {mass:1, tension:80, friction:10};

    const [props, set]  = useSpring(()=>({
     from:{
        opacity:0,
        transform:"translateY(0px)",
     },
     config:{duration:300}
     

    }))

    const trails = useTrail(items.length,{
                            config,
                            opacity:1,
                            transform: "translateY(0px)",
                            from:{
                                opacity:0,
                                transform: "translateY(100px)",
                            },
                            onRest:()=>{set({opacity:1})}
    })
    
    const handleHeroTitleLastMove = ()=>{
       dispatch(cardsTrigger());
        dispatch(navMixTrigger());
        setReadyToSpread(true); // todo to redux
        console.log('click');
        set({transform: "translateY(-500px)",opacity:0,config:{duration:500}})
    }
    return (
        <div className='absolute -translate-x-1/2 -translate-y-1/2 top-36 left-1/2  '>
            <h1 className='flex justify-around text-6xl gap-x-6 text-amber-300'>
                {trails.map((o,i)=>{
                    return(
                    <animated.div key={i} style={{...o}}>
                        {items[i]}
                    </animated.div>)
                    })
                }
            </h1>
            <animated.div style={props} onClick={handleHeroTitleLastMove}>
                <h2>Choose Spread:</h2>
            <FirstStep />
            
            </animated.div>
            <TarotSlider />
        </div>
    );
};

export default HeroTitle;