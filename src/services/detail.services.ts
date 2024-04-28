import { apiClient } from "../constant/api";

export const getItem = async (id: any): Promise<any> => {
  try {
    const res = await apiClient?.get(`/api/SanPham/get-by-id/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};
