import { createStackNavigator } from '@react-navigation/stack';

type MainStackParamList = {
    OnBoarding: undefined;
    Home:       undefined;
    Game:       undefined;
    GameOver:   undefined;
}

const MainStack = createStackNavigator<MainStackParamList>();

export default MainStack;
