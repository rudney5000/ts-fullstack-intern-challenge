import { useState } from "react";
import Input from "../Input/Input";
import style from "./AuthWindow.module.scss";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthWindow() {
  const { onLogin, setDisplayLogin } = useAuth();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function handleLoginSubmit(value: string) {
    if (value.length < 8) {
      setLoginError("Логин должен быть не короче 8 символов");
    } else {
      setLoginError(null);
      setLogin(value);
    }
  }

  function handlePasswordSubmit(value: string) {
    if (value.length < 8) {
      setPasswordError("Пароль должен быть не короче 8 символов");
    } else {
      setPasswordError(null);
      setPassword(value);
    }
  }

  async function handleLogin() {
    if (login && password) {
      const { user, error } = await onLogin(login, password);
      user && setDisplayLogin(false);
      error && setPasswordError(error);
    }
  }

  return (
    <>
      <div
        className={style.background}
        onClick={() => setDisplayLogin(false)}
      ></div>

      <div className={style.auth__wrapper}>
        <div>Авторизация</div>
        <div className={style.auth__inputs}>
          <Input
            placeholder={"Логин"}
            type={"text"}
            onSubmit={handleLoginSubmit}
            error={loginError !== null}
          />
          {loginError && <div className={style.auth__error}>{loginError}</div>}

          <Input
            placeholder={"Пароль"}
            type={"password"}
            onSubmit={handlePasswordSubmit}
            error={passwordError !== null}
          />
          {passwordError && (
            <div className={style.auth__error}>{passwordError}</div>
          )}
        </div>
        <button className={style.auth__button} onClick={handleLogin}>
          Войти
        </button>
      </div>
    </>
  );
}

