import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import './index.css';

export default function Auth() {
  const [optionForm, setOptionForm] = useState('user_options-forms');

  function handleOption(event) {
    event.target.id === 'signup-button'
      ? setOptionForm('user_options-forms bounceLeft')
      : setOptionForm('user_options-forms bounceRight');
  }

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">
              Don't have an account?
            </h2>
            <button
              className="user_unregistered-signup"
              id="signup-button"
              onClick={handleOption}
            >
              Sign up
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">
              Already have an account?
            </h2>
            <button
              className="user_registered-login"
              id="login-button"
              onClick={handleOption}
            >
              Login
            </button>
          </div>
        </div>

        <div className={optionForm}>
          <LoginPage />
          <RegisterPage />
        </div>
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <div className="user_forms-login">
      <h2 className="forms_title">SIGN IN</h2>
      <Form
        layout="vertical"
        onFinish={async (value) => {
          //call API for login - signin
        }}
        requiredMark={false}
        initialValues={{}}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input
            id="signInEmail"
            size="large"
            placeholder="Email"
            type="email"
            minLength={10}
            maxLength={50}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password
            id="signInPassword"
            type="password"
            placeholder="●●●●●●●●"
            size="large"
            minLength={7}
            maxLength={50}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          // disabled={disable}
          // loading={disable}
        >
          SIGN IN
        </Button>
      </Form>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="user_forms-signup">
      <h2 className="forms_title">Sign Up</h2>
      <Form
        layout="vertical"
        onFinish={async (value) => {
          //call API for signup
        }}
        requiredMark={false}
        initialValues={{}}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input
            id="signUpEmail"
            size="large"
            placeholder="Email"
            type="email"
            minLength={10}
            maxLength={50}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password
            id="signUpPassword"
            type="password"
            placeholder="●●●●●●●●"
            size="large"
            minLength={7}
            maxLength={50}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          // disabled={disable}
          // loading={disable}
        >
          SIGN UP
        </Button>
      </Form>
    </div>
  );
}
