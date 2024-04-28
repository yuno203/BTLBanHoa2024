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
export const getAllProducts = async (
  page: number,
  pageSize: number,
  searchData: any // Dữ liệu tìm kiếm, chẳng hạn như tên sản phẩm, mã chuyên mục, giá từ, giá đến, số lượng, vv.
): Promise<Product[]> => {
  try {
    const requestData = {
      page: page,
      pageSize: pageSize,
      ...searchData // Truyền dữ liệu tìm kiếm vào request
    };

    const response = await apiClient?.post<Product[]>("api/SanPham/search", requestData);
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
export const getBestSellingProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient?.get<Product[]>("api/SanPham/get-banchay");
    return response?.data ?? [];
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    throw error;
  }
};