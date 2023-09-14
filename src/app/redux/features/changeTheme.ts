import { createSlice } from "@reduxjs/toolkit";


const lightMode = {
    name:'lightMode',
    background: 'bg-slate-200',
    textButton: 'text-black',
    textGame:'text-black',
    attemptText:'red',
    circle:'bg-cyan-200',
}

const darkMode = {
    name:'darkMode',
    background: 'bg-gray-800',
    textButton: 'text-slate-300',
    textGame:'text-slate-300',
    attemptText:'red',
    circle:'bg-purple-200',
}


const initialState={
  value: lightMode,
};

export const changeTheme = createSlice({
    name:'changeTheme',
    initialState,
    reducers:{
        change:(state)=>{
            const currentTheme =  state.value.name ==='lightMode'?darkMode:lightMode
            return {
                value:currentTheme
            }
        }
    }
})

export const {change} = changeTheme.actions
export default changeTheme.reducer;
