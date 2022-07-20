import React from 'react';
import type {Node} from 'react';
import {
    KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class ForgotPassword extends React.Component
{

    constructor(props){
        super(props);

        this.state = {
            errortext:'',
            emailText:''
        }
    }
    validateEmail = (email) =>{
        email = email.trim();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(reg.test(email)){
            console.log("Email Valid");
            this.setState({emailReady:true});
            this.setState({errortext:''});
        }
        else{
            console.log("Email Invalid");
            this.setState({errortext:'Invalid Email Address'});
            this.setState({emailReady:false});
        }

        this.setState({emailText:email});
    }
    handleSubmitPress = () =>{
        if(!this.state.emailReady) return;

        auth().sendPasswordResetEmail(this.state.emailText)
        .then(() =>{
            console.log("Email Sent!");
            Alert.alert(
                "Email Sent!",
                `Password Reset Email sent to "${this.state.emailText}"\n\nPlease check your email for instructions to reset your password then return to the app.`,
                [
                  {
                    text: "Ok",
                    onPress: () => {this.props.navigation.replace('Login')},
                    style: "cancel"
                  }
                  
                ]
              );
        })
        .catch((err) => {
            console.log("Error Sending email:",err);

            if(err.code === 'auth/user-not-found'){
                this.setState({errortext:'No User With That Email Address Found!'});
            }else{
                this.setState({errortext:'An error occured while sending reset email. Please try again.'});
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
            }}>
            
                <View>
                    <View style={{alignItems: 'center'}}>
                        
                        <Text style={styles.splashTxt}>Password Reset</Text>
                    </View>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.SectionStyle}>
                            <TextInput 
                                style={styles.inputStyle}
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType='next'
                                placeholderTextColor={'grey'}
                                autoCapitalize="none"
                                onChangeText={(emailText)=>{this.validateEmail(emailText)}}
                            />
                           
                        </View>

                        {this.state.errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {this.state.errortext}
                            </Text>
                        ) : null}
                    
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>Send Reset Email</Text>
                        </TouchableOpacity>
                    
                    </KeyboardAvoidingView>
                </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignContent: 'center',
    },
    splashTxt:{
        textAlign:'center',
        fontSize:72,
        color:'black'
    },
    SectionStyle:{
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 12,
        marginRight: 12,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'black',
      },
      buttonStyle: {
        backgroundColor: 'black',
        borderWidth: 0,
        color: 'black',
        borderColor: 'black',
        height: 40,
        alignItems: 'center',
        
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 25,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },

      registerTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
      },

      passVisText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        alignSelf: 'center',
        padding: 5,
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
});