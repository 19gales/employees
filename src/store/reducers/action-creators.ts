import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {IUser} from '../../models/interfaces';

export const fetchUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, thunkAPI) => {
    try{
      const {data} = await axios.get<IUser[]>('http://localhost:5000/users');
      return data;
    }catch (e){
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }

  }
);