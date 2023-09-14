import { createSlice } from "@reduxjs/toolkit";


const lightMode = {
    name:'lightMode',
    background: 'bg-slate-400',
    textButton: 'text-white',
    backgroundButtonHome: 'green',
    backgroundButtonPlay:'blue',
    textGame:'black',
    attemptText:'red',
    circle:'cyan',
}

const darkMode = {
    name:'darkMode',
    background: 'black',
    textButton: 'text-black',
    backgroundButtonHome: 'green',
    backgroundButtonPlay:'blue',
    textGame:'white',
    attemptText:'red',
    circle:'purple',
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
