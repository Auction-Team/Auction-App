/**
 *
 * EditProduct
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const EditProduct = props => {
  const {
    product,
    productChange,
    formErrors,
    updateProduct,
    deleteProduct,
    activateProduct
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div className='edit-product'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

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
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
