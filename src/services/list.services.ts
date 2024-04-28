import { apiClient } from "../constant/api";

export const getList = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/SanPham/search`, data);  
    return res?.data;
  };

 