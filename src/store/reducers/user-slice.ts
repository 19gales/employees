import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, IUserTable} from '../../models/interfaces';
import {fetchUsers} from './action-creators';
import {useAppSelector} from '../../hooks/hooks';
import {RootState} from '../store';

export interface UserState {
  entities: IUser[];
  editUser: IUser[];
  status: 'loading' | 'succeeded' | 'failed';
  userStatus: 'add' | 'edit' | ''
}

const initialState: UserState = {
  entities: [],
  editUser: [],
  userStatus: '',
  status: 'loading',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      if(state.entities !== null) {
        state.entities.push(action.payload);
      }
    },
    getUser(state, action: PayloadAction<IUser>) {
      const userById = state.entities.find((user) => user.id === action.payload.id);
      if(userById){
        state.editUser.push(userById);
      }
      state.userStatus = 'edit';
    },
    updateUser(state, {payload}) {
      const index = state.entities.findIndex((user) => user.id === payload.id);
      state.entities[index] = payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.entities = state.entities.filter(user => user.id !== action.payload);
    },
    clearEditUser(state) {
      state.editUser = [];
      state.userStatus = '';
    },
    getUserStatus(state) {
      state.userStatus = 'add';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.entities = [];
      })
      .addCase(fetchUsers.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.entities = state.entities.concat(payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const useGetById = () => (
  useAppSelector((state: RootState) =>
    state.users.entities
      .map( ({id, name, isArchive, role, phone, birthday} : IUser): IUserTable => {
        const roles : {[key:string]:string}  = {
          cook: 'Повар',
          driver: 'Водитель',
          waiter: 'Официант',
        } ;

        return {
          id: id,
          name: name || '',
          isArchive: isArchive ? 'в архиве' : 'не в архиве',
          role: roles[role] || '',
          phone: phone,
          birthday: birthday || '',
        };}))
);

export const useGetStatus = () => useAppSelector((state: RootState) => state.users.status);
export const useGetUserStatus = () => useAppSelector((state: RootState) => state.users.userStatus);
export const useGetEditUser = () => useAppSelector((state: RootState) => state.users.editUser[0]);

export const {
  deleteUser,
  addUser,
  updateUser,
  getUser,
  clearEditUser,
  getUserStatus,
} = userSlice.actions;

export default userSlice.reducer;
