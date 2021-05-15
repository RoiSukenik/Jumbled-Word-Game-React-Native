import React,{useState,useEffect} from 'react';
import { View, TextInput,StyleSheet ,Text} from 'react-native';
import {Formik} from 'formik'
import { useAppSelector } from '../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import { decreaseLife, raiseScore, setRandomWord } from '../features/gameSlice';
import { Icon ,Button, Input} from 'react-native-elements';
import *  as yup from 'yup';



function GuessForm() {


    const [FirstGuess,setFirstGuess] = useState(true)
    const [correct,setCorrect] = useState(false)
    const {choosenWord,modified,lifes,score} =useAppSelector(state => state.gameState);
    const {wordsCollection} = useAppSelector(state => state.data);

    const dispatch = useDispatch()

    const textInputRef: React.RefObject<TextInput> = React.createRef();

    const guessSchema = yup.object({
        guess: yup.string().required().length(choosenWord.length)
    
    })
    useEffect( () => {
        dispatch(setRandomWord(wordsCollection))
        setCorrect(false)

    }, [correct])
    useEffect(() => {
        console.log(score)
    }, [choosenWord])

    return (
        <View>
            <Formik 
                initialValues={{guess:''}}
                validationSchema={guessSchema}
                onSubmit={(values) :void=> {
                    if(!(choosenWord.toLowerCase() == values.guess.toLowerCase()))
                    {
                        dispatch(decreaseLife())
                        setFirstGuess(false)
                    }
                    else{
                        dispatch(raiseScore())
                        setCorrect(true)
                        values.guess=''

                    }

                 }} 
            >
                {(formikProps)=>(
                <View>
                    <Input
                        ref={textInputRef}
                        placeholder={modified}
                        onChangeText={formikProps.handleChange('guess')}
                        value ={formikProps.values.guess}
                        inputStyle={styles.InputText}
                        inputContainerStyle={styles.InputContainer}
                        rightIcon={
                            <Icon
                                name="pen"
                                type="font-awesome-5"
                                size={40}
                                color="maroon"
                            />
                        }
                    />
                    <Text style={styles.ErrorText}>{formikProps.errors.guess}</Text>
                    {(!correct&&!FirstGuess)? <Text>Wrong Answer</Text>:<Text></Text>}
                    <Button
                        title = "Check Guess"
                        type = "clear"
                        icon = {
                            <Icon
                                name = "check-circle"
                                type ="font-awesome-5"
                                size = {40}
                                color = {"maroon"}
                            />
                        }
                        onPress={formikProps.handleSubmit as (values: any) => void}
                        containerStyle={styles.SubmitButton}
                    />
                </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    InputText:{
        textAlign:"center",
        fontSize:40,
        fontFamily:"turret-road-extra-bold",
        
    },
    InputContainer:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    ErrorText:{
        textAlign:"center",
        fontSize:20,
        fontFamily:"turret-road-extra-bold"
    },
    SubmitButton:{
        justifyContent:'center',
        alignContent:'center',
    }
})

export default GuessForm

