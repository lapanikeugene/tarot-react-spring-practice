import { combineReducers } from "redux";
import cardsSlice from "./cardsSlice";
import deckSliceReducer from "./deckSlice";



 const comboReducers = combineReducers({    
                                            deck:deckSliceReducer,
                                            cards:cardsSlice
                                        });


export type RootState = ReturnType<typeof comboReducers>;
export default comboReducers;