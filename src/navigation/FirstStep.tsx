import React from 'react';
import { dispatchCommand } from '../Cards/assets/dispatchCommands';
import { changeSpread } from '../redux/spreadSlice';
import { useAppDispatch } from '../redux/store';

const FirstStep = () => {
    const dispatch = useAppDispatch();

    const changeMode =  (spread:string)=>(e:any) =>{
        dispatch(changeSpread(spread));
    }

    return (
        <div>
            <button onClick={changeMode(dispatchCommand.card1)}>one card</button>
            <button onClick={changeMode(dispatchCommand.cards3)}>Three cards</button>
        </div>
    );
};

export default FirstStep;