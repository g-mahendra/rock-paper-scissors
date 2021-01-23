import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from './context/AuthContext';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [error, setError] = useState('');
  const {signup} = useAuth();

  const onSubmit = async () => {
    if (email === '') {
      setError('All fields are necessary ');
      return;
    }
    if (password !== newpassword) {
      setError('Password did not match');
      return;
    }
    try {
      await signup(email, password);
    } catch (error) {
      setError('Error signing up');
    }
  };

  const goToSignIn = () => navigation.navigate('signin');

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 5,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      paddingVertical: hp('2%'),
      paddingHorizontal: wp('3%'),
    },
    input: {
      borderWidth: hp('0.1%'),
      paddingVertical: hp('2%'),
      paddingHorizontal: wp('3%'),
      width: wp('50%'),
      borderRadius: wp('30%'),
      backgroundColor: '#311B92',
      borderColor: '#FFF',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    conformPassword: {
      borderWidth: hp('0.1%'),
      paddingVertical: hp('2%'),
      paddingHorizontal: wp('3%'),
      width: wp('50%'),
      borderRadius: wp('30%'),
      backgroundColor: '#311B92',
      borderColor: error ? '#F00' : '#FFF',
      color: error ? '#F00' : '#fff',
    },
    inputcontainer: {
      marginVertical: hp('1%'),
    },
    label: {
      marginVertical: hp('0.5%'),
      color: '#FFF',
      fontSize: hp('2%'),
    },
    mainView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#4527A0',
    },
    btn: {
      borderWidth: 1,
      paddingVertical: hp('0.3%'),
      paddingHorizontal: wp('3%'),
      width: wp('50%'),
      borderRadius: wp('30%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: hp('1%'),
      backgroundColor: '#FFF',
      elevation: 5,
    },
    signupbtn: {
      color: '#4527A0',
    },
    titletext: {
      fontSize: hp('5%'),
      color: '#FFF',
    },
    signinbtn: {
      position: 'absolute',
      bottom: hp('2%'),
      borderWidth: 1,
      borderColor: '#FFF',
      borderRadius: wp('30%'),
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('1%'),
    },
    signintext: {
      color: '#FFF',
    },
  });

  return (
    <View style={styles.mainView}>
      <View style={styles.title}>
        <Text style={styles.titletext}>SignUp</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g email@domain.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            textAlignVertical="center"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Enter password here"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            textAlignVertical="center"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.label}>Conform Password</Text>
          <TextInput
            secureTextEntry
            style={styles.conformPassword}
            placeholder="conform password"
            value={!error ? newpassword : error}
            onChangeText={(text) => setNewpassword(text)}
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            textAlignVertical="center"
            onFocus={() => setError('')}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Button onPress={onSubmit} mode="contained" style={styles.btn}>
            <Text style={styles.signupbtn}>SignUp</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={goToSignIn} style={styles.signinbtn}>
          <Text style={styles.signintext}> {'<'}SignIn insted!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
