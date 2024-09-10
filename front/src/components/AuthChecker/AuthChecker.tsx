import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { RefObject, useEffect } from "react";
import Gallery from "../Gallery/Gallery";

interface AuthCheckerProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export default function AuthChecker({ scrollRef }: AuthCheckerProps) {
  const navigate = useNavigate();
  const { isAuthorized, setDisplayLogin } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/cats");
      setDisplayLogin(true);
    }
  }, [isAuthorized, navigate, setDisplayLogin]);

  return isAuthorized && <Gallery type={"likes"} scrollRef={scrollRef} />;
}

