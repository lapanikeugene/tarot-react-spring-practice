import { useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { spreadsDB } from '../Cards/assets/spreads';
import { useAppSelector } from '../hooks/reduxHooks';
import SpreadItem from './SpreadItem';

const Spread = () => {
    const spreadSelector = useAppSelector(s=>s.spreads)
    const oldSpread = spreadsDB[spreadSelector.spreadType];
    const [selectedSpread,setSelectedSpread] =useState(oldSpread)
 
    useEffect(()=>{
        // if(oldSpread !== spreadsDB[spreadSelector.spreadType] )
            setSelectedSpread(spreadsDB[spreadSelector.spreadType]); 

    },[spreadSelector.spreadType])

    return (
        <section>
           
            <div className='relative -z-[999]'>
                
                {selectedSpread.position.map((o: { x: number; y: number; desc: string; rotate?:number },i: any)=>(
                    <SpreadItem x={o.x} y={o.y} title={o.desc} key={`spreadelement-${i}`} rotate={ o.rotate ? o.rotate: 0 }/>
                    
                    ))}
            </div>
        </section>
    );
};

export default Spread;