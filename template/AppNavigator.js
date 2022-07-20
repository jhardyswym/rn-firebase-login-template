import React from 'react';
import type {Node} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert
} from 'react-native';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import AppMain from './AppMain';
export default class AppNavigator extends React.Component
{
    constructor(props){
        super(props);

    }



    componentDidMount(){
        
    }
    profileIconPressed = () =>{
        console.log("Profile Pressed")
        Alert.alert(
            "Profile",
            `${auth().currentUser.displayName}\n${auth().currentUser.email}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Sign Out", onPress: () => this.logUserOut()}
            ]
          );
    }
    render(){
        return(

            <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen
                name='Main'
                component={AppMain}
                options={{headerRight: (props) => 
                        <TouchableOpacity>
                            <Icon style={hstyles.usericon} name='user' color='black' size={30} onPress={this.profileIconPressed}/>
                        </TouchableOpacity>,
                        headerTitle:(props) => 
                        <Text style={hstyles.titleTxt}>Home</Text>
                        }}
            />
            
        </Stack.Navigator>
        )
    }
}

const hstyles = StyleSheet.create({
    container:{
        backgroundColor:'red',
        marginLeft: 0,
        flex:1,
        paddingRight: 0
    },
    titleTxt:{
        color:'black',
       
        fontSize:28,

    },
    usericon:{
      paddingRight:10
    }
});
