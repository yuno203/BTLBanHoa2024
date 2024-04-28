import { apiClient } from "../constant/api";
  export const getMenus = async (): Promise<any> => {
    const res = await apiClient?.get(`/api/ChuyenMuc/get-all`);
    return res?.data;
  };