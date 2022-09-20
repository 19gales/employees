import React, {FC} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

type UserBDPickerProps = {
  data: string,
    onChange: (value: string) => void;
}

export const UserBDPicker: FC<UserBDPickerProps> = ({data, onChange}) => {
  const dateFormat = 'DD.MM.YYYY';
  return (
    <DatePicker
      showTime={true}
      value={data ? moment(data, dateFormat) : undefined}
      format={dateFormat}
      onChange={(data, dateString) => {
        onChange(dateString);
      }}/>
  );
};
