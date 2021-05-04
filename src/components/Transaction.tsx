import React, { useEffect, useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList  } from 'react-native';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

import { useAppDispatch } from '../store';
import { getUsers, clearUsers, createTransaction } from '../store/users';
import { IRootState, IUser } from '../models';
import avatar from '../assets/images/user.png';
import arrow from '../assets/images/right-arrow.png';

export interface TransactionProps {
  navigation: any,
  route: any
}
 
const Transaction: React.FC<TransactionProps> = ({ route, navigation }: TransactionProps) => {
  const { id, name } = route.params;
  const balance = useSelector((state: IRootState) => state.users.currentUser.balance);
  const [myBalance, setMyBalance] = useState(balance);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    const num = Number(value);
    
    if (balance && num <= balance && num > 0) { 
      setMyBalance(balance - num);
      setAmount(num);
      setError(false);
    } else {
      setError(true);
      setAmount(0);
      setMyBalance(balance);
    }
  }

  const handleSend = async () => {
    const response = await dispatch(createTransaction({name, amount}));

    if (createTransaction.fulfilled.match(response)) {
      showMessage({
        message: `You have successfully sent ${name} ${amount}PW`,
        type: 'success',
      })
    }

    setAmount(0);

    if (inputRef) {
      inputRef.current.clear();
    }
  };

  useEffect(() => {
    return () => {

    }
  }, []);


  return ( 
    <View style={styles.transaction}>
      
      <View style={styles.balance}>
        <Text>
          My Balance: {myBalance} PW
        </Text>
        <View style={styles.arrowBox}>
          <Image source={arrow} style={styles.arrow} />
        </View>
        <Text>{amount} PW</Text>
      </View>
      <View style={styles.head}>
        <Image source={avatar} style={styles.img} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.box}>
        <TextInput 
          style={[styles.input, error && styles.inputError]} 
          placeholder={'Amount PW'} 
          onChangeText={handleChange} 
          keyboardType="numeric" 
          ref={inputRef}
        />
        {error && <Text style={styles.error}>Incorrect Value</Text>}
      </View>
      <TouchableOpacity 
        style={[styles.button, error && styles.disabled]} 
        activeOpacity={0.9}
        onPress={handleSend}
        disabled={error}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ 
  transaction: {
    flex: 1,
  },
  head: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 18
  },
  input: {
    height: 60,
    backgroundColor: '#f7f7f7',
    paddingLeft: 22,
    borderRadius: 3,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    color: '#333',
  },
  inputError: {
    backgroundColor: 'pink'
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -15,
    marginBottom: 20,
  },
  box: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7
  },
  disabled: {
    opacity: 0.5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  balance: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20,
    // marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowBox: {
    width: 10,
    height: 10,
    marginHorizontal: 10
  },
  arrow: {
    width: '100%',
    height: '100%'
  }
});

export default Transaction;