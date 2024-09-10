import { useEffect, useRef, useState } from "react";

import style from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  type: "text" | "password";
  onSubmit: (value: string) => void;
  error?: boolean;
}

export default function Input(props: InputProps) {
  const { placeholder, type, onSubmit, error = false } = props;
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    element &&
      element.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      element &&
        element.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [value]);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      ref.current?.blur();
      onSubmit(value);
      setValue("");
    }
  }

  return (
    <input
      ref={ref as React.RefObject<HTMLInputElement>}
      type={type}
      placeholder={placeholder}
      className={`${style.input} ${error ? style.error : ""}`}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSubmit(value)}
    />
  );
}

