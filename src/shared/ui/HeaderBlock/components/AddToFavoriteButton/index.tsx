import { FC } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export type AddToFavoriteButtonProps = {
  onClick?: VoidFunction;
  added?: boolean;
  addedToFavoriteDisabled?: boolean;
};

export const AddToFavoriteButton: FC<AddToFavoriteButtonProps> = ({
  onClick,
  added,
  addedToFavoriteDisabled,
}) => (
  <Tooltip title="Add to favorite">
    <Button
      icon={added ? <HeartFilled /> : <HeartOutlined />}
      shape="circle"
      size="large"
      onClick={onClick}
      disabled={addedToFavoriteDisabled}
    />
  </Tooltip>
);
