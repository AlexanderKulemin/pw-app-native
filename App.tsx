import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import store from './src/store';

import Home from './src/components/Home';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import Main from './src/components/Main';
import Transaction from './src/components/Transaction';
import Search from './src/components/Search';
import History from './src/components/History';

import { IRootState } from './src/models';
import { useAppDispatch } from './src/store';
import { setAuthToken } from './src/store/auth';
import { getToken } from './src/network';

const Stack = createStackNavigator();

const AppContainer = () => {
  const isAuth = useSelector((state: IRootState) => state.auth.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (Boolean(token)) {
        dispatch(setAuthToken(token));
      }
    }
    fetchToken();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
        }}
      >
      {isAuth ? (
        <>
        <Stack.Screen name="Welcome" component={Main} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="History" component={History} />
        </>
        )
        :
        (<>
          <Stack.Screen name="Parrot Wings App" component={Home} 
            options={{
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </>)
      }
      </Stack.Navigator>
      <FlashMessage position="bottom" titleStyle={{
        textAlign: 'center'
      }}/>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#fff',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default App;