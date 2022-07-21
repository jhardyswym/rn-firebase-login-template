import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class AppMain extends React.Component
{
    constructor(props){
        super(props);

    }



    componentDidMount(){
        
    }
    getDeveloperName = () =>{
        const name = auth().currentUser.displayName;

        if(name == null || name == ''){
            return 'Developer';
        }
        return name;
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <View style={{width:'20%',backgroundColor:'#91e7fa',alignSelf:'flex-end',padding:5}}>
                        <Text style={{color:'black'}}>^Tap Here to View Account info or sign out</Text>
                    </View>
                </View>
                <Text style={styles.splashTxt}>Welcome to your Application, {auth().currentUser.displayName}</Text>
                <Text style={styles.detailTxt}>Treat this file (AppMain.js) as you would App.js in the default template.</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    splashTxt:{
        textAlign:'center',
        fontSize:48,
        color:'black'
    },
    detailTxt:{
        textAlign:'center',
        fontSize:18,
        color:'black'
    }
});
