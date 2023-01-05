import { createSlice } from "@reduxjs/toolkit";
import { navigationInitState } from "./navigationInitState";


const navigationSlice = createSlice({
    name:"naviagation",
    initialState: navigationInitState,
    reducers:{
        cardsTrigger:(state)=>{
            state.showCards = !state.showCards;
        },
        navMixTrigger:(state)=>{
            state.showMixButtons=!state.showMixButtons;
        },
        hideCards:(state)=>{
            
        }
    },
})


export const {cardsTrigger,navMixTrigger} = navigationSlice.actions;

export default navigationSlice.reducer;