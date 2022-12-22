import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { ProductAPI } from "../configs/product";

const findAllProduct = async () => {
  try {
    const response = await httpRequest(ProductAPI.getAllProduct);
    return response.productList;
  } catch (err) {
    return err.response.data;
  }
};
export const useFindAllProduct = () => {
  return useQuery(["findAllProduct"], findAllProduct, {
    staleTime: 0,
  });
};
