import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../network/';
import { IUsersInitialState } from '../models';
import { logOut } from './auth';

const initialState: IUsersInitialState = {
  currentUser: {
    name: '',
    balance: 0,
    id: -1,
    email: '',
  },
  users: [],
  transactions: [],
}

const getCurrentUser = createAsyncThunk('users/current', async (_, { dispatch }) => {
  try {
    const repsonse = await axios.get(`/api/protected/user-info`);
    return repsonse.data.user_info_token;
  } catch (error) {
    dispatch(logOut());
  }
});

const getUsers = createAsyncThunk('users/users', async (data: string, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/protected/users/list`, { filter: data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const createTransaction = createAsyncThunk('users/transaction', async(data: {name: string, amount: number}, {rejectWithValue}) => {
  try {
    const {name, amount} = data;
    const response = await axios.post(`/api/protected/transactions`, {name, amount});

    return response.data.trans_token;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getHistory = createAsyncThunk('users/history', async(_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`/api/protected/transactions`);
    return response.data.trans_token;
    
  } catch (error) {
    return rejectWithValue(error);
  }
});

const usersReducer = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.currentUser.balance = action.payload.balance;
    });
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.transactions = action.payload;
    })
  },
});

export { getCurrentUser, getUsers, createTransaction, getHistory };
export const { clearUsers } = usersReducer.actions;
export default usersReducer.reducer;