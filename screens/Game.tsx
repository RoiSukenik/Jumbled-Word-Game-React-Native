import React,{useEffect,useState} from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux'
import { setCharAt, setRandomWord } from '../features/gameSlice'
import {useAppSelector} from '../hooks/reduxHooks'



function Game() {

  const dispatch = useDispatch();

  const {choosenWord,modified} = useAppSelector(state=>state.gameState)
  

  
  useEffect( ()=>{
    for(let i=0;i<choosenWord.length;i++)
    {
      if(i%2 ==1)
      {
        dispatch(setCharAt({index:i,chr:"_"}))
      }
    }
  },[])

  return (
  <View>

   <Text>{modified}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container:
    {
        flex:1
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})

export default Game
