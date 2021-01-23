import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from './context/AuthContext';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {signin} = useAuth();
  const onSubmit = async () => {
    if (email === '' || password === '') {
      setError('Please type email and password both');
      return;
    }
    try {
      await signin(email, password);
    } catch (error) {
      console.log(error.message)
      setError('Error signing in!');
    }
  };

  const goToSignUp = () => navigation.navigate('signup');

  const title = 'Welcome:)\nSignIn';

  return (
    <View style={styles.mainView}>
      <View style={styles.title}>
        <Text style={styles.titletext}>{title}</Text>
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
            placeholderTextColor='#aaa'
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
            placeholderTextColor='#aaa'
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputcontainer}>
          <Button onPress={onSubmit} mode="contained" style={styles.btn}>
            <Text style={styles.signupbtn}>SignIn</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={goToSignUp} style={styles.signupBtn}>
          <Text style={styles.signupText}>Signup insted!{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  error: {
    fontSize: hp('1%'),
    color: '#F00',
  },
  signupBtn: {
    position: 'absolute',
    bottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: wp('30%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  signupText: {
    color: '#FFF',
  },
});

export default SignIn;
