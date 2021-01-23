import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from './/context/AuthContext';

const ChooseGame = ({navigation}) => {
  const {signout} = useAuth();
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generateString = (length) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const navigateToCreate = () => {
    const code = generateString(10);
    navigation.navigate('creategame', {code: code});
  };
  const navigateToJoin = () => {
    navigation.navigate('joingame');
  };

  const signOut = async () => {
    try {
      await signout();
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a game type bellow</Text>
      <Button onPress={navigateToCreate} style={styles.btn}>
        Create a game
      </Button>
      <Button onPress={navigateToJoin} style={styles.btn}>
        Join a game
      </Button>
      <TouchableOpacity onPress={signOut} style={styles.signout}>
        <Text style={styles.signouttext}>SignOut</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: hp('3%'),
    color: '#FFF',
    marginVertical: hp('2%'),
  },
  signout: {
    position: 'absolute',
    bottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: wp('30%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  signouttext: {
    color: '#FFF',
  },
});

export default ChooseGame;
