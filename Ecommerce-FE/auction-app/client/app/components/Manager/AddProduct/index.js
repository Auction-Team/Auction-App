/**
 *
 * AddProduct
 *
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const quantityUnitSelect = [
  { value: 'Unit', label: 'Unit' },
  { value: 'Pair', label: 'Pair' },
];

const AddProduct = (props) => {
  const {
    productFormData,
    formErrors,
    productChange,
    addProduct,
    image,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    let onDestroy = false;

    axios.get('/api/product/category/list').then((resp) => {
      if (!onDestroy) {
        setListCategory(
          resp.data.categoryList.map((x) => {
            return {
              value: x._id,
              label: x.name,
            };
          })
        );
      }
    });

    return () => {
      onDestroy = true;
    };
  }, []);

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs="12" md="12">
            <Input
              type={'text'}
              error={formErrors['auctionName']}
              label={'Name'}
              name={'auctionName'}
              placeholder={`Product's Name`}
              value={productFormData.auctionName}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Product Description'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={productFormData.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <SelectOption
              error={formErrors['quantityUnit']}
              label={'Quanity Unit'}
              name={'quantityUnit'}
              options={quantityUnitSelect}
              defaultValue={quantityUnitSelect[0]}
              handleSelectChange={(x) => {
                productChange('quantityUnit', x.value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={'number'}
              error={formErrors['startingPrice']}
              label={'Price'}
              name={'startingPrice'}
              min={1}
              placeholder={`Product's Price`}
              value={productFormData.startingPrice}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={'datetime-local'}
              error={formErrors['startAuctionTime']}
              label={'Start Time'}
              name={'startAuctionTime'}
              min={1}
              value={productFormData.startAuctionTime}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={'datetime-local'}
              error={formErrors['endAuctionTime']}
              label={'End Time'}
              name={'endAuctionTime'}
              min={1}
              value={productFormData.endAuctionTime}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <SelectOption
              error={formErrors['category']}
              label={'Category'}
              name={'category'}
              options={listCategory}
              handleSelectChange={(x) => {
                productChange('category', x.value);
              }}
            />
          </Col>
          {/* <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'file'}
              placeholder={'Please Upload Image'}
              value={image}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col> */}
        </Row>
        <hr />
        <div className="add-product-actions">
          <Button type="submit" text="Add Product" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
