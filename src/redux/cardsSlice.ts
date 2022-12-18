import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardsInitState } from "./cardsInitState";


const cardsSlice = createSlice(
    {name:"cards",
    initialState:cardsInitState,
    reducers:{
        selectCard:(state, action:PayloadAction<string>)=>{
            state.cards.push(action.payload)
        },
        resetSelected:(state)=>{
            state.cards.splice(0,state.cards.length);
        }
    }
    }
)

export const {selectCard, resetSelected} = cardsSlice.actions;
export default cardsSlice.reducer;