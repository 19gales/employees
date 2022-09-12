import React, {FC, useEffect} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {fetchUsers} from '../../store/reducers/action-creators';
import {
  clearEditUser,
  deleteUser,
  getUser,
  getUserStatus,
  useGetById,
  useGetStatus
} from '../../store/reducers/user-slice';
import 'antd/dist/antd.css';
import {Button, Col, Popconfirm, Row, Space, Table, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import {Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {IUserTable} from '../../models/interfaces';
import {uniSort} from '../../utils/filter-users-by-name';

const UsersTable: FC = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const userData: IUserTable[] = useGetById();
  const status: string = useGetStatus();

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if(status === 'loading'){
      dispatch(fetchUsers());
    }
    dispatch(clearEditUser());
  }, []);

  const columns: ColumnsType<IUserTable> = [
    {
      title: '№',
      dataIndex: 'id',
      align:'center',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      align:'center',
      sorter: (a, b) => 
        uniSort(a.name, b.name),
      showSorterTooltip: false,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      align:'center',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      filters: [
        {
          text: 'Повар',
          value: 'Повар',
        },
        {
          text: 'Водитель',
          value: 'Водитель',
        },
        {
          text: 'Официант',
          value: 'Официант',
        },
      ],
      onFilter: (value, record): boolean => 
        record.role.indexOf(String(value)) === 0,
      render: (role) => (
        <span>{`${role}`}</span>
      ),
      showSorterTooltip: false,
      align:'center',

    },
    {
      title: 'Архив',
      dataIndex: 'isArchive',
      filters: [
        {
          text: 'в архиве',
          value: 'в архиве',
        },
        {
          text: 'не в архиве',
          value: 'не в архиве',
        },
      ],
      onFilter: (value, record) => 
        record.isArchive.indexOf(String(value)) === 0,
      render: (active) => (
        <>
          <Tag color={active === 'в архиве' 
            ? 'volcano' 
            : 'green' 
          } key={active}
          >{active.toUpperCase()}
          </Tag>
        </>
      ),
      showSorterTooltip: false,
      align:'center',
    },
    {
      title: 'Дата',
      dataIndex: 'birthday',
      align:'center',
      sorter: (a, b) => 
        uniSort(String(a.birthday), String(b.birthday)),
      showSorterTooltip: false,
    },
    {
      title: 'Действия',
      render: (record: any) =>(
        <>
          <Space size="middle">
            {(userData.length >= 1) ? (
              <Popconfirm
                cancelText='Нет'
                okText='Да'
                title="Удалить?"
                onConfirm={() => handleDelete(record.id)}>
                <Button>Удалить</Button>
              </Popconfirm>
            ) : null}
            <Link to={`/edit/${record.id}`}>
              <Button onClick={()=> {dispatch(getUser(record));}}
              >Редактировать
              </Button>
            </Link>
          </Space>
        </>
      ),
      align:'center',
    },
  ];

  return (
    <div>
      <Row justify="center">
        <Col>
          <Title style={
            { textAlign: 'center',
              paddingTop: 40
            }
          } level={2}
          >Сотрудники
          </Title>
          <Link to={'/add'}>
            <Button
              onClick={()=>{dispatch(getUserStatus());}}
              type="primary"
            >Добавить сотрудника
            </Button>
          </Link>
          <Table
            dataSource={userData}
            columns={columns}
            loading ={status === 'loading'}
            pagination={false}
            rowKey="id"
            bordered
          >
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UsersTable;