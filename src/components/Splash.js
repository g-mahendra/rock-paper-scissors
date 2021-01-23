import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {};

  const title = '\n \n';

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👊🖐️✌️</Text>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Rock-Paper-Scissors</Text>
        <Text style={styles.title}>A simple</Text>
        <Text style={styles.title}>Multiplayer game</Text>
        <ActivityIndicator size="small" color="#fff" />
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
    flex: 1,
    backgroundColor: '#4527A0',
  },
  emoji: {
    fontSize: hp('10%'),
  },
  title: {
    fontSize: hp('4%'),
    color: '#fff',
  },
  titlecontainer: {
    alignItems: 'center',
  },
});

export default SignIn;
