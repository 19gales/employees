import React, {FC} from 'react';
import {Select} from 'antd';

type RoleSelectProps = {
    role: string,
    onChange: (value: string) => void;
}

export const RoleSelect: FC<RoleSelectProps> = ({role, onChange}) =>(
  <Select value={role} onChange={onChange}>
    <Select.Option value="cook" >Повар</Select.Option>
    <Select.Option value="driver">Водитель</Select.Option>
    <Select.Option value="waiter">Официант</Select.Option>
  </Select>
);
