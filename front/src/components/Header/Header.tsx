import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import style from "./Header.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClicked, setIsClicked] = useState<string>(location.pathname);
  const { isAuthorized, onLogout, setDisplayLogin } = useAuth();

  useEffect(() => {
    handleNavigate(location.pathname);
  }, [location.pathname]);

  function handleNavigate(path: string) {
    navigate(path);
    setIsClicked(path);
  }

  return (
    <header className={style.header}>
      <div className={style.header__links}>
        <Button
          text={"Все котики"}
          isClicked={isClicked === "/cats"}
          onClick={() => handleNavigate("/cats")}
        />
        {isAuthorized && (
          <Button
            text={"Любимые котики"}
            isClicked={isClicked === "/likes"}
            onClick={() => handleNavigate("/likes")}
          />
        )}
      </div>
      <div className={style.header__login}>
        {isAuthorized ? (
          <Button text="Выйти" onClick={onLogout} isClicked={false} />
        ) : (
          <Button
            text="Войти"
            isClicked={false}
            onClick={() => setDisplayLogin(true)}
          />
        )}
      </div>
    </header>
  );
}

