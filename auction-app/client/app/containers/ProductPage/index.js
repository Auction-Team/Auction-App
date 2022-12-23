/**
 *
 * ProductPage
 *
 */

import React, { Profiler, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link, useParams } from "react-router-dom";

import actions from "../../actions";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import { RiAuctionLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import ProductReviews from "../../components/Store/ProductReviews";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { convertToDateTimeString } from "../../utils/date";
import { useSocket } from "../../contexts/Socket";
import Pagination from "../../components/Common/Pagination";
import jwt_decode from "jwt-decode";
import UserAuctionBox from "../../components/UserAuctionBox";
import { toast, Toaster } from "react-hot-toast";
function ProductPage() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  console.log({ role });
  const getProductById = async (id) => {
    const response = await axios.get(`/api/product/detail/${id}`);
    return response.data.product;
  };
  // get profile
  useEffect(() => {
    const profile = async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        setRole(response.data.user.role);
        return response.data;
      } catch (e) {
        return e.response.data;
      }
      // const response = console.log({ response });
      // if (response.data.success === false) {
      //   setError(response.data.message);
      //   toast.error(response.data.message);
      // }
      return response.data;
    };
    profile();
  }, []);
  console.log({ role });
  const placeBid = async () => {
    try {
      const response = await axios.post("/api/auction/payment/place", {
        productId: id,
        auctionMoney: Number(priceToBid),
      });
      console.log(response.data);
      toast.success("Successfully bid!");
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data.message);
      return e.response.data;
    }
  };
  const changePlaceBid = async () => {
    try {
      const response = await axios.put("/api/auction/payment/change", {
        productId: id,
        auctionMoney: Number(priceToBid),
      });
      console.log(response.data);
      toast.success("Successfully bid!");
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data.message);
      return e.response.data;
    }
  };
  const endBid = async () => {
    try {
      const response = await axios.put("/api/auction/payment/end-auction", {
        productId: id,
      });
      console.log(response.data);
      toast.success("Successfully end bid!");
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data.message);
      return e.response.data;
    }
  };

  useEffect(() => {}, [error]);

  const [priceToBid, setPriceToBid] = useState();
  const { data: product, isLoading } = useQuery(
    ["getEventDetail", id],
    () => getProductById(id),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
    }
  );
  console.log({ priceToBid });
  const userId = jwt_decode(localStorage.getItem("token")).id;
  // pagination
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    setCurrent(page);
  };
  console.log({ product });
  useEffect(() => {
    connect();
  }, []);
  const onMessage = (message) => {
    setMessages((prevState) => [...prevState, message]);
  };

  return (
    <div className="product-shop flex gap-x-8 items-start">
      {/* <UserAuctionBox /> */}
      {isLoading ? (
        <LoadingIndicator />
      ) : product !== null &&
        product !== undefined &&
        Object.keys(product).length > 0 ? (
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
                    <p className="price">
                      starting price: ${product.startingPrice}
                    </p>
                  </div>
                  <div className="item-customize">
                    <Input
                      label={"Price"}
                      name={"price"}
                      decimals={false}
                      min={1}
                      placeholder={"Price for auction"}
                      disabled={
                        product.inventory <= 0 && !shopFormErrors["quantity"]
                      }
                      value={priceToBid}
                      onInputChange={(name, value) => {
                        setPriceToBid(value);
                      }}
                    />
                  </div>
                  <div className="item-actions flex gap-x-4">
                    <Button
                      variant="primary"
                      disabled={
                        product.quantity <= 0 && !shopFormErrors["quantity"]
                      }
                      text="Bid"
                      className="bag-btn"
                      icon={<RiAuctionLine />}
                      onClick={placeBid}
                    />
                    {role === "admin" && (
                      <Button
                        variant="primary"
                        disabled={
                          product.quantity <= 0 && !shopFormErrors["quantity"]
                        }
                        text="End Auction"
                        className="bag-btn"
                        icon={<ImCancelCircle />}
                        onClick={endBid}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            containerClassName="text-xl font-medium"
          />
        </>
      ) : (
        <NotFound message="no product found." />
      )}
    </div>
  );
}
export default ProductPage;
