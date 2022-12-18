

import { Slider } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import deckSlice, { addStep, shuffleDeck } from '../redux/deckSlice';
import { useAppDispatch } from '../redux/store';

const TarotSlider = () => {
    const [value,setValue] = useState(1);
    const dispatch = useAppDispatch();

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            // I need that slider go only in one direction. 
            
            if(newValue>value)
           { 
            setValue(val => val+1);
            dispatch(addStep());
            dispatch(shuffleDeck());
            }
        }
      };


    return (
        <Box sx={{ width: 250 }}>
            <Slider 
            defaultValue={1}
            min={1}
            max={4}
            step={1}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            marks

            />
        </Box>
    );
};

export default TarotSlider;