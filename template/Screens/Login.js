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
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class Login extends React.Component
{

    constructor(props){
        super(props);

        this.state = {
            passwordShown:false,
            emailReady:false,
            passwordReady:false,
            errortext:'',
            emailText:'',
            passwordText:''
        }
    }

    formHasErrors = () =>{
        var etxt = '';
        var errors = true;
        if(!this.state.emailReady && !this.state.passwordReady){
            etxt = 'Email Invalid!\nEnter a Password.';
            
        }
        else if(!this.state.emailReady){
            etxt = "Email Invalid!";
        }
        else if(!this.state.passwordReady){
            etxt = 'Enter a Password.'
        }
        else{
            errors = false;
        }
      
        this.setState({errortext:etxt});
  
        return errors;
    }
    handleSubmitPress = () =>{
        if(!this.formHasErrors()){
            console.log(`Attempting login w/ Email '${this.state.emailText}' Password '${this.state.passwordText}'`);
            auth().signInWithEmailAndPassword(this.state.emailText,this.state.passwordText)
            .then(()=>{
                console.log("User Signed In");
                this.props.navigation.replace('Home');
            })
            .catch((err) => {
                var etxt = '';
                if(err.code === 'auth/user-not-found'){
                    etxt = 'User Not Found'
                }

                if(err.code === 'auth/wrong-password'){
                    etxt = 'Incorrect Password'
                }

                this.setState({errortext:etxt});
            });
        }
    }
    validateEmail = (email) =>{
        email = email.trim();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(reg.test(email)){
            console.log("Email Valid");
            this.setState({emailReady:true});
        }
        else{
            console.log("Email Invalid");
            this.setState({emailReady:false});
        }

        this.setState({emailText:email});
    }

    validatePassword = (pass) =>{
        if(pass == ''){
            this.setState({passwordReady:false});
        }
        else{
            this.setState({passwordReady:true});
        }

        this.setState({passwordText:pass});
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
                        
                        <Text style={styles.splashTxt}>Login</Text>
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
                        <View style={styles.SectionStyle}>
                            <TextInput 
                                style={styles.inputStyle}
                                placeholder="Enter Password"
                                keyboardType='default'
                                returnKeyType='next'
                                placeholderTextColor={'grey'}
                                secureTextEntry={!this.state.passwordShown}
                                autoCapitalize="none"
                                onChangeText={(passText)=>{this.validatePassword(passText)}}
                            />
                        </View>

                        <Text
                            style={styles.passVisText}
                            onPress={() => this.setState({passwordShown:!this.state.passwordShown})}>
                            {this.state.passwordShown ? "Hide Password" : "Show Password"}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>LOG IN</Text>
                        </TouchableOpacity>
                        {this.state.errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {this.state.errortext}
                            </Text>
                        ) : null}
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            New Here? Register
                        </Text>

                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => this.props.navigation.navigate('Forgot Password')}>
                            Forgot Password
                        </Text>
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