import React, { useState } from 'react';
import axios from 'axios';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddReconcile = (props) => {
  const { history, user } = props;
  const [money, setMoney] = useState(5);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("moneyPaypal", money);
    axios
      .post('/api/paypal/pay', { transactionalMoney: money })
      .then((res) => {
        window.location.replace(res.data.link);
      });
    // history.goBack();
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
      <Button
        type="submit"
        disabled={!money}
        variant="primary"
        text="Send"
      />
    </form>
  );
};

export default AddReconcile;
