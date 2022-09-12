import React, {FC} from 'react';
import UserForm from './page-user';
import { useGetEditUser} from '../../store/reducers/user-slice';
import {IUser} from '../../models/interfaces';

const EditUserForm: FC = ():JSX.Element =>{
  const userById: IUser = useGetEditUser();
  return(<UserForm  userById={userById}/>);
};


export default EditUserForm;
