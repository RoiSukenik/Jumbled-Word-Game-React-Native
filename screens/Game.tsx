import React,{useEffect,useState} from 'react'
import {  View ,StyleSheet, Animated} from 'react-native'
import { useDispatch } from 'react-redux'
import { setCharAt } from '../features/gameSlice'
import {useAppSelector} from '../hooks/reduxHooks'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { StackScreenProps } from '@react-navigation/stack'
import {Word} from '../components'
import { Headline, Subheading } from 'react-native-paper'
import GuessForm from '../components/GuessForm'


function Game({ navigation }:StackScreenProps<{GameOver: any}>) {

  const dispatch = useDispatch();

  const {choosenWord,modified,score,lifes} = useAppSelector(state=>state.gameState)
  
  const [ready,setReady] = useState(false);
  const [key,setKey] = useState(0);
  useEffect( ()=>{
    for(let i=0;i<choosenWord.length;i++)
    {
      if(i%2 ==1)
      {
        dispatch(setCharAt({index:i,chr:"_"}))
      }
    }
    setKey(key+1)
  },[choosenWord])
  useEffect(() => {
    if(lifes ==0)
      {
        navigation.navigate('GameOver')
      }

  }, [lifes])
  useEffect(() => {
    navigation.addListener('beforeRemove',(e)=>{e.preventDefault();})
 }, [navigation])
  useEffect(() => {

  }, [ready])
  
  if(!ready)
    {
      return(
        <View style={styles.container} >
          <View style={styles.LoadingCountDown}>
            <CountdownCircleTimer
                key={key}
                ariaLabel={"Start Countdown"}
                isPlaying
                duration={5}
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
                onComplete={()=>{setReady(true); setKey(1)} }
              >
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ 
                    color: animatedColor,
                    textAlign:"center" ,
                    fontFamily:"turret-road-bold"}}
                  >
                    Are You Ready?
                    {'\n'}
                    {remainingTime}
                    {'\n'}
                    Let's Go!
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
          </View>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <Headline style={styles.Heading}>
            Guess The Missing Letters!
          </Headline>
          <Subheading style={styles.Subheading}>
            Watch The Clock!
            {'\n'}
            Your'e Current Score is: {score}
            {'\n'}
            Life left: {lifes}
            {'\n'}
            Word To Guess: 
            {'\n'}
            {choosenWord}
          </Subheading>
          <View style={styles.Word}>
            <Word word={modified}/>
          </View>
          <GuessForm/>
          <View style={styles.CountDown}>
          <CountdownCircleTimer
            key={key}
            size={70}
            strokeWidth={3}
            isPlaying={true}
            duration={30}
            colors={[
              ['#004777', 0.4],
              ['#F7B801', 0.4],
              ['#A30000', 0.2],
            ]}
            onComplete={()=>navigation.navigate('GameOver') }
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor,fontFamily:"turret-road-bold"}}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
          </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:"#ffc046",
    },
    LoadingCountDown:{
      alignItems:"center",
      flex:1,
      justifyContent:"center"
    },
    CountDown:{
      alignItems:"center",
      flex:1,
      flexDirection:"column-reverse",
      marginBottom:40,

    },
    Word:{
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignContent:'center'

    },
    Heading:{
      color:"#c56000",
      textAlign:"center",
      fontFamily:"turret-road-extra-bold",
      marginTop: "10%",
      marginBottom:"5%"
    },
    Subheading:{
      color:"#c56000",
      textAlign:"center",
      fontFamily:"turret-road-bold"
    },

})

export default Game

