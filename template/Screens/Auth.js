import React from 'react';

import {
  StyleSheet,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
const Stack = createStackNavigator();

export default class Auth extends React.Component
{


    render(){
        return(
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{headerShown:false}}
                />

                <Stack.Screen
                    name='Register'
                    component={Register}
                    options={{headerShown:false}}
                />

                <Stack.Screen
                    name ='Forgot Password'
                    component={ForgotPassword}
                />
            </Stack.Navigator>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    splashTxt:{
        textAlign:'center',
        fontSize:72,
        color:'black'
    }
});