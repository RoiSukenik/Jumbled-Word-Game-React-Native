import {createSlice  } from '@reduxjs/toolkit';



const namespace='game';

interface gameState {
    difficulty:'easy'|'medium'|'hard',
    choosenWord:string,
    modified:string,
    lifes:number,
    score:number
}

const initialState:gameState ={
    difficulty:'easy',
    choosenWord:'',
    modified:'',
    lifes:3,
    score:0,
}
export const gameSlice = createSlice({
    name:namespace,
    initialState: initialState,
    reducers:{
        setDifficulty: (state,{payload})=>{
            if(payload===0) state.difficulty = 'easy';
            if(payload===1) state.difficulty = 'medium';
            if(payload===2) state.difficulty = 'hard';
            
        },
        setRandomWord: (state,{payload})=>{
            if(state.difficulty === 'easy') 
                state.choosenWord=payload.easy[Math.floor(Math.random()*payload.easy.length)];
            if(state.difficulty === 'medium')
                state.choosenWord=payload.mid[Math.floor(Math.random()*payload.mid.length)];
            if(state.difficulty === 'hard')
                state.choosenWord=payload.hard[Math.floor(Math.random()*payload.hard.length)];
            state.modified=state.choosenWord;
        },
        setCharAt: (state,{payload})=>{
            if(payload.index > state.modified.length-1){}
            else {
                state.modified=state.modified.substring(0,payload.index) + payload.chr + state.modified.substring(payload.index+1);
            }
            
        },
        decreaseLife: (state) =>{
            state.lifes=state.lifes-1;
        },
        raiseScore: (state) =>{
            state.score=state.score+1;
        }
    },

})

export const {setRandomWord,setDifficulty,setCharAt,decreaseLife,raiseScore} =gameSlice.actions;
export default gameSlice.reducer;


