import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from './context/AuthContext';
// import firestore from '@react-native-firebase/firestore';
import database from "@react-native-firebase/database";
const CreateGame = ({route, navigation}) => {
  const [host, setHost] = useState('');
  const {currentUser} = useAuth();

  const {code} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Share bellow code with your friend for him/her to join the game
      </Text>
      <View style={{...styles.btn, backgroundColor: '#120040'}}>
        <Text style={styles.gameCode}>{code}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          value={host}
          onChangeText={(text) => setHost(text)}
          placeholder="Enter username for game"
          placeholderTextColor="#aaa"
          color="#FFF"
        />
      </View>
      <Button
        onPress={() => {
          database()
            .ref(`/native/${code}`)
            .update({
              gamecode: code,
              host: host,
              hostEmail: currentUser.email,
              hostmove: '',
              guestmove: '',
              winner: ''
            })
            .then(() => console.log('Game created successfully'))
            .catch((e) => console.log(e));
          navigation.navigate('game', {
            code: code,
            isGuest: false,
            isHost: true
          });
        }}
        style={styles.btn}>
        Enter Game
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

export default CreateGame;
