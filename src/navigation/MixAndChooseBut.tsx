

import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { buttonCss } from '../Cards/assets/cssClasses';
import { useAppSelector } from '../hooks/reduxHooks';
import { addStep, chooseCardsFromDeck, shuffleDeck } from '../redux/deckSlice';
import { useAppDispatch } from '../redux/store';

const MixAndChooseBut = () => {
    
    const cssDibled = " disabled:border-gray-700 disabled:text-gray-700";
    const deckSelector = useAppSelector(s=>s.deck);
    const cssButton = buttonCss;
    const [value,setValue] = useState(1);
    const [mixDisabled,setMixDisabled] = useState(false);
    const [chooseDisabled,setChooseDisabled] = useState(true);
    const [showComponent,setShowComponent] = useState(false);

    const dispatch = useAppDispatch();
    const navSelector = useAppSelector((s)=>s.navigation);
    const [props, set]  = useSpring(()=>({
        from:{
           opacity:0,
           transform:"translateY(300px)",
        },
        config:{duration:300}
        
   
       }))
   

    //shuffle cards
      const handleMix =()=>{
        if(!mixDisabled)
        {
        dispatch(shuffleDeck());
        dispatch(addStep()); // changing of variable to start shuffle. 
        }
      }
      const handleChoose = ()=>{
          if(!chooseDisabled)
          {
          setMixDisabled(true);
          setChooseDisabled(true);
          dispatch(chooseCardsFromDeck());
          set({opacity:0,transform:"transitionY(-500px)",config:{duration:400}})
        }
      }

      useEffect(()=>{

        if(navSelector.showMixButtons)
        {
            console.log("show mix buttons")
            let timer  = setTimeout(()=>{              
                set({opacity:1,  transform:"translateY(0px)",})
            },220);
            return ()=> clearTimeout(timer);
        }

       
      },[navSelector.showMixButtons])

      // if cards wasn't shuffle  user can't start to choose them  
      useEffect(()=>{
        console.log("deckSelector.mixStep ====>",deckSelector.mixStep)
        if(deckSelector.mixStep===1)
        setChooseDisabled(true)
        else 
        setChooseDisabled(false)


      },[deckSelector.mixStep])
    return (
        <animated.div style={props} className='flex justify-around'>
          
            <button disabled={mixDisabled} onClick={handleMix} className={` ${cssButton} ${cssDibled}`}>Mix Cards </button>
            <button disabled={chooseDisabled} onClick={handleChoose} className={`${cssButton} ${cssDibled}`}>Choose Cards</button>
        </animated.div>
    );
};

export default MixAndChooseBut;