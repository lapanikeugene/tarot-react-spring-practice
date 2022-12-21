import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import { tarotsDB } from './assets/tarots';
import CardItem from './CardItem';

const Deck = () => {

    return (
        <div>
            {Object.keys(tarotsDB).map((o,i)=><>
            <CardItem key={`card-${i}`} cardNumber={i} cardName={o} />
            </>)}            
        </div>
    );
};

export default Deck;