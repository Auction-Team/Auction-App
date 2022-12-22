/**
 *
 * ProductPage
 *
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link, useParams } from "react-router-dom";

import actions from "../../actions";

import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import { RiAuctionLine } from "react-icons/ri";
import ProductReviews from "../../components/Store/ProductReviews";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { convertToDateTimeString } from "../../utils/date";

function ProductPage() {
  const { id } = useParams();
  const getProductById = async (id) => {
    const response = await axios.get(`/api/product/detail/${id}`);
    return response.data.product;
  };
  const { data: product, isLoading } = useQuery(
    ["getEventDetail", id],
    () => getProductById(id),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
    }
  );
  console.log({ product });
  useEffect(() => {}, []);
  return (
    <div className="product-shop">
      {isLoading ? (
        <LoadingIndicator />
      ) : Object.keys(product).length > 0 ? (
        <>
          <Row className="flex-row">
            <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
              <div className="position-relative">
                <img
                  className="item-image"
                  src={`${
                    product.mainImage
                      ? product.mainImage
                      : "/images/placeholder-image.png"
                  }`}
                />
                {product.inventory <= 0 && !shopFormErrors["quantity"] ? (
                  <p className="stock out-of-stock">Out of stock</p>
                ) : (
                  <p className="stock in-stock">In stock</p>
                )}
              </div>
            </Col>
            <Col xs="12" md="7" lg="7" className="mb-3 px-3 px-md-2">
              <div className="product-container">
                <div className="item-box">
                  <div className="item-details">
                    <h1 className="item-name one-line-ellipsis">
                      {product.auctionName}
                    </h1>
                    <hr />
                    <p className="item-desc">{product.description}</p>
                    <p className="item-desc">
                      Start auction time:{" "}
                      <span className="text-lg font-bold">
                        {convertToDateTimeString(product.startAuctionTime)}
                      </span>
                    </p>
                    <p className="item-desc">
                      End auction time:{" "}
                      <span className="text-lg font-bold">
                        {convertToDateTimeString(product.endAuctionTime)}
                      </span>
                    </p>
                    <p className="price">${product.price}</p>
                  </div>
                  <div className="item-customize">
                    <Input
                      type={"number"}
                      label={"Price"}
                      name={"price"}
                      decimals={false}
                      min={1}
                      placeholder={"Price for auction"}
                      disabled={
                        product.inventory <= 0 && !shopFormErrors["quantity"]
                      }
                      // value={auctionPrice}
                      // onInputChange={(name, value) => {
                      //   productShopChange(name, value);
                      // }}
                    />
                  </div>
                  <div className="item-actions">
                    <Button
                      variant="primary"
                      disabled={
                        product.quantity <= 0 && !shopFormErrors["quantity"]
                      }
                      text="Bid"
                      className="bag-btn"
                      icon={<RiAuctionLine />}
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <NotFound message="no product found." />
      )}
    </div>
  );
}
export default ProductPage;
