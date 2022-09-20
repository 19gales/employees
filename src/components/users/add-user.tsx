import React, {FC} from 'react';
import UserForm from './page-user';
import { customAlphabet } from 'nanoid';
import {IUser} from '../../models/interfaces';
const nanoid = customAlphabet('1234567890', 3);

const AddUser: FC = () =>{
  const user: IUser = {
    id:  Number(nanoid()),
    name: null,
    isArchive: false,
    role: '',
    phone: '',
    birthday: null
  };
  return(<UserForm  userById={user}/>);
};

export default AddUser;
