import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class Splash extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            user:null
        }
    }

    onAuthStateChanged = (user) =>{
        console.log("User Logged in:",user);
        
        this.setState({user:user});
    }

    componentDidMount(){
        auth().onAuthStateChanged(this.onAuthStateChanged);
        setTimeout(()=>{
            console.log("Nav. Splash->Auth")
            if(this.state.user){
                console.log("User Logged in, Going to provisioning");
                this.props.navigation.replace('Home');
            }
            else{
                console.log("No User, going to Login/Auth");
                this.props.navigation.replace('Auth');
            }
        },500)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.splashTxt}>Sign Signal Mobile</Text>
            </View>
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