import React, { useState } from 'react';
import { spreadsDB } from '../Cards/assets/spreads';
import { useAppSelector } from '../hooks/reduxHooks';
import SpreadItem from './SpreadItem';

const Spread = () => {
    const spreadSelector = useAppSelector(s=>s.spreads)
    const [selectedSpread,setSelectedSpread] =useState(spreadsDB[spreadSelector.spreadType])

    return (
        <section>
            <div>
                <h1>{selectedSpread.title}</h1>
                <p>{selectedSpread.description}</p>
            </div>
            <div>
                {selectedSpread.position.map((o: { x: number; y: number; desc: string; },i: any)=>(
                    <SpreadItem x={o.x} y={o.y} title={o.desc} key={`spreadelement-${i}`} />
                    ))}
            </div>
        </section>
    );
};

export default Spread;