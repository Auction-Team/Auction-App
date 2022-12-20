/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const ProductList = (props) => {
  const { products } = props;

  return (
    <div className="p-list">
      {products?.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className="d-flex flex-row align-items-center mx-0 mb-3 product-box"
        >
          <img
            className="item-image"
            src={`${
              product && product.mainImage
                ? product.mainImage
                : '/images/placeholder-image.png'
            }`}
          />
          <div className="d-flex flex-column justify-content-center px-3 text-truncate">
            <h4 className="text-truncate">{product.auctionName}</h4>
            <p className="mb-0 text-truncate">
              Description: {product.description}
            </p>
            <p className="mb-0 text-truncate">
              Category: {product.categoryName}
            </p>
            <div
              className="d-flex align-items-center"
              style={{ gap: '12px' }}
            >
              <p className="mb-0 text-truncate">
                Start time:{' '}
                {new Date(
                  product.startAuctionTime
                ).toLocaleDateString()}
              </p>
              <p className="mb-0 text-truncate">
                End time:{' '}
                {new Date(
                  product.endAuctionTime
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
