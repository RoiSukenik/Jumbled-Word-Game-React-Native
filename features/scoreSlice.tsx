import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const namespace='score';

export const saveScoreTable = createAsyncThunk(`${namespace}/saveScoreTable`,async (scoreTableEntry:tableState,ThunkAPI)=>{
    
    const {rejectWithValue} = ThunkAPI;
    ThunkAPI.dispatch(add(scoreTableEntry))
    const {scoreTable} = ThunkAPI.getState() as {scoreTable :scoreTableState};
    const jsonScoreTable = JSON.stringify(scoreTable);
    try{
        await AsyncStorage.setItem('ScoreTable', jsonScoreTable)
    }
    catch(error)
    {
        rejectWithValue(error);
    }
})

export const loadScoreTable = createAsyncThunk(`${namespace}/loadScoreTable`,async (key:string,ThunkAPI)=>{
    
    const {rejectWithValue} = ThunkAPI;
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch(error)
    {
        rejectWithValue(error);
    }
})

interface tableState{
    name:string,
    phone: string,
    score:number
}

interface scoreTableState{
    table:tableState[],
    topScore:number,
    status:'idle'|'pending'|'failed'|'success',
    error: string|null|undefined
}

const initialState:scoreTableState={
    table:[],
    topScore:0,
    status:'idle',
    error:''
}
export const scoreSlice = createSlice({
    name:'scoreTable',
    initialState:initialState,
    reducers:{
        add: (state, {payload})=>{
            state.table=[...state.table,payload]
            state.table = state.table.sort( (a, b) => b.score - a.score)
            state.topScore=state.table[0].score;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(saveScoreTable.pending,(state)=>{
            state.status='pending';
        })
        builder.addCase(saveScoreTable.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
        builder.addCase(saveScoreTable.fulfilled,(state)=>{
            state.status='success';
        })
        builder.addCase(loadScoreTable.pending,(state)=>{
            state.status='pending';
        })
        builder.addCase(loadScoreTable.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
        builder.addCase(loadScoreTable.fulfilled, (state,{payload})=>{
            state.table=payload.table;
            state.topScore=payload.topScore;
            state.status='success';

        })
    },  
})

export const {add} =scoreSlice.actions;
export default scoreSlice.reducer;