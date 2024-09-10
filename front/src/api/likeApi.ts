import { HttpStatusCode } from "axios";
import { Response, LikeResponse } from "../types/Response";
import LikeType from "../types/LikeType";
import { setAuthHeaders, axiosInstance } from "./api";

export async function addLike(catId: string): Promise<LikeResponse> {
  setAuthHeaders();
  const response = await axiosInstance.post("/likes", {
    cat_id: catId,
    created_at: new Date().toISOString(),
  });

  if (response.status === HttpStatusCode.Created) {
    return { like: response.data };
  }
  return { error: response.data.error };
}

export async function deleteLike(catId: string): Promise<void | Response> {
  setAuthHeaders();
  const response = await axiosInstance.delete(`likes/${catId}`);
  if (response.status !== HttpStatusCode.Ok) {
    return { error: response.data.error };
  }
}

export async function getLikes(): Promise<LikeType[]> {
  setAuthHeaders();
  const response = await axiosInstance.get("likes");
  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }
  return [];
}

