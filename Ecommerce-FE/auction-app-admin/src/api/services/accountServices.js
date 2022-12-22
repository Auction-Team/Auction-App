import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { AccountAPI } from "../configs/account";

const findAllAccount = async () => {
  try {
    const response = await httpRequest(AccountAPI.getAllAccount);
    return response.userList;
  } catch (err) {
    return err.response.data;
  }
};
export const useFindAllAccount = () => {
  return useQuery(["findAllAccount"], findAllAccount, {
    staleTime: 0,
  });
};
const accountServices = {
  findAllAccount,
};
export default accountServices;
