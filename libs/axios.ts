import { storage } from "@/contexts/AuthContext";
import axios from "axios";
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.example.com";

// Create axios instance
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  async (config) => {
    // Add auth token if available
    const token = storage.getString("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors and simplify response
api.interceptors.response.use(
  (response) => {
    // Just return the data directly
    return response.data;
  },
  async (error) => {
    // Handle 401 Unauthorized - clear token and redirect
    if (error.response?.status === 401) {
      try {
        storage.delete("token");
        console.log("Token expired, redirecting to login...");

        // Redirect to login screen
        router.replace("/auth/login");
      } catch (storageError) {
        console.error("Error removing token:", storageError);
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "Đã có lỗi xảy ra";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Network error
      return Promise.reject(new Error("Không thể kết nối đến máy chủ"));
    } else {
      // Other error
      return Promise.reject(new Error("Đã có lỗi xảy ra"));
    }
  },
);

// Export error type for TypeScript
export interface ApiError extends Error {
  response?: any;
}
