import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import MainStack from './navigation/MainNavigator';
import { Game, Home, Onboarding, GameOver } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import {store} from './app/store';
import { Provider } from 'react-redux';
import {pageHeaderSchemaOptions} from './constants/Layout'



export default function App() {

  const isLoadingComplete = useCachedResources();
  const {headerLeft,headerStyle,headerTitleStyle} = pageHeaderSchemaOptions
  

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
                  <MainStack.Screen name={"Home"} component={Home} 
                  options={
                    {
                      headerLeft:headerLeft,
                      title:"The Jumble Word Game",
                      headerTitleStyle:headerTitleStyle,
                      headerTitleAlign:"center",
                      headerStyle:headerStyle,
                  }}/>
                  <MainStack.Screen name={"Game"} component={Game}
                  options={
                    {
                      headerShown:false,
                      headerTitleStyle:headerTitleStyle,
                      headerTitleAlign:"center",
                      headerStyle:headerStyle,
                  }}
                  />
                <MainStack.Screen name={"GameOver"} component={GameOver}/>
              </MainStack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
