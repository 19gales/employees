import React, {FC, useState} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {
  addUser,
  updateUser,
  useGetUserStatus
} from '../../store/reducers/user-slice';
import {Button, Checkbox, Form, message, Space} from 'antd';
import Title from 'antd/lib/typography/Title';
import {MessageType} from 'antd/es/message';
import {Link, useNavigate} from 'react-router-dom';
import {IUser} from '../../models/interfaces';
import { InputName, InputPhone, RoleSelect, UserBDPicker } from '../../ui';

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

  const navigate = useNavigate();
  const isUserStatusAdd = statusUser === 'add';

  const handleEditUser = (valueArchive: boolean) => {
    setValueArchive(!valueArchive);
  };
  const handleSelect = (valueRole: string) => {
    setValueRole(valueRole);
  };
  const handleName = (valueName: string) => {
    setValueName(valueName);
  };
  const handlePhone = (valuePhone: string) => {
    setValuePhone(valuePhone);
  };
  const handleData = (dateString: string) => {
    setValueData(dateString);
  };
  const handleValidate = (event: React.MouseEvent): void | MessageType => {
    event.preventDefault();
    if (
      valueName.trim() === ''
        || valuePhone.trim() === ''
        ||valueRole.trim() === ''
        || valueData.trim() === ''
    ) {
      return message.error('Пожалуста заполните все поля со *');
    }
    
    isUserStatusAdd ? dispatch(addUser(userUpdate)) : dispatch(updateUser(userUpdate));

    navigate('/');
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
      > <Form.Item  label='Имя Фамилия' name="name" wrapperCol={{
          span: 3,
        }} rules={[
          {
            required: true,
            message: 'Пожалуйста введите имя и фамилию!',
          },
        ]}>
          <InputName name={valueName} onChange={handleName} />
        </Form.Item>
        <Form.Item label='Должность' name='role' wrapperCol={{
          span: 3,
        }} rules={[
          {
            required: true,
            message: 'Пожалуйста введите должность',
          },
        ]}><RoleSelect role={valueRole} onChange={handleSelect}/>
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{
            required: true,
            message: 'Пожалуйста введите телефон',
          }]}
        >
          <InputPhone phone={valuePhone} onChange={handlePhone} />
        </Form.Item>
        <Form.Item label='Дата рождения'  name='birthday' wrapperCol={{
          span: 5,
        }} rules={[
          {
            required: true,
            message: 'Пожалуйста введите дату рождения!',
          },
        ]}><UserBDPicker data={valueData} onChange={handleData}/>
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
