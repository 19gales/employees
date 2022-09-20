import React, {FC} from 'react';
import InputMask from 'react-input-mask';

type InputPhoneProps = {
  phone: string,
    onChange: (value: string) => void;
}

export const InputPhone: FC<InputPhoneProps> = ({phone, onChange}) =>(
  <InputMask
    mask="+7 999 999-99-99"
    value={phone}
    onChange={(e) => {
      onChange(e.target.value);
    }}
  />
);
