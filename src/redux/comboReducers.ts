import { combineReducers } from "redux";
import cardsSlice from "./cardsSlice";
import deckSliceReducer from "./deckSlice";
import modalSlice from "./modalSlice";
import navigationSlice from "./navigationSlice";
import spreadSlice from "./spreadSlice";



 const comboReducers = combineReducers({    
                                            deck:deckSliceReducer,
                                            cards:cardsSlice,
                                            spreads:spreadSlice,
                                            navigation:navigationSlice,
                                            modal:modalSlice
                                        });


export type RootState = ReturnType<typeof comboReducers>;
export default comboReducers;