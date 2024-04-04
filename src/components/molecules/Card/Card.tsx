import { Card as CardAntd, CardProps } from "antd";
import { FC } from "react";

const Card: FC<CardProps> = ({ children, style, className, ...props }) => (
  <CardAntd
    {...props}
    className={`rounded-xl drop-shadow-[0_0_30px_#d2d2f280] ${className}`}
  >
    {children}
  </CardAntd>
);
export default Card;
