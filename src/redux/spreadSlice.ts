import { createSlice } from "@reduxjs/toolkit";
import { spreadInitState } from "./spreadInitState";



export const spreadSlice = createSlice({
    name:"spreads",
    initialState:spreadInitState,
    reducers:{}
})



export default spreadSlice.reducer;