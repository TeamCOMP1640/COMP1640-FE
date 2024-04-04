import { CSSProperties, FC, HTMLAttributes } from "react";
import "./Icon.scss";

type Props = {
  icon: FC<HTMLAttributes<HTMLElement> & { style?: CSSProperties }>;
  type?: "primary" | "secondary" | "error" | "light";
};

const Icon: FC<Props> = ({
  icon: IconComponent,
  type = "secondary",
  ...props
}) => {
  return (
    <div className={`${type}-icon`}>
      <IconComponent {...props} />
    </div>
  );
};

export default Icon;
