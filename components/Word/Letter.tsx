import React from 'react'
import { View , Text , StyleSheet} from 'react-native';

type LetterProps = React.PropsWithChildren<{
    letter:string,
}>;

function Letter({letter}:LetterProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.letter}>
                {letter}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    letter:{
        fontFamily:'turret-road-bold',
        fontSize:50,
    }
})

export default Letter

