import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("susulink-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  getChallenge: (address: string) => api.post("/auth/challenge", { address }),
  verify: (address: string, signature: string) => api.post("/auth/verify", { address, signature }),
};

export const circleApi = {
  create: (data: any) => api.post("/circles/create", data),
  join: (inviteCode: string, userAddress: string) => api.post("/circles/join", { inviteCode, userAddress }),
  getMyCircles: (address: string) => api.get(`/circles/mine/${address}`),
};