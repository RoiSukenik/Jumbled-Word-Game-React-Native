import React,{useEffect} from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Image,StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import ColorSchema from '../constants/Colors';
import {fetchWords} from '../features/gameSlice';
import {useAppDispatch} from '../hooks/reduxHooks';


export default function OnBoarding({ navigation }:StackScreenProps<{Home: any}>) {

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchWords('https://random-word-api.herokuapp.com/all'))
    },[])
    return (
        <Onboarding
        onSkip={async()=>{navigation.navigate('Home')} }
        onDone={async ()=>{navigation.navigate('Home')} }
        imageContainerStyles={{paddingBottom:0}}
        pages={[
            {
                backgroundColor:ColorSchema.light.background,
                image: <Image style={styles.onBoarding1} source={require('../assets/images/Onboarding-1.gif')}/>,
                title:'',
                subtitle:'',
            },
            {
                backgroundColor:ColorSchema.dark.background,
                image: <Image style={styles.onBoarding2} source={require('../assets/images/Onboarding-2.png')}/>,
                title:'Want To Play?',
                subtitle:"It's easy, Just finish the missing letter and be the best!",
            }
        ]}
        />
    )
}

const styles = StyleSheet.create({
    onBoarding1:
    {
        height:'100%',
        width: '100%', 
        resizeMode: "stretch"
    },
    onBoarding2:
    {
        height: '50%',
        width: '50%', 
    }
})


