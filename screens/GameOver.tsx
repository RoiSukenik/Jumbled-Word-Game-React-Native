import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { View , StyleSheet} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { DataTable } from 'react-native-paper'
import { SaveOverlay } from '../components'
import { ScorePerPage } from '../constants/ConstVariables'
import { useAppSelector } from '../hooks/reduxHooks'

function GameOver({ navigation}:StackScreenProps<{Home: any}>) {

    useEffect(() => {
        navigation.addListener('beforeRemove',(e)=>{e.preventDefault();})
     }, [navigation])
     
    const {table} = useAppSelector(state=>state.scoreTable);

    const [page, setPage] = React.useState(0);
    const from = page * ScorePerPage;
    const to = (page + 1) * ScorePerPage;

    return (
            <View style={styles.Container}>
            <SaveOverlay isVisible={true}/>
                <DataTable style={styles.DataTable}>
                    <DataTable.Header>
                    <DataTable.Title >Place</DataTable.Title>
                    <DataTable.Title>Player Name</DataTable.Title>
                    <DataTable.Title numeric >Score</DataTable.Title>
                    </DataTable.Header>
                    {
                    table.map((score,key)=>{
                        return(<DataTable.Row>
                                    <DataTable.Cell>
                                        {key+1}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {score.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {score.score}
                                    </DataTable.Cell>
                                </DataTable.Row>
                                )
                    })}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.floor(table.length / ScorePerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${table.length}`}
                        style={styles.Pagination}
                    />
                </DataTable>
                <Button
                    type="solid"
                    title="Play Again"
                    onPress={()=> navigation.navigate('Home')}
                    titleStyle={styles.ReStartButtonText}
                    buttonStyle={styles.ReStartButtonContainer}
                />
            </View>

        
    )
}

export default GameOver
const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#ffc046"
    },
    Pagination:{
        justifyContent:'center',
    },
    ReStartButtonText:{
        fontFamily:"turret-road-extra-bold"
    },
    ReStartButtonContainer:{
        backgroundColor:"#c56000"
    },
    DataTable:{
        backgroundColor:"#ffc046"
    }
})
