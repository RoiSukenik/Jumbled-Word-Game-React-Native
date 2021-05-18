import React,{useEffect} from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Image,StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import ColorSchema from '../constants/Colors';
import {fetchWords} from '../features/dataSlice';
import {useAppDispatch} from '../hooks/reduxHooks';
import { loadScoreTable } from '../features/scoreSlice';


export default function OnBoarding({ navigation }:StackScreenProps<{Home: any}>) {

    const dispatch = useAppDispatch();
    useEffect(()=>{
        //Could be used and set using React Native dotenv
        dispatch(fetchWords('https://random-word-api.herokuapp.com/word?number=25000'))
        dispatch(loadScoreTable('ScoreTable'))
    },[])
    return (
        <Onboarding
        onDone={()=>{navigation.navigate('Home')} }
        imageContainerStyles={{paddingBottom:0}}
        titleStyles={{fontFamily:"turret-road-bold"}}
        subTitleStyles={{fontFamily:"turret-road-bold"}}
        showSkip={false}
        pages={[
            {
                backgroundColor:ColorSchema.dark.background,
                image: <Image style={styles.onBoarding1} source={require('../assets/Logos/Home-Logo.gif')}/>,
                title:'Test Your English Knowlage!',
                subtitle:"Find The Right Letters To Complete The Word!",
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
        width: "100%",
        resizeMode: "contain"
    },
    onBoarding2:
    {
        height: '50%',
        width: '50%', 
    }
})


