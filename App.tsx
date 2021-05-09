import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import MainStack from './navigation/MainNavigator';
import { Game, Home, Onboarding, ScoreTable } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Girassol_400Regular } from '@expo-google-fonts/girassol';
import AppLoading from 'expo-app-loading';
import {Platform} from 'react-native';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  const [loaded] = useFonts({Girassol_400Regular});
      
  if (!loaded) {
    return <AppLoading/>
}
  if (!isLoadingComplete) {
    return <AppLoading/>
  } else {
    return (
      <SafeAreaProvider>
         <StatusBar />
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="OnBoarding" > 
            <MainStack.Screen name={"OnBoarding"} component={Onboarding} options={{headerShown:false}} />
            <MainStack.Screen 
            name={"Home"}
            component={Home} 
            options={
              {
                headerLeft:()=>null,
                title:"The Jumble Word Game",
                headerTitleStyle:
                {
                  fontFamily:'Girassol_400Regular',
                  fontWeight:'bold',
                  textShadowColor:'rgba(255,255,255,1)',
                  textShadowRadius:  -20,
                  textShadowOffset:{width:1,height:1},  
                },
                headerTitleAlign:"center",
                headerStyle:
                {
                  backgroundColor:"#ff9800",
                }
              }}/>
            <MainStack.Screen name={"Game"} component={Game}/>
            <MainStack.Screen name={"ScoreTable"} component={ScoreTable}/>
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
