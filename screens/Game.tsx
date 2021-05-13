import React,{useEffect} from 'react'
import { ActivityIndicator,Text, View ,StyleSheet,FlatList} from 'react-native'
import {useAppSelector} from '../hooks/reduxHooks'

function Game() {

    const {wordsCollection}=useAppSelector(state=>state.gameState)

    return (
    <View>
        <FlatList
        data={wordsCollection.easy}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      />
      
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
