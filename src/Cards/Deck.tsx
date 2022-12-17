import React from 'react';
import CardItem from './CardItem';

const Deck = () => {
    
    return (
        <div>
            {Array(54).fill(0).map((o,i)=><>
            <CardItem key={`card-${i}`} />
            </>)}            
        </div>
    );
};

export default Deck;