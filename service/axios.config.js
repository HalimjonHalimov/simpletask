import axios from "axios";
import { getItems } from "@/helpers/localstorage";

axios.defaults.baseURL = 'https://dummyjson.com'

axios.interceptors.request.use((config) => {
  const token = getItems("Bearer");
  const auth = token ? `Bearer ${token}` : "";
  config.headers.Authorization = auth;
  return config;
});

export default axios;
