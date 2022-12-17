import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import comboReducers, {RootState} from './comboReducers'

export const store = configureStore({
  reducer:comboReducers,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type AppThunk = ThunkAction<void, RootState, unknown, Action>


export default store
