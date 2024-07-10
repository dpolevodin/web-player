import React, { FC } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export type AddToFavoriteButtonProps = {
  onClick?: VoidFunction;
  added?: boolean;
};

export const AddToFavoriteButton: FC<AddToFavoriteButtonProps> = ({
  onClick,
  added,
}) => (
  <Tooltip title="Add to favorite">
    <Button
      icon={added ? <HeartFilled /> : <HeartOutlined />}
      shape="circle"
      size="large"
      onClick={onClick}
    ></Button>
  </Tooltip>
);
