/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import Button from '../Button';

const ResetPasswordForm = (props) => {
  const {
    resetFormData,
    formErrors,
    resetPasswordChange,
    resetPassword,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword();
  };

  return (
    <div className="reset-password-form">
      <form onSubmit={handleSubmit} noValidate>
        {window.location.pathname.includes('reset-password') ? (
          <Row>
            <Col xs="12" md="12">
              <Input
                type={'password'}
                error={formErrors['password']}
                label={'New Password'}
                name={'password'}
                placeholder={'New Password'}
                value={resetFormData.password}
                onInputChange={(name, value) => {
                  resetPasswordChange(name, value);
                }}
              />
            </Col>
            <Col xs="12" md="12">
              <Input
                type={'password'}
                error={formErrors['confirmPassword']}
                label={'Confirm New Password'}
                name={'confirmPassword'}
                placeholder={'Confirm New Password'}
                value={resetFormData.confirmPassword}
                onInputChange={(name, value) => {
                  resetPasswordChange(name, value);
                }}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs="12" md="12">
              <Input
                type={'password'}
                error={formErrors['oldPassword']}
                label={'Old Password'}
                name={'oldPassword'}
                placeholder={'Old Password'}
                value={resetFormData.oldPassword}
                onInputChange={(name, value) => {
                  resetPasswordChange(name, value);
                }}
              />
            </Col>
            <Col xs="12" md="12">
              <Input
                type={'password'}
                error={formErrors['newPassword']}
                label={'New Password'}
                name={'newPassword'}
                placeholder={'New Password'}
                value={resetFormData.newPassword}
                onInputChange={(name, value) => {
                  resetPasswordChange(name, value);
                }}
              />
            </Col>
            <Col xs="12" md="12">
              <Input
                type={'password'}
                error={formErrors['confirmNewPassword']}
                label={'Confirm New Password'}
                name={'confirmNewPassword'}
                placeholder={'Confirm New Password'}
                value={resetFormData.confirmNewPassword}
                onInputChange={(name, value) => {
                  resetPasswordChange(name, value);
                }}
              />
            </Col>
          </Row>
        )}
        <hr />
        <div className="reset-actions">
          <Button type="submit" text="Reset Password" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
