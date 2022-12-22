/**
 *
 * AccountDetails
 *
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from 'reactstrap';

import UserRole from '../UserRole';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import { useDeepCompareEffect } from '../../../utils/hook';

const AccountDetails = (props) => {
  const { user, accountChange, updateProfile } = props;

  const [img, setImg] = useState();
  var imgUrl = img ? URL.createObjectURL(img) : '';

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(img);
  };

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  useEffect(() => {
    let onDestroy = false;

    axios.get('/api/address/provinces').then((res) => {
      if (!onDestroy) {
        setProvinceList(
          res.data.datas.map((x) => {
            return {
              value: x.code,
              label: x.name,
              unit: x.unit,
            };
          })
        );
      }
    });

    return () => {
      onDestroy = true;
    };
  }, []);

  useDeepCompareEffect(() => {
    let onDestroy = false;

    var value = provinceList.filter(
      (x) => x.label === user.province
    )[0]?.value;
    if (value) {
      axios
        .get(`/api/address/districts?provinceCode=${value}`)
        .then((res) => {
          if (!onDestroy) {
            setDistrictList(
              res.data.datas.map((x) => {
                return {
                  value: x.code,
                  label: x.name,
                  unit: x.unit,
                };
              })
            );
          }
        });
    }

    return () => {
      onDestroy = true;
    };
  }, provinceList);

  useDeepCompareEffect(() => {
    let onDestroy = false;

    var value = districtList.filter(
      (x) => x.label === user.district
    )[0]?.value;
    if (value) {
      axios
        .get(`/api/address/wards?districtCode=${value}`)
        .then((res) => {
          if (!onDestroy) {
            setWardList(
              res.data.datas.map((x) => {
                return {
                  value: x.code,
                  label: x.name,
                  unit: x.unit,
                };
              })
            );
          }
        });
    }

    return () => {
      onDestroy = true;
    };
  }, districtList);

  return (
    <div className="account-details">
      {/* <div className='info'>
        <div className='desc'>
          <p className='one-line-ellipsis mr-3'>
            {user.provider === 'email' ? (
              user.email
            ) : (
              <span className='provider-email'>
                Logged in With {user.provider}
              </span>
            )}
          </p>
          <UserRole user={user} />
        </div>
      </div> */}
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" md="6">
            <Input
              type={'text'}
              label={'First Name'}
              name={'firstName'}
              placeholder={'Please Enter Your First Name'}
              value={user.firstName ? user.firstName : ''}
              onInputChange={(name, value) => {
                accountChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="6">
            <Input
              type={'text'}
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Please Enter Your Last Name'}
              value={user.lastName ? user.lastName : ''}
              onInputChange={(name, value) => {
                accountChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              disabled
              type={'text'}
              label={'Email'}
              name={'email'}
              value={user.email ? user.email : ''}
            />
          </Col>

          <Col xs="12" md="12">
            <SelectOption
              disabled={!provinceList.length}
              label={'Select Province'}
              name={'province'}
              options={provinceList}
              value={provinceList.filter(
                (x) => x.label === user.province
              )}
              handleSelectChange={(x) => {
                accountChange('province', x.label);
                axios
                  .get(
                    `/api/address/districts?provinceCode=${x.value}`
                  )
                  .then((res) => {
                    setDistrictList(
                      res.data.datas.map((x) => {
                        return {
                          value: x.code,
                          label: x.name,
                        };
                      })
                    );
                  });
              }}
            />
          </Col>

          <Col xs="12" md="12">
            <SelectOption
              disabled={!districtList.length}
              label={'Select District'}
              name={'district'}
              options={districtList}
              value={districtList.filter(
                (x) => x.label === user.district
              )}
              handleSelectChange={(x) => {
                accountChange('district', x.label);
                axios
                  .get(`/api/address/wards?districtCode=${x.value}`)
                  .then((res) => {
                    setWardList(
                      res.data.datas.map((x) => {
                        return {
                          value: x.code,
                          label: x.name,
                        };
                      })
                    );
                  });
              }}
            />
          </Col>

          <Col xs="12" md="12">
            <SelectOption
              disabled={!wardList.length}
              label={'Select Ward'}
              name={'ward'}
              options={wardList}
              value={
                districtList.filter((x) => x.label === user.district).length
                  ? wardList.filter((x) => x.label === user.ward)
                  : []
              }
              handleSelectChange={(x) => {
                accountChange('ward', x.label);
              }}
            />
          </Col>
          
          <Col xs="12" lg="6">
            <Input
              type={'file'}
              name={'image'}
              label={'Avatar'}
              placeholder={'Please Upload Image'}
              onInputChange={(name, value) => {
                setImg(value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <img src={imgUrl ? imgUrl : user.avatar} style={{borderRadius: '3px', height: '200px'}}></img>
          </Col>
        </Row>
        <hr />
        <div className="profile-actions">
          <Button
            type="submit"
            variant="secondary"
            text="Save changes"
          />
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
