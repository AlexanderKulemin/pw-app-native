import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { BASE_URL } from '../config';

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (error) {
    console.log(error);
  }
}

export const getToken = async () => {
  try {
    const res = await AsyncStorage.getItem('@auth_token');
    return res;
  } catch (error) {
    console.log(error);
  }
}

const instance = Axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (request) => {
  
  const token = await getToken();

  request.headers.Authorization = `Bearer ${token}`;

  return request;
});

export default instance;
