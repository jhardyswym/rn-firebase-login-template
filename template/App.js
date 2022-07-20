/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  StyleSheet,

} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';



import Splash from './Screens/Splash';
import Auth from './Screens/Auth';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const App: () => Node = () => {
  
  const [user, setUser] = useState();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>

        <Stack.Screen 
            name="Splash"
            component={Splash}
            options={{headerShown:false}}
        />

        <Stack.Screen 
            name="Auth"
            component={Auth}
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="Home"
            component={AppNavigator}
            options={{headerShown:false}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};



export default App;
