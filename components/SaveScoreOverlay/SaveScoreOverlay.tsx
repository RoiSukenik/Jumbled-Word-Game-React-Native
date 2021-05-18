import React, { useState } from 'react'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { Headline, Subheading } from 'react-native-paper';
import { Formik } from 'formik';
import { saveScoreTable } from '../../features/scoreSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Button, Input } from 'react-native-elements';
import { Text,View,StyleSheet } from 'react-native';
import * as yup from 'yup'
import { ILPhoneRegex } from '../../constants/ConstVariables';

type Props ={
    isVisible:boolean,
}
interface FormValuesType {
    Name:string,
    PhoneNumber:string
}

const initialFormValues:FormValuesType ={
    Name:"",
    PhoneNumber:""
}

const tableEntrySchema = yup.object({
    Name: yup.string().min(3),
    PhoneNumber: yup.string().matches(ILPhoneRegex,"Phone Number is invalid")
})
function SaveScoreOverlay({isVisible}:Props) {

    

    const appDispatch = useAppDispatch();

    const {score} =useAppSelector(state => state.gameState);

    const [visible, setVisible] = useState(isVisible);
    

    return (
        <Overlay isVisible={visible} >
            <Headline>
                Great Game! Now It's Time To Save Your Score!
            </Headline>
            <Subheading>
                Please Make Sure To Fill Your Correct Information!
            </Subheading>
            <Formik
                initialValues={initialFormValues}
                validationSchema={tableEntrySchema}
                onSubmit={(values):void => {
                    let tableEnrty ={
                        name:values.Name,
                        phone:values.PhoneNumber,
                        score:score
                    }  
                    
                    setVisible(false)
                    appDispatch(saveScoreTable(tableEnrty))
                    
                }
            }
            >
            {(formikProps)=>
            <View>
                <Input
                    label="Player Name"
                    placeholder="Ex. John Dou"
                    onChangeText={formikProps.handleChange('Name')}
                    keyboardType="ascii-capable"
                />
                <Text style={styles.ErrorText}>{formikProps.errors.Name}</Text>
                <Input
                    label="Phone Number"
                    placeholder="Ex. 05XXXXXXXX"
                    onChangeText={formikProps.handleChange('PhoneNumber')}
                    keyboardType="number-pad"
                />
                <Text style={styles.ErrorText}>{formikProps.errors.PhoneNumber}</Text>
                <View style={styles.ButtonGroup}>
                    <Button
                        title="Save"
                        containerStyle={styles.ClearButton}
                        onPress={formikProps.handleSubmit as (values:any)=>void}
                    />
                </View>
            </View>
            }
            </Formik>
        </Overlay>
    )
}

export default SaveScoreOverlay


const styles = StyleSheet.create({
    ButtonGroup:{
        flexDirection:"row",
        justifyContent:"center",
    },
    SaveButton:{
        padding:5
    },
    ClearButton:{
        padding:5
    },
    ErrorText:{
        textAlign:"center",
        fontSize:20,
        fontFamily:"turret-road-extra-bold"
    },
})
