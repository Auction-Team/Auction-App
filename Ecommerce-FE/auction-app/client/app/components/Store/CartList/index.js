/**
 *
 * CartList
 *
 */

import React from 'react';
import dayjs from 'dayjs';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Button from '../../Common/Button';

const CartList = (props) => {
  const { cartItems, handleRemoveFromCart } = props;

  const handleProductClick = () => {
    props.toggleCart();
  };

  return (
    <div className="cart-list">
      {cartItems.map((item, index) => (
        <div key={index} className="item-box">
          <div className="item-details">
            <Container>
              <Row className="mb-2 align-items-center">
                <Col xs="12" className="pr-0">
                  <div className="d-flex align-items-center">
                    <img
                      className="item-image mr-2"
                      src={`${
                        item?.product?.mainImage
                          ? item?.product?.mainImage
                          : '/images/placeholder-image.png'
                      }`}
                    />

                    <div className='ml-3'>
                      <Link
                        to={`/product/${item.product?._id}`}
                        className="item-link one-line-ellipsis"
                        onClick={handleProductClick}
                      >
                        <h2 className="item-name one-line-ellipsis">
                          {item?.product?.auctionName}
                        </h2>
                      </Link>

                      <p>
                        End:{' '}
                        {dayjs(item?.product?.endAuctionTime).format(
                          'YYYY/MM/DD HH:mm:ss'
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
                {/* <Col xs='2' className='text-right'>
                  <Button
                    borderless
                    variant='empty'
                    ariaLabel={`remove ${item.product?.auctionName} from cart`}
                    icon={<i className='icon-trash' aria-hidden='true' />}
                    onClick={() => handleRemoveFromCart(item.product)}
                  />
                </Col> */}
              </Row>
              <Row className="mb-2 align-items-center">
                <Col xs="8">
                  <p className="item-label">price</p>
                </Col>
                <Col xs="4" className="text-right">
                  <p className="value price">{` $${item?.product?.startingPrice}`}</p>
                </Col>
              </Row>
              <Row className="mb-2 align-items-center">
                <Col xs="8">
                  <p className="item-label">quantity</p>
                </Col>
                <Col xs="4" className="text-right">
                  <p className="value quantity">{` ${item?.product?.quantity} ${item?.product?.quantityUnit}`}</p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
