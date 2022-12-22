/**
 *
 * ProductList
 *
 */

import jwtDecode from "jwt-decode";
import React from "react";

import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from "../../../contexts/Socket";

import AddToWishList from "../AddToWishList";

const ProductList = (props) => {
  const { products, updateWishlist, authenticated } = props;
  console.log({ products });
  const socket = io.connect("http://localhost:5000");
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const onJoinAuction = (productId) => {
    socket.on("join_auction_product", (userId, productId));
    console.log("joined");
  };
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div
          key={index}
          className="mb-3 mb-md-0"
          onClick={() => onJoinAuction(product._id)}
        >
          <div className="product-container">
            <div className="item-box">
              <div className="item-link">
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex flex-column h-100"
                >
                  <div className="item-image-container">
                    <div className="item-image-box">
                      <img
                        className="item-image"
                        src={`${
                          product.mainImage
                            ? product.mainImage
                            : "/images/placeholder-image.png"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="item-body">
                    <div className="item-details p-3">
                      <h1 className="item-name">{product.auctionName}</h1>
                      {product.brand &&
                        Object.keys(product.brand).length > 0 && (
                          <p className="by">
                            By <span>{product.brand.name}</span>
                          </p>
                        )}
                      <p className="item-desc mb-0">{product.description}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer">
                    <p className="price mb-0">${product.price}</p>
                    {product.totalReviews > 0 && (
                      <p className="mb-0">
                        <span className="fs-16 fw-normal mr-1">
                          {parseFloat(product?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className={`fa fa-star ${
                            product.totalReviews !== 0 ? "checked" : ""
                          }`}
                          style={{ color: "#ffb302" }}
                        ></span>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
