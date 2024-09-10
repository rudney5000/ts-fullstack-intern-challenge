import axios, { HttpStatusCode } from "axios";
import CatType from "../types/CatType";
import defaultImg from "../assets/images/failed-img.png";
import { axiosInstance } from "./api";

export async function fetchCats(page: number): Promise<CatType[]> {
  const response = await axiosInstance.get(`/cats?page=${page}`);

  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }
  return [];
}

export async function fetchCatImage(catId: string): Promise<string> {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/${catId}`
  );

  if (response.status === HttpStatusCode.Ok) {
    return response.data.url;
  }
  return defaultImg;
}

