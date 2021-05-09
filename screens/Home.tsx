import React,{useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';


function Home({ navigation }:StackScreenProps<{Game: any}>) {
    useEffect(() => {
        navigation.addListener('beforeRemove',(e)=>{
            e.preventDefault();}) 
    }, [navigation])

    return (
        <View style={styles.continer}>
            <Text>Im here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    continer:{
        backgroundColor:"#ffc947",
        flex:1
    }
})


export default Home
