import React, {FC, useState} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {
  addUser,
  updateUser,
  useGetUserStatus
} from '../../store/reducers/user-slice';
import {Button, Checkbox, DatePicker, Form, Input, message, Select, Space} from 'antd';
import Title from 'antd/lib/typography/Title';
import {MessageType} from 'antd/es/message';
import {MaskedInput} from 'antd-mask-input';
import {Link, useNavigate} from 'react-router-dom';
import moment from 'moment';
import {IUser} from '../../models/interfaces';

type UseFormProps = {
  userById?: IUser,
}

const UserForm: FC<UseFormProps> = ({userById}) => {
  const dispatch = useAppDispatch();
  const statusUser = useGetUserStatus();
  const [valueArchive, setValueArchive] = useState(userById!.isArchive);
  const [valueName, setValueName] = useState(userById!.name || '');
  const [valuePhone, setValuePhone] = useState(userById!.phone);
  const [valueRole, setValueRole] = useState(userById!.role);
  const [valueData, setValueData] = useState(userById!.birthday || '');

  const dateFormat = 'DD.MM.YYYY';
  const navigate = useNavigate();
  const isUserStatusAdd = statusUser === 'add';

  const handleEditUser = (valueArchive: boolean) => {
    setValueArchive(!valueArchive);
  };
  const handleSelect = (valueRole: string) => {
    setValueRole(valueRole);
  };
  const handleData = (dateString: string) => {
    setValueData(dateString);
  };
  const handleValidate = (event: React.MouseEvent): void | MessageType => {
    event.preventDefault();
    if (
      valueName.trim() === ''
        || valuePhone.trim() === ''
        || valueRole.trim() === ''
        || valueData.trim() === ''
    ) {
      return message.error('Пожалуста заполните все поля со *');
    }
    
    isUserStatusAdd ? dispatch(addUser(userUpdate)) : dispatch(updateUser(userUpdate));

    navigate(-1);
  };


  const userCreate = () => {
    const newUser: IUser = {
      id: userById!.id,
      name: valueName,
      isArchive: valueArchive,
      role: valueRole,
      phone: valuePhone,
      birthday: valueData,
    };
    return newUser;
  };

  const userUpdate = userCreate();

  return (
    <>
      <Title style={{ textAlign: 'center', paddingTop: 40}} level={2}>
        {isUserStatusAdd ? 'Новый сотрудник' : 'Редактирование'}
      </Title>
      <Form
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout='horizontal'
        colon={false}
      > <Form.Item  label='Имя Фамилия' name="name" rules={[
          {
            required: true,
            message: 'Пожалуйста введите имя и фамилию!',
          },
        ]}>
          <Input defaultValue={valueName} onChange={
            (e: React.FormEvent<HTMLInputElement>): void =>
            {
              setValueName(e.currentTarget.value);
              e.currentTarget.value = '';
            }}/>
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{required: true,}]}
        >
          <MaskedInput
            defaultValue={valuePhone}
            mask={'+7(000) 000-0000'}
            onChange ={(e: React.FormEvent<HTMLInputElement>): void =>{
              setValuePhone(e.currentTarget.value);
              e.currentTarget.value = '';
            }}/>
        </Form.Item>
        <Form.Item label='Должность' name='role' wrapperCol={{
          span: 3,
        }} rules={[
          {
            required: true,
            message: 'Пожалуйста введите должность',
          },
        ]}>
          <Select defaultValue={valueRole} onChange={handleSelect}>
            <Select.Option value="cook" >Повар</Select.Option>
            <Select.Option value="driver">Водитель</Select.Option>
            <Select.Option value="waiter">Официант</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Дата рождения'  name='birthday' wrapperCol={{
          span: 5,
        }} rules={[
          {
            required: true,
            message: 'Пожалуйста введите дату рождения!',
          },
        ]}>
          <DatePicker
            showTime={true}
            defaultValue={valueData ? moment(valueData, dateFormat) : undefined}
            format={dateFormat} 
            onChange={(data, dateString) => {
              handleData(dateString);
            }}/>
        </Form.Item>
        <Form.Item label='В архиве' wrapperCol={{
          span: 4,
        }}>
          <Checkbox checked={valueArchive} onChange={() => {handleEditUser(valueArchive);}}/>
        </Form.Item>
        <Form.Item label='⠀'>
          <Space size="middle" >
            <Link to={'/'}>
              <Button>Отменить</Button>
            </Link>
            {isUserStatusAdd ? (
              <Button type="primary" onClick={(e) => handleValidate(e)}>
                    Сохранить
              </Button>) : (
              <Button type="primary" onClick={(e) => handleValidate(e)}>
                    Сохранить
              </Button>)
            }
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default UserForm;
