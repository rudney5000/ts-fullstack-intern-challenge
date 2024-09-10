import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export function setAuthHeaders() {
  axiosInstance.defaults.headers[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("auth_token")}`;
  axiosInstance.defaults.headers["X-User-Id"] = localStorage.getItem("user_id");
}

