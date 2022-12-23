import React, { useState } from 'react';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useDispatch } from 'react-redux';

const WithdrawMoney = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const [money, setMoney] = useState(5);
  const [email, setEmail] = useState('');
  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/paypal/withdraw/create', {
        transactionalMoney: money,
        emailPaypal: email,
      })
      .then((res) => {
        if (res.data.withdraw) {
          dispatch(
            success({
              title: `Wait for the admin approve your request!`,
              position: 'tr',
              autoDismiss: 1,
            })
          );
          history.goBack();
        }
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        type={'number'}
        label={'Transactional Money'}
        min={5}
        value={money}
        onInputChange={(_, value) => {
          setMoney(value);
        }}
      />
      <Input
        type={'text'}
        label={'Email from paypal'}
        onInputChange={(_, value) => {
          setEmail(value);
        }}
      />
      <Button
        type="submit"
        disabled={!money || !email}
        variant="primary"
        text="Send"
      />
    </form>
  );
};

export default WithdrawMoney;
