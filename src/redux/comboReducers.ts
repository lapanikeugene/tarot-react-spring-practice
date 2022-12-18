import { combineReducers } from "redux";
import cardsSlice from "./cardsSlice";
import deckSliceReducer from "./deckSlice";
import spreadSlice from "./spreadSlice";



 const comboReducers = combineReducers({    
                                            deck:deckSliceReducer,
                                            cards:cardsSlice,
                                            spreads:spreadSlice
                                        });


export type RootState = ReturnType<typeof comboReducers>;
export default comboReducers;