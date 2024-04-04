import { Avatar, Tooltip } from "antd";
import React, { FC } from "react";

type Props = {
  src: string;
  name: string;
  style?: React.CSSProperties;
};

const GroupAvatarItem: FC<Props> = ({ name, src, style }) => {
  return (
    <>
      <Tooltip title={name}>
        <Avatar style={style} size={38} src={src} className="cursor-pointer" />
      </Tooltip>
    </>
  );
};

export default GroupAvatarItem;
