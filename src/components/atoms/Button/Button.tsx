import { Button as ButtonAnt, ButtonProps } from "antd";
import { FC } from "react";
import "./Button.scss";

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const className = props.className ? props.className : "";

  return (
    <ButtonAnt className={`button ${className}`} {...props}>
      {children}
    </ButtonAnt>
  );
};
