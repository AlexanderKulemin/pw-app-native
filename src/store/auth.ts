import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {setToken, getToken} from '../network/';
import { IsignIn, IsignUp, IauthInitialState, IError } from '../models';

const signIn = createAsyncThunk('auth/signin', 
  async (data : IsignIn, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/sessions/create`, data);
      setToken(response.data.id_token);
      return {email: data.email, token: response.data.id_token};
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({code: status, message: data});
    }
});

const signUp = createAsyncThunk
  ('auth/signUp', 
    async (data: IsignUp, { rejectWithValue }) => {

    try {
      await axios.post(`/users`, data)
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({code: status, message: data});
    }
});

const logOut = createAsyncThunk('auth/logOut', async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
})

const initialState: IauthInitialState = {
  username: '',
  email: '',
  isAuth: false,
  token: '',
  error: {
    code: null,
    message: '',
  }
}

const authReducer = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
    })
    builder.addCase(signUp.rejected, (state, action) => {
      const { code, message } = action.payload as IError;
      state.error.code = code;
      state.error.message = message;
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    })
    builder.addCase(signIn.rejected, (state, action) => {
      const { code, message } = action.payload as IError;
      state.error.code = code;
      state.error.message = message;
    })

    builder.addCase(logOut.fulfilled, (state, action) => {
      state.token = '';
    })
  },
});

export { signIn, signUp, logOut };
export const { setAuthToken } = authReducer.actions;
export default authReducer.reducer;