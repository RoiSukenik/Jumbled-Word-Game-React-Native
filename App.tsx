import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import MainStack from './navigation/MainNavigator';
import { Game, Home, Onboarding, GameOver } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import {store} from './app/store';
import { Provider } from 'react-redux';
import {pageHeaderSchemaOptions} from './constants/Layout';




export default function App() {

  const isLoadingComplete = useCachedResources();
  const {headerLeft,headerStyle,headerTitleStyle} = pageHeaderSchemaOptions
  

  if (!isLoadingComplete) {
    return <AppLoading/>
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PaperProvider>
              <StatusBar />
              <MainStack.Navigator initialRouteName="OnBoarding" >  
                <MainStack.Screen name={"OnBoarding"} component={Onboarding} options={{headerShown:false}} />
                <MainStack.Screen name={"Home"} component={Home} 
                options={
                  {
                    headerShown:false
                }}/>
                <MainStack.Screen name={"Game"} component={Game}
                options={
                  {
                    headerShown:false,
                }}
                />
              <MainStack.Screen name={"GameOver"} component={GameOver}
                options={
                  { 
                  headerTitleStyle:{textAlign:'center',fontFamily:"turret-road-extra-bold",fontSize:36} ,
                  headerStyle:{backgroundColor:"#ff8f00"},
                  headerLeft:()=>null,   
                }
                }
              />
              </MainStack.Navigator>
           </PaperProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}
