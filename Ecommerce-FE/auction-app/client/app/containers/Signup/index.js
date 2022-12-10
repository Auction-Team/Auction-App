/*
 *
 * Signup
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
// import Checkbox from '../../components/Common/Checkbox';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';
import SelectOption from '../../components/Common/SelectOption';

class Signup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      districtList: [],
      wardList: [],
    };
  }
  componentDidMount() {
    // get province list
    axios.get('/api/address/provinces').then((res) => {
      this.setState({
        provinceList: res.data.datas.map((x) => {
          return {
            value: x.code,
            label: x.name,
            unit: x.unit,
          };
        }),
      });
    });
  }
  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      // isSubscribed,
      signupChange,
      signUp,
      // subscribeChange,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const loginLink = () => {
      this.props.history.push('/login');
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      signUp(loginLink);
    };

    return (
      <div className="signup-form">
        {isLoading && <LoadingIndicator />}
        <h2>Sign Up</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className="p-0"
            >
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['firstName']}
                  label={'First Name'}
                  name={'firstName'}
                  placeholder={'Please Enter Your First Name'}
                  value={signupFormData.firstName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={'text'}
                  error={formErrors['lastName']}
                  label={'Last Name'}
                  name={'lastName'}
                  placeholder={'Please Enter Your Last Name'}
                  value={signupFormData.lastName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={'password'}
                  label={'Password'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <SelectOption
                  disabled={!this.state.provinceList.length}
                  error={formErrors['province']}
                  label={'Select Province'}
                  name={'province'}
                  options={this.state.provinceList}
                  handleSelectChange={(x) => {
                    signupChange('province', x.label);
                    axios
                      .get(
                        `/api/address/districts?provinceCode=${x.value}`
                      )
                      .then((res) => {
                        this.setState({
                          districtList: res.data.datas.map((x) => {
                            return {
                              value: x.code,
                              label: x.name,
                            };
                          }),
                        });
                      });
                  }}
                />
              </Col>
              {this.state.districtList.length > 0 && (
                <Col xs="12" md="12">
                  <SelectOption
                    disabled={!this.state.districtList.length}
                    error={formErrors['district']}
                    label={'Select District'}
                    name={'district'}
                    options={this.state.districtList}
                    handleSelectChange={(x) => {
                      signupChange('district', x.label);
                      axios
                        .get(
                          `/api/address/wards?districtCode=${x.value}`
                        )
                        .then((res) => {
                          this.setState({
                            wardList: res.data.datas.map((x) => {
                              return {
                                value: x.code,
                                label: x.name,
                              };
                            }),
                          });
                        });
                    }}
                  />
                </Col>
              )}

              {this.state.wardList.length > 0 && (
                <Col xs="12" md="12">
                  <SelectOption
                    disabled={!this.state.wardList.length}
                    error={formErrors['ward']}
                    label={'Select Ward'}
                    name={'ward'}
                    options={this.state.wardList}
                    handleSelectChange={(x) => {
                      signupChange('ward', x.label);
                    }}
                  />
                </Col>
              )}
            </Col>
            <Col
              xs={{ size: 12, order: 1 }}
              md={{ size: '6', order: 2 }}
              className="mb-2 mb-md-0"
            >
              <SignupProvider />
            </Col>
          </Row>
          <hr />
          {/* <Checkbox
            id={'subscribe'}
            label={'Subscribe to newsletter'}
            checked={isSubscribed}
            onChange={subscribeChange}
          /> */}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <Button
              type="submit"
              variant="primary"
              text="Sign Up"
              disabled={isSubmitting}
            />
            <Link
              className="mt-3 mt-md-0 redirect-link"
              to={'/login'}
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    // isSubscribed: state.signup.isSubscribed,
  };
};

export default connect(mapStateToProps, actions)(Signup);
