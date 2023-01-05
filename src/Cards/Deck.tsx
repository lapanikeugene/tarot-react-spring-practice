import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { tarotsDB } from './assets/tarots';
import CardItem from './CardItem';

const Deck = () => {
    const navSelector = useAppSelector((s)=>s.navigation);
    const [showCards,setShowCards] = useState(false);
    useEffect(()=>{
        const timer = setTimeout(()=>{setShowCards(navSelector.showCards);
        },500 )
        return () => clearTimeout(timer);
    },[navSelector.showCards])
    return (
       <> 
       {showCards&&<div>
            {Object.keys(tarotsDB).map((o,i)=><>
            <CardItem key={`card-${i}`} cardNumber={i} cardName={o} />
            </>)}            
        </div>}
        </>
    );
};

export default Deck;