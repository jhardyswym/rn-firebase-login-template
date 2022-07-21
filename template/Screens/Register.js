import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class Register extends React.Component
{

    constructor(props){
        super(props);

        this.state = {
            passwordShown:false,
            emailReady:false,
            passwordReady:false,
            errortext:'',
            emailText:'',
            passwordText:'',
            passwordsMatch:false,
            confirmPassTxt:'',
            nameText:''

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
        else if(this.state.nameText === ''){
            etxt = 'Enter a Display Name'
        }
        else if(this.state.passwordsMatch){
            errors = false;
        }
      
        this.setState({errortext:etxt});
  
        return errors;
    }
    handleSubmitPress = () =>{
        if(!this.formHasErrors()){
            console.log(`Attempting login w/ Email '${this.state.emailText}' Password '${this.state.passwordText}'`);
            
            auth().createUserWithEmailAndPassword(this.state.emailText,this.state.passwordText)
            .then((user)=>{
                user.user.updateProfile({displayName:this.state.nameText})
                .then(()=>{
                    console.log("User Account Created & Signed in!");
                    this.props.navigation.replace("Home")
                })
                .catch((error)=>console.log(error))
            })
            .catch(error =>{
                if (error.code === 'auth/email-already-in-use') {
                    this.setState({errortext:'That email address is already in use!'})
                  }
         
                  console.error(error);
            })
        }
    }
    setDispName = (name) =>{
        this.setState({nameText:name});
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
        let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if(!reg.test(pass)){
            this.setState({passwordReady:false,confirmPassTxt:'Password Requirements: 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number'});
        }
        else{
            this.setState({passwordReady:true,confirmPassTxt:''});
        }

        this.setState({passwordText:pass});
    }

    confirmPassword = (cpass) =>{
        if(cpass !== this.state.passwordText){
            this.setState({confirmPassTxt:'Passwords Do Not Match',passwordsMatch:false});
        }else{
            this.setState({confirmPassTxt:'',passwordsMatch:true});
        }
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
               
                        <Text style={styles.splashTxt}>Registration</Text>
                    </View>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.SectionStyle}>
                            <TextInput 
                                style={styles.inputStyle}
                                placeholder="Display Name (Full Name, Team Name etc.)"
                                keyboardType="default"
                                returnKeyType='next'
                                placeholderTextColor={'grey'}
                                autoCapitalize="none"
                                onChangeText={(name)=>{this.setDispName(name)}}
                            />
                           
                        </View>
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
                        <View style={styles.SectionStyle}>
                            <TextInput 
                                style={styles.inputStyle}
                                placeholder="Confirm Password"
                                keyboardType='default'
                                returnKeyType='next'
                                placeholderTextColor={'grey'}
                                secureTextEntry={!this.state.passwordShown}
                                autoCapitalize="none"
                                onChangeText={(passText)=>{this.confirmPassword(passText)}}
                            />
                        </View>
                        {this.state.confirmPassTxt != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {this.state.confirmPassTxt}
                            </Text>
                        ) : null}
                        <Text
                            style={styles.passVisText}
                            onPress={() => this.setState({passwordShown:!this.state.passwordShown})}>
                            {this.state.passwordShown ? "Hide Password" : "Show Password"}
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>REGISTER</Text>
                        </TouchableOpacity>
                        {this.state.errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {this.state.errortext}
                            </Text>
                        ) : null}
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            Already have an account? Login
                        </Text>

                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => this.props.navigation.navigate('Register')}>
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