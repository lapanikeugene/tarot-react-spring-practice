import { animated, useSpring, useTrail } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import MixAndChooseBut from './MixAndChooseBut';
import { cardsTrigger,navMixTrigger } from '../redux/navigationSlice';
import { useAppDispatch } from '../redux/store';
import LayoutsButtons from './LayoutsButtons';
import { useAppSelector } from '../hooks/reduxHooks';

const HeroTitle = () => {
    const dispatch = useAppDispatch();
    const deckSelector = useAppSelector(s=>s.deck)
    const items = ['Tarot','Spreads'];
    const [readyToSpread,setReadyToSpread] = useState(false); 
    const [moveToBottom, setMoveToBottom] = useState(false);
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
        setReadyToSpread(true); 
        console.log('click');
        set({transform: "translateY(-500px)",opacity:0,config:{duration:500}})
    }

    //if it's time to choose the cards, we need put this component under the cards. 
    useEffect(()=>{
        setMoveToBottom(deckSelector.isChoose);
    },[deckSelector.isChoose])

    //refresh page by clicking on title 
    const handleRefresh = () => {
        window.location.reload();
    }

    return (

        <div className={`absolute -translate-x-1/2 -translate-y-1/2 top-36 left-1/2  ${ moveToBottom ? "-z-40" : '' }  `}>
            <h1 className='  flex justify-center text-6xl gap-x-6 text-amber-300 mt-2'>
                {trails.map((o,i)=>{
                    return(
                    <animated.div className={"hover:cursor-pointer"}  onClick={handleRefresh} key={i} style={{...o}}>
                        {items[i]}
                    </animated.div>)
                    })
                }
            </h1>
            <animated.div style={props} onClick={handleHeroTitleLastMove}>
                <h2 className=' text-lg mt-3 font-semibold text-white '>Choose Spread:</h2>
            <LayoutsButtons />
            
            </animated.div>
         
            <MixAndChooseBut />
           
        </div>
    );
};

export default HeroTitle;