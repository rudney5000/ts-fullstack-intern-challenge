import { useState, useEffect } from "react";
import { getLikes } from "../api/likeApi";
import { useAuth } from "../contexts/AuthContext";
import LikeType from "../types/LikeType";

export default function useLikes(type: string) {
  const [likes, setLikes] = useState<LikeType[]>([]);
  const { isAuthorized } = useAuth();

  useEffect(() => {
    const fetchLikes = async () => {
      const fetchedLikes = await getLikes();
      setLikes(fetchedLikes);
    };

    if (isAuthorized) {
      fetchLikes();
    }
  }, [isAuthorized, type]);

  return likes;
}

