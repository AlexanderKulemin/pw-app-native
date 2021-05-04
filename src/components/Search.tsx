import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList  } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { getUsers, clearUsers } from '../store/users';
import { IRootState, IUser } from '../models';

export interface TransactionProps {
  navigation: any
}
 
const Search: React.FC<TransactionProps> = ({ navigation }: TransactionProps) => {
  const users = useSelector((state: IRootState) => state.users.users);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    if (value && value.trim().length) {
      dispatch(getUsers(value));
    }

    if (!value.length) {
      dispatch(clearUsers());
    }
  }

  const handlePress = (item: IUser) => {
    
    if (inputRef && inputRef.current) {
      dispatch(clearUsers());
      inputRef.current.clear();
    }

    navigation.navigate('Transaction', item)
  }

  useEffect(() => {
    return () => {
      dispatch(clearUsers());
    }
  }, []);

  const Item = ({ item }: {item: IUser}) => {
    return(
      <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return ( 
    <View style={styles.transaction}>
      <View style={styles.head}>
        <TextInput style={styles.input} placeholder={'User name'} onChangeText={handleChange} ref={inputRef}/>
      </View>
      {users.length ?
      <FlatList 
        style={styles.list}
        data={users}
        renderItem={Item}
        keyExtractor={(item: IUser) => item.id.toString()}
      /> : 
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nothing founded</Text>
      </View>}

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
    paddingTop: 10,
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
  list: {
    marginHorizontal: 30,
  },
  item: {
    borderBottomColor: '#F7F7FB',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    paddingVertical: 14
  },
  empty: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray'
  }
});

export default Search;