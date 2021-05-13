import { configureStore } from '@reduxjs/toolkit'
import scoreTableReducer from '../features/scoreSlice'
import gameReducer from '../features/gameSlice'
import devToolsEnhancer from 'remote-redux-devtools';


export const store= configureStore({
  reducer: {
      scoreTable: scoreTableReducer,
      gameState: gameReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk:true,
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch