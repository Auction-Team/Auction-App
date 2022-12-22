import React, { useState } from 'react';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import axios from 'axios';

const AddReconcile = (props) => {
  const { history } = props;
  const [money, setMoney] = useState(5);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/paypal/pay', {transactionalMoney: money}).then(res => {
      console.log(res)
    })
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
