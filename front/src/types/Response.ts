import CatType from "./CatType";
import LikeType from "./LikeType";
import UserType from "./UserType";

export interface Response {
  error?: string;
}

export interface UserResponse extends Response {
  user?: UserType;
}
export interface LikeResponse extends Response {
  like?: LikeType;
}

export interface CatResponse extends Response {
  cats?: CatType[];
}

