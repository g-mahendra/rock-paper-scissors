import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {useAuth} from './components/context/AuthContext';

import SignIn from './components/SignIn';
import Game from './components/Game';
import ChooseGame from './components/ChooseGame';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Splash from './components/Splash';
import SignUp from './components/SignUp';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthFlow = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AuthStack.Screen name="signin" component={SignIn} />
      <AuthStack.Screen name="signup" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainFlow = () => {
  return (
    <MainStack.Navigator
      initialRouteName="choosegame"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <MainStack.Screen name="choosegame" component={ChooseGame} />
      <MainStack.Screen name="creategame" component={CreateGame} />
      <MainStack.Screen name="joingame" component={JoinGame} />
      <MainStack.Screen name="game" component={Game} />
    </MainStack.Navigator>
  );
};

const App = () => {
  const {currentUser} = useAuth();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);
  if (loading) return <Splash />;
  return (
    <>
      <StatusBar backgroundColor="#12005e" barStyle="light-content" />
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}>
          {currentUser ? (
            <AppStack.Screen name="main" component={MainFlow} />
          ) : (
            <AppStack.Screen name="auth" component={AuthFlow} />
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
