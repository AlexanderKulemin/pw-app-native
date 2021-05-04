import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { logOut } from '../store/auth';
import { useAppDispatch } from '../store';
import { getCurrentUser } from '../store/users';
import avatar from '../assets/images/user.png';
import { IRootState } from '../models';


 
const User = ({navigation}: {navigation: any}) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: IRootState) => state.users.currentUser);

  const onLogOut = () => {
    dispatch(logOut());
  }
  
  useEffect(() => {
    const resp = dispatch(getCurrentUser());
    console.log('resp', resp);
    
  }, []);

  return ( 
    <View style={styles.user}>
      <View style={styles.avatar}>
        <Image source={avatar} style={styles.img} />
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.info}>
        <Text style={styles.balance}>Balance</Text>
        <View style={styles.dot}></View>
        <Text style={styles.balance}>
          <Text style={styles.pw}>{user.balance}</Text> pw</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.outline} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.outlineText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  user: {
    // flex: 1,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    width: 100,
    height: 100
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    marginBottom: 5
  },
  balance: {
    textAlign: 'center',
    fontSize: 16,
    color: '#525464',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#e91e63',
    marginHorizontal: 15,
    borderRadius: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 60,
    borderRadius: 3,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  outline: {
    width: 150,
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7
  },
  outlineText: {
    color: '#e91e63',
    fontSize: 16
  },
  pw: {
    color:'#000',
  }
})
export default User;