import {createSlice  } from '@reduxjs/toolkit';
import {
    MidLevelBar,
    HardLevelBar,
    AmountOfLifeToDecreaseBy,
    AmountOfLevelsToRaiseBy,
    AmountOfScoreToRaiseBy,
    InitialLevel,
    InitialLife,
    InitialScore,
    HardDifficulty,
    MidDifficulty,
    EasyDifficulty} from '../constants/ConstVariables'
import {RaiseBy,DecreaseBy} from '../constants/HelperFunctions'

const namespace='game';

interface gameState {
    difficulty:'easy'|'medium'|'hard',
    choosenWord:string,
    modified:string,
    lifes:number,
    score:number,
    level:number
}

const initialState:gameState ={
    difficulty:'easy',
    choosenWord:'',
    modified:'',
    lifes:InitialLife,
    score:InitialScore,
    level:InitialLevel
}
export const gameSlice = createSlice({
    name:namespace,
    initialState: initialState,
    reducers:{
        setDifficulty: (state,{payload})=>{
            if(payload===EasyDifficulty) state.difficulty = 'easy';
            if(payload===MidDifficulty) state.difficulty = 'medium';
            if(payload===HardDifficulty) state.difficulty = 'hard';
            
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
            state.lifes=DecreaseBy(state.lifes,AmountOfLifeToDecreaseBy);
        },
        raiseScore: (state) =>{
            state.score=RaiseBy(state.score,AmountOfScoreToRaiseBy);
            state.level=RaiseBy(state.level,AmountOfLevelsToRaiseBy);
            if(state.level>MidLevelBar) state.difficulty="medium";
            if(state.level>HardLevelBar) state.difficulty="hard";
            
        },
    },

})

export const {
    setRandomWord,
    setDifficulty,
    setCharAt,
    decreaseLife,
    raiseScore} =gameSlice.actions;
export default gameSlice.reducer;


