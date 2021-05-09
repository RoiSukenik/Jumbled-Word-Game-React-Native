import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Image,StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';



export default function OnBoarding({ navigation }:StackScreenProps<{Home: any}>) {

    return (
        <Onboarding
        onSkip={()=> navigation.navigate('Home')}
        onDone={()=> navigation.navigate('Home')}
        imageContainerStyles={{paddingBottom:0}}
        pages={[
            {
                backgroundColor:'#795548',
                image: <Image style={styles.onBoarding1} source={require('../assets/images/Onboarding-1.gif')}/>,
                title:'',
                subtitle:'',
            },
            {
                backgroundColor:'#ff9800',
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
        //height: '100%',
        width: '100%', 
        resizeMode: 'contain'
    },
    onBoarding2:
    {
        height: '50%',
        width: '50%', 
    }
})


