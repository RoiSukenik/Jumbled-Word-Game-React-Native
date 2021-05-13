import React,{useEffect,useState} from 'react'
import { Text, View ,StyleSheet, Animated} from 'react-native'
import { useDispatch } from 'react-redux'
import { setCharAt } from '../features/gameSlice'
import {useAppSelector} from '../hooks/reduxHooks'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { StackScreenProps } from '@react-navigation/stack'



function Game({ navigation }:StackScreenProps<{GameOver: any}>) {

  const dispatch = useDispatch();

  const {choosenWord,modified} = useAppSelector(state=>state.gameState)
  
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
  },[])

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
        flex:1
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
