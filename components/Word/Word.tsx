import React from 'react'
import { View, StyleSheet } from 'react-native'
import Letter from './Letter'

function Word(props:any) {
    return (
            <View style={styles.Letter}>
              {props.word.split('').map((letter:string,key:number)=><Letter letter={letter}/>)}
            </View>
    )
}

export default Word

const styles = StyleSheet.create({
    Letter:{
        paddingTop:20,
        paddingBottom:20,
        flexDirection:"row",
        justifyContent:"center",
      },
})
