import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/comboReducers";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
