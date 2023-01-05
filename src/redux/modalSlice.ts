import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalInitialState } from "./modalInitialState";



export const modalSlice = createSlice({
    name:"modalSlice",
    initialState:modalInitialState,
    reducers:{
        showModal: (state) =>{
            state.isModalVisible = true;
        },
        hideModal: (state) =>{
            state.isModalVisible = false;
        },
        setModalAnswer:  (state,action:PayloadAction<string>) =>{
            state.modalAnswer = action.payload;
        },
        setModalTitle: (state,action:PayloadAction<string>) =>{
            state.modalTitle = action.payload;
        },
        setModalDescription: (state,action:PayloadAction<string>) =>{
            state.modalDesc = action.payload;
        }
    }
})


export const {showModal,hideModal, setModalTitle, setModalDescription,setModalAnswer } = modalSlice.actions;

export default modalSlice.reducer;


