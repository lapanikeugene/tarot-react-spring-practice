import { createSlice } from "@reduxjs/toolkit";
import { initDeckState } from "./initDeckState";




export const deckSlice = createSlice({
    name:"deckSlice",
    initialState:initDeckState,
    reducers:{
        resetSteps: (state)=>{
            state.mixStep = 0; 
        },
        addStep: (state)=>{
            state.mixStep++;
        }
    }
})
export const {resetSteps, addStep} = deckSlice.actions;
export default deckSlice.reducer;