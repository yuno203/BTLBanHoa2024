import { apiClient } from "../constant/api";
export interface Product {
  maSanPham : number;
  tenSanPham: string;
  gia: number;
  luotXem: number;
  dacBiet : boolean;
  anhDaiDien : string;
  // Các thuộc tính khác của sản phẩm
}

export const getSearch = async (
  page: number,
  pageSize: number,
  tenSanPham: string // Assuming query represents the product name
): Promise<Product[]> => {
  try {
    const requestData = {
      page: page,
      pageSize: pageSize,
      tenSanPham: tenSanPham // Pass the product name as tenSanPham
    };

    const response = await apiClient?.post<Product[]>("/api/SanPham/search", requestData);
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};


