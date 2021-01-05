import {createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import login from '../Components/login'
import otpScreen from '../Components/otpScreen'
import { NavigationContainer } from '@react-navigation/native';

 type RootStackParamList = {
    login: undefined;
    otpScreen:{ phoneNum: string };
  };
const RootStack = createStackNavigator<RootStackParamList>();


const MainStack = () =>
    (<RootStack.Navigator initialRouteName='login' screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
      name={'login'}
      component={login}
    />  
    <RootStack.Screen
      name={'otpScreen'}
      component={otpScreen}/>
      </RootStack.Navigator>);


//const AppNavigator = createStackNavigator({home: otpScreen});
const NewContainer = () => {
    return (<NavigationContainer><MainStack/></NavigationContainer>)
}

export default NewContainer//createAppContainer(NewContainer);