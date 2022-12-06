import React, { useState } from "react";
import { Spin } from "antd";
import { eventGrid, contextMenuItems } from "../data/dummy";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertToYearMonthDayFormat } from "../utils/utils";

const Products = () => {
  // console.log(events[0]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.product")} />
      <div className="flex w-full justify-end">
        <button
          className="p-2 bg-primary rounded-md mb-2 text-white text-lg"
          onClick={() => navigate("/product/create")}
        >
          {t("product.create")}
        </button>
      </div>
      {/* {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div>Product</div>
      )} */}
    </div>
  );
};
export default Products;
