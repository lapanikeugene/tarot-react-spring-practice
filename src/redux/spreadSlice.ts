import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { spreadInitState } from "./spreadInitState";



export const spreadSlice = createSlice({
    name:"spreads",
    initialState:spreadInitState,
    reducers:{
        changeSpread: (state,action:PayloadAction<string>)=>
        {
            state.spreadType = action.payload;
        }
    }
})


export const {changeSpread} = spreadSlice.actions;
export default spreadSlice.reducer;