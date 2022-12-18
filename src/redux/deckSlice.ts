import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        },
    
        shuffleDeck:(state)=>{

            for (let i = state.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = state.deck[i];
                state.deck[i] = state.deck[j];
                state.deck[j] = temp;
              }
        }
    }
})
export const {resetSteps, addStep,shuffleDeck} = deckSlice.actions;
export default deckSlice.reducer;