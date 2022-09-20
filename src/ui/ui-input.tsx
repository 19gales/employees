import React, {FC} from 'react';
import {Input} from 'antd';

type InputNameProps = {
  name: string,
    onChange: (value: string) => void;
}

export const InputName: FC<InputNameProps> = ({name, onChange}) =>(
  <Input defaultValue={name} onChange={
    (e: React.FormEvent<HTMLInputElement>): void =>
    {
      onChange(e.currentTarget.value);
      e.currentTarget.value = '';
    }}/>
);