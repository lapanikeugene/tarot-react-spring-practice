import React, { useState } from 'react';
import { buttonCss } from '../Cards/assets/cssClasses';
import { dispatchCommand } from '../Cards/assets/dispatchCommands';
import { spreadsDB } from '../Cards/assets/spreads';
import { changeSpread } from '../redux/spreadSlice';
import { useAppDispatch } from '../redux/store';

const LayoutsButtons = () => {
    const dispatch = useAppDispatch();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");

    const changeMode =  (spread:string)=>(e:any) =>{
        dispatch(changeSpread(spread));
    }

    const handleDesc = (spreadId:string)=> (e:any) => {
        setTitle(spreadsDB[spreadId].title);
        setDesc(spreadsDB[spreadId].description);

    }
    return (
        <>
        <div>
                <h3 className=' font-bold text-amber-200 mt-3'>{title}</h3>
                <p className='min-w-max text-amber-50	'>{desc}</p>
            </div>
        <div className='flex justify-around z-20'>
            
            <button onClick={changeMode(dispatchCommand.card1)} 
                    className={buttonCss}
                    onMouseOver={handleDesc(dispatchCommand.card1)}>one card</button>
            <button onClick={changeMode(dispatchCommand.cards3)}  
                    className={buttonCss}
                    onMouseOver={handleDesc(dispatchCommand.cards3)}>Three cards</button>
            <button onClick={changeMode(dispatchCommand.celticCross)}  
                    className={buttonCss}
                    onMouseOver={handleDesc(dispatchCommand.celticCross)}
                    >Celtic Cross</button>

        </div>
        </>
    );
};

export default LayoutsButtons;