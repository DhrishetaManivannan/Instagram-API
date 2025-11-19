import axios from "axios";
export const API_VERSION = "v24.0";
const axiosInstance = axios.create({
  baseURL: `https://graph.facebook.com/${API_VERSION}`,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("instagram_access_token");
    if (!config.params) config.params = {};
    if (token) config.params["access_token"] = token;
    return config;
  },
  (error) => Promise.reject(error)
);
export const getIgUserId = (): string => {
  const igUserId = localStorage.getItem("instagram_user_id");
  if (!igUserId) throw new Error("Instagram User ID not found in localStorage");
  return igUserId;
};

export const graphGet = async <T>(url: string, params?: any): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params });
  return response.data;
};

export const graphPost = async <T>(url: string, body?: any): Promise<T> => {
  const response = await axiosInstance.post<T>(
    url,
    new URLSearchParams(body)
  );
  return response.data;
};

export default axiosInstance;
