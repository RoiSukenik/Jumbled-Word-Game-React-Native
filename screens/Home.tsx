import React,{useEffect,useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import { Button, Headline, Subheading,Paragraph, Badge ,Text } from 'react-native-paper';
import {useAppSelector} from '../hooks/reduxHooks';
import { ButtonGroup } from "react-native-elements";

function Home({ navigation }:StackScreenProps<{Game: any}>) {

    const [selectedIdx,setSelectedIdx]=useState(1);

    const {topScore} = useAppSelector(state=> state.scoreTable)

    useEffect(() => {
        navigation.addListener('beforeRemove',(e)=>{e.preventDefault();})
     }, [navigation])

    return (
        <View style={styles.continer}>
            <View style={styles.TextView}>
                <Headline style={styles.Heading}>
                    Welcome To the Jumble Game
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
                <Paragraph>
                    Your Best Score So Far is:
                </Paragraph>
                <Text>{'\n'}</Text>
                <View>
                    <Badge size={50}>
                        {topScore}
                    </Badge>
                </View>
                <ButtonGroup
                        buttons={['Easy','Medium','Hard']}
                        onPress={selectedIdx=>setSelectedIdx(selectedIdx)}
                        buttonStyle={styles.ButtonGroup}
                    />
                <View>
                    <Text>{'\n'}</Text>
                    <Button 
                    mode={"contained"} 
                    color={"#c56000"} 
                    onPress={()=>{navigation.navigate("Game")}}
                    labelStyle={styles.StartButtonText}
                    >
                        Start!
                    </Button>
                </View>
            </View>
            <View>
             {}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    continer:{
        backgroundColor:"#ffc046",
        flex:1
    },
    Heading:{
        color:"#c56000",
        textAlign:"center",
        fontWeight:"bold"
    },
    Subheading:{
        color:"#c56000",
        textAlign:"center",
        fontWeight:"bold"
    },
    TextView:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonGroup:{
        color:"#c56000"
    },
    StartButtonText:{
        fontWeight:"bold",
    },
    actualWord:{
        fontWeight:"bold",
        fontSize:20,
        color:"#ff8f00",
    }

})


export default Home
