import axios from "axios";
import { CONFIG } from "core/config";
import { getToken } from "./storage";

const AuthHttpClient = axios.create({
  baseURL: `${CONFIG.baseUrlAdmin}`,
});

AuthHttpClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => console.log(error)
);

export { AuthHttpClient };
