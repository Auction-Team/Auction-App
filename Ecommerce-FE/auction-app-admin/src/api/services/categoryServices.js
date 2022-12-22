import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { CategoryAPI } from "../configs/category";

const findAllCategory = async () => {
  try {
    const response = await httpRequest(CategoryAPI.getAllCategory);
    return response.categoryList;
  } catch (err) {
    return err.response.data;
  }
};
export const useFindAllCategory = () => {
  return useQuery(["findAllCategory"], findAllCategory, {
    staleTime: 0,
  });
};
