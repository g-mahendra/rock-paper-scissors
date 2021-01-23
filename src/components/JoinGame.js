import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import database from '@react-native-firebase/database';

const JoinGame = ({route, navigation}) => {
  const [guest, setGuest] = useState('');
  const [code, setCode] = useState('');

  const navigateToJoinGame = () => {
    database().ref(`/native/${code}`).update({
      guest: guest,
    });
    navigation.navigate('game', {
      code: code,
      isGuest: true,
      isHost: false,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the game code to join the game</Text>
      <View style={styles.input}>
        <TextInput
          value={guest}
          onChangeText={(text) => setGuest(text)}
          placeholder="Enter username for game"
          placeholderTextColor="#aaa"
          color="#FFF"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          value={code}
          onChangeText={(text) => setCode(text)}
          placeholder="Enter game code"
          placeholderTextColor="#aaa"
          color="#FFF"
        />
      </View>
      <Button onPress={navigateToJoinGame} style={styles.btn}>
        Join Game
      </Button>
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
    backgroundColor: '#12005e',
  },
  btn: {
    backgroundColor: '#FFF',
    borderRadius: wp('10%'),
    width: wp('50%'),
    paddingVertical: hp('2%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  title: {
    fontSize: hp('2%'),
    color: '#FFF',
    marginVertical: hp('2%'),
  },
  gameCode: {
    fontSize: hp('3%'),
    color: '#FFF',
  },
  input: {
    borderRadius: wp('10%'),
    width: wp('50%'),
    paddingVertical: hp('2%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
    backgroundColor: '#120040',
    paddingVertical: hp('1%'),
    borderWidth: 1,
    borderColor: '#FFF',
  },
});

export default JoinGame;
