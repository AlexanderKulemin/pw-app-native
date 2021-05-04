import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { logOut } from '../store/auth';
import { useAppDispatch } from '../store';
import { getCurrentUser } from '../store/users';
import User from './User';
import menu from '../assets/images/menu.png';
import { IRootState } from '../models';

export interface MainProps {
  navigation: any
}
 
const Main: React.FC<MainProps> = ({ navigation }: MainProps) => {
  const { name } = useSelector((state: IRootState) => state.users.currentUser);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  }
  
  const handleMenu = () => {
    setIsShowMenu(prev => !prev);
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Welcome, ${name}`,
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={handleMenu}>
          <Image source={menu} style={styles.menuImg} />
        </TouchableOpacity>
      ),
    })
  }, [navigation]);

  return ( 
    <View>
      <User navigation={navigation} />

      {isShowMenu && <View style={styles.menu}>
        <TouchableOpacity onPress={() => onLogOut()} style={styles.btn}>
          <Text style={styles.btnTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
}
const styles = StyleSheet.create({
  menuBtn: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  menuImg: {
    width: '100%',
    height: '100%'
  },
  menu: {
    width: 150,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    flex: 1,
  },
  btnTxt: {
    textTransform: 'uppercase',
    fontSize: 17,
    textAlign: 'center'
  }
})
export default Main;