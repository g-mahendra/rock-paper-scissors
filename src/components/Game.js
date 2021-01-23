import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

//11dArMIDXP

const Game = ({route}) => {
  const {code, isGuest, isHost} = route.params;
  const [host, setHost] = useState('');
  const [guest, setGuest] = useState('');
  const [guestmove, setGuestmove] = useState('');
  const [hostmove, setHostmove] = useState('');
  const [winner, setWinner] = useState('');
  const [choice, setChoice] = useState('');

  useEffect(() => {
    const unsubscribe = database()
      .ref(`/native/${code}`)
      .on('value', (snapshot) => {
        const values = snapshot.val();
        setGuest(values.guest);
        setHost(values.host);
        setHostmove(values.hostmove);
        setGuestmove(values.guestmove);
        setWinner(values.winner);
      });
    return () => database().ref(`/native/${code}`).off('value', unsubscribe);
  }, []);

  const uploadWinner = (text) => {
    database().ref(`/native/${code}`).update({
      winner: text,
    });
  };
  var i = 1;
  if (i == 1) {
    if (hostmove && guestmove) {
      console.log('Method called');
      if (hostmove === guestmove) {
        uploadWinner('Its a tie');
      } else if (hostmove === 'Stone' && guestmove === 'Paper') {
        uploadWinner(`${guest} won`);
      } else if (hostmove === 'Stone' && guestmove === 'Scissors') {
        uploadWinner(`${host} won`);
      } else if (hostmove === 'Paper' && guestmove === 'Stone') {
        uploadWinner(`${host} won`);
      } else if (hostmove === 'Paper' && guestmove === 'Scissors') {
        uploadWinner(`${guest} won`);
      } else if (hostmove === 'Scissors' && guestmove === 'Stone') {
        uploadWinner(`${guest} won`);
      } else if (hostmove === 'Scissors' && guestmove === 'Paper') {
        uploadWinner(`${host} won`);
      }
    }
    i++;
  }

  const updateChoice = (text) => {
    if (isHost) {
      database()
        .ref(`/native/${code}`)
        .update({
          hostmove: text,
        })
        .then(() => console.log('Host Choice updated'))
        .catch((e) => console.log(e));
    } else if (isGuest) {
      database()
        .ref(`/native/${code}`)
        .update({
          guestmove: text,
        })
        .then(() => console.log('Guest Choice updated'))
        .catch((e) => console.log(e));
    }
  };

  hostmove ? console.log(hostmove) : null;
  winner ? console.log(winner) : null;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#12005e',
    },
    upperbar: {
      flex: 1,
    },
    gameboard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 5,
      backgroundColor: '#FFF',
      borderTopLeftRadius: wp('10%'),
      borderTopRightRadius: wp('10%'),
    },
    title: {
      color: '#FFF',
      fontSize: hp('3%'),
    },
    titleview: {
      paddingHorizontal: wp('2%'),
      paddingVertical: hp('2%'),
      borderBottomWidth: hp('0.1'),
      borderBottomColor: '#FFF',
      elevation: 5,
      backgroundColor: '#12005e',
    },
    playersview: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp('10%'),
      paddingVertical: hp('3%'),
    },
    player: {
      color: '#FFF',
      fontSize: hp('2.5%'),
    },
    choice: {
      display: winner ? 'none' : 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: {
      fontSize: hp('10%'),
      marginHorizontal: wp('2%'),
    },
    wonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chosenEmoji: {
      fontSize: hp('30%'),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.upperbar}>
        <View style={styles.titleview}>
          <Text style={styles.title}>Rock-Paper-Scissors</Text>
        </View>
        <View style={styles.playersview}>
          <Text style={styles.player}>Host: {host}</Text>
          <Text style={styles.player}>Guest: {guest}</Text>
        </View>
      </View>
      <View style={styles.gameboard}>
        <Text>Winner: {winner}</Text>
        <View style={styles.choice}>
          {choice ? (
            <View style={styles.wonContainer}>
              <Text style={styles.chosenEmoji}>{choice}</Text>
              <Text>You Chose</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setChoice('👊');
                  updateChoice('Stone');
                }}>
                <Text style={styles.emoji}>👊</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setChoice('🖐️');
                  updateChoice('Paper');
                }}>
                <Text style={styles.emoji}>🖐️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setChoice('✌️');
                  updateChoice('Scissors');
                }}>
                <Text style={styles.emoji}>✌️</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Game;
