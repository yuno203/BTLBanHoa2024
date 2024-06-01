import { apiClient } from "../constant/api";
import axios from 'axios';
  export const createOrder = async (
    data: any,
  ): Promise<any> => {
   console.log(data);
    const res = await apiClient?.post(`/api/HoaDon/create-item`, data);  
    return res?.data;
  };

  
export const getBill = async (id: any): Promise<any> => {
  try {
    const res = await apiClient?.get(`/api/HoaDon/getcthd-by-id/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

export const apiUpdate = async (
  data: any,
): Promise<any> => {
  const res = await apiClient?.post(`/api/SanPham/updatene-item`, data);  
  return res?.data;
};


export const apiGetProductById = async (
  maSanPham: any,
): Promise<any> => {
  const res = await apiClient?.get(`/api/SanPham/get-by-id/${maSanPham}`);  
  return res?.data;
};