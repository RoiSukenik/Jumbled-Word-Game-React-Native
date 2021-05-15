import { Dimensions } from 'react-native';
import Colors from './Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const pageHeaderSchemaOptions={
  headerLeft:()=>null,
  
  headerTitleStyle:
  {
    fontFamily:"turret-road-bold",
    textShadowColor:'rgba(255,255,255,1)',
    textShadowRadius:  -20,
    textShadowOffset:{width:1,height:1},  
  },
  headerStyle:
  {
    backgroundColor:Colors.primary.background,
  }}

export default {
  window: {
    width,
    height,
  },
  
  isSmallDevice: width < 375,
};
export {pageHeaderSchemaOptions}
