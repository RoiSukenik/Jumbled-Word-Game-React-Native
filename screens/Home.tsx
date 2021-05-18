import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {  Headline, Subheading,Paragraph, Badge ,Text } from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import { ButtonGroup, Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDifficulty, setRandomWord } from '../features/gameSlice';


function Home({ navigation }:StackScreenProps<{Game: any}>) {


    const {topScore} = useAppSelector(state => state.scoreTable)
    const {wordsCollection} = useAppSelector(state => state.data)
    const [selectedIdx,setSelectedIdx] = useState(0);
    const dispatch = useAppDispatch()


    useEffect(() => {
        navigation.addListener('beforeRemove',(e)=>{e.preventDefault();})
     }, [navigation])

    const OnDifficultySelect = (selectedIdx:number)=>{
        setSelectedIdx(selectedIdx);
        dispatch(setDifficulty(selectedIdx))
    }
    const OnGameStart = ()=>{
        dispatch(setRandomWord(wordsCollection));
        navigation.navigate('Game');
    }
        return (
            <View style={styles.continer}>
                <Image style={styles.Logo} source={require('../assets/Logos/Home-Logo.gif')}/>
                <View style={styles.TextView}>
                    <Headline style={styles.Heading}>
                        Welcome To The Jumble Game
                    </Headline>
                    <Subheading style={styles.Subheading}>
                        {'\n'}
                        Your goal is to find out the missing letters!
                        {'\n'}
                        Think you can do it? Let's give it a try!
                        {'\n'}
                    </Subheading>
                    <Subheading style={styles.Subheading}>
                        Example: Give the following : "B_t_",
                        {'\n'} 
                        Player Should Submit: <Text style={styles.actualWord}>Bite</Text>
                    </Subheading>
                    <Paragraph style={styles.Paragraph}>Your Best Score So Far is:</Paragraph>
                    <View>
                        <Badge size={50}>
                            {topScore}
                        </Badge>
                    </View>
                    <Paragraph style={styles.Paragraph}>Choose Difficulty:</Paragraph>
                    <ButtonGroup
                            buttons={['Easy','Medium','Hard']}
                            onPress={OnDifficultySelect}
                            containerStyle={styles.ButtonGroupContainer}
                            innerBorderStyle={{color:"#000"}}
                            buttonStyle={{alignItems:"center"}}
                            textStyle={styles.ButtonGroupText}
                            selectedIndex={selectedIdx}
                            selectedButtonStyle={{backgroundColor:"#c56000"}}
                        />
                    <View>
                        <Button 
                        type="solid"
                        onPress={OnGameStart}
                        title="Start"
                        titleStyle={styles.StartButtonText}
                        buttonStyle={styles.StartButtonContainer}
                        />
                    </View>
                    {/*This Button is for Dev purpose only - FIXME */}
                    <View>
                        <Button 
                        type="solid"
                        title="Reset Async Storage"
                        onPress={()=> AsyncStorage.clear()}
                        />
                    </View>
                </View>
                <View>
                </View>
            </View>
        )
}
const styles = StyleSheet.create({
    continer:{
        backgroundColor:"#ffc046",
        flex:1
    },
    Logo:{
        width: "100%",
        resizeMode: "contain"
    },
    Heading:{
        color:"#c56000",
        textAlign:"center",
        fontFamily:"turret-road-extra-bold",
    },
    Subheading:{
        color:"#c56000",
        textAlign:"center",
        fontFamily:"turret-road-bold"
    },
    Paragraph:{
        color:"#c56000",
        textAlign:"center",
        fontFamily:"turret-road-bold"
    },
    TextView:{
        flex: 1,
        flexDirection: 'column',
        paddingTop:20,
        alignItems: 'center'
    },
    ButtonGroupContainer:{
        backgroundColor: "transparent",
        borderColor:"transparent",
        paddingTop:10,
        paddingBottom:10,
        width:"75%"
    },
    ButtonGroupText:{
        fontSize:20,
        fontFamily:'turret-road-extra-bold',
        color:"#c56000"
    },
    StartButtonText:{
        fontFamily:"turret-road-extra-bold"
    },
    StartButtonContainer:{
        backgroundColor:"#c56000"
    },
    actualWord:{
        fontFamily:"turret-road-extra-bold",
        fontSize:20,
        color:"#ff8f00",
    }

})


export default Home
