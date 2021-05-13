import { createSlice } from '@reduxjs/toolkit';


export const scoreSlice = createSlice({
    name:'scoreTable',
    initialState:{
        score:[{
            id:'',
            user:'',
            phone:'',
            score:'',
        }],
        topScore:'0',
    },
    reducers:{
        add: (state, {payload})=>{
            [...state.score,payload]
        },
        del: (state,{payload}) =>{
            const updatedScoreTable=state.score.filter((score)=>{score.id !== payload})
            state.score=updatedScoreTable;
        },

    }
})

export const {add,del} =scoreSlice.actions;
export default scoreSlice.reducer;