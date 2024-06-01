import { apiClient } from "../constant/api";

  export const Register = async (
    data: any,
  ): Promise<any> => {
   console.log(data);
    const res = await apiClient?.post(`/api/User/register`, data);  
    return res?.data;
  };

  export const Login = async (
    data: any,
  ): Promise<any> => {
   console.log(data);
    const res = await apiClient?.post(`/api/User/login`, data);  
    return res?.data;
  };
