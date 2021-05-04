import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { logOut } from '../store/auth';
import { useAppDispatch } from '../store';
import { getHistory } from '../store/users';
import { useSelector } from 'react-redux';
import { IRootState, ITransaction } from '../models';

export interface HistoryProps {
  navigation: any
}
 
const History: React.FC<HistoryProps> = ({ navigation }: HistoryProps) => {
  const transactions = useSelector((state: IRootState) => state.users.transactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [])

  const Item = ({ item, index }: {item: ITransaction, index: number}) => {
    const date = new Date(item.date)
    return (
      <View style={styles.item}>
        <View style={styles.box}>
          <Text style={styles.itemName}>{item.username}</Text>
          <Text style={styles.thAmount}>
            <Text style={item.amount < 0 ? styles.negative : styles.positive}>{item.amount}</Text>
          </Text>
          <Text style={styles.thDate}>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</Text>
        </View>
      </View>
    )
  }

  return ( 
    <View style={styles.history}>
      <View style={styles.head}>
        <Text style={styles.thName}>Name</Text>
        <Text style={styles.thAmount}>Amount</Text>
        <Text style={styles.thDate}>Date</Text>
      </View>
      <FlatList 
        style={styles.list}
        data={transactions}
        renderItem={Item}
        keyExtractor={(item: ITransaction) => item.id.toString()}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  history: {
    flex: 1
  },
  list: {

  },
  head: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,

  },
  thName: {
    width: '50%',
    paddingHorizontal: 14,
  },

  thAmount: {
    width: '25%'
  },
  thDate: {
    width: '25%'
  },
  item: {
    borderBottomColor: '#F7F7FB',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemName: {
    paddingVertical: 14,
    fontSize: 16,
    color: 'gray',
    width: '50%'
  },
  box: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  negative: {
    color: 'red',
  },
  positive: {
    color: 'green'
  }
});

export default History;