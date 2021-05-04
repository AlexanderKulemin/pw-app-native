import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/images/parrot.png';

const Home: React.FC<any> = ({ navigation }: {navigation: any}) => {

  return (
    <View style={styles.login}>
      <View style={styles.imgBox}>
        <Image style={styles.img} source={logo} />
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outline} activeOpacity={0.9} onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.outlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  imgBox: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
  },
  img: {
    width: 150,
    height: 150,
    marginHorizontal: 'auto',
  },
  input: {
    height: 60,
    backgroundColor: '#f7f7f7',
    paddingLeft: 22,
    borderRadius: 3,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    color: '#b0b0c3',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e91e63',
    fontSize: 16,
    marginBottom: 10,
  },
  outline: {
    width: '100%',
    height: 60,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    borderColor: '#e91e63',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  outlineText: {
    color: '#e91e63',
    fontSize: 18,
  }
})
export default Home;