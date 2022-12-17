import { combineReducers } from "redux";
import deckSliceReducer from "./deckSlice";



 const comboReducers = combineReducers({deck:deckSliceReducer});


export type RootState = ReturnType<typeof comboReducers>;
export default comboReducers;