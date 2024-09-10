import style from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isClicked: boolean;
}

export default function Button(props: ButtonProps) {
  const { text, onClick, isClicked } = props;
  return (
    <div
      onClick={onClick}
      className={`${style.button} ${isClicked && style.clicked}`}
    >
      {text}
    </div>
  );
}

