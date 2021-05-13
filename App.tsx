import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import MainStack from './navigation/MainNavigator';
import { Game, Home, Onboarding, ScoreTable } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import {store} from './app/store';
import { Provider } from 'react-redux';




export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <AppLoading/>
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <PaperProvider>
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
                        fontFamily:"turret-road-bold",
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
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
