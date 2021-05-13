import * as axios from "axios"
import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';

const namespace ="data";

//https://random-word-api.herokuapp.com/all
export const fetchWords = createAsyncThunk(`${namespace}/fetchWords`,async (endPoint:string,thunkAPI)=>{
    try{
        const {data} = await axios.default.get(endPoint);
        return data;
    }
    catch(error)
    {
        thunkAPI.rejectWithValue(error);
    }  
})

interface wordsCollection{
    easy:string[],
    mid:string[],
    hard:string[]
} 

interface gameState {
    wordsCollection:wordsCollection,
    status:'idle'|'pending'|'failed'|'success',
    error: string|null|undefined
}

const initialState:gameState ={
    wordsCollection:{easy:[],mid:[],hard:[]},
    status:'idle',
    error: ''
}
export const dataSlice = createSlice({
    name:namespace,
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder.addCase(fetchWords.pending,(state)=>{
          state.status='pending';
    })
      builder.addCase(fetchWords.rejected,(state,action)=>{
        state.status='failed'
        state.error=action.error.message;
    })
    builder.addCase(fetchWords.fulfilled,(state,{payload})=>{
        payload.forEach((word:any)=>{
            if(word.length>6 || word.length<4) {}
            else if(word.length == 4) state.wordsCollection.easy=[...state.wordsCollection.easy,word];
            else if(word.length == 5) state.wordsCollection.mid=[...state.wordsCollection.mid,word];
            else if(word.length == 6) state.wordsCollection.hard=[...state.wordsCollection.hard,word];
        })
        state.status='success'
    })  
    }
})
export default dataSlice.reducer;


